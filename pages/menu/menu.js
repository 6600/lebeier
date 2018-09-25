// pages/menu/menu.js
var util = require('../../utils/util.js');
const app = getApp()
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
  //设置按钮
     flag: true,
//播放器按钮
    Playback:false ,
    Crumbs: '',
   
  },
  JumpProduct: function() {
    console.log(111)
    

  },
  onLoad: function (option) {
    console.log(option.title)
    this.data.Crumbs = option.title;
    var that = this;
    that.setData({
      Crumbs: option.title
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
  //点击播放器播放按钮
  PlayButton: function() {
     var that = this;
    if (that.data.Select) {
      that.setData({
        Select: false,
        Playback: false
      })
      console.log('暂停播放')
    }else {
      that.setData({
        Select: true,
        Playback: true,
      })
      console.log('播放')
    }
  },

  TheNext() {
    console.log('下首')
  },

  TheLastSong () {
    console.log('上首')
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
  // 设置按钮


  bindflag: function () {
    // console.log(1)
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
  }
  

    // data: {
  //   flag:true
  // },
  // onShow:function(){
  //   var tempalte=this;
  //   tempalte.setData({
  //     flag: true
  //   })
  // },
  // // haha: function() {
  // //   wx.navigateTo({
  // //     url: '../index/index'
  // //   })
  // // },
  // hahaha: function () {
  //   console.log(2);
  // },
  // ha: function () {
  //   console.log(3);
  // },
  // hahahaha: function () {
  //   console.log(4);
  // },
  // bindflag:function(){
  //   console.log(1)
  //   var that=this;
  //   that.setData({
  //     flag:false
  //   })
  // },
  // bindflag2: function () {
  //   var that = this;
  //   that.setData({
  //     flag: true
  //   })
  // },
  
})