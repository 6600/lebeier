// pages/Music/Music.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    Crumbs: '',
  },
  SongJump: function () {
    wx.navigateTo({
      url: '../Mumo/Mumo?title=音乐>MUMO'
    })
  },
  bindflag: function () {
    var that = this;
    that.setData({
      flag: false
    })
  },
  bindflag2: function () {
    var that = this;
    that.setData({
      flag: true
    })
  },
  //获取跳转参数
  onLoad: function(option) {
    console.log(option.title)
    this.data.Crumbs = option.title;
    var that = this;
    that.setData({
    Crumbs:option.title
    })
  }
})