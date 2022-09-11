import HealthSystem from 0x01

transaction(city: String, district: String, street: String, detail: String, year: UInt64, month: UInt8, day: UInt8, hour: UInt8, minute: UInt8) {

  prepare(acct: AuthAccount) {
    let super = acct.borrow<&HealthSystem.IntergratedCard>(from: /storage/Inter)?? panic("Account do not have such ")
    let time = HealthSystem.Timestamp(_year: year, _month: month, _day: day, _hour: hour, _minute: minute)
    let newLotus = HealthSystem.Lotus(city: city, district: district, street: street, detail: detail, startTime: time, endTime: time)
    super.update(newLotus: newLotus)
    log("success update this new lotus")

  }

  execute {

  }
}
