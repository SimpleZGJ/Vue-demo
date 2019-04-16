$(function () {
    //初始化播放数据
    getMusicMenu(function(res){
        //随机歌单id
        var songid=res.data[getRandomNum(0,res.data.length)].id;
        /*加载播放器*/
        var player = new Player({
            audio: getAplayerList(getMusicInfo())
        });
    });
    /*获取歌曲的信息*/
    function getMusicInfo(id = 2441835236) {
        var musicInfo = [];
        $.ajax({
            url: 'https://api.itooi.cn/music/tencent/songList',
            method: 'get',
            contentType: 'application/json;charset=utf-8',
            //  以Payload方式提交
            data: {
                "key": "579621905",
                "id": id,
            },
            dataType: "json",
            async: false,
            success: function (res) {
                // console.log(res.data.songs);
                musicInfo = res.data.songs;
            },
            error: function (res) {
                console.log(res);
            }
        });
        return musicInfo;
    }
    /*处理APlayer所需数据*/
    function getAplayerList(data) {
        var arr = [];
        for (var i = 0; i < data.length; i++) {
            var obj = {};
            obj.name = data[i].name;
            obj.artist = data[i].singer;
            obj.url = data[i].url;
            obj.cover = data[i].pic;
            obj.lrc = data[i].lrc;
            arr[i] = obj;
        }
        return arr;
    }
    //获取随机歌单
    function getMusicMenu(callback){
        $.ajax({
            url:"https://api.itooi.cn/music/tencent/hotSongList",
            type:"get",
            data:{
                key:579621905,
                categoryId:10000000,
                sortId:2,
                limit:60
            },
            dataType:"json",
            success:function(res){
                callback&&callback(res);
            }
        });
    }
    //获取自定义区间的随机数
    function getRandomNum(min,max){
        return Math.floor(Math.random()*(max-min)+min);
    }
});