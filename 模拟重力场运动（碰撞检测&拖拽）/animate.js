
/**
 * 模拟重力场运动
 * @param {*} obj  运动对象
 * @param {*} iSpeedX 水平方向初始速度
 * @param {*} iSpeedY 竖直方向初始速度
 */
function startMove(obj, iSpeedX, iSpeedY) {

    clearInterval(obj.timer);
    var g = 6,  //伪重力加速度 
        u = 0.8;//碰撞到边界时速度减小

    obj.timer = setInterval(function () {
        iSpeedY += g;
        var newLeft = obj.offsetLeft + iSpeedX,
            newTop = obj.offsetTop + iSpeedY;
        
        //底部边界判断
        if (newTop >= document.documentElement.clientHeight - obj.offsetHeight) {
            iSpeedY *= -1;
            iSpeedY *= u;
            iSpeedX *= u;
            newTop = document.documentElement.clientHeight - obj.offsetHeight;
        }
        //顶部边界判断
        if (newTop <= 0) {
            iSpeedY *= -1;
            iSpeedY *= u;
            iSpeedX *= u;
            newTop = 0;
        }
        //右侧边界判断
        if (newLeft >= document.documentElement.clientWidth - obj.offsetWidth) {
            iSpeedX *= -1;
            iSpeedY *= u;
            iSpeedX *= u;
            newLeft = document.documentElement.clientWidth - obj.offsetWidth;
        }
        //左侧边界判断
        if (newLeft <= 0) {
            iSpeedX *= -1;
            iSpeedY *= u;
            iSpeedX *= u;
            newLeft = 0;
        }
        if(Math.abs(iSpeedX) <= 3) {
            iSpeedX = 0;
        }
        if(Math.abs(iSpeedY) <= 3) {
            iSpeedY = 0;
        }
        if(iSpeedX == 0 && iSpeedY == 0 && newTop == document.documentElement.clientHeight - obj.clientHeight){
            clearInterval(obj.timer)
        }
        obj.style.left = newLeft + 'px';
        obj.style.top = newTop + 'px';
    }, 30)
}

//鼠标拖拽方法
function drag(e) {

    clearInterval(this.timer);  //正在运动的时候被抓到，需要清空定时器
    var event = e || window.event;  //事件兼容
    var disX = e.clientX - this.offsetLeft, //当前鼠标在区块上的横向相对位置
        disY = e.clientY - this.offsetTop;  //当前鼠标在区块上的纵向相对位置
    var that = this;
    var iSpeedX = 0,
        iSpeedY = 0;
    //鼠标移动
    document.onmousemove = function (e) {
        var newLeft = e.clientX - disX,
            newTop = e.clientY - disY;

        iSpeedX = newLeft - lastX;
        iSpeedY = newTop - lastY;

        lastX = newLeft;
        lastY = newTop;

        that.style.left = newLeft + 'px';
        that.style.top = newTop + 'px';
    }
    //鼠标键弹起
    document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
        startMove(that, iSpeedX, iSpeedY);  //拖拽完成，传入初速度
    }
}