// pages/Mumo/Mumo.js
const App = getApp()
Page({
  data: {
    menuImg: App.globaData.style.menuImg,
    flag: true,
    // 音乐播放
    sliderValue: 0,
    totalProcess: 0,
    currentTime: '',
    totalTime: '',
    isPlaying: false,
    isDraging: false,
  },
  // ------------------------ 音乐播放方法 ----------------------------
  // 开始播放音乐
  startMusic: function () {
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
    // console.log(App.player.index)
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
        this.setData({
          isDraging: false
        })
      }
    })
  },
  handleSliderMoveStart: function () {
    console.log('拖动开始!')
    this.setData({
      isDraging: true
    })
  },
  // -------------------------------------------------------------------
  //获取跳转参数
  onShow: function (option) {
    // --------------------------------- 音乐相关 ---------------------------------

    const backgroundAudioManager = wx.getBackgroundAudioManager()
    // 播放时间改变事件
    backgroundAudioManager.onTimeUpdate((e) => {
      function formatInt(num) {
        if (num > 9) return num
        else return '0' + num
      }
      // console.log(wx.getBackgroundAudioManager().currentTime)
      if (!this.data.isDraging) {
        const sliderValue = wx.getBackgroundAudioManager().currentTime
        const totalProcess = wx.getBackgroundAudioManager().duration
        // console.log(totalProcess)
        function getCurrentTime() {
          if (totalProcess === 0) return ''
          return formatInt(parseInt(sliderValue / 60)) + ':' + formatInt(parseInt(sliderValue % 60))
        }
        function getTotalTime() {
          if (totalProcess === 0) return ''
          return formatInt(parseInt(totalProcess / 60)) + ':' + formatInt(parseInt(totalProcess % 60))
        }
        this.setData({
          isPlaying: true,
          sliderValue: sliderValue,
          totalProcess: totalProcess,
          currentTime: getCurrentTime(),
          totalTime: getTotalTime()
        })

      } else {
        console.log('处于拖动状态！')
      }
    })
    // ----------------------------------------------------------------------------
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