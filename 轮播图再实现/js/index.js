var container = document.getElementsByClassName('container')[0];
var itemNum = container.getElementsByTagName('li').length;
itemNum -= 1;
var moveWidth = parseInt(getStyle(container.getElementsByTagName('li')[0], 'width'));
var leftBtn = document.getElementsByClassName('leftBtn')[0],
    rightBtn = document.getElementsByClassName('rightBtn')[0];

var indexList = document.getElementsByClassName('indexList')[0],
    indexSpanList = indexList.getElementsByTagName('span');

for (var i = 0; i < indexSpanList.length; i++) {
    (function (i) {
        indexSpanList[i].onclick = function () {
            index = i;
            //这里来控制运动
            clearTimeout(timer)
            animate(container, { left: -moveWidth * index }, function () {
                timer = setTimeout(move, 2000);
            })
            changeIndex(i);
        }
    })(i)
}

leftBtn.onclick = function () {
    move('left')
}
rightBtn.onclick = function () {
    move('right')
}
var index = 0;
var timer = setTimeout(move, 2000);

function move(direction) {

    clearTimeout(timer);//防止开启多个定时器
    if (!direction || direction == 'right') {
        if (index == itemNum) {
            container.style.left = 0;
            index = 0;
        }
        index++;
        animate(container, { left: -moveWidth * index }, function () {
            timer = setTimeout(move, 2000);
            changeIndex(index);
        })
    } else {
        index--;
        if (index < 0) {
            index = itemNum - 1;
            container.style.left = -(index + 1) * moveWidth + 'px';
            timer = setTimeout(move, 2000);
        }
        animate(container, { left: -moveWidth * index }, function () {
            if (index == itemNum) {
                container.style.left = 0;
                index = 1;
            }
            timer = setTimeout(move, 2000);
            changeIndex(index);
        })
    }
}

/**
 * 用来修改样式，因为autoMove也要调用
 * @param {*} index 当前索引值
 */
function changeIndex(index) {
    for (var i = 0; i < indexSpanList.length; i++) {
        indexSpanList[i].className = '';
    }
    if(index == itemNum){
        index = 0;
    }
    indexSpanList[index].className = 'active';
}

/**
 * 如果所有的操作都由setTimeout来完成，每次运动都先清理定时器，就不需要有一个表明是否正在运动的flag
 * 轮播图实现：
 *      1. 运动函数的封装
 *      2. 获取第一个区块的宽度，每次运动距离设置为：索引值乘以运动宽度
 *      3. autoMove函数，默认向右移轮播，每次移动都将全局变量index改变，并对Index做边界判断，
 *          对于往右轮播来说，当index等于展展示图片数量的时候需要将left设置为0
 */