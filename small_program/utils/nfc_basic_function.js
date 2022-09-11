/* 
 * @params 
*/
export function sendNfcMessage(messages) {
  // 获取设备是否支持HCE
  wx.getHCEState({
    // 如果设备支持，则进行下一步
    success: (res) => {
      console.log("Got HCE Function")
      this.setData({
        motto: "success get HCE Access"
      })
    

      wx.startHCE({
        aid_list: ['F223344556'],
        success (res) {
          console.log("Success Start HCE")

          wx.onHCEMessage(function (res) {
            console.log("Start on HCE Message")
            if (res.messageType === 1) {
              wx.sendHCEMessage({
                data: buffer,
                success:function(res){
                  console.log('Success Send NFC HCE Message')
                },
                fail:function(err){
                  console.error('NfcHCECore-->sendNfcHCEMessage::fail:',err)
                }
              })
            }
          })

          wx.sendHCEMessage({
            data: buffer,
            success:function(res){
              console.log('Success Send NFC HCE Message')
            },
            fail:function(err){
              console.log("Fail to send HCE Message")
            }
          })
        },
        fail (res) {
          console.log(res.errMsg)
        }
      })
    },
    fail: (res) => {
      console.log("设备不支持HCE")
      wx.showToast({
        title: '设备不支持HCE',
      })
    }
  })
}

export function recieveNfcMessage() {

}

export function parseAddress(buffer) {

}