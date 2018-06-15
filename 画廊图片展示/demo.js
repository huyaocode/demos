var gallery = {
    init: function () {
        this.wrap = $('.wrap');
        this.len = 6;
        this.listLi = $('.list');
        this.photosUl = $('.photos');
        this.nowIndex = -1;

        this.createDom();
    },
    createDom: function () {
        //添加图片
        var liStr = '';
        for (var i = 1; i <= this.len; i++) {
            liStr += '<li><img src = "./img/' + i + '.jpg" alt=""></li>';;
        }
        this.photosUl.html(liStr);
        //添加下标圆点
        liStr = '';
        for (var i = 1; i <= this.len; i++) {
            liStr += '<li></li>';
        }
        this.listLi.html(liStr);

        this.listLi = $('.list li');
        this.photosUl = $('.photos li');
        this.bindEvent();
        this.changePic(0);
    },
    bindEvent: function () {
        var _this = this;
        this.photosUl.on('click', function(){
            _this.changePic($(this).index())
        })
        this.listLi.on('click', function(){
            _this.changePic($(this).index())
        })
    },
    /**
     * 改变样式
     * 随机改变位置和旋转角度
     */
    changePic: function (index) {
        if (index == this.nowIndex) {
            return;
        } else {
            this.nowIndex = index;
        }
        var picLi = this.photosUl,
            listLi = this.listLi;
        for (var i = 0; i < this.len; i++) {
            var top = Math.random() * 200,
                left = Math.random() * 400,
                deg = Math.random() * 360,
                z = parseInt(Math.random() * 100);
            lr = i % 2 == 0 ? 1 : -1;
            $(picLi[i]).css({
                'transform': 'rotateZ(' + (360 - deg) + 'deg) translateZ(-' + z + 'px)',
            })
            $(picLi[i]).on('transitionend', (function (i) {
                $(picLi[i]).animate({
                    'z-index': 0,
                    'top': lr * top + 'px',
                    'left': lr * left + 'px'
                }, '1500', 'swing')
            })(i));
            $(listLi[i]).css({
                'transform': 'scale(1)',
            })
        }
        $(picLi[index]).animate({
            top: 0 + 'px',
            left: 0 + 'px',
        }, 10, function(){
            $(picLi[index]).css({
                'transform': 'rotateZ(' + 0 + 'deg) translateZ(' + 10 + 'px)',
                'z-index': 10,
            })
        })
        $(listLi[index]).css({
            'transform': 'scale(2)'
        })
    }
}

gallery.init();