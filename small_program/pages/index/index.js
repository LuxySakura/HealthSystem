// index.js
// 获取应用实例
const app = getApp()

Page({
  nfc: null,
  data: {
    motto: 'Hello World',
    address: '哈尔滨市',
    userInfo: {},
    nfcInfo: {}
  },
  // 事件处理函数
  onLoad() {
  },
  sendMessage() {
    console.log("check HCE State")
    wx.navigateTo({
      url: '/pages/tran/tran',
    })
    wx.getHCEState({
      success: (res) => {
        console.log("Got HCE Function")
        this.setData({
          motto: "success get HCE Access"
        })
        
        const buffer = new ArrayBuffer(1)
        const dataView = new DataView(buffer)
        dataView.setUint8(0,0)

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
        this.setData({
          motto: "You must open the NFC Function"
        })
      }
    })
  },
  recieveMessage() {
    const nfc = wx.getNFCAdapter()
    this.nfc = nfc

    wx.showModal({
      title: '有一笔来自{哈工大}的交易，共计{10.00}元，交易备注为{材料费}，是否接受？',
      cancelColor: 'cancelColor',
      success (res) {
        if (res.confirm) {
          const address = res.content // Get the address
          
          console.log("Confirm")
        } 
      }
    })
    function discoveryHandler(res) {
      if (res.techs.includes(nfc.tech.ndef)) {
        console.log("success read ndef message")
        const ndef = nfc.getNdef()
        ndef.connect()
        if (ndef.isConnected) {
          console.log("Connected")
          const id = res.messages[0]
          console.log(id)
        }
      }
    }
    
    nfc.startDiscovery({
      success(res) {
        console.log("success start discover")
      },
      fail(err) {
        console.log("fail to start discover")
      }
    })

    nfc.onDiscovered((res) => {
      const payload = res.messages[0].records[0].payload
      const hex = Array.prototype.map.call(new Uint8Array(payload), x => ('00' + x.toString(16)).slice(-2)).join('')
      console.log(hex)
      
      if (res.techs.includes(nfc.tech.ndef)) {
        console.log("success detect ndef message")
        const ndef = nfc.getNdef() // Get NDEF Tag
        
      }
    })
  },
  writeMessage() {

  },
  setLocation() {
    console.log("Ready to set location")
    wx.showModal({
      title: '输入设置的地址,点击确定后贴入要写入的标签',
      editable: true,
      placeholderText: '格式：XX市XX区XX',
      cancelColor: 'cancelColor',
      success (res) {
        if (res.confirm) {
          const address = res.content // Get the address
          wx.showToast({
            title: '设置成功！',
            duration: 5000
          })
          console.log("Confirm")
        } 
      }
    })
  },
  setTransaction() {
    wx.showModal({
      title: '输入交易的金额',
      editable: true,
      success (res) {
        if (res.confirm) {
          
        }
      }
    })
  },
  recieveTransaction() {

  },
  checkLotus() {
    wx.showToast({
      title: '用户健康码颜色为：{绿色}',
      image: '../../resource/green.png',
      duration: 5000
    })
  }
})
