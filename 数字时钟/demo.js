// 1. 获得当前时间
//  22:33:45 -> 字符串
// 2. 当前时间垂直居中
//  不是当前时间的数字-> 根据数字远近  opacity ->切换透明度

// 创建star函数

// getClock函数获得时间

//数组reduce方法
/**
 * TimeClock类
 * @param {操纵的dom} dom 
 * @param {是否使用24小时制} use24Hours 
 */
function TimeClock(dom, use24Hours){
    this.colums = Array.from(dom);  //将dom类数组转成数组
    this.classList = ['visible','close','close','far','far','distant','distant'];
    this.start();
}

/**
 * 先得到时间
 * 按周期进行位置调整和CSS样式改变
 */
TimeClock.prototype.start = function(){
    
    var self = this;
    setInterval(function(){
        var now = self.getClock();  //获取当前时间
        self.colums.forEach(function(ele, index){
            var n = + now[index]; // + 把字符串转为数字
            var offset = n * 86 + 43;
            $(ele).css({
                'transform': 'translateY(calc(50vh - ' + offset +  'px))'
            })
            //为每一个数字添加对应的透明度
            Array.from(ele.children).forEach(function(oNumDiv, index2){
                var className = self.getClassName(n, index2);
                $(oNumDiv).attr('class', className);
            })
        })
    }, 1000);
}
/**
 * 根据索引值与当前数字只查来获取对应透明度类名
 */
TimeClock.prototype.getClassName = function(n, index){
    var pos = Math.abs(n - index);
    return this.classList[pos];
}

/**
 * 获取时间字符串
 * 比如当前时间 13:34:6， 返回 133406
 */
TimeClock.prototype.getClock = function(){

    var now = new Date();
    function getTimeStr(total, num){
        return total + ('0' + num).slice(-2);
    }
    return [now.getHours(), now.getMinutes(), now.getSeconds()].reduce(getTimeStr, '');
}

new TimeClock($('.column'), true)