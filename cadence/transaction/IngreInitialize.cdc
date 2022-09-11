import HealthSystem from 0x01

transaction() {
    prepare(acct: AuthAccount) {
        let inter <- HealthSystem.createIngretedCard()
        acct.save(<- inter, to: /storage/Supervised)
    }
}