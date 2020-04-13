$(function () {

  //初始化最近播放，收藏数据结构
  function initSongConstruct() {
    var songItems = ['recentSong', 'likeSong'];

    for (var i = 0; i < songItems.length; i++) {
      var d = localStorage.getItem(songItems[i]);

      //如果不存在数据结构
      if (!d) {
        localStorage.setItem(songItems[i], JSON.stringify([]));
      }
    }

  }

  initSongConstruct();


  //获取进度条的总长度
  var progressWidth = $('.progress').width();
  // console.log('progressWidth ==> ', progressWidth);

  //获取滑块的宽度
  var maskWidth = $('.mask').width();
  // console.log('maskWidth ==> ', maskWidth);

  //mask最小left
  var minLeft = 0;

  //mask最大left
  var maxLeft = progressWidth - maskWidth;

  //获取音频标签
  var audio = $('#audio')[0];

  //是否播放完成
  // var isEnd = false;

  //暂停播放
  $('#play-pause').on('click', function () {

    //获取音频链接
    var src = $(audio).attr('src');

    if (!src) {
      console.log('音频没有就绪');
      return;
    }

    //获取音频播放状态 data-play: 0暂停，1播放

    var status = $(this).data('play');

    if (status == 0) {


      // if (!isEnd) {
      //   //需要获取当前进度条的百分比,设置音频的播放进度

      //   //获取滑块的left
      //   var left = $('.mask').position().left;

      //   var percent = left / maxLeft;

      //   //获取音频总时间
      //   var durationTime = audio.duration;

      //   audio.currentTime = percent * durationTime;
      // }

      //如果是暂停，则需要播放
      audio.play();
      $(this).data('play', 1);


      $('.start').css({
        'display': 'none'
      });
      $('.stop').css({
        'display': 'block'
      });



    } else {
      //如果是播放，则需要暂停
      audio.pause();
      $(this).data('play', 0);

      $('.stop').css({
        'display': 'none'
      });
      $('.start').css({
        'display': 'block'
      });

    }

  })



  //当音频播放结束时
  audio.onended = function () {
    //将data-play修改为0
    $('.play-pause').data('play', 0);
    // isEnd = true;

    //下一曲
    playNext('next');
  }


  //设置 顺序类型 播放下一首歌曲
  function playNext(type, isAuto) {

    //跟据模式自动播放下一首
    isFirstPlay = true;
    //  获取所有歌曲列表
    var $defaultList = $('.default-list-item');

    //获取当前歌曲
    var $nowItem = $('.default-list-item.active');


    //获取播放模式
    var mode = $('.broadcast-mode').attr('name');


    if (mode == 0 || (mode == 2 && isAuto === false)) {
      //列表循环
      //获取激活的歌曲下标

      var nowIndex = $nowItem.index();
      console.log(nowIndex);
      //下一个歌曲列表或者上一个
      var $next = null;

      if (type == 'next') {

        if (nowIndex == $defaultList.length - 1) {

          $next = $defaultList.eq(0);

        } else {
          $next = $defaultList.eq(nowIndex + 1)
        }

      } else {

        if (nowIndex == 0) {
          $next = $defaultList.eq($defaultList.length - 1);
        } else {
          $next = $defaultList.eq(nowIndex - 1);
        }

      }


      //跳转下一首
      $nowItem.removeClass('active');
      $next.addClass('active');

      // //获取正在播放的歌曲
      // var now = $('#play-pause').attr('name');

      // //设置id为now的歌曲
      // var $item = $('.default-list-item[id=' + now + ']'); 

      //关联id
      var id = $next.attr('id');

      $('#play-pause').attr('name', id);

      var audioUrl = $next.data('url');

      $(audio).attr('src', audioUrl);

    } else if (mode == 1) {

      //随机播放
      var randomIndex = Math.floor(Math.random() * $defaultList.length);

      var $ramdomItem = $defaultList.eq(randomIndex);

      $nowItem.removeClass('active');

      $ramdomItem.addClass('active');

      //关联id
      var id = $ramdomItem.attr('id');

      $('#play-pause').attr('name', id);


      var audioUrl = $ramdomItem.data('url');

      $(audio).attr('src', audioUrl);

    } else {
      //单曲循环
      // console.log(123);

      audio.load();
    }
  }

  //下一首
  $('.next').on('click', function () {
    playNext('next', false);
  })

  //绑定上一首
  $('.prev').on('click', function () {
    playNext('prev', false);
  })
  //

  //是否是第一次播放
  var isFirstPlay = true;

  //音频总时间
  var duration = 0;


  // 时间格式化
  function formatTime(sec,type) {
    //sec: 秒数
    //不足10，需要补零
    if(type == 1){
      var minute = Math.floor(sec / 1000 / 60);
    var second = Math.floor(sec /1000 % 60);

    }
    if(type == 2){
      var minute = Math.floor(sec / 60);
      var second = Math.floor(sec % 60);

    }

    minute = minute >= 10 ? minute : '0' + minute;


    second = second >= 10 ? second : '0' + second;

    return minute + ':' + second;
  }

  //获取歌词
  // https://music.kele8.cn/lyric?id=33894312
  function getSongWord(url) {
    $.ajax({
      type: 'get',
      url: url,
      success: function (data) {
        // console.log('data ==> ', data.lrc.lyric);
        var lrcData = data.lrc.lyric.split('\n[');
        // console.log(lrcData);
        for (var i = 0; i < lrcData.length; i++) {

          var currentLrc = lrcData[i].split(']');
          // console.log(currentLrc);

          if (i == 0) {
            currentLrc[0] = currentLrc[0].replace('[', '');
          }

          if (i == lrcData.length - 1) {
            currentLrc[1] = currentLrc[1].trim();
          }


          if (currentLrc[1] == '') {
            continue;
          }

          //将时间转换为秒
          var times = currentLrc[0].split(':');
          var minute = parseFloat(times[0]);
          var second = parseFloat(times[1]);

          //创建li
          var $li = $('<li class="' + (i == 4 ? 'opacity' : '') + '"data-time="' + Number((minute * 60 + second).toFixed(2)) + '"><span>' + currentLrc[1] + '</span></li>');

          $('.song-word-list').append($li);

        }
      },
      error: function (err) {
        console.log('找不到歌词');
      },
    })
  }

  //当音频播放时
  audio.onplay = function () {

    if (isFirstPlay) {
      //获取音频总时间
      duration = this.duration;
      console.log('duration ==> ', duration);
      isFirstPlay = false;

      var t = formatTime(duration,2);
      
      $('#du').text(t);

      //获取最近播放歌曲
      var recentSong = JSON.parse(localStorage.getItem('recentSong'));

      //获取正在播放的歌曲id
      var songId = $('#play-pause').attr('name');

      //判断当前歌曲是否被收藏
      var isHas = false;
      var likeSong = JSON.parse(localStorage.getItem('likeSong'));

      $.each(likeSong, function () {
        if (this.id == songId) {
          isHas = true;
          $('.like>img').attr('src', baseUrl + 'like_active.png');
          return false;
        }
      })

      if (!isHas) {
        $('.like>img').attr('src', baseUrl + 'like1.png');
      }

      $('.song-word-list').empty().css({
        top: 200
      })

      moveIndex = 0;

      //获取歌词
      var songLrcUrl = $('.default-list-item.active').eq(0).data('lrc');
      // console.log('songLrcUrl ==> ', songLrcUrl);
      getSongWord(songLrcUrl);

      for (var i = 0; i < recentSong.length; i++) {

        if (recentSong[i].id == songId) {
          //如果存在不添加到最近播放
          return;
        }
      }

      //存储最近播放数据
      $.each(defaultSongs, function () {
        if (this.id == songId) {
          recentSong.push(this);
          localStorage.setItem('recentSong', JSON.stringify(recentSong));
        }
      })


    }

    //执行滑块的散光
    $('.mask').addClass('play');

    //尚未播放完成
    // isEnd = false;

  }

  //当音频停止时
  audio.onpause = function () {
    //停止滑块的散光
    $('.mask').removeClass('play');
  }

  //当音频播放时间发生改变时

  var moveIndex = 0;
  audio.ontimeupdate = function () {

    //鼠标是否按下，如果是，直接拦截
    if (isDown) {
      return;
    }

    //获取音频当前播放时间
    var currentTime = this.currentTime;

    var ct = formatTime(currentTime,2);

    $('#cu').text(ct);

    //获取进度百分比
    var percent = currentTime / duration;

    //移动滑块
    $('.mask').css({
      left: maxLeft * percent + 'px'
    })

    //改变激活层宽度
    $('.progress-active').css({
      width: progressWidth * percent + 'px'
    })

    //移动歌词
    $lis = $('.song-word-list>li');

    for (var i = moveIndex; i < $lis.length; i++) {
      //获取当前li的data-time
      var currentLiTime = $($lis[i]).data('time');

      if (currentLiTime > currentTime) {
        console.log('还没有开始唱');
        break;
      }

      //获取下一个
      var nextLiTime = $($lis[i]).next().data('time');
      // console.log('nextLiTime ==> ', nextLiTime);

      nextLiTime = nextLiTime === undefined ? Number.MAX_VALUE : nextLiTime;


      if (currentLiTime <= currentTime && currentTime < nextLiTime) {


        //获取当前歌词的top
        var $songWordlist = $('.song-word-list');
        var top = $songWordlist.position().top;
        $songWordlist.animate({
          top: top - 40
        }, 150)


        //获取当前li宽度，span的宽度
        var liWidth = $($lis[i]).width();
        var spanWidth = $($lis[i]).find('span').width();
        console.log('liWidth ==> ', liWidth);
        console.log('spanWidth ==> ', spanWidth);

        if (spanWidth > liWidth) {
          $($lis[i]).find('span').animate({
            left: -(spanWidth - liWidth) + 'px'
          }, 100)
        }

        //获取上一个节点
        var $parents = $($lis[i]).parents('.song-word-list');
        var $now = $parents.find('.now');
        var prevLiWidth = $now.removeClass('now').width();

        var prevSpanWidth = $now.find('span').width();
        if (prevSpanWidth > prevLiWidth) {
          $now.find('span').find('span').css({
            left: -(prevSpanWidth - prevLiWidth) + 'px'
          })
        }

        $($lis[i]).addClass('now').siblings().removeClass('opacity');;


        //设置上下行的透明
        if (i - 4 >= 0) {
          //上一行
          $lis.eq(i - 4).addClass('opacity');

        }

        if (i + 5 <= $lis.length - 1) {
          //下一行
          $lis.eq(i + 5).addClass('opacity');
        }

        moveIndex = i + 1;

        break;
      }

    }

  }

  //鼠标松开时
  var isLeave = false;

  //鼠标按钮下时
  var isDown = false;

  // 改变进度条
  function changeProgress(e) {
    //获取相对目标元素的鼠标坐标
    var x = e.offsetX;
    console.log('x ==> ', x);

    //让鼠标在滑块中间位置
    var left = x - maskWidth / 2;

    //控制left的范围
    left = left > maxLeft ? maxLeft : left < minLeft ? minLeft : left;

    //移动mask
    $('.mask').css({
      left: left + 'px'
    })

    //设置激活进度条的宽度
    $('.progress-active').css({
      width: x + 'px'
    })

    var audioTime = left / maxLeft * duration;


    if (isLeave) {
      //修改音频的播放进度
      audio.currentTime = audioTime;
      isLeave = false;
    }

    if (!isDown) {
      console.log('动态设置歌词的位置');

      var $lis = $('.song-word-list>li');


      $lis.each(function (i) {

        //获取当前li的data-time
        var currentLiTime = $(this).data('time');
        console.log('currentLiTime ==> ', currentLiTime);

        console.log('audioTime ==> ', audioTime);

        //如果是一个且第一个的时间大于当前音频播放时间，则返回第一个li
        if (i == 0 && currentLiTime > audioTime) {
          moveIndex = 0;
          $('.song-word-list').css({
            top: 200 + 'px'
          })
          $(this).siblings().removeClass('now');
          return false;
        }

        //获取下一个li的data-time
        var nextLiTime = $(this).next().data('time');
        console.log('nextLiTime ==> ', nextLiTime);

        if (currentLiTime <= audioTime && nextLiTime > audioTime) {
          moveIndex = i;
          console.log('moveIndex ==> ', moveIndex);
          $('.song-word-list').css({
            top: 200 - i * 40 + 'px'
          })
          $(this).addClass('now').siblings().removeClass('now');
          return false;
        }

      })

    }


  }


  //绑定事件层
  //鼠标按下
  $('.layer').on('mousedown', function (e) {
    isDown = true;
    changeProgress(e);

    //鼠标移动
    $(this).on('mousemove', function (evt) {
      //阻止浏览器默认行为
      evt.preventDefault();

      changeProgress(evt);

    })

  })

  //鼠标松开
  $('.layer').on('mouseup', function (e) {
    //解绑mousemove事件
    $(this).off('mousemove');

    isLeave = true;
    isDown = false;
    changeProgress(e);
  })

  //鼠标离开时
  $('.layer').on('mouseleave', function (e) {
    if (isDown) {
      //解绑mousemove事件
      $(this).off('mousemove');

      isLeave = true;
      isDown = false;
      changeProgress(e);
    }

  })

  //当前音频可以播放时
  audio.oncanplay = function () {
    //播放
    this.play();

    //修改暂停播放
    $('#play-pause').data('play', 1);
    $('.start').css({
      'display': 'none'
    });
    $('.stop').css({
      'display': 'block'
    });


    //记录激活的列表的id
    var id = $('.default-list-item.active:not(:hidden)').attr('id');
    $('#play-pause').attr('name', id);
    // console.log($('#play-pause')[0]);

    //设置歌手信息
    var xinxi = $('.default-list-item.active:not(:hidden)').find('.singer-name').text();
    // console.log(xinxi)

    $('.a2 .singer-name').text(xinxi);

    //首次播放
    // isFirstPlay = true;
  }

  // 保存音乐歌单
  var defaultSongs = null;

  //热门歌曲列表加载歌曲数量
  var countDatas = {};

  countDatas.defaultCount = {
    start: 0,
    count: 20
  };

  //最近播放歌曲列表加载歌曲数量
  countDatas.recentCount = {
    start: 0,
    count: 15
  };

  //我的收藏歌曲列表加载歌曲数量
  countDatas.likeCount = {
    start: 0,
    count: 20
  };



  //创建歌曲列表
  function createList(data, countData) {
    //每次截取20条数据
    var songData = null;
    if (countData) {
      songData = data.slice(countData.start, countData.count + countData.start);
      countData.start += countData.count;
    } else {
      songData = data;
    }

    // console.log('songData ==> ', songData);

    var dataIndex = $('aside>nav .active').data('index');
    // console.log(dataIndex)

    //获取收藏歌曲数据
    var likeSong = JSON.parse(localStorage.getItem('likeSong'));

    //生成列表数据
    $.each(songData, function () {
      var self = this;
      //当前歌曲是否被收藏
      var isHas = false;

      //获取当前歌曲id到likeSong查询收藏歌曲
      $.each(likeSong, function () {

        //如果id匹配，则表明该歌曲已经被收藏
        if (this.id == self.id) {
          isHas = true;
          return false;
        }
      })

      // https://music.163.com/song/media/outer/url?id=id.mp3
      // http://music.kele8.cn/lyric?id=33894312
      // console.log(this.bMusic.playTime)
      $item = $(`<div id="${this.id}" class="default-list-item" data-url="https://music.163.com/song/media/outer/url?id=${this.id}.mp3" data-lrc="https://music.kele8.cn/lyric?id=${this.id}" data-songid="${this.id}">
        <div class="song-info">
            <div class="singer-name">${this.artists[0].name}-${this.name}</div>
            <img class="mylike ${dataIndex == 'likeSong' ? 'not' : ''}" data-like="${isHas ? 1 : 0}" src="./images/${isHas ? 'like_active' : 'like'}.png" >  
            
            <img class="delete ${dataIndex == 'default-list' ? 'not' : ''}" src="./images/delete.png" > 

            <div class="song-time">${formatTime(this.bMusic.playTime,1)}</div>

        </div>
    </div>`);

      $('.' + dataIndex).append($item);
      // console.log( $('.' + dataIndex));
    })

    //将本地歌曲缓存
    localStorage.setItem('defaultSong', JSON.stringify(defaultSongs));
  }


  //初始化默认列表
  function initDefaultList() {


    //判断是否存在本地歌曲缓存
    var defaultSong = localStorage.getItem('defaultSong');
    if (defaultSong) {
      defaultSongs = JSON.parse(defaultSong);
      createList(defaultSongs, countDatas.defaultCount);
      console.log('从缓存获取');
      return;
    }

    //发起ajax请求
    $.ajax({
      type: 'GET',
      url: 'https://music.kele8.cn/top/song?type=7',
      //请求参数
      // data: {
      //   id: 141998290,
      //   format: 1
      // },
      //请求成功后执行回调函数
      success: function (data) {
        // console.log('data ==>', data);

        //保存音乐歌单 
        defaultSongs = data.data.concat();

        createList(defaultSongs, countDatas.defaultCount);
      }
    })
  }
  initDefaultList();

  //滚动加载本地歌曲
  var timers = [];
  var defaultlistHeight = $('.default-list').height();

  $('.default-list').on('scroll',function(){
    var self = this;
    var timer = setTimeout(function(){

      for(var i = 0; i < timers.length; i++){
        clearTimeout(timers[i])
      }
      timers = [];

      //当前滚动的距离
      var scrollTop = $(self).scrollTop();
      // console.log(scrollTop);

      var $alldiv = $(self).find('.default-list-item');

      var alldivHeight = $alldiv.eq(0).outerHeight() * $alldiv.length;
      console.log(scrollTop);
      if(defaultlistHeight + scrollTop  >= alldivHeight - 1){
        createList(defaultSongs, countDatas.defaultCount);
      }

    },500)

    timers.push(timer);
    
  })


  //绑定歌曲列表事件
  $('aside').on('click', '.default-list-item', function () {
    //判断当前是否激活
    if ($(this).hasClass('active')) {

      var $playPause = $('#play-pause');

      var status = $playPause.data('play');

      // console.log($playPause.data('play'));

      if (status == 0) {
        //如果是暂停，则需要播放
        audio.play();
        $playPause.data('play', 1);
        $('.start').css({
          'display': 'none'
        });
        $('.stop').css({
          'display': 'block'
        });
      } else {
        //如果是播放，则需要暂停
        audio.pause();
        $playPause.data('play', 0);

        $('.stop').css({
          'display': 'none'
        });
        $('.start').css({
          'display': 'block'
        });
      }
      return;
    }

    //激活当前
    $(this).addClass('active').siblings().removeClass('active');

    //移除其他隐藏歌曲列表的歌曲激活状态
    $('.default-list-item.active:hidden').removeClass('active');
    //获取歌曲id
    var songId = $(this).attr('id');

    $('[data-songid="' + songId + '"]:not(.active)').addClass('active');

    var audioUrl = $(this).data('url');

    $(audio).attr('src', audioUrl);

    //首次播放
    isFirstPlay = true;
  })

  //切换模式
  var modes = [{
      name: 0,
      title: '列表循环',
      url: 'liebiao.png'
    },
    {
      name: 1,
      title: '随机播放',
      url: 'random.png'
    },
    {
      name: 2,
      title: '单曲循环',
      url: 'danqu_32.png'
    }
  ];

  var baseUrl = './images/';

  $('.broadcast-mode').on('click', function () {

    var name = $(this).attr('name');

    if (name == modes.length - 1) {

      name = 0;
    } else {
      name++;
    }

    //获取下一个播放模式
    var nextMode = modes[name];
    $(this).attr('name', nextMode.name).attr('title', nextMode.title).find('img').attr('src', baseUrl + nextMode.url);
  })



  //切换列表
  $('aside>nav>span').on('click', function () {
    if ($(this).hasClass('active')) {
      return;
    }

    $(this).addClass('active').siblings().removeClass('active');


    var dataIndex = $(this).data('index');
    // console.log('dataIndex ==> ', dataIndex);


    //根据dataIndex获取数据
    var currentSongData = JSON.parse(localStorage.getItem(dataIndex));
    // console.log('currentSongData ==> ', currentSongData);

    //获取截取歌曲数量标识
    var currentSongCount = $(this).data('count');
    // console.log(currentSongCount);

    //获取当前歌曲列表歌曲数量
    var counts = $('.' + dataIndex + '>.default-list-item').length;
    // console.log('counts ==> ', counts);

    //排除创建本地歌曲
    if (currentSongCount != 'defaultCount') {

      createList(currentSongData.slice(counts));

      var songId = $('.default-list-item.active').eq(0).attr('id');

      // console.log('songId ==> ', songId);

      $('[data-songid="' + songId + '"]:not(.active)').addClass('active');

    }


    //显示影藏歌曲列表
    $('.' + dataIndex).addClass('show').siblings().removeClass('show');

  })


  //收藏歌曲取消
  $('aside').on('click', '.mylike', function (e) {

    e.stopPropagation();
    // console.log(123)

    //0: 没有收藏，1：已经收藏
    var dataLike = $(this).data('like');

    //获取歌曲id
    var songId = $(this).parents('.default-list-item').attr('id');

    //获取收藏歌曲
    var likeSong = JSON.parse(localStorage.getItem('likeSong'));

    // 获取本地歌曲,最近播放,收藏歌曲
    var $songLikes = $('.default-list-item[data-songid="' + songId + '"]');

    //获取当前播放歌曲的id
    var playingId = $('#play-pause').attr('name');


    if (dataLike == 0) {

      $songLikes.each(function () {

        $(this).find('.mylike').data('like', 1).attr('src', baseUrl + 'like_active.png');

      })

      $.each(defaultSongs, function () {
        if (this.id == songId) {
          // console.log(this);
          likeSong.push(this);

          localStorage.setItem('likeSong', JSON.stringify(likeSong));

          //找到后立刻终止循环
          return false;
        }
      })

      if (playingId == songId) {
        $('.like>img').attr('src', baseUrl + 'like_active.png');
      }
    } else {
      //取消收藏
      $songLikes.each(function () {

        $(this).find('.mylike').data('like', 0).attr('src', baseUrl + 'like.png');

      })

      //根据歌曲id删除歌曲
      for (var i = 0; i < likeSong.length; i++) {
        if (songId == likeSong[i].id) {
          likeSong.splice(i, 1);

          localStorage.setItem('likeSong', JSON.stringify(likeSong));

          // 删除页面收藏
          $('.likeSong>[data-songid="' + songId + '"]').remove();

          break;
        }
      }

      if (playingId == songId) {
        $('.like>img').attr('src', baseUrl + 'like1.png');
      }
    }
  })

  //删除最近播放歌曲
  $('.recentSong').on('click', '.delete', function (e) {
    e.stopPropagation();

    //删除页面中歌曲
    var deleteItem = $(this).parents('.default-list-item');

    var songId = deleteItem.attr('id');

    deleteItem.remove();

    //从数据中删除
    var recentSong = JSON.parse(localStorage.getItem('recentSong'));

    $.each(recentSong, function (i) {
      if (this.id == songId) {
        recentSong.splice(i, 1);
        localStorage.setItem('recentSong', JSON.stringify(recentSong));
        return false;
      }
    })
  })


  //我的歌单
  $('.likeSong').on('click', '.delete', function (e) {
    e.stopPropagation();

    //删除页面中我的歌单
    var deleteItem = $(this).parents('.default-list-item');

    var songId = deleteItem.attr('id');

    deleteItem.remove();

    //数据中删除
    var likeSong = JSON.parse(localStorage.getItem('likeSong'));

    $.each(likeSong, function (i) {
      if (this.id == songId) {
        likeSong.splice(i, 1);
        localStorage.setItem('likeSong', JSON.stringify(likeSong));
        return false;
      }
    })

    //移除最近播放和本地列表的收藏显示
    $('.default-list-item[data-songId="' + songId + '"]').find('.mylike').data('like', 0).attr('src', baseUrl + 'like.png');


    $('.like>img').attr('src', baseUrl + 'like.png');
  })

  //底部的收藏
  $('.like>img').on('click', function () {
    var playingId = $('#play-pause').attr('name');

    if (!playingId) {
      return;
    }

    //获取我的歌单存储的数据
    var likeSong = JSON.parse(localStorage.getItem('likeSong'));

    for (var i = 0; i < likeSong.length; i++) {

      if (playingId == likeSong[i].id) {
        $('.likeSong>.default-list-item.active').remove();
        likeSong.splice(i, 1)
        localStorage.setItem('likeSong', JSON.stringify(likeSong));
        $('.like>img').attr('src', baseUrl + 'like1.png');

        //移除本地,最近播放中的收藏标识
        $('.default-list-item.active').find('.mylike').data('like', 0).attr('src', baseUrl + 'like.png');
        return false;
      }
    }

    //收藏
    $(this).attr('src', baseUrl + 'like_active.png');

    var $songActive = $('.default-list-item.active');

    $songActive.find('.mylike').data('like', 1).attr('src', baseUrl + 'like_active.png');

    var defaultSong = JSON.parse(localStorage.getItem('defaultSong'));

    //根据歌曲id查询歌曲
    $.each(defaultSong, function () {
      if (playingId == this.id) {
        likeSong.push(this);
        localStorage.setItem('likeSong', JSON.stringify(likeSong));


        //实时更新我的歌单
        if (!$('#likeSong').is(':hidden')) {
          $item = $(`<div id="${this.id}" class="default-list-item" data-url="https://music.163.com/song/media/outer/url?id=${this.id}.mp3" data-lrc="${this.lrc}" data-songid="${this.id}">
          <div class="song-info">
              <div class="singer-name">${this.singer}-${this.name}</div>
              <img class="mylike not" data-like="1" src="./images/like_active.png" >      
              <img class="delete" src="./images/delete.png" > 
              <div class="song-time">${formatTime(this.bMusic.playTime,1)}</div>
          </div>
        
          </div>`);
          $('.likeSong').append($item);
        }
        return false;

      }
    })


  })
})