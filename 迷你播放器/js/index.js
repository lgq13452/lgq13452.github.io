// 初始化
//创建歌曲列表
var audio = document.querySelector("audio");
var list = document.querySelector(".list");
var h3 = document.querySelector("h3");
var h5 = document.querySelector("h5");
var play = document.querySelector(".play");
var prev = document.querySelector(".prev");
var next = document.querySelector(".next");
var player = document.querySelector(".player");
var progress = document.querySelector(".progress input");
var smask = document.querySelector(".progress .smask");
var bg = document.querySelector(".progress .bg");
var order = document.querySelector(".order");

playlist.forEach(function (element, index) {
    //创建
    var li = document.createElement("li");
    li.setAttribute("data-index", index);
    li.innerText = element.name;
    // li.innerHTML = '<li data-index=' + index + '>' + element.name + '</li>';
    //添加
    list.appendChild(li);
});

var current = 0;

//播放歌曲
// 切换歌曲
function changeSong(obj) {
    // 切换url
    audio.src = "https://music.163.com/song/media/outer/url?id=" + obj.id + ".mp3";

    h3.innerText = obj.name;
    h5.innerText = obj.artist;

    document.querySelector(".record img").src = obj.picUrl;
    document.querySelector(".mask").style.backgroundImage = 'url("' + obj.picUrl + '")';


    document.querySelectorAll("ul.list li").forEach(function (element, index) {
        if (index == current) {
            element.classList.add("active");
        } else {
            element.classList.remove("active");
        }
    });
    return current;
}
//准备播放第一首,等待用户点击播放
changeSong(playlist[current]);

//格式化时间
function countTime(n) {
    var n = Math.floor(n);
    var m = Math.floor(n / 60);
    var s = n % 60;
    m = m > 9 ? m : "0" + m;
    s = s > 9 ? s : "0" + s;
    return m + ":" + s;
}

//时间长度改变
audio.ondurationchange = function () {
    document.querySelectorAll(".time span")[1].innerText = countTime(this.duration);
};


//时间发生改变
audio.ontimeupdate = function () {

    if (isNaN(this.duration)) {
        return
    }


    progress.value = this.currentTime / this.duration * 100;
    document.querySelectorAll(".time span")[0].innerText = countTime(this.currentTime);

    //鼠标是否按下，如果是，直接拦截
    if (isDown) {
        return;
    }

    smask.style.width = this.currentTime / this.duration * progress.clientWidth + "px";
}


// 改变进度条
function changeProgress(e) {
    //获取相对目标元素的鼠标坐标
    var x = e.offsetX;

    var swidth = x < width ? x : width;

    smask.style.width = swidth + "px";

    if (isLeave) {
        //修改音频的播放进度
        audio.currentTime = (swidth / width) * audio.duration;
        isLeave = false;
    }

}

var width = progress.getBoundingClientRect().width;

//鼠标松开
var isLeave = false;
//鼠标按钮下时
var isDown = false;

bg.onmousedown = function (e) {

    isDown = true;
    // isLeave = false;
    changeProgress(e);

    bg.onmousemove = function (evt) {

        evt.preventDefault();

        changeProgress(evt);
    }
}

bg.onmouseup = function (e) {

    bg.onmousemove = null;

    isDown = false;
    isLeave = true;
    changeProgress(e);
}

//未修复bug
//通过调整滑块层 层次 绑定的事件层解决

bg.onmouseleave = function (e) {

    if (isDown) {
        
        bg.onmousemove = null;

        isDown = false;
        isLeave = true;

        changeProgress(e);
    }

}








// 播放/暂停
play.onclick = function () {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

// 监听播放状态
audio.onplay = function () {
    player.classList.add("playing");

    document.querySelector('.play img').src = "./images/pause.png"
};
audio.onpause = function () {
    player.classList.remove("playing");
    document.querySelector('.play img').src = "./images/play.png"
};

//播放选择
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

//设置播放模式
order.onclick = function () {
    var name = order.getAttribute("name");
    console.log(name);
    if (name == modes.length - 1) {
        name = 0;
    } else {
        name++;
    }
    //下一播放模式
    var nextMode = modes[name];
    order.setAttribute("name", nextMode.name);
    order.setAttribute("title", nextMode.title);
    document.querySelector('.order img').src = baseUrl + nextMode.url
}

//按照类型播放
function playNext(type) {
    //获取播放模式
    var mode = order.getAttribute("name");
    if (mode == 0) {
        if (type == 'next') {
            current++;
            if (current > playlist.length - 1) {
                // 重新从0播放
                current = 0;
            }
        } else {
            current--;
            if (current < 0) {
                // 重新从0播放
                current = playlist.length - 1;
            }
        }
        changeSong(playlist[current]);

    } else if (mode == 1) {

        current = Math.floor(Math.random() * playlist.length);
        changeSong(playlist[current]);

    } else {
        audio.load();
    }
    //播放下一首
    audio.play();

}


// 自动播放
audio.onended = function () {
    playNext('next');
}


//下一首
next.onclick = function () {
    playNext('next')
}
console.log(current)

//上一首
prev.onclick = function () {
    playNext('prev')
}



//点击列表切换歌曲
list.addEventListener('click', function (e) {

    var dataindex = e.target.dataset.index;

    console.log(current);

    if (dataindex == current) {
        return;
    } else {
        current = dataindex;
        changeSong(playlist[dataindex]);
        audio.play();
    }

})