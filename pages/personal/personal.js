// pages/personal/personal.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    // 音乐播放
    isListLoop: true,
    musicName: '',
    sliderValue: 0,
    totalProcess: 0,
    currentTime: '',
    totalTime: '',
    isPlaying: false,
    isDraging: false,
    userData: App.globaData.user,
    // 样式
    style: App.globaData.style,
    // 音乐播放列表
    musicListHasData: false,
    passShow:false,
    peopleData: null,
    organizationShow: false
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
  cancelCooperation: function () {
    this.setData({
      organizationShow: false
    })
  },
  cancel: function () {
    this.setData({
      passShow: false
    })
  },
  // 切换显示菜单
  bindflag: function () {
    console.log(this.data.flag)
    this.setData({
      flag: !this.data.flag
    })
  },
  // 更改密码
  changePassword: function (e) {
    let sendData = e.detail.value
    if (sendData.password === '' || sendData.repassword === '') {
      console.log('取消修改密码!')
      this.setData({
        passShow: false
      })
      return
    }
    if (sendData.repasswordCheck !== sendData.repassword) {
      wx.showModal({
        title: '错误',
        content: '密码和确认密码输入不一致!',
        showCancel: false
      })
      return
    }
    sendData.id = App.globaData.user.id
    sendData.account = App.globaData.user.username
    wx.request({
      method: 'POST',
      url: App.globaData.serve + '/api/user/resetpwd',
      data: sendData,
      complete: (e) => {
        console.log(e)
        const value = e.data
        if (value.code === 1) {
          console.log('修改密码成功!')
          this.setData({
            passShow: false
          })
        } else {
          wx.showModal({
            title: '错误',
            content: '修改密码失败!',
            showCancel: false
          })
        }
      }
    })
  },
  // ------------------------ 音乐播放方法 ----------------------------
  // 开始播放音乐
  startMusic: function () {
    console.log('开始播放音乐!')
    const BackgroundAudioManager = wx.getBackgroundAudioManager()
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
        const value = e.data
        if (value.code === 1) {
          App.player.isPlaying = true
          BackgroundAudioManager.src = App.globaData.serve + e.data.data.url
          BackgroundAudioManager.title = App.player.musicList[App.player.index].name
          BackgroundAudioManager.coverImgUrl = 'http://puge.oss-cn-beijing.aliyuncs.com/lebeier/music-logo.jpg'
          BackgroundAudioManager.play()
          this.setData({
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
  onShow: function (option) {
    // 请求个人信息
    wx.request({
      method: 'POST',
      url: App.globaData.serve + '/api/index/getuserinfo',
      data: {
        uid: App.globaData.user.id,
        verification: App.globaData.user.verification
      },
      complete: (e) => {
        const value = e.data
        if (value.code === 1) {
          e.data.data.overdueTime = JSON.parse(e.data.data.overdueTime)
          this.setData({
            peopleData: e.data.data
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
  }
})