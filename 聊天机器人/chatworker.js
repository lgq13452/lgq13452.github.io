
// 监听页面worker实例传递的消息
onmessage = function (e) {
    console.log('worker文件 e.data ==> ', e.data);

    //
    var duration = (Math.random() * 2 + 1) * 1000;

    for (var i = 0; i < robotContent.length; i++) {
        if (e.data == robotContent[i].key) {

            setTimeout(function () {
                //将消息内容回传给页面的worker实例
                postMessage(robotContent[i].url);

            }, duration)

            return;
        }
    }

    setTimeout(function () {
        //将消息内容回传给页面的worker实例
        postMessage('请按照提示内容输入');

    }, duration)


}

//初始机器内容
var robotContent = [{
        key: 1,
        value: '获取资料包',
        url: 'http://www.a1.com'

    },
    {
        key: 2,
        value: '获取最新高清视频',
        url: 'http://www.a2.com'

    },
    {
        key: 3,
        value: '获取高级资料',
        url: 'http://www.a3.com'

    }
];


//通知用户输入的内容
function initReply(content) {
    //回复信息
    postMessage(content);
}

initReply(robotContent);