var wrap = $('.wrapper'),
    con = $('.content'),
    imgCov = $('.imgCover'),
    moveView = $('.moveView'),
    bigView = $('.bigView'),
    oUl = $('ul'),
    mul = 4;    //放大倍数

var imgW, imgH, //展示的图片的宽高（不是原来的的宽高，是在大图区的）
    moveViewW,  //放大镜的宽度（计算得到，因为放大后展示的区域大小固定，放大倍数越大，放大镜的宽度就越小）
    showSize = 500;

function init() {
    bindEvent();
}

/**
 * 绑定事件
 * 点击图片，展示对应大图
 */
function bindEvent() {
    getIndex(0);
    //点击图片列表事件
    oUl.find('li').on('click', function () {
        var index = $(this).index();
        getIndex(index);
    })
    //鼠标移动事件
    con.on('mousemove', function(e){
        move(e);
    }).on('mouseleave',function(e){
        bigView.hide();
        moveView.hide();
    })
}
/**
 * 获得索引,找到想要显示的图片插入到div中
 * 如果图片宽大于高，那么宽充满展示区，高按比例展示
 * 如果图片高大于宽，那么高充满展示区，宽按比例展示
 * @param {*} index 
 */
function getIndex(index) {
    var src = oUl.find('img').eq(index).attr('src');
    var img = new Image();
    img.src = src;
    oUl.find('li').removeClass('active').eq(index).addClass('active');
    imgW = img.width;
    imgH = img.height;
    if (imgW >= img.height) {
        imgW = showSize;
        imgH = imgH / imgW * showSize;   //宽高以比例缩放
    } else {
        imgH = showSize;
        imgW = imgW / imgH * showSize;
    }
    imgCov.empty().append('<img src="' + src + '" width=' + imgW + ' height=' + imgH + '>');
    bigView.empty().append('<img src="' + src + '" width=' + imgW*mul + ' height=' + imgH*mul + '>');
}
/**
 * 鼠标在图片展示区域内移动
 * 计算并设置放大镜方块位置
 * @param {event} e 
 */
function move(e){
    moveViewW = showSize / mul;
    moveView.css({
        'height': moveViewW + 'px',
        'width': moveViewW + 'px',
    })
    //放大镜框框在相对于大图的位置临界点
    var minXl = (showSize - imgW) / 2;   //除以2的原因是图pain左右居中  |口| 要获得左边的那个宽度就要除以2；
    var maxXr = showSize - minXl - moveViewW; // 从右往左想象。展示区宽度减去右遍空白再减放大镜的宽度等于放大镜左边的位置
    var minYt = (showSize - imgH) / 2;   
    var maxYb = showSize - minYt - moveViewW;
    //让鼠标位于放大镜的中心
    var X = e.clientX - imgCov.offset().left - moveViewW / 2;
    var Y = e.clientY - imgCov.offset().top - moveViewW / 2;
    //最终坐标,让鼠标到边上的时候，鼠标不在中心，但放大镜区域不超过图片区域
    var endX = (X > minXl) ? ( (X < maxXr) ? X : maxXr ) : minXl;
    var endY = (Y > minYt) ? ( (Y < maxYb) ? Y : maxYb ) : minYt; 
    //为放大镜设置位置样式
    moveView.css({
        'left': endX,
        'top': endY,
        'display': 'block'
    })
    //为放大图片区域设置偏移量
    //偏移量 = 放大镜的位置减去两侧留白宽度，即放大镜相对于图片的位置来乘以放大倍数
    var posX = (endX - (500 - imgW) /2) * mul;
    var posY = (endY - (500 - imgH) /2) * mul;
    bigView.css({
        display: 'block'
    }).find('img').css({
        'margin-left': -posX,
        'margin-top': -posY
    })
}


init();