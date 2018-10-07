// pages/menu/menu.js
var util = require('../../utils/util.js');
const App = getApp()
Page({
  data: {
    //歌曲列表显示
    MenuConcealment:false,
    // 播放图标
    Select:false,
    //下拉图标
    Open:false,
    //播放按钮
    ButtonBisplay:false,
    //播放器按钮
    Playback: false ,
    Crumbs: '',
    style: App.globaData.style,
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
    //
    serve: App.globaData.serve,
    itemID: null,
    itemName: ''
  },
  JumpProduct: function() {
    console.log(111)
  },
  onLoad: function (option) {
    console.log(option)
    this.setData({
      itemID: option.id,
      itemName: option.name,
    })
    // 获取信息
    wx.request({
      method: 'POST',
      url: App.globaData.serve + '/api/index/getCategory',
      data: {
        id: option.id
      },
      complete: (e) => {
        console.log(e)
      }
    })
  },
  // 点击弹出播放
  Playdisplay: function () {
    var that = this;
    if (!that.data.Open) {
      that.setData({
        Open: true
      })
    }else {
      that.setData({
        Open: false
      })
    }
  },
  // 切换显示菜单
  bindflag: function () {
    this.setData({
      flag: !this.data.flag
    })
  },
  // 点击播放
  playbtn:function() {
    console.log('播放')
    var that = this;
    if (!that.data.Select) {
      that.setData({
        Select: true,
        Playback:true
      })
    }else {
      that.setData({
      
      })
    }

  },
  // 歌曲列表显示
  ClickUnfold: function () {
    var that = this;
    if (!that.data.MenuConcealment) {
      console.log(111),
      that.setData({
        MenuConcealment: true,
        Open: true
      });
    }else {
      that.setData({
        MenuConcealment: false,
        Open:false
      })
    }
  },
  // 播放按钮显示
  playshow: function () {
    var that = this;
    console.log(111)
    if (!that.data.ButtonBisplay) {
      console.log(111)
      that.setData({
        ButtonBisplay: true
      });
    } else {
      that.setData({
        ButtonBisplay: false
      });
    }
  },
  SetButton() {
    // var that = this;
    // that.setData({
    //   flag: true
    // })
    wx.navigateTo({
      url: '../System/System'
    })
  },
  toSettings () {
    console.log(111)
    wx.navigateTo({
      url: '../personal/personal'
    })
  },
  // ------------------------ 音乐播放方法 ----------------------------
  // 开始播放音乐
  startMusic: function () {
    App.player.isPlaying = true
    wx.playBackgroundAudio({
      dataUrl: App.player.musicList[App.player.index].url,
      title: App.player.musicList[App.player.index].music_name,
      //图片地址地址
      coverImgUrl: 'http://i.gtimg.cn/music/photo/mid_album_90/a/F/000QgFcm0v8WaF.jpg'
    })
    this.setData({
      musicName: App.player.musicList[App.player.index].music_name,
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
    console.log('切换歌曲循环模式', App.player.isListLoop)
    this.setData({
      isListLoop: App.player.isListLoop
    })
  },
  // 切换上一首/下一首
  lestMusic: function () {
    // 判断是否为列表循环
    if (App.player.isListLoop) {
      let newIndex = App.player.index - 1
      // 循环播放
      if (newIndex < 0) newIndex = App.player.musicList.length - 1
      App.player.index = newIndex
      // console.log(App.player.index)
      this.startMusic()
      this.setData({
        musicName: App.player.musicList[App.player.index].music_name
      })
    } else {
      // 单曲循环设置播放进度为0即可
      this.setData({
        sliderValue: 0,
        currentTime: 0
      })
      wx.seekBackgroundAudio({
        position: 0
      })
    }
  },
  nextMusic: function () {
    // 判断是否为列表循环
    if (App.player.isListLoop) {
      let newIndex = App.player.index + 1
      // 循环播放
      if (newIndex > App.player.musicList.length - 1) newIndex = 0
      App.player.index = newIndex
      console.log(App.player.index)
      this.startMusic()
    } else {
      // 单曲循环设置播放进度为0即可
      this.setData({
        sliderValue: 0,
        currentTime: 0
      })
      wx.seekBackgroundAudio({
        position: 0
      })
    }
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
    // --------------------------------- 音乐相关 ---------------------------------

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