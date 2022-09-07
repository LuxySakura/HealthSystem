// Health System Contract
access(all) contract HealthSystem {

    pub enum Risk: UInt8 {
        pub case green
        pub case yellow
        pub case red
    }

    pub struct TimeStamp {
        access(all) let year: Int
        access(all) let month: Int
        access(all) let day: Int
        access(all) let hour: Int
        access(all) let minute: Int

        pub fun verifyBefore(_givenDate: TimeStamp): Bool {
            if _givenDate.year <= self.year  {
                if _givenDate.month <= self.month {
                    if _givenDate.day <= self.day {
                        if _givenDate.hour <= self.hour {
                            if _givenDate.minute < self.minute {
                                return true
                            }
                        }
                    }
                }
            }
            return false
        }

        // Initialize the Date
        init(_year: Int, _month: Int, _day: Int, _hour: Int, _minute: Int) {
            pre {
                _month >= 1 && _month <= 12: "Month should be from January to December"
                _hour >= 0 && _hour <= 23: "Hour should be from 0 to 24"
                _minute >= 0 && _minute <= 60: "Minute should be from 0 to 60"
            }

            self.year = _year
            self.month = _month
            self.day = _day
            self.hour = _hour
            self.minute = _minute
        }
    }

    pub struct Lotus {
        access(all) let city: String
        access(all) let district: String
        access(all) let street: String
        access(all) let detail: String
        acesss(all) let startTime: TimeStamp

        init() {

        }
    }

    pub resource interface LotusBillboard {
        pub fun checkRiskyArea(): {Lotus: Risk} {
        }
    }

    // 记录每个人的7天行程
    pub resource LotusSet {
        access(self) var lotusSet: [Lotus]



        init() {
            self.lotusSet = []
        }
    }

}