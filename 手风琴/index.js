var oUl = $('ul'),
    oLi = $('li'),
    width = parseInt(oUl.css('width')),
    len = oLi.length,
    showItem = len -1,
    ot = Math.floor((width - 400) / (len - 1));

function bindEvent(){
    oLi.on('click', function(){
        if(!(showItem == $(this).index() && showItem + 1 == len)){
            change($(this));
        }
        showItem = $(this).index();
    });
    oUl.on('mouseleave',function(){
        if( showItem != len -1){
            init();
        }
    });
}

function init(){
    change($(oLi[len-1]));
    showItem = len -1;
}

function change(event){
    console.log('修改CSS');
    event.animate({
        'width': '400px'
    }, 300, 'linear').siblings().animate({
        'width' : (ot + 'px')
    },300,'linear');   //liner？
    event.find('.title').css({
        'display': 'none'
    });
    event.siblings().find('.title').css({
        'display': 'block'
    });
    event.find('.decration').css({
        'bottom':'0px',
        'padding-bottom': '2px'
    })
    event.siblings().find('.decration').css({
        'bottom':'-50px'
    })
}
bindEvent();
init();
