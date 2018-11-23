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
      url: '../list/list?openGId='+wx.getStorageSync('openGId'),
    })
  },
  onLoad: function (options) {
  
  }
})