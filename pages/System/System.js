// pages/System/System.js
const App = getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    menuImg: App.globaData.style.menuImg,
    information: false
  },
  aboutshow() {
    var that = this;
    that.setData({
      information: true
    })
  },
  confirm () {
    var that = this;
    that.setData({
      information: false
    })
  },
  // 切换显示菜单
  bindflag: function () {
    console.log(this.data.flag)
    this.setData({
      flag: !this.data.flag
    })
  }
})