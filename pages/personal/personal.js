// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
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
  },
  // 切换显示菜单
  bindflag: function () {
    console.log(this.data.flag)
    this.setData({
      flag: !this.data.flag
    })
  },
  // 加载完毕事件
  onLoad: function (option) {
    wx.getUserInfo({
      success: function (res) {
        console.log(res)
      }
    })
  }
})