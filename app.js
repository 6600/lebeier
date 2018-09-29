App({
  globaData: {
    serve: 'https://puge.oss-cn-beijing.aliyuncs.com/lebeier',
    user: {
      token: ''
    },
    // 自动播放下一首
    autoPlayNext: true,
    style: {
      swiperImg: [
        'http://puge.oss-cn-beijing.aliyuncs.com/lebeier/_20180911132507.jpg',
        'http://puge.oss-cn-beijing.aliyuncs.com/lebeier/_20180911132513.png'
      ],
      menuImg: 'http://puge.oss-cn-beijing.aliyuncs.com/lebeier/hengdian.png'
    }
  },
  player: {
    index: 0,
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
