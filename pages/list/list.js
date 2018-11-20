//index.js
//获取应用实例
const app = getApp()
var that = this;
Page({
  data: {
    motto: 'list page',
    tips: null,
    openGId:'',
    list:[],
    total:0,
    page:1,
  },
  feedback:function(){
    // wx.redirectTo({
    //   url: '../feedback/index?openGId=' + this.data.openGId,
    // })
  },
  getInfoData:function(page){
    var that = this;
    wx.request({
      url: 'http://api.lanyintao.com/home/group/listItems',
      data: {
        openGId: this.data.openGId,
        p: page
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        this.setData({
          list:res.data.data,
          page:page
        })
      }
    })
  },
  prePage:function(){
    if(this.data.page == 1){
      wx.showToast({
        title:'没有上一页了',
        duration:1000
      })
    }else{
      var pre = this.data.page - 1;
      this.getInfoData(pre);
    }
    
  },
  nextPage:function(){
    
    if(this.data.page == this.data.total){
      wx.showToast({
        title: '最后一页了',
      })
    }else{
      var next = this.data.page + 1;
      this.getInfoData(next)
    }
  },
  getPay:function(){

    wx.redirectTo({
      url: '../pay/index?openGId='+this.data.openGId,
    })
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      openGId: options.openGId,
    })
    wx.request({
      url:'http://api.lanyintao.com/home/group/listItems',
      data:{
        openGId:options.openGId,
        p:1
      },
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success (res){
        if(res.data.code == 1){
           that.setData({
             list:res.data.data,
             total:res.data.total
           })
        }else{
          

        }
      }
    })
  }
})