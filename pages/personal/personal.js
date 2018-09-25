// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    passShow:false
  },
  passBtn () {
    console.log(111)
    var that = this;
    that.setData({
      passShow: true
    })
  },
  modifyPass () {
    console.log(111)
    var that = this;
    that.setData({
      passShow:false

    })
  }
})