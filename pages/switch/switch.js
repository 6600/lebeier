// pages/switch/switch.js
Page({
  data: {
    flag: true
  },
  onShow: function () {
    var that = this;
    that.setData({
      flag: true
    })
  },
  haha: function () {
    wx.navigateTo({
      url: '../index/index'
    })
  },
  hahaha: function () {
    console.log(2);
  },
  ha: function () {
    console.log(3);
  },
  hahahaha: function () {
    console.log(4);
  },
  bindflag: function () {
    console.log(1)
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
})