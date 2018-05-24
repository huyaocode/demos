# 手风琴
## 效果图
![此处输入图片的描述][1]

## 文本框溢出
[参考我的博客][2]

## 改进
将额外修改CSS的操作屏蔽掉了

## JQ错误处理
### 报错类型

    Uncaught TypeError: jQuery.easing[this.easing] is not a function
        at init.run (jquery.js:6656)
        at tick (jquery.js:7034)
        at Function.jQuery.fx.timer (jquery.js:7379)
        at Animation (jquery.js:7109)
        at HTMLLIElement.doAnimation (jquery.js:7223)
        at Function.dequeue (jquery.js:4396)
        at HTMLLIElement.<anonymous> (jquery.js:4438)
        at Function.each (jquery.js:368)
        at jQuery.fn.init.each (jquery.js:157)
        at jQuery.fn.init.queue (jquery.js:4431)

### 错误原因：
属性名写错

    event.animate({
            'width': '400px'
        }, 300, 'linear')

linear写错了就会报以上错误

## !(a && b) 与 !a && !b的区别 

!( 0 && 1 ) &nbsp;== 1 
&nbsp;  !0 && !1 &nbsp; == 0 

!( 1 && 1 ) &nbsp;== 0 
&nbsp;  !1 && !1 &nbsp; == 0 

!( 0 && 0 ) &nbsp;== 1 
&nbsp;  !0 && !0 &nbsp; == 1 


  [1]: https://raw.githubusercontent.com/huyaocode/demos/master/%E6%89%8B%E9%A3%8E%E7%90%B4/demo.gif
  [2]: https://blog.csdn.net/qq_37746973/article/details/80445588