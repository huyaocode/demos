(function () {

    var Model = function (canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.numbers = 100;
        this.pativles = [];
    }

    /**
     * 入口函数
     */
    Model.prototype.init = function () {

        var me = this;
        //每隔50ms生成一个粒子
        setInterval(function () {
            let p = me.genParticle();
            p.x = me.canvas.width/2;
            p.y = me.canvas.height/2;
            console.log()
            me.pativles.push(p);
        }, 100);
        //生成Number个粒子
        for (var i = 0; i < me.numbers; i++) {
            me.pativles.push(me.genParticle());
        }
        //运动初始的粒子
        var timer = setInterval(function () {
            me.ctx.clearRect(0,0,1000,800);
            for(var p in me.pativles){
                me.draw(me.pativles[p]);
                me.pativles[p].x += Math.sin(me.pativles[p].dicrction);
                me.pativles[p].y += Math.cos(me.pativles[p].dicrction);
            }
        }, 30);
        
    }
    /**
     * 生产随机粒子
     */
    Model.prototype.genParticle = function () {
        return {
            //位置
            x: Math.floor(Math.random() * this.canvas.width),
            y: Math.floor(Math.random() * this.canvas.height),
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

        ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.a})`;
        ctx.beginPath();
        
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

    window.Particle = Model;
})();