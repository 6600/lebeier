// pages/template/template.js
Page({
  data: {
    flag: true
  },
 
  bindflag: function () {
    console.log(1)
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
})
