function Index() {
    this.dom = {
        imgs: $('img'),
        btn: $('.btn'),
    }
    this.endFlag = true;
    this.bindEvent();
}
/**
 * 事件绑定
 * 绑定点击事件，实现动画调用
 */
Index.prototype.bindEvent = function () {
    var imgs = this.dom.imgs,
        len = imgs.length,
        self = this;

    this.dom.btn.on('click', function(){
        if(!self.endFlag){
            return;
        }
        self.endFlag = false;
        var num = 0;    //记录动画完成的数量
        for(var i = 0; i < len; i++){
            (function(i){
                setTimeout(function(){
                    self.monition(imgs[i], '1s', function doFun(){
                        $(this).css({
                            'transform': 'scale(0)'
                        })
                    }, function cb(){
                        self.monition(this, '1s',function doFun(){
                            $(this).css({
                                'transform':'scale(1)',
                                'opacity': '0'
                            })
                        }, function cb(){
                            num++;
                            if(num == len){
                                self.rotate();
                            }
                        })
                    })
                }, Math.random()*1000);
            })(i)
        }
    })
};
/**
 * 旋转特效
 */
Index.prototype.rotate = function () {
    var imgs = this.dom.imgs,
        len = imgs.length,
        self = this,
        endNum = 0;
    for(var i = 0; i < len; i++){
        $(imgs[i]).css({
            'transition': '',
            'transform': 'rotateY(0deg) translateZ(-' + Math.random() * 500 + 'px)'
        });
        (function(i){
            setTimeout(function(){
                self.monition(imgs[i], '2s', function(){
                    $(this).css({
                        'opacity': 1,
                        'transform': 'rotateY(-360deg) translateZ(0)',
                    })
                }, function(){
                    endNum++;
                    if(endNum == len){
                        self.endFlag = true;
                    }
                })
            }, Math.random()*1000);
        }(i))
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
    var called = false;     //不加的话结束了就会是什么都没有
    $(dom).on('transitionend', function(){
        if(!called){
            callBack && callBack.call(dom)  //如果callBack存在，那么调用callBack
            called = true;
        }
    })
}
new Index();

//点击事件绑定

// 变小 -> 变大 -> 变透明  

// scale(0) -> scale(1)+opacity: 0  translateZ(360)