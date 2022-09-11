// 健行宝合约代码

access(all) contract HealthSystem {

    // 创建一个路由集，存储所有的监管节点地址
    pub var supervisedRouter: {String: Address}

    // 时间戳结构体
    access(all) struct Timestamp {
        pub let year: UInt64
        pub let month: UInt8
        pub let day: UInt8
        pub let hour: UInt8
        pub let minute: UInt8

        init(_year:UInt64, _month:UInt8, _day:UInt8, _hour:UInt8, _minute:UInt8) {
            pre {
                _month >= 1 && _month <= 12 :"Month must between 1 and 12"
                _hour >= 0 && _hour <= 23 :"Hour must between 0 and 23"
                _minute >= 0 && _minute <= 59 :"Minute must between 0 and 59"
            }
            self.year = _year
            self.month = _month
            self.day = _day
            self.hour = _hour
            self.minute = _minute
        }
    }

    // 行程结构体
    access(all) struct Lotus {
        pub let city: String // 城市
        pub let district: String // 区域
        pub let street: String // 街道
        pub let detail: String // 详细地址
        pub let startTime: Timestamp // 开始时间
        pub let endTime: Timestamp // 结束时间

        init(city: String, district: String, street: String, detail: String, startTime: Timestamp, endTime: Timestamp) {
            self.city = city
            self.district = district
            self.street = street
            self.detail = detail
            self.startTime = startTime
            self.endTime = endTime
        }
    }

    // 商品交易结构体
    access(all) struct Trade {
        pub let timeStamp: Timestamp // 交易时间戳
        pub let amount: UFix64 // 交易数
        pub let salerAddress: Address // 商家账户地址
        pub let accepterAddress: Address // 买家账户地址
        pub let info: String // 交易信息

        init(timeStamp: Timestamp, amount: UFix64, salerAddress: Address, accepterAddress: Address, info: String) {
            pre {
                amount > 0.0: "The trade amount must over 0.0"
            }
            self.timeStamp = timeStamp
            self.amount = amount
            self.salerAddress = salerAddress
            self.accepterAddress = accepterAddress
            self.info = info
        }
    }

    // 健康等级
    access(all) enum State: UInt8 {
        pub case green
        pub case yellow
        pub case red
    }

    // 风险等级
    access(all) enum Risk: UInt8 {
        pub case low
        pub case medium
        pub case high
    }


    // 接口，用户开放信息
    pub resource interface openInfo {
        // 检查用户账户信息
        pub fun checkState(): State
    }

    access(all) resource IntergratedCard: openInfo {
        access(contract) var healthState: State // 个人健康码状态
        access(self) var lotusSet: [[Lotus]] // 行程集
        access(self) var vault: UFix64 // 账户余额

        access(all) fun update(newLotus: Lotus) {
            let len = self.lotusSet.length
            // 如果行程集内无行程则更新
            if (len == 0) {
                var dayLotus: [Lotus] = [] // 新增一个存储该日的行程集
                dayLotus.append(newLotus)
                self.lotusSet.append(dayLotus)
            } else {
                let cur_day = self.lotusSet[len-1][0].startTime
                // 如果新增的行程与目前存储的行程集为同一天，则直接添加
                if (cur_day.month == newLotus.startTime.month && cur_day.day == newLotus.startTime.day) {
                    self.lotusSet[len-1].append(newLotus)
                } else {
                    if (len == 7) {
                        // 去掉过期的行程
                        self.lotusSet.removeFirst()
                        var dayLotus: [Lotus] = [] // 新增一个存储该日的行程集
                        dayLotus.append(newLotus)
                        self.lotusSet.append(dayLotus)
                    } else {
                        var dayLotus: [Lotus] = [] // 新增一个存储该日的行程集
                        dayLotus.append(newLotus)
                        self.lotusSet.append(dayLotus)
                    }
                }
            }
        }

        // 一笔交易
        access(all) fun trade(newTrade: Trade): Bool {
            if (newTrade.amount > self.vault) {
                return false
            } else {
                self.vault = self.vault - newTrade.amount
                return true
            }
        }

        pub fun checkState(): State {
            return self.healthState
        }

        init() {
            self.healthState = State.green
            self.lotusSet = []
            self.vault = 0.0
        }

        destroy() {
        }
    }

    pub fun createIngretedCard(): @IntergratedCard {
        return <- create IntergratedCard()
    }

    // 接口，政府开放信息
    pub resource interface publicInfo {
        // 返回风险区信息
        pub fun showRisky(): {String: Risk}
    }

    // 监管端节点
    access(all) resource Supervised: publicInfo {
        access(self) var riskyDistrict: {String: Risk}

        // 返回风险区信息
        pub fun showRisky(): {String: Risk} {
            let risky: {String: Risk} = self.riskyDistrict
            return risky
        }

        //  新增风险区
        access(all) fun addRisky(districts: {String: Risk}) {
            for district in districts.keys {
                self.riskyDistrict.insert(key: district, districts[district]!)
            }
        }

        init() {
            self.riskyDistrict = {}
        }

        destroy() {
        }
    }

    pub fun createSupervised(info: String, address: Address): @Supervised {
        // 将该监管节点地址放入合约的监管路由库中
        self.supervisedRouter[info] = address
        return <-create Supervised()
    }

    // The init() function is required if the contract contains any fields.
    init() {
        self.supervisedRouter = {}
    }
}
