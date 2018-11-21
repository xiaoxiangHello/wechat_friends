//index.js
//获取应用实例
const app = getApp()
var that = this;
Page({
  data: {
    motto: 'list page',
    openGId:''
  },
  returnList:function(){
    wx.redirectTo({
      url: '../list/list?openGId='+this.data.openGId,
    })
  },
  onLoad: function (options) {
    //console.log(options)
    // that.setData({
    //   openGId:options.openGId
    // })
  }
})