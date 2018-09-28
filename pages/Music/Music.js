const App = getApp()
let startY = null
Page({
  data: {
    flag: true,
    rotation: 360,
    sliderValue: 0,
    totalProcess: 0,
    isPlaying: false,
    isPaused: false,
    isDraging: false,
    menuImg: App.globaData.style.menuImg
  },
  SongJump: function () {
    wx.navigateTo({
      url: '../Mumo/Mumo?title=音乐>MUMO'
    })
  },
  // 切换显示菜单
  bindflag: function () {
    console.log(this.data.flag)
    this.setData({
      flag: !this.data.flag
    })
  },
  // 开始播放音乐
  startMusic: function () {
    this.setData({
      isPlaying: true
    })
    wx.playBackgroundAudio({
      dataUrl: App.player.musicList[App.player.index].url,
      title: App.player.musicList[App.player.index].music_name,
      //图片地址地址
      coverImgUrl: 'http://i.gtimg.cn/music/photo/mid_album_90/a/F/000QgFcm0v8WaF.jpg'
    })
  },
  // 暂停播放音乐
  pauseMusic: function () {
    this.setData({
      isPlaying: false
    })
    wx.pauseBackgroundAudio({})
    console.log('暂停播放')
  },
  // 停止播放音乐
  stopMusic: function () {
    this.setData({
      isPlaying: false
    })
    wx.stopBackgroundAudio({})
    console.log('停止播放')
  },
  // 切换上一首/下一首
  lestMusic: function () {
    let newIndex = App.player.index - 1
    // 循环播放
    if (newIndex < 0) newIndex = App.player.musicList.length - 1
    App.player.index = newIndex
    console.log(App.player.index)
    this.startMusic()
  },
  nextMusic: function () {
    let newIndex = App.player.index + 1
    // 循环播放
    if (newIndex > App.player.musicList.length - 1) newIndex = 0
    App.player.index = newIndex
    console.log(App.player.index)
    this.startMusic()
  },
  hanleSliderChange: function (e) {
    const position = e.detail.value;
    console.log('播放位置改变:', position)
    this.setData({
      sliderValue: position
    })
    wx.seekBackgroundAudio({
      position,
      complete: () => {
        setTimeout(() => {
          this.setData({
            isDraging: false
          })
        }, 2500)

      }
    })
  },
  handleSliderMoveStart: function () {
    console.log('拖动开始!')
    this.setData({
      isDraging: true
    })
  },
  listTouchend: function () {
    console.log('触摸结束!')
    startY = null
  },
  listTouchmove: function (event) {
    // console.log(event)
    // startY = null
    const touchY = event.touches[0].pageY
    if (startY !== null) {
      const change = startY - touchY
      // console.log(change)
      let newRotation = this.data.rotation + change
      if (newRotation > 360) newRotation = 0
      if (newRotation < 0) newRotation = 360
      this.setData({
        rotation: newRotation
      })
    }
    startY = touchY
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
    // 播放停止事件
    wx.onBackgroundAudioStop((e) => {
      console.log('播放已停止')
      this.setData({
        isPlaying: false
      })
    })
    // this.animate()
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    // 播放时间改变事件
    backgroundAudioManager.onTimeUpdate((e) => {
      // console.log(wx.getBackgroundAudioManager().currentTime)
      if (!this.data.isDraging) {
        this.setData({
          sliderValue: wx.getBackgroundAudioManager().currentTime,
          totalProcess: wx.getBackgroundAudioManager().duration
        })
      } else {
        console.log('处于拖动状态！')
      }
    })
  }
})