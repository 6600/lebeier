function isError(msg, that) {
  that.setData({
    showTopTips: true,
    errorMsg: msg
  })
}

// 去前后空格
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}
//设置切换
 function xianshi (flagthat) {
  // console.log(1)
  
  that.setData({
    flag: false
  })
}
function yincang (flag) {

  that.setData({
    flag: true
  })
}

//导出

module.exports = {
  // formatTime: formatTime,
  // req: req,
  xianshi: xianshi,
  trim: trim,
  yincang: yincang,
  isError: isError,
  // clearError: clearError,
  // getReq: getReq
}