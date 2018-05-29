var obj = {
    init: function(){
        this.moon = $('.moon');
        this.bindEvent();
    },
    bindEvent: function(){
        var moon = this.moon;
        //拖动是3个事件
        moon.on('mousedown', function(e){

        });
        /*因为在body上移动，如果加在其他地方可能更不上就掉了*/
        $('body').on('mousemove', function(e){

        });
        $('body').on('mouseup', function(e){

        });
    },
}

obj.init();

/**
 * 整体思路
 * 拖拽（bindEvent） ->  计算覆盖百分比  ->音量改变 & 颜色改变
 */
