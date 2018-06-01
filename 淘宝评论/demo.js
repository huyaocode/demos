//点击图片  -> 大图展示，样式改变  
//点击左右按钮  -> 切换左右图片


init();
function init() {
    start();
    bindLeftRight();
}
/**
 * 点击图片 -> 大图展示，样式改变
 * 再次点击 -> 图片关闭
 */
function start() {
    $('li').on('click', function(){
        var $this = $(this);
        $this.toggleClass('active').siblings().removeClass('active');
        var src = $this.find('img').attr('src');    //获得图片的src
        var img = new Image();
        img.src = src;
        $photoView = $('.photoView');
        img.onload = function(){
            $photoView.css({
                'height': img.height + 'px',
                'width': '480px',
            })
            $photoView.on('click',function(){
                $this.removeClass('active');
                $photoView.css({
                    'width': 0,
                    'height': 0
                })
            })
        }
        $photoView.find('img').attr('src', src);
    })
}
function bindLeftRight(){
    $('.photoView a').on('click', function(){
        var $this = $(this),
            clickTar = {};
        clickTar.direction = $this.attr('class');
        clickTar.index = $('.photos').find('li').index($('li.active'));
        var index = clickTar.index;
        console.log(clickTar);
    })
}
/**
 * 点击左右按钮
 * 返回点击的是左还是右
 * 返回当前展示照片的索引值
 * 更换展示图片
 * 更改选中的小图
 */