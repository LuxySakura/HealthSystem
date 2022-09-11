import HealthSystem from 0x01

transaction(amount: UFix64, salerAddress: Address, accepterAddress: Address, detail: String, year: UInt64, month: UInt8, day: UInt8, hour: UInt8, minute: UInt8) {

  prepare(acct: AuthAccount) {
    let super = acct.borrow<&HealthSystem.IntergratedCard>(from: /storage/Inter)?? panic("Account do not have such ")
    let time = HealthSystem.Timestamp(_year: year, _month: month, _day: day, _hour: hour, _minute: minute)
    let newTrade = HealthSystem.Trade(timeStamp: time, amount: amount, salerAddress: salerAddress, accepterAddress: accepterAddress, info: detail)
    super.trade(newTrade: newTrade)
    log("success make a trade")

  }

  execute {

  }
}