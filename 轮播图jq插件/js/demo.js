var timer = null,
    nowIndex = 0,
    itemWidth = 520,
    itemNum = 5,
    locked = false;

var dombox = $('.img-box'); 

init();

//autoMove() -> move() -> changeStyle() -> slider()
//定时器到了  -> 改变index -> 改变索引样式 -> 滑动轮播

/**
 * 入口函数
 */
function init(){
    bindEvent();
    automove();
}
/**
 * 绑定事件
 */
function bindEvent(){
    $('.order li').add('.next').add('.prev').on('click', function(){
        var className = $(this).attr('class')
        if(className == 'prev'){
            move('prev');
        } else if(className == 'next'){
            move('next');
        } else {
            move($(this).index())
        }
    })
    $('.wrapper')
        .on('mouseenter', function () {
            $('.btn').show();
            clearTimeout(timer);
        })
        .on('mouseleave', function () {
            $('.btn').hide();
            automove();
        })
}
/**
 * 定时调用移动函数，轮播下一张图片
 */
function automove(){
    clearInterval(timer)
    timer = setTimeout(function(){
        move('next');
    }, 2000);
}
/**
 * 根据方向，更改index，更改后的Index表示我项到哪一张去
 * 设置我要到第几张去
 * 这里做的位置调整只是为了方便他能够顺利的到达想要到的那一张而做的准备
 * 如果现在是多余那张展示完了，即第0张展示完了，现在要去到第1张，那么就要把left设为0，让nowindex设为1，让他能够顺利的到达第1张
 * 如果现在展示是第0张，我想去到最后一张即向前一张，那么我就需要把left调到-(itemNum * itemWidth)即展示多余那张的位置，然后在调用slider()，他就能顺利的到达最后一张
 * @param {*} dir 方向
 */
function move(dir){
    if(locked){
        return;
    }
    locked = true;
    if(dir == 'prev' || dir == 'next'){
        if(dir == 'next'){
            //当nowIndex等于最后一张的时候，说明这个时候已经把多出来的最后一张（第0张）展示完了，现在需要展示第1张
            //现在让nowIndex置为0，下面有个++操作会将nowIndex变为1，因为现在要到第1张去
            if(nowIndex == itemNum) {
                nowIndex = 0;
                dombox.css('left', 0);
            }
            nowIndex++;
        } else {
            //如果当前index是第0张，还要往前的话就需要展示最后那个多余的那张，
            //并且让nowIndex等于最后一张（不是多余的那个），因为这里只是设置我要到第几张去
            if(nowIndex == 0) {
                nowIndex = itemNum;
                dombox.css('left', -(itemNum * itemWidth) + 'px');
            }
            nowIndex--;
        }
    } else {
        nowIndex = dir;
    }
    //先改变索引样式，再滑动
    changeStyle();
    slider();
}
/**
 * 移动到nowindex指向元素的位置
 */
function slider(){
    //这个animate必须写成对象形式
    $('.img-box').animate({left: -(nowIndex * itemWidth) + 'px'}, function(){
        automove();
        
        locked = false;
    })
}
/**
 * 修改索引的样式
 */
function changeStyle(){
    $('.order .active').removeClass('active');
    if(nowIndex == itemNum){    //处理多出来一个轮播页的关键！！！
        //这个时候是展示的多出来的那一张，其实是第0张
        $('.order li').eq(0).addClass('active');
    } else {
        $('.order li').eq(nowIndex).addClass('active');
    }
}
