# 别踩白块游戏

## 效果展示
![demo](./demo.gif)

## 让inline-block挨在一起
虽然设置了块为display: inline-block,并且每个块的margin都是0， 但是这些块就是不挤在一起</br>
解决方法: float: left;

## 重玩
把事件的逻辑梳理好， 涉及多个绑定事件，建议不一样的页面使用不一样的dom来展示，防止一个dom绑定两个事件的情况发生。