function animate(obj, json, cb) {
    clearInterval(obj.timer);

    var iSpeed, iCur;
    obj.timer = setInterval(function () {
        var isOver = true;
        for (var attr in json) {
            //计算改变值大小
            if (attr == 'opacity') {
                iCur = parseFloat(getStyle(obj, attr)) * 100;
            } else {
                iCur = parseInt(getStyle(obj, attr));
            }
            var iSpeed = (json[attr] - iCur) / 7;   //缓冲运动
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            //设置值
            if (attr == 'opacity') {
                obj.style.opacity = (iSpeed + iCur) /100;
            } else {
                obj.style[attr] = (iSpeed + iCur) + 'px';
            }
            if(iSpeed + iCur != json[attr]){
                isOver = false;
            }
        }
        if(isOver){
            clearInterval(obj.timer);
            cb && cb();
        }
    }, 30);
}

function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return window.getComputedStyle(obj, false)[attr];
    }
}