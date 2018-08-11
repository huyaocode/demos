$wrap = $('.wrapper');

$wrap.on('click', function(){
    this.addClass('activeWrap');
})

$('.item').on('click', function(){
    $(this).addClass('active');
    $wrap.addClass('activeWrap');
})

$('.close').on('click', function(e){
    e.stopPropagation();
    $('.active').removeClass('active');
    $wrap.removeClass('activeWrap');
})