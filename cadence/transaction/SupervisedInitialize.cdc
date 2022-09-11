import HealthSystem from 0x01

transaction(info: String, address: Address) {
    prepare(acct: AuthAccount) {
        let inter <- HealthSystem.createSupervised(info: info, address: address)
        acct.save(<- inter, to: /storage/Supervised)
    }
}