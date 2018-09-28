// pages/option/option.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Crumbs: '',
    menuImg: App.globaData.style.menuImg,
    flag: true
  },
  onLoad: function (option) {
    console.log(option.title)
    this.data.Crumbs = option.title;
    var that = this;
    that.setData({
      Crumbs: option.title
    })
  },
  bindflag: function () {
    console.log(this.data.flag)
    this.setData({
      flag: !this.data.flag
    })
  },
  tomenu() {
    wx.navigateTo({
      url: '../menu/menu?title=音乐>MUMO>小班>春',
    })
  } 
})