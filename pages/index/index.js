//index.js
//获取应用实例
var util = require('../../utils/util.js');
const App = getApp()
Page({
  data: {
    showBox: 'button',
    showView: true,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1300,
    bg: '#C79C77',
    swiperImg: App.globaData.style.swiperImg,
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
    const value = {
      "state": 1,
      "data": {
        "token": "sdsdsdsdsd"
      }
    }
    if (value.state === 1) {
      console.log('修改密码成功!')
      App.globaData.user = value.data.token
      wx.redirectTo({ url: '/pages/Music/Music' })
    }
  },
  // 申请合作按钮点击
  apply: function (e) {
    let sendData = e.detail.value
    console.log(sendData)
    wx.request({
      method: 'POST',
      url: 'https://515.run/api/index/cooperation',
      data: sendData,
      complete: (e) => {
        console.log(e)
      }
    })
    const value = {
      "state": 1
    }
    if (value.state === 1) {
      console.log('申请成功!')
      this.setData({
        showBox: 'applyTips'
      })
    }
  },
  //确定登录
  SigninBtn:function (e) {
    // 获取用户位置
    wx.getLocation({
      complete: (location) => {
        console.log(location)
        let sendData = e.detail.value
        sendData['__token__'] = 'f6f0d768bdedcce834014cf784f30e7f'
        sendData.keeplogin = '1'
        console.log('确定登陆')
        wx.request({
          method: 'POST',
          url: 'https://515.run/api/user/login',
          data: sendData,
          complete: (e) => {
            console.log(e)
          }
        })
        // 模拟数据
        const value = {
          "state": 1,
          "data": {
            "id": "id",
            "username": "XXXXXXXXXX",
            "password": "XXXXXXXXXX",
            "login_num": 0,
            "address": "DHAIUDHJXA129EU190UE12NJKDNK12NKJXNA",
            "token": "DHAIUDHJXA129EU190UE12NJKDNK12NKJXNA",
            "rights": "sdsd",
            "user_end_time": "xxxxx"
          }
        }
        if (value.state === 1) {
          console.log('登陆成功')
          // 判断是否需要修改密码
          if (value.data.login_num < 1) {
            this.setData({
              showBox: 'changePassword'
            })
          } else {
            // 进入主页
            wx.redirectTo({ url: '/pages/Music/Music' })
          }
        } else {
          console.log('登陆失败!')
        }
      }
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

