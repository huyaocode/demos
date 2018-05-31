//点击图片  -> 大图展示，样式改变  
//点击左右按钮  -> 切换左右图片


init();
function init() {
    start();
    // bindEvent();
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
        img.onload = function(){
            
        }
    })
}
/**
 * 点击左右按钮
 * 返回点击的是左还是右
 * 返回当前展示照片的索引值
 * 更换展示图片
 * 更改选中的小图
 */