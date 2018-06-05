function Index() {
    this.dom = {
        img: $('img'),
        btn: $('.btn')
    }
    this.flag = true;
    this.bindEvent();
}
Index.prototype.bindEvent = function () {
    var self = this;
    var img = self.dom.img;
    var len = img.length;
    self.dom.btn.on('click', function () {
        if (!self.flag) {
            return;
        }
        var endNum = 0;//运动完成的图片数量
        self.flag = false;
        for (var i = 0; i < len; i++) {
            (function (i) {
                setTimeout(function () {            
                    self.monition(img[i], '1s', function () {
                        $(this).css({
                            'transform': 'scale(0)'
                        })
                    }, function () {
                        self.monition(this, '1s', function () {
                            $(this).css({
                                'transform': 'scale(1)',
                                'opacity': 0
                            })
                        }, function () {
                            endNum++;
                            if (endNum == len) {
                                self.show();
                            }
                        })
                    })
                }, Math.random() * 1000);
            })(i)
        }
    })
};
Index.prototype.show = function () {
    var self = this;
    var img = self.dom.img;
    var len = img.length;
    var allEnd = 0;
    for (var i = 0; i < len; i++) {
        $(img[i]).css({
            'transition': '',
            'transform': 'rotateY(0deg) translateZ(-' + Math.random() * 500 + 'px)'
        });
        (function (i) {
            setTimeout(function () {
                self.monition(img[i], '2s', function () {
                    $(this).css({
                        'opacity': 1,
                        'transform': 'rotateY(-360deg) translateZ(0)',                        
                    })
                }, function () {
                    allEnd++;
                    if (allEnd == img.length) {
                        self.flag = true;
                    }
                })
            }, Math.random() * 1000);
        })(i)
    }
}
/**
 * 动画执行管理函数
 * @param {*} dom 执行的元素
 * @param {*} time 执行动画时间
 * @param {*} doFun 执行什么动画
 * @param {*} callBack 执行完的回掉
 */
Index.prototype.monition = function (dom, time, doFun, callBack) {
    var self = this;
    $(dom).css({
        'transition': time
    })
    doFun.call(dom);
    var called = false;
    $(dom).on('transitionend', function () {
        if (!called) {
            callBack && callBack.call(dom);
            called = true;
        }
    })
}
new Index();

//点击事件绑定

// 变小 -> 变大 -> 变透明  

// scale(0) -> scale(1)+opacity: 0  translateZ(360)