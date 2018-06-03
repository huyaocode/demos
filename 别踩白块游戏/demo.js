var main = $('.main')[0],
    go = $('.go')[0],
    speed = 50,
    num = 0,
    colors = ['#1AAB8A', '#E15650', '#121B39', '#80A84E'];


function init(){
    bindCoverEvent();
    createRow();
}

function bindCoverEvent (){
    $('.go').on('click', function(){
        $(this).css({
            'display': 'none'
        })
    })
}

function createRow(){
    var oRow = $('<div></div>');
    oRow.addClass('row');
    for(var i = 0; i < 4; i++){
        oRow.append( $('<div></div>') );
    }
    if(main.chidren().length == 0){
        main.append(oRow);
    } else {
        oRow.insertBefore(main.children()[0]);
    }
    var index = Math.floor(Math.random() * 4);
    var valueDiv = oRow.chidren()[index];
    $(valueDiv).css('backgroundColor', colors[index]);
    $(valueDiv).attr('class', 'v');
}

init();