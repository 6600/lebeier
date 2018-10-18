// pages/info/info.js
var util = require('../../utils/util.js');
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textData: ''
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function (option) {
    console.log(option)
    wx.request({
      method: 'GET',
      url: App.globaData.serve + '/api/indexdemo/getSystem',
      complete: (e) => {
        // console.log(e)
        this.setData({
          textData: e.data.data[option.name]
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})