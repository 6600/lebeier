// pages/Mumo/Mumo.js
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
  //获取跳转参数
  onLoad: function (option) {
    console.log(option.title)
    this.data.Crumbs = option.title;
    var that = this;
    that.setData({
      Crumbs: option.title
    })
  },
  JumpProduct: function () {
    wx.navigateTo({
      url: '../option/option?title=音乐>MUMO>小班',
    })
  },
  bindflag: function () {
    console.log(this.data.flag)
    this.setData({
      flag: !this.data.flag
    })
  }
})