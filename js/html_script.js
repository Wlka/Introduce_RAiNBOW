window.onload = function () {

    //导航条的颜色变换
    var oLi = document.getElementsByClassName('nav');
    var bottom = document.getElementsByClassName('bottom')[0];
    var index = 0;
    var color = ['#ff3264', 'red', 'orange', 'rgb(251,227,51)'];
    for (var i = 0; i < oLi.length; i++) {
        oLi[i].index = i;
        oLi[i].onclick = function () {
            index = this.index;
            for (var j = 0; j < oLi.length; j++) {
                oLi[j].className = "nav";
            }
            this.className = "nav active";
            if (this.index === index) {
                this.style.background = color[index];
            }
            if (this.index === 0) {
                bottom.style.display = 'none';
            }
            else {
                bottom.style.display = 'block';
            }
        }
        oLi[i].onmouseover = function () {
            for (var j = 0; j < oLi.length; j++) {
                oLi[j].style.background = '#d2d5d6';
            }
            oLi[index].style.background = color[index];
            this.style.background = 'rgb(49,160,48)';
        }
        oLi[i].onmouseout = function () {
            for (var j = 0; j < oLi.length; j++) {
                oLi[j].style.background = "#d2d5d6";
            }
            oLi[index].style.background = color[index];
        }
    }


    //团队介绍页的人物图片轮播
    var count = 0;
    var changeBG = ["url(\"image/林力尧.jpg\") no-repeat -297px -143px", "url(\"image/雷雨心.jpg\") no-repeat -229px 0", "url(\"image/林姝涵.jpg\") no-repeat -332px -90px", "url(\"image/钟声.jpg\") no-repeat -370px -144px"];
    var oPicture = document.getElementsByClassName('picture')[0];

    function changePicture() {
        oPicture.style.background = changeBG[count];
        count++;
        if (count === 4) {
            count = 0;
        }
    }

    //轮播图鼠标移入移除动作
    var timer = setInterval(changePicture, 3000);
    oPicture.onmouseover = function () {
        clearInterval(timer);
    };
    oPicture.onmouseout = function () {
        timer = setInterval(changePicture, 3000);
    }


    //播放按钮的形状变化
    var oDiv = document.getElementsByClassName('bottom')[0];
    var oMusicbox = document.getElementsByTagName('audio')[0];
    var oImg1 = document.getElementById('control1');
    var oImg2 = document.getElementById('control2');


    var songlist = [];
    //歌曲进度条
    var nameOfSong = document.getElementById('songName');
    nameOfSong.style.fontSize = '12px';
    nameOfSong.style.lineHeight = '25px';
    var progressBar = document.getElementById('progressBar');
    // var rules=document.styleSheets[0].cssRules||nameOfSong.styleSheets[0].rules;
    // console.log(rules);
    var text = document.getElementById('text');
    for (var i = 0; i < 3; i++) {
        var a = document.getElementsByClassName('list')[i].getElementsByTagName('a');
        for (var j = 0; j < a.length; j++) {
            songlist.push(a[j]);
            progressBar.style.width = '0';
            a[j].onclick = function () {
                nameOfSong.innerHTML = this.innerText;
                this.title = this.title.replace('#/song', 'song/media/outer/url') + '.mp3';
                oMusicbox.src = this.title;
                oImg1.src = 'image/click_pause.png';
                oImg1.title = '点击暂停';
                controlPlay();
            }
        }
    }


    oImg1.onclick = function () {
        if (nameOfSong.innerHTML === '点击蓝色框内文字播放音乐') {
            randomMusic();
            oImg1.src = 'image/click_play.png';
            oImg1.title = '点击播放';
            controlPlay();
        }
        if (oImg1.title === '点击暂停') {
            oImg1.src = 'image/click_play.png';
            oImg1.title = '点击播放';
            oMusicbox.pause();
        }
        else {
            oImg1.src = 'image/click_pause.png';
            oImg1.title = '点击暂停';
            oMusicbox.play();
        }
    }

    oImg2.onclick = function () {
        randomMusic();
        controlPlay();
    }




    function randomMusic() {
        var randomNum = Math.round(Math.random() * 100 % 37);
        songlist[randomNum].title = songlist[randomNum].title.replace('#/song', 'song/media/outer/url') + '.mp3';
        nameOfSong.innerHTML = songlist[randomNum].innerText;
        oMusicbox.src = songlist[randomNum].title;

    }


    //控制音乐播放
    function controlPlay() {
        setTimeout(function () {
            progressBar.style.display = 'block';
            oMusicbox.play();
            setInterval(function () {
                progressBar.style.width = oMusicbox.currentTime / oMusicbox.duration * 300 + 'px';
                duraionMin = Math.floor(oMusicbox.duration / 60);
                durationec = Math.round(oMusicbox.duration - Math.floor(duraionMin) * 60);
                currentMin = Math.floor(oMusicbox.currentTime / 60);
                currentSec = Math.round(oMusicbox.currentTime - Math.floor(currentMin / 60) * 60);
                if (isNaN(oMusicbox.duration)) {
                    text.innerHTML = 'loading...';
                }
                else {
                    text.innerHTML = currentMin + ':' + currentSec + '/' + duraionMin + ':' + durationec;
                }
            }, 500);
        }, 1000);
    }

};