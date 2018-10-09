App({
  globaData: {
    serve: 'https://515.run',
    user: {
      id: '',
      username: '',
      nickname: '',
      mobile: '',
      token: '',
      // 过期时间
      expiretime: ''
    },
    // 自动播放下一首
    autoPlayNext: true,
    style: {
      // 自动旋转
      autoAnimate: false,
      swiperImg: [
        'http://puge.oss-cn-beijing.aliyuncs.com/lebeier/_20180911132507.jpg',
        'http://puge.oss-cn-beijing.aliyuncs.com/lebeier/_20180911132513.png'
      ],
      menuImg: 'http://puge.oss-cn-beijing.aliyuncs.com/lebeier/hengdian.png',
      // 单曲循环按钮图片
      singleLoopImg: 'http://puge.oss-cn-beijing.aliyuncs.com/lebeier/%E5%8D%95%E6%9B%B2%E5%BE%AA%E7%8E%AF.png',
      // 列表循环按钮图片
      listLoopImg: 'http://puge.oss-cn-beijing.aliyuncs.com/lebeier/%E5%BE%AA%E7%8E%AF%E6%92%AD%E6%94%BE.png',
      // 开始播放按钮
      startPlay: '/image/index/kaishi.png',
      // 下一首
      next: '/image/index/xia.png',
      // 上一首
      last: '/image/index/shang.png',
      // 暂停按钮
      pause: '/image/index/ting.png',
      musicBarBackground: '#fdc73e',
      mainBackground: 'url(http://puge.oss-cn-beijing.aliyuncs.com/lebeier/_20180911132507.jpg)'
    }
  },
  player: {
    index: 0,
    // 列表循环
    isListLoop: true,
    isPlaying: false,
    isDraging: false,
    sliderValue: 0,
    totalProcess: 0,
    // 音乐播放列表
    musicList: [
      {
        "music_id": 1,
        "music_name": "薛之谦",
        "music_time": "1212121",
        "music_rights": 1,
        "music_list": "2mw1pmw1pmk2lm12wm1p2m1msp12msks1ls",
        "size": "1222",
        "url": "http://www.170mv.com/kw/other.web.np01.sycdn.kuwo.cn/resource/n2/1/32/765664006.mp3",
        "create_time": "0000-00-00 00:00:00",
        "play_num": 1
      },
      {
        "music_id": 2,
        "music_name": "一百万个可能",
        "music_time": "1212121",
        "music_rights": 1,
        "music_list": "2mw1pmw1pmk2lm12wm1p2m1msp12msks1ls",
        "size": "1222",
        "url": "http://puge.oss-cn-beijing.aliyuncs.com/mp3/10620.mp3",
        "create_time": "0000-00-00 00:00:00",
        "play_num": 1
      }
    ]
  }
})
