# 放大镜

## 效果展示
![demo](./demo.gif)

## 思路
将图片在放大展示区按照比例放大后，根据鼠标在图片展示区的位置来动态改变放大镜在放大窗口中的位置。被放大的图片只展示一部分，那就是放大镜。

## 让图片自适应的展示在展示区中
如果图片宽大于高，那么让图片宽等于展示区宽，高度按对应的比例展示。并且垂直居中。</br>
图片样式, 让他水平和垂直居中
```css
.imgCover img{
    position:absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
```
```javascript
var img = new Image();
img.src = src;
imgW = img.width;   //图片原本的宽度
imgH = img.height;  //图片原本高度
if (imgW >= img.height) {
    imgW = showSize;
    imgH = imgH / imgW * showSize;   //宽高以比例缩放
} else {
    imgH = showSize;
    imgW = imgW / imgH * showSize;
}
imgCov.empty().append('<img src="' + src + '" width=' + imgW + ' height=' + imgH + '>');
```

## 放大镜的边界处理-鼠标移出但放大镜贴边展示
让一个块始终停留在固定区域内
```javascript
var endX = (X > minXl) ? ( (X < maxXr) ? X : maxXr ) : minXl;
var endY = (Y > minYt) ? ( (Y < maxYb) ? Y : maxYb ) : minYt; 
```