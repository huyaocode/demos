var main = $('#main'),
    go = $('#go'),
    speed = 5,
    score = 0,
    timer = null,
    flag = true,
    colors = ['#1AAB8A', '#E15650', '#121B39', '#80A84E'];

function init(){
    bindCoverEvent();
    bindScoreEvent();
}

function bindCoverEvent() {
    $('#go').on('click', function(){
        $(this).css({
            'display': 'none'
        })
        if(flag){
            move();
        }
    })
}

function createRow(){
    var oRow = $('<div></div>');
    oRow.addClass('row');
    for(var i = 0; i < 4; i++){
        oRow.append( $('<div></div>') );
    }
    if(main.children().length == 0){
        main.append(oRow);
    } else {
        oRow.insertBefore(main.children()[0]);
    }
    var index = Math.floor(Math.random() * 4);
    var valueDiv = oRow.children()[index];
    $(valueDiv).css('backgroundColor', colors[index]);
    $(valueDiv).attr('class', 'v');
}

function move() {
    clearInterval(timer);
    timer = setInterval(function(){
        var step = parseInt(main.css('top')) + speed;
        main.css('top', step + 'px'); //正常下落
        if(parseInt(main.css('top')) >= 0){ //当下落到top大于0的时候生成一行
            createRow();
            main.css({
                'top': '-150px'
            })
        }
        var len = main.children().length;
        if(len >= 6){
            for(var i = 0; i < 4; i++){
                if($($(main.children()[len - 1]).children()[i]).hasClass('v')){
                   gameOver();
                    return;
                }
            }
            $(main.children()[len - 1]).remove();
        }
    }, 30);
}
function bindScoreEvent(){
    main.on('click', function(event){
        var tar = event.target;
        if(tar.className == 'v'){
            $(tar).css('backgroundColor','#bbb');
            $(tar).removeClass();
            score++;
        } else{
            gameOver();
        }
        if(score % 10 == 0){
            speed++;
        }
    })
}
function gameOver(){
    clearInterval(timer);
    $(go.children()[0]).html('结束</br>得分: ' + score );
    main.html('');
    go.css({
        'display': 'block',
        'z-index': '5'
    });
    flag = false;
    go.on('click', function(){
        $(go.children()[0]).html('Game Start' );
        go.css('display', 'block');
        bindCoverEvent();
        flag = true;
        speed = 5;
        score = 0;
    })
}

init();