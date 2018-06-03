//点击图片  -> 大图展示，样式改变  
//点击左右按钮  -> 切换左右图片


init();
function init() {
    bindLiEvnet();
    bindLeftRight();
}
/**
 * 点击图片 -> 大图展示，样式改变
 * 再次点击 -> 图片关闭
 */
function bindLiEvnet() {
    $('li').on('click', function(){
        var $this = $(this);
        $this.toggleClass('active').siblings().removeClass('active');
        var src = $this.find('img').attr('src'),    //获得图片的src
            flag = $this.hasClass('active'),
            img = new Image(),
            $photoView = $('.photoView');
        if(flag){
            img.src = src;
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
        } else {
            $photoView.css({
                'width': 0 + 'px',
                'height': 0 + 'px',
                'transition': 'all 100ms ease-out'
            })
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
function bindLeftRight(){
    
    $('.photoView a').on('click', function(){
        var clickTar = {};
        var $this = $(this),
            len = $('#photos').find('li').length,
            activeLi = $('#photos').find('li.active');
        clickTar.direction = $this.attr('class');
        clickTar.index = $('#photos').find('li').index($('li.active'));
        var index = clickTar.index;
        console.log(clickTar)
        clickTar.direction == 'left' ? index-- : index++;

        if(index >= 0 && index < len) {

            $('#photos').find('li').eq(index).attr('class', 'active').siblings().attr('class', '');
            var src = $('#photos').find('li').eq(index).find('img').attr('src');
            $('.photoView').find('img').attr("src", src);
            var img = new Image();
            img.src = src;
            img.onload = function(){
                $('.photoView').css({
                    'height': img.height + 'px',
                    'width': '480px'
                })
            }
            $('.photoView').find('img').attr('src', src);
        } else {
            console.log('remove')
            $('#photos').find('li').toggleClass('active').siblings().removeClass('active');
        }
    })
}
