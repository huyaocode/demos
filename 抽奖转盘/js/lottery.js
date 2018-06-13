(function (win, $) {
    var defaultPar = {
        rotateNum: 5,
        body: 'body',
        button: '.btn',
        rotateBox: '.box',
        clickCb: function(){},
        renderCb: function(){}
    }
    //只是将Lottery方法放到了window对象上，在这个立即执行函数中产生了闭包，只留给了外部一个接口不占用变量名。是企业开发的一种手段
    win.Lottery = Lottery;
    function Lottery(pars) {
        this.pars = $.extend(true, {}, defaultPar, pars);
        this.isGoing = false;
        this.init();
    }
    Lottery.prototype.init = function () {
        var _this = this;
        //点击事件绑定  
        $(this.pars.body).on('click', this.pars.button, function(){
            _this.isGoing = true;
            _this.pars.clickCb();
        })
        //旋转结束事件绑定
        $(this.pars.body).find(this.pars.rotateBox)[0].addEventListener('webkitTransitionEnd',function(){
            var deg = $(_this.pars.body).attr('data-deg');
            _this.pars.renderCb(deg);   //调用判定并提示抽奖结果函数
            //以下代码是为了下一次抽奖，因为每次点击后图片停留的位置都不是初始的0位置，需要将旋转角度设置为deg(0~360deg)。不然下次旋转他就只转一点点，甚至往回转
            $(_this.pars.body).find(_this.pars.rotateBox).css({
                transform: 'rotate(' + deg + 'deg)',
                transition: ''
            })
        })
    }
    Lottery.prototype.goRotate = function (deg) {
        _this = this;
        rotateEnd = this.pars.rotateNum * 360 + deg;
        //旋转
        $(this.pars.body).find(this.pars.rotateBox).css({
            transform: 'rotate(' + rotateEnd + 'deg)',
            transition: 'all 5s ease-out'
        })
        //记录当前旋转后停下来的值
        $(this.pars.body).attr('data-deg',deg);
    }
    
})(window, $)