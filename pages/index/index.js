//index.js
//获取应用实例
var util = require('../../utils/util.js');
const app = getApp()
Page({
  data: {
    showBox: 'button',
    showView: true,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1300,
    bg: '#C79C77',
    Hei: "" //这是swiper要动态设置的高度属性
  },
  imgH: function (e) {
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
    var winHei = wx.getSystemInfoSync().windowHeight; //获取当前屏幕的宽度 
    var imgh = e.detail.height;　　　　　　　　　　　　　　　　//图片高度
    var imgw = e.detail.width;
    var swiperH = winWid * imgh / imgw + "px"　　　　　　　　　　//等比设置swiper的高度。 即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度 ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
    var swiperH1 = winHei + "px"
    this.setData({
      Hei: swiperH1　　　　　　　　//设置高度
    })
    console.log(swiperH)
    console.log(swiperH)
  },
  cancel: function() {
    console.log('取消')
    this.setData({
      showBox: 'button'
    })
  },
  showButton: function () {
    console.log('点击登陆按钮')
    this.setData({
      showBox: 'login'
    })
  },
  homeshow: function () {
    var that = this;
    that.setData({
      showBox: 'apply'
    })
  },
  // 用户首次进入提醒修改密码
  changePassword: function () {
    wx.redirectTo({ url: '/pages/Music/Music'})
  },
  // 申请合作按钮点击
  apply: function () {
    console.log('点击申请合作')
    this.setData({
      showBox: 'applyTips'
    })
  },
  //确定登录
  SigninBtn:function () {
    console.log('确定登陆')
    this.setData({
      showBox: 'changePassword'
    })
  },
  formSubmit: function (e) {
    //获取账号密
    var account = e.detail.value.account;
    var password = e.detail.value.password;
    // 判断账号是否为空
    wx.navigateTo({
      url: '../Music/Music?title=音乐'
    })
  },
  formReset: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  }
})

