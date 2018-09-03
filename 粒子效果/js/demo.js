(function () {

    var Model = function (canvas) {
        var me = this;
        me.canvas = canvas;
        me.ctx = canvas.getContext('2d');
        me.numbers = 100;
        me.pativles = [];
    }

    /**
     * 入口函数
     */
    Model.prototype.init = function () {
        for(var i = 0; i < this.numbers; i++){
            var p = this.genParticle();
            this.draw(p);
            
        }
    }
    /**
     * 生产随机粒子
     */
    Model.prototype.genParticle = function () {
        var me = this;
        return {
            //位置
            x: Math.floor(Math.random() * me.canvas.width),
            y: Math.floor(Math.random() * me.canvas.height),
            //方向
            dicrction: 2 * Math.PI * Math.random(),
            //速度
            speed: Math.random() * 100,
            //大小
            radius: Math.ceil(Math.random() * 9),
            //颜色
            r: Math.floor(Math.random() * 255),
            g: Math.floor(Math.random() * 255),
            b: Math.floor(Math.random() * 255),
            a: Math.random()
        }
    }
    /**
     * 绘制粒子
     */
    Model.prototype.draw = function (p) {
   
        var ctx = this.ctx;
        var me = this;
        
        var timer = setInterval(function(){
            
            //cxt.clearRect(0,0,me.width,me.height);  
            // 
            ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.a})`;
            ctx.beginPath();
            p.x = Math.sin(p.dicrction) + p.x;
            p.y = Math.cos(p.dicrction) + p.y;
            ctx.arc(p.x, p.y, p.radius, 0, 2*Math.PI);
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }, 30);
    }

    window.Particle = Model;
})();