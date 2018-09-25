// pages/option/option.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Crumbs: '',
  },
  onLoad: function (option) {
    console.log(option.title)
    this.data.Crumbs = option.title;
    var that = this;
    that.setData({
      Crumbs: option.title
    })
  },
  tomenu() {
    wx.navigateTo({
      url: '../menu/menu?title=音乐>MUMO>小班>春',
    })
  } 
})