// pages/Music/Music.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    Crumbs: '',
    rotation: 360,
    isPaused: false,
    enlargeItem: 10
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
  animate: function () {
    if (!this.data.isPaused) {
      if (this.data.rotation > 360) this.data.rotation = 0
      if (this.data.rotation < 0) this.data.rotation = 360
      // this.data.rotation -= 50
      this.setData({
        rotation: this.data.rotation - 1
      })
      // console.log(this.data.rotation)
    }
    requestAnimationFrame(this.animate)
  },
  //获取跳转参数
  onLoad: function(option) {
    // console.log(option.title)
    // this.data.Crumbs = option.title;
    // var that = this;
    // that.setData({
    //   Crumbs:option.title
    // })
    this.animate()
  }
})