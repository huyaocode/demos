//autoMove() -> move() -> changeStyle() -> slider()
//定时器到了  -> 改变index -> 改变索引样式 -> 滑动轮播

/**
 * 轮播图jquery插件说明
 * 
 * 要求将被渲染为轮播图的div的id名为slider
 * 调用方式为$('#slider').sliderImg(imgs);
 * 其中imgs是图片数组，每一个数组元素为图片的路径名
 * 样式需引入slider.css, 默认图片大小为520*280px, 若图片大小不同请自行修改
 */
(function ($) {
    function Slider(options) {
        this.wrapper = options.wrapper;
        this.timer = null;
        this.nowIndex = 0;
        this.itemWidth = parseInt(this.wrapper.css('width'));
        this.itemNum = imgs.length;
        this.locked = false;
        this.imgs = options;

        this.init();
    }
    Slider.prototype.init = function () {
        this.createDom();
        this.bindEvent();
        this.automove();
    },
    Slider.prototype.createDom = function () {
        var imgBox = $('<ul class="img-box"></ul>');
        var imgLi = '';
        var orderListStr = ''
        for (var i = 0; i < this.itemNum; i++) {
            imgLi += '<li><a href="javascript:void(0)">\
                        <img src="'+ this.imgs[i] + '" alt="">\
                    </a></li>';
            orderListStr += '<li></li>'
        }
        imgLi += '<li><a href="javascript:void(0)">\
                        <img src="'+ this.imgs[0] + '" alt="">\
                    </a></li>';

        var btnDiv = '<div class="btn">\
                            <a class="prev"><span></span></a>\
                            <a class="next"><span></span></a>\
                        </div>';
        var orderBox = $('<div class="order"></div>');
        var orderUl = $('<ul></ul>');
        $(this.wrapper).append(imgBox.html(imgLi))
            .append($(btnDiv))
            .append(orderBox.append(orderUl.html(orderListStr)));
        $('#slider .order li').eq(0).addClass('active');
    };
    /**
     * 绑定事件
     */
    Slider.prototype.bindEvent = function() {
        var self = this;
        $('#slider .order li').add('.next').add('.prev').on('click', function () {
            var className = $(this).attr('class')
            if (className == 'prev') {
                self.move('prev');
            } else if (className == 'next') {
                self.move('next');
            } else {
                self.move($(this).index())
            }
        })
        $('#slider')
            .on('mouseenter', function () {
                $('#slider .btn').show();
                clearTimeout(self.timer);
            })
            .on('mouseleave', function () {
                $('#slider .btn').hide();
                self.automove();
            })
    }
    /**
     * 定时调用移动函数，轮播下一张图片
     */
    Slider.prototype.automove = function() {
        clearInterval(this.timer)
        var self = this;
        this.timer = setTimeout(function () {
            self.move('next');
        }, 2000);
    }
    /**
     * 根据方向，更改index，更改后的Index表示我想到哪一张去
     * @param {*} dir 方向
     */
    Slider.prototype.move = function(dir) {
        if (this.locked) {
            return;
        }
        this.locked = true;
        if (dir == 'prev' || dir == 'next') {
            if (dir == 'next') {
                if (this.nowIndex == this.itemNum) {
                    this.nowIndex = 0;
                    $('#slider .img-box').css('left', 0);
                }
                this.nowIndex++;
            } else {
                if (this.nowIndex == 0) {
                    this.nowIndex = this.itemNum;
                    $('#slider .img-box').css('left', -(this.itemNum * this.itemWidth) + 'px');
                }
                this.nowIndex--;
            }
        } else {
            this.nowIndex = dir;
        }
        //先改变索引样式，再滑动
        this.changeStyle();
        this.slider();
    }
    /**
     * 移动到nowindex指向元素的位置
     */
    Slider.prototype.slider = function() {
        var self = this;
        //这个animate必须写成对象形式
        $('#slider .img-box').animate({ left: -(self.nowIndex * self.itemWidth) + 'px' }, function () {
            self.automove();
            self.locked = false;
        })
    }
    /**
     * 修改索引的样式
     */
    Slider.prototype.changeStyle = function() {
        $('#slider .order .active').removeClass('active');
        if (this.nowIndex == this.itemNum) {    //处理多出来一个轮播页的关键！！！
            //这个时候是展示的多出来的那一张，其实是第0张
            $('#slider .order li').eq(0).addClass('active');
        } else {
            $('#slider .order li').eq(this.nowIndex).addClass('active');
        }
    }

    //添加自定义jq插件
    $.fn.extend({
        sliderImg: function (options) {
            options.wrapper = this || $('body');
            new Slider(options);
        }
    })
})(jQuery);

