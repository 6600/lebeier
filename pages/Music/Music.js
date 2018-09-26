const App = getApp()
Page({
  data: {
    flag: true,
    Crumbs: '',
    rotation: 360,
    sliderValue: 0,
    totalProcess: 0,
    isPlaying: false,
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
  startMusic: function () {
    this.setData({
      isPlaying: true
    })
    wx.playBackgroundAudio({
      dataUrl: 'http://www.170mv.com/kw/other.web.np01.sycdn.kuwo.cn/resource/n2/1/32/765664006.mp3',
      title: '薛之谦',
      //图片地址地址
      coverImgUrl: 'http://i.gtimg.cn/music/photo/mid_album_90/a/F/000QgFcm0v8WaF.jpg',
      success: () => {
        setTimeout(() => {
          console.log(wx.getBackgroundAudioManager().duration)
          this.setData({
            totalProcess: wx.getBackgroundAudioManager().duration
          })
        }, 100)
      }
    })
  },
  pauseMusic: function () {
    this.setData({
      isPlaying: false
    })
    wx.pauseBackgroundAudio({})
    console.log('暂停播放')
  },
  stopMusic: function () {
    this.setData({
      isPlaying: false
    })
    wx.stopBackgroundAudio({})
    console.log('停止播放')
  },
  hanleSliderChange: function (e) {
    const position = e.detail.value;
    wx.seekBackgroundAudio({ position})
  },
  handleSliderMoveStart: function () {
    console.log('111')
  },
  handleSliderMoveEnd: function () {
    console.log('111')
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
    setTimeout(this.animate, 50)
    // requestAnimationFrame(this.animate)
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
    console.log(this.data)
  }
})