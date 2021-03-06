// pages/System/System.js
const App = getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    style: App.globaData.style,
    information: false,
    // 音乐播放
    isListLoop: true,
    musicName: '请添加音乐',
    sliderValue: 0,
    totalProcess: 0,
    currentTime: '',
    totalTime: '',
    isPlaying: false,
    isDraging: false,
    // 音乐播放列表
    musicListHasData: false,
    menuList: ['关于我们', '开发版本', '商业版权信息', '退出登录']
  },
  aboutshow() {
    var that = this;
    that.setData({
      information: true
    })
  },
  confirm () {
    this.setData({
      information: false
    })
  },
  // 切换显示菜单
  bindflag: function () {
    console.log(this.data.flag)
    this.setData({
      flag: !this.data.flag
    })
  },
  // ------------------------ 音乐播放方法 ----------------------------
  // 开始播放音乐
  startMusic: function () {
    const BackgroundAudioManager = wx.getBackgroundAudioManager()
    console.log('开始播放音乐!')
    if (BackgroundAudioManager.paused) {
      console.log('恢复音乐播放!')
      App.player.isPlaying = true
      this.setData({
        isPlaying: true
      })
      BackgroundAudioManager.play()
      return
    }
    //请求音乐URL
    wx.request({
      method: 'POST',
      url: App.globaData.serve + '/api/index/getmusic',
      data: {
        uid: App.globaData.user.id,
        mid: App.player.musicList[App.player.index].id,
        verification: App.globaData.user.verification
      },
      complete: (e) => {
        App.player.isPlaying = true
        BackgroundAudioManager.src = App.globaData.serve + e.data.data.url
        BackgroundAudioManager.title = App.player.musicList[App.player.index].name
        BackgroundAudioManager.coverImgUrl = 'http://puge.oss-cn-beijing.aliyuncs.com/lebeier/music-logo.jpg'
        BackgroundAudioManager.play()
        this.setData({
          musicName: App.player.musicList[App.player.index].name,
        })
      }
    })
  },
  // 暂停播放音乐
  pauseMusic: function () {
    App.player.isPlaying = false
    this.setData({
      isPlaying: false
    })
    wx.pauseBackgroundAudio({})
    console.log('暂停播放')
  },
  // 停止播放音乐
  stopMusic: function () {
    App.player.isPlaying = false
    this.setData({
      isPlaying: false
    })
    wx.stopBackgroundAudio({})
    console.log('停止播放')
  },
  // 切换列表循环 or 单曲循环
  switchLoop: function () {
    App.player.isListLoop = !App.player.isListLoop
    wx.showToast({
      icon: 'info',
      title: App.player.isListLoop ? '列表播放模式' : '单曲循环模式'
    })
    console.log('切换歌曲循环模式', App.player.isListLoop)
    this.setData({
      isListLoop: App.player.isListLoop
    })
  },
  // 切换上一首/下一首
  lestMusic: function () {
    let newIndex = App.player.index - 1
    // 循环播放
    if (newIndex < 0) newIndex = App.player.musicList.length - 1
    App.player.index = newIndex
    // console.log(App.player.index)
    this.startMusic()
    this.setData({
      musicName: App.player.musicList[App.player.index].music_name
    })
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
    const sliderValue = e.detail.value
    function formatInt(num) {
      if (num > 9) return num
      else return '0' + num
    }
    function getCurrentTime() {
      return formatInt(parseInt(sliderValue / 60)) + ':' + formatInt(parseInt(sliderValue % 60))
    }
    console.log('播放位置改变:', sliderValue)
    this.setData({
      sliderValue: sliderValue,
      currentTime: getCurrentTime()
    })
    wx.seekBackgroundAudio({
      position: sliderValue,
      complete: () => {
        this.setData({
          isDraging: false
        })
      }
    })
  },
  handleSliderMoveStart: function () {
    App.player.isPlaying = true
    console.log('拖动开始!')
    this.setData({
      isDraging: true
    })
  },
  loginOut: function () {
    const BackgroundAudioManager = wx.getBackgroundAudioManager()
    BackgroundAudioManager.stop()
  },
  turn: function (event) {
    console.log(this.data.menuList)
    this.setData({
      information: this.data.menuList[event.target.dataset.id]
    })
  },
  // -------------------------------------------------------------------
  onShow: function (option) {
    // 判断音乐列表是否为空
    if (App.player.musicList && App.player.musicList.length > 0) {
      this.setData({
        musicListHasData: true
      })
    }
    // --------------------------------- 音乐相关 ---------------------------------
    // 载入播放模式
    this.setData({
      isListLoop: App.player.isListLoop
    })
    // 加载音乐名
    if (App.player.musicList[App.player.index]) {
      this.setData({
        musicName: App.player.musicList[App.player.index].name
      })
    }
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    // 播放时间改变事件
    backgroundAudioManager.onTimeUpdate((e) => {
      let isPlaying = App.player.isPlaying
      function formatInt(num) {
        if (num > 9) return num
        else return '0' + num
      }
      // console.log(wx.getBackgroundAudioManager().currentTime)
      if (!this.data.isDraging) {
        const sliderValue = wx.getBackgroundAudioManager().currentTime
        const totalProcess = wx.getBackgroundAudioManager().duration
        // 播放时长为0 总时长也为0则跳到下一首
        if (totalProcess !== 0 && sliderValue === totalProcess) {
          console.log('播放时间为0')
          if (App.player.isListLoop) {
            this.lestMusic()
          } else {
            this.startMusic()
          }
        }
        // console.log(totalProcess)
        function getCurrentTime() {
          if (totalProcess === 0) {
            isPlaying = false
            return ''
          }
          return formatInt(parseInt(sliderValue / 60)) + ':' + formatInt(parseInt(sliderValue % 60))
        }
        function getTotalTime() {
          if (totalProcess === 0) return ''
          return formatInt(parseInt(totalProcess / 60)) + ':' + formatInt(parseInt(totalProcess % 60))
        }
        this.setData({
          isPlaying: isPlaying,
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
    // this.animate()
    wx.request({
      method: 'POST',
      url: App.globaData.serve + '/api/index/getSystem',
      data: {
        uid: App.globaData.user.id,
        verification: App.globaData.user.verification
      },
      complete: (e) => {
        // console.log(e)
        this.setData({
          menuList: e.data.data,
          verification: App.globaData.user.verification
        })
      }
    })
  }
})