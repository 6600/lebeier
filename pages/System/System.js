// pages/System/System.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    information: false
  },
  aboutshow() {

    var that = this;
    that.setData({
      information: true
    })
  },
  confirm () {
    var that = this;
    that.setData({
      information: false
    })
  }
})