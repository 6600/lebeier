//user.js
//获取应用实例
var util = require('../../utils/util.js');
const App = getApp()
Page({
  data: {
    loading: true,
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
  cancel: function () {
    this.setData({
      showBox: 'button'
    })
  },
  homeshow: function () {
    var that = this;
    that.setData({
      showBox: 'apply'
    })
  },
  // 用户首次进入提醒修改密码
  changePassword: function (e) {
    let sendData = e.detail.value
    sendData.id = App.globaData.user.id
    sendData.account = App.globaData.user.username
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
    wx.request({
      method: 'POST',
      url: App.globaData.serve + '/api/user/resetpwd',
      data: sendData,
      complete: (e) => {
        console.log(e)
        const value = e.data
        if (value.code === 1) {
          console.log('修改密码成功!')
          // 增加账户登录次数
          wx.request({
            method: 'POST',
            url: App.globaData.serve + '/api/user/loginnum',
            data: {
              id: App.globaData.user.id
            },
          })
          wx.redirectTo({ url: '/pages/Music/Music' })
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
  // 申请合作按钮点击
  apply: function (e) {
    let sendData = e.detail.value
    if (sendData.cooperation === '' || sendData.contacts === '' || sendData.phone === '') {
      wx.showModal({
        title: '信息不完整',
        content: '带星号项目为必填项目！',
        showCancel: false
      })
      return
    }
    console.log(sendData)
    wx.request({
      method: 'POST',
      url: App.globaData.serve + '/api/index/cooperation',
      data: sendData,
      complete: (e) => {
        if (e.data.code === 1) {
          console.log('申请成功!')
          wx.showModal({
            title: '申请成功',
            content: e.data.msg,
            showCancel: false
          })
          this.setData({
            showBox: 'button'
          })
        }
      }
    })
  },
  //确定登录
  SigninBtn:function (e) {
    let sendData = e.detail.value
    if (sendData.account === '' || sendData.password === '') {
      wx.showModal({
        title: '输入错误',
        content: '帐号或者密码没有正确填写！',
        showCancel: false
      })
      return
    }
    sendData.keeplogin = '1'
    console.log('确定登陆')
    wx.request({
      method: 'POST',
      url: App.globaData.serve + '/api/user/login',
      data: sendData,
      complete: (e) => {
        const value = e.data
        console.log('登录结果:', value)
        if (value.code === 1) {
          const userinfo = value.data.userinfo
          // 保存用户信息
          App.globaData.user.id = userinfo.user_id
          App.globaData.user.username = userinfo.username
          App.globaData.user.nickname = userinfo.nickname
          App.globaData.user.mobile = userinfo.mobile
          App.globaData.user.token = userinfo.token
          App.globaData.user.expiretime = new Date(userinfo.expiretime * 1000).toLocaleString()
          console.log('登陆成功')
          // 判断是否需要修改密码
          // console.log(userinfo.login_num)
          if (userinfo.login_num !== undefined && userinfo.login_num === 0) {
            this.setData({
              showBox: 'changePassword'
            })
            return
          } else {
            // 进入主页
            wx.redirectTo({ url: '/pages/Music/Music' })
          }
        } else {
          wx.showModal({
            title: '登陆失败',
            content: value.msg,
            showCancel: false
          })
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
  },
  onLoad: function (option) {
    // 获取配置信息
    wx.request({
      method: 'GET',
      url: App.globaData.serve + '/api/index/getconfig',
      complete: (e) => {
        App.globaData.style = e.data.data
        this.setData({
          loading: false
        })
      }
    })
  }
})

