const App = getApp()
let startY = null
Page({
  data: {
    flag: true,
    Crumbs: '',
    rotation: 360,
    sliderValue: 0,
    totalProcess: 0,
    isPlaying: false,
    isPaused: false,
    enlargeItem: 10,
    isDraging: false,
    menuImg: App.globaData.style.menuImg,
    musicList: [
      {
        "music_id": 1,
        "music_name": "薛之谦",
        "music_time": "1212121",
        "music_rights": 1,
        "music_list": "2mw1pmw1pmk2lm12wm1p2m1msp12msks1ls",
        "size": "1222",
        "url": "http://www.170mv.com/kw/other.web.np01.sycdn.kuwo.cn/resource/n2/1/32/765664006.mp3",
        "create_time": "0000-00-00 00:00:00",
        "play_num": 1
      },
      {
        "music_id": 2,
        "music_name": "薛之谦2",
        "music_time": "1212121",
        "music_rights": 1,
        "music_list": "2mw1pmw1pmk2lm12wm1p2m1msp12msks1ls",
        "size": "1222",
        "url": "http://www.170mv.com/kw/other.web.np01.sycdn.kuwo.cn/resource/n2/1/32/765664006.mp3",
        "create_time": "0000-00-00 00:00:00",
        "play_num": 1
      }
    ]
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
  startMusic: function () {
    this.setData({
      isPlaying: true
    })
    wx.playBackgroundAudio({
      dataUrl: this.data.musicList[0].url,
      title: this.data.musicList[0].music_name,
      //图片地址地址
      coverImgUrl: 'http://i.gtimg.cn/music/photo/mid_album_90/a/F/000QgFcm0v8WaF.jpg',
      success: () => {
        const backgroundAudioManager = wx.getBackgroundAudioManager()
        // 播放时间改变事件
        backgroundAudioManager.onTimeUpdate((e) => {
          if (!this.data.isDraging) {
            console.log(wx.getBackgroundAudioManager().currentTime)
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
    console.log(App.globaData)
    // 播放停止事件
    wx.onBackgroundAudioStop((e) => {
      console.log('播放已停止')
      this.setData({
        isPlaying: false
      })
    })
    // this.animate()
  }
})