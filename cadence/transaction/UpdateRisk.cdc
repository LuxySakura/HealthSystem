import HealthSystem from 0x01

transaction(district: String, risk: String) {

  prepare(acct: AuthAccount) {
    let super = acct.borrow<&HealthSystem.Supervised>(from: /storage/Supervised)?? panic("Account do not have such ")
    if (risk == "low") {
      let districts: {String: HealthSystem.Risk} = {}
      districts.insert(key: district, HealthSystem.Risk(rawValue: 0)!)
      super.addRisky(districts: districts)
      log("Success Update low risk district")
    } else {
      if (risk == "medium") {
        let districts: {String: HealthSystem.Risk} = {}
        districts.insert(key: district, HealthSystem.Risk(rawValue: 1)!)
        super.addRisky(districts: districts)
        log("Success Update medium risk district")
      } else {
        let districts: {String: HealthSystem.Risk} = {}
        districts.insert(key: district, HealthSystem.Risk(rawValue: 2)!)
        super.addRisky(districts: districts)
        log("Success Update high risk district")
      }
    }

  }

  execute {

  }
}