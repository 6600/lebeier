// pages/option/option.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLogin: true,
    Crumbs: '',
    // 音乐播放
    isListLoop: true,
    musicName: '请添加音乐',
    sliderValue: 0,
    totalProcess: 0,
    currentTime: '',
    totalTime: '',
    isPlaying: false,
    isDraging: false,
    // 样式
    serve: App.globaData.serve,
    style: App.globaData.style,
    flag: true,
    itemID: null,
    itemName: '',
    cardList: [],
    // 导航
    navigation: null,
    isMusic: false,
    playMenuIsShow: true,
    // 音乐播放列表
    musicListHasData: false,
    playIndex: -1
  },
  stop: function () { },
  shouPlayMenu: function (event) {
    const dataset = event.target.dataset
    let cardListCopy = this.data.cardList
    console.log(cardListCopy, dataset.index)
    cardListCopy[dataset.index].show = !cardListCopy[dataset.index].show
    this.setData({
      cardList: cardListCopy
    })
    console.log(this.data.cardList)
  },
  // 开始播放音乐
  playMusic: function (event) {
    const dataset = event.target.dataset
    // 取消所有展开的菜单
    let copyCardList = this.data.cardList
    for (let ind in copyCardList) {
      copyCardList[ind].showPlay = false
    }
    this.setData({
      cardList: copyCardList
    })
    // 将列表添加到全局播放列表
    App.player.musicList = this.data.cardList
    App.player.index = dataset.index
    // 设置音乐持续显示
    this.setData({
      musicListHasData: true
    })
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
        const BackgroundAudioManager = wx.getBackgroundAudioManager()
        BackgroundAudioManager.src = App.globaData.serve + e.data.data.url
        BackgroundAudioManager.title = dataset.name
        BackgroundAudioManager.coverImgUrl = 'http://puge.oss-cn-beijing.aliyuncs.com/lebeier/music-logo.jpg'
        BackgroundAudioManager.play()
        this.setData({
          playIndex: dataset.index,
          musicName: dataset.name,
        })
      }
    })
  },
  // ------------------------ 音乐播放方法 ----------------------------
  // 开始播放音乐
  startMusic: function () {
    console.log('开始播放音乐!')
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
        const value = e.data
        if (value.code === 1) {
          App.player.isPlaying = true
          // 设置音乐持续显示
          this.setData({
            musicListHasData: true
          })
          console.log(e.data)
          const BackgroundAudioManager = wx.getBackgroundAudioManager()
          BackgroundAudioManager.src = App.globaData.serve + e.data.data.url
          BackgroundAudioManager.title = App.player.musicList[App.player.index].name
          BackgroundAudioManager.coverImgUrl = 'http://puge.oss-cn-beijing.aliyuncs.com/lebeier/music-logo.jpg'
          BackgroundAudioManager.play()
          this.setData({
            playIndex: App.player.index,
            musicName: App.player.musicList[App.player.index].name,
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
  // 返回页面
  back: function (event) {
    const index = event.target.dataset.index
    // console.log(index)
    wx.navigateBack({
      delta: index
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
  switchShowPlayButton: function (event) {
    const index = event.target.dataset.index
    // console.log(index)
    let copyCardList = this.data.cardList
    // 取消其他所有展开的菜单
    for (let ind in copyCardList) {
      copyCardList[ind].showPlay = false
    }
    copyCardList[index].showPlay = !copyCardList[index].showPlay
    this.setData({
      cardList: copyCardList
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
    // 获取路由
    let pages = getCurrentPages()
    let navigation = []
    for (let ind = 0; ind < pages.length; ind++) {
      const value = pages[ind]
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
  },
  onLoad: function (option) {
    // console.log(decodeURIComponent(option.name))
    this.setData({
      itemID: option.id,
      itemName: decodeURIComponent(option.name),
    })
    // 获取信息
    wx.request({
      method: 'POST',
      url: App.globaData.serve + '/api/index/getCategory',
      data: {
        uid: App.globaData.user.id,
        pid: option.id,
        verification: App.globaData.user.verification
      },
      complete: (e) => {
        console.log(e)
        const value = e.data
        if (value.code === 1) {
          this.setData({
            isMusic: false,
            showLogin: false,
            cardList: e.data.data
          })
        } else {
          console.log('尝试请求音乐列表')
          // 如果请求不到卡片那么请求音乐列表
          wx.request({
            method: 'POST',
            url: App.globaData.serve + '/api/index/getClassMusic',
            data: {
              uid: App.globaData.user.id,
              gid: option.id,
              verification: App.globaData.user.verification
            },
            complete: (e) => {
              console.log(e)
              const value = e.data
              if (value.code === 1) {
                this.setData({
                  isMusic:true,
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
        }
      }
    })
  },
  bindflag: function () {
    console.log(this.data.flag)
    this.setData({
      flag: !this.data.flag
    })
  },
  tomenu(event) {
    wx.navigateTo({
      url: `../option/option?name=${encodeURIComponent(event.target.dataset.name)}&&id=${event.target.dataset.id}`,
    })
  } 
})