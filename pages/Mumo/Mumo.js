// pages/Mumo/Mumo.js
const App = getApp()
Page({
  data: {
    showLogin: true,
    style: App.globaData.style,
    flag: true,
    // 音乐播放
    isListLoop: true,
    musicName: '请添加音乐',
    sliderValue: 0,
    totalProcess: 0,
    currentTime: '',
    totalTime: '',
    isPlaying: false,
    isDraging: false,
    // ---
    itemID: null,
    itemName: '',
    cardList: [],
    navigation: null,
    serve: App.globaData.serve,
    // 音乐播放列表
    musicListHasData: false,
  },
  // ------------------------ 音乐播放方法 ----------------------------
  // 开始播放音乐
  startMusic: function () {
    const BackgroundAudioManager = wx.getBackgroundAudioManager()
    console.log('开始播放音乐!')
    if (BackgroundAudioManager.paused) {
      console.log('恢复音乐播放!')
      this.setData({
        isPlaying: true
      })
      App.player.isPlaying = true
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
        console.log(App.globaData.serve + e.data.data.url, BackgroundAudioManager.src)
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
    App.player.isPlaying = false
    wx.pauseBackgroundAudio({})
    console.log('暂停播放')
  },
  stop: function () {},
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
    console.log('拖动开始!')
    this.setData({
      isDraging: true
    })
  },
  // -------------------------------------------------------------------
  //获取跳转参数
  onShow: function (option) {
    // 判断音乐列表是否为空
    if (App.player.musicList && App.player.musicList.length > 0) {
      this.setData({
        musicListHasData: true
      })
    }
    // 获取路由
    let pages = getCurrentPages()
    // console.log(pages)
    let navigation = []
    for (let ind = 0; ind < pages.length; ind++) {
      const value = pages[ind]
      // console.log(value.options.name)
      if (value.options && value.options.name) {
        navigation.push({
          name: decodeURIComponent(value.options.name),
          route: value.route
        })
      }
    }
    this.setData({
      navigation: navigation
    })
    // 加载音乐名
    if (App.player.musicList[App.player.index]) {
      this.setData({
        musicName: App.player.musicList[App.player.index].name
      })
    }
    // --------------------------------- 音乐相关 ---------------------------------
    // 载入播放模式
    this.setData({
      isListLoop: App.player.isListLoop
    })
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
  },
  onLoad: function (option) {
    this.setData({
      itemID: option.id ? option.id : null,
      itemName: encodeURI(option.name),
    })
    // 获取信息
    wx.request({
      method: 'POST',
      url: App.globaData.serve + '/api/index/getCategory',
      data: {
        uid: App.globaData.user.id,
        pid: option.id ? option.id : 0,
        verification: App.globaData.user.verification
      },
      complete: (e) => {
        const value = e.data
        if (value.code === 1) {
          this.setData({
            showLogin: false,
            cardList: e.data.data
          })
        } else if (value.code === 40102) {
          wx.showModal({
            title: '提示',
            content: value.msg,
            showCancel: false,
            complete: (e) => {
              // 返回登陆页
              wx.navigateTo({
                url: `../index/index`,
              })
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: value.msg,
            showCancel: false,
            complete: (e) => {
              // 返回上一页
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
      }
    })
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    // 播放完毕后自动播放下一首
    if (App.globaData.autoPlayNext) {
      backgroundAudioManager.onEnded((e) => {
        console.log('播放已完毕')
        if (App.player.isListLoop) {
          this.lestMusic()
        } else {
          this.startMusic()
        }
      })
    }
    // 播放停止事件
    backgroundAudioManager.onStop((e) => {
      App.player.isPlaying = false
      console.log('播放已停止')
      this.setData({
        sliderValue: 0,
        totalProcess: 1,
        currentTime: '',
        totalTime: '',
        isPlaying: false
      })
    })
    // 下一首事件
    backgroundAudioManager.onNext((e) => {
      console.log('下一首事件!')
      this.nextMusic()
    })
    // 上一首事件
    backgroundAudioManager.onPrev((e) => {
      console.log('上一首事件!')
      this.lestMusic()
    })
  },
  JumpProduct: function (event) {
    console.log(this.data.itemID)
    if (this.data.itemID) {
      wx.navigateTo({
        url: `../option/option?name=${encodeURIComponent(event.target.dataset.name)}&&id=${event.target.dataset.id}`,
      })
    } else {
      wx.navigateTo({
        url: `../Mumo/Mumo?name=${encodeURIComponent(event.target.dataset.name)}&&id=${event.target.dataset.id}`,
      })
    }
  },
  bindflag: function () {
    console.log(this.data.flag)
    this.setData({
      flag: !this.data.flag
    })
  },
  // 返回页面
  back: function (event) {
    const index = event.target.dataset.index
    // console.log(index)
    wx.navigateBack({
      delta: index
    })
  }
})