import HealthSystem from 0x01

pub fun main(check_address: Address): String {
    let acct = getAccount(check_address).getCapability(/public/Inter)
        .borrow<&HealthSystem.IntergratedCard{HealthSystem.openInfo}>() ?? panic("The address does not have card initialize")
    if (acct.checkState() == HealthSystem.State.green) {
        log("Green")
        return "Green"
    } else {
        if (acct.checkState() == HealthSystem.State.yellow) {
            log("Yellow")
            return "Yellow"
        }
    }
  return "Red"
}