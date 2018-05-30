/**
 * 整体思路
 * 拖拽（bindEvent） ->  计算覆盖百分比  ->音量改变 & 颜色改变
 */

var obj = {
    init: function(){
        this.moon = $('.moon');
        this.bindEvent();
        // document.getElementById('audio');
        this.player = document.getElementById('audio');
        this.player.volume = 0;
    },
    /**
     * 绑定拖动事件
     */
    bindEvent: function(){
        var moon = this.moon;
        var pos,    //鼠标与被拖物体的左边界的距离
            flag = false;   //鼠标是否按下（是否正在被拖动）
        var self = this;
        //拖动是3个事件
        moon.on('mousedown', function(e){
            pos = e.clientX - moon.offset().left;
            flag = true;
            self.player.play();
        });
        /*因为在body上移动，如果加在其他地方可能更不上就掉了*/
        $('body').on('mousemove', function(e){
            if(flag){
                moon.css({
                    'left': e.clientX - pos - $('.wrapper').offset().left
                })
                self.getPersent();
            }
        });
        $('body').on('mouseup', function(e){
            flag = false;
        });
    },
    /**
     * 计算遮盖的百分百
     */
    getPersent: function(){
        var self = this;
        var sun = $('.sun'),
            moon = self.moon;
        var per,
            diameter = parseInt(moon.css('width')),    //月球直径
            moonL = moon.offset().left,
            moonR = moonL + diameter,
            sunL = sun.offset().left,
            sunR = sunL + diameter;
        if(sunR < moonL || sunL > moonR){
            per = 0;
        } else {
            if(sunL < moonL) {
                per = (sunR - moonL) / diameter;
            } else {
                per = (moonR - sunL) /diameter;
            }
        }
        self.change( per );
    },
    /**
     * 改变背景和月亮的颜色，改变音量大小
     */
    change: function(per){
        $('audio')[0].volume = per;
        $('.per').html("Volume: " + (per*100).toFixed(2) + "%");
        this.moon.css({
            'background': "hsl(194, 56%, " + (1-per) * 60 + "%)"
        })
        $('body').css({
            'background': "hsl(" + (194 + Math.floor(166 * per)) + ", 66%, " + (1-per)*50 + "%)"
        })
    }
}

obj.init();


