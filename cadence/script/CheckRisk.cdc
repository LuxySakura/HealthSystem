import HealthSystem from 0x01

pub fun main(super_address: Address): [String] {
  let acct = getAccount(super_address).getCapability(/public/Supervised)
    .borrow<&HealthSystem.Supervised{HealthSystem.publicInfo}>() ?? panic("The address does not have supervised initialize")
  let risk: {String: HealthSystem.Risk} = acct.showRisky()
  let districts: [String] = []
  for district in acct.showRisky().keys {
    log(district)
    districts.append(district)
  }
  return districts
}
