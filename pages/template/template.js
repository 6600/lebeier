// pages/template/template.js
Page({
  data: {
    flag: true,
    isPlaying: true,
    dsdsds: 'sd'
  },
 
  bindflag: function () {
    console.log(1)
    var that = this;
    that.setData({
      flag: false
    })
  },
  bindflag2: function () {
    console.log('sd')
    var that = this;
    that.setData({
      flag: true
    })
  }
})
