//app.js
App({
  globalData: {
    userInfo: null,
    encryptedData: null,
    iv: null,
    openid: null,
    share_ticket:null,
    session_key:null,
    code:null,
    openGId:null,
  },
  getOpenId(code, ops, callback){
    var that = this
    wx.request({
      url: 'http://api.lanyintao.com/home/group/getCode',
      data: {
        code: code
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {

        callback(res)
        if (ops.scene == 1044) {
          wx.getShareInfo({
            shareTicket: ops.shareTicket,
            complete(shareData) {
   
              that.getOpenGId(res.data.openid, shareData.iv, shareData.encryptedData, res.data.session_key, that.callbackOpenGId)
            }
          })
        }
      }
    })
  },
  callbackOpenGId(res) {
  },
  callbackOpenId(res){

  },
  getOpenGId(openid, iv, encryptedData, session_key, callback){
    var that = this
    wx.request({
      url: 'http://api.lanyintao.com/home/group/encrypt',
      data: {
        iv: iv,
        encryptedData: encryptedData,
        session_key: session_key
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(result) {
        callback(result)
        that.verify(openid, result.data.openGId)

      }

    })
  },

  verify(openid, openGid) {
    wx.request({
      url: 'http://api.lanyintao.com/home/group/verify',
      data: {
        openid: openid,
        openGId: openGid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: "POST",
      success(res) {
      
        if (!res.data.code) {
          wx.redirectTo({
            url: '/pages/list/list?openGId=' + openGid 
          })
        }
      }

    })
  },

  
  
  onLaunch: function (ops) {
    // 展示本地存储能力
    var that = this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      that.globalData.code = res.code
        that.getOpenId(res.code, ops, that.callbackOpenId)
        
      }
    })     
  
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
            

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

  },

  
  
})