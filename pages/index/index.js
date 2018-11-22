//index.js
//获取应用实例
const app = getApp()
var that = this;
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    summary:'',
    wantsum:'',
    name:'',
    openId:'',
    openGId:'',
    shareTicket:'',
  },
  
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  }, 

  onLoad: function (ops) {
    console.log(2)
    var openId = wx.getStorageSync('openid');
    var openGId = wx.getStorageSync('openGId');
    
    var share_ticket = wx.getStorageSync('share_ticket')
    console.log("share_ticket:"+share_ticket)
    this.setData({
      shareTicket:share_ticket,
      openId:openId,
      openGId:openGId
    })
   
    // app.callbackOpenGId = res => {
    //   this.setData({
    //     openGId:res.data.openGId
    //   })
    // }

    // app.callbackOpenId = res => {
    //   console.log(4)
    //   this.setData({
    //     openId:res.data.openid
    //   })
    // }
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  
 
  getName: function (e) {
    this.setData({
      name: e.detail.value,
    })
  },
  getSummary: function (e) {
    this.setData({
      summary: e.detail.value
    })
  },
  getWant: function (e) {
    this.setData({
     wantsum: e.detail.value
    })
  },
  submitInfo: function (e){
    var openId = wx.getStorageSync('openid');
    var openGId = wx.getStorageSync('openGId');
    console.log(openId);
    console.log(openGId);

    var summary = this.data.summary
    var name = this.data.name
    var want = this.data.wantsum
    var userInfo = this.data.userInfo
    var city = userInfo.city
    var province = userInfo.province
    var country = userInfo.country
    var avatarUrl = userInfo.avatarUrl 
    var sex = userInfo.gender
    
    wx.request({
      url: 'http://api.lanyintao.com/home/group/submit',
      data:{
        summary:summary,
        name:name,
        want:want,
        city:city,
        province:province,
        country:country,
        avatar:avatarUrl,
        openId:openId,
        openGId:openGId,
        sex:sex
      },
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      }, 
      success (res){
        if(res.code == 0){
          wx.showToast({
            title:'提交失败',
            icon:'fail',
            duration:1000,
            mask:true
          })
        }else{
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000,
            mask: true
          })
          setTimeout(function () {
            wx.redirectTo({ url: '/pages/list/list?openGId='+openGId })
          }, 2000)
          
        }
      }
    })
  }
})
