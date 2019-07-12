# 低版本 IE 不兼容处理

检测 IE 版本，当判断低于目标版本号时提示用户

将 body 的 visibility 置为 hidden， 再将希望展示的 DOM visibility 置为 visible;
但是有的 DOM 的 visibility 默认为 visible， 需要将他们置为 hidden
注：使用 visibility = "hidden" 来隐藏其他元素

### 检查IE版本
```js
function getIEVersion() {
    var win = window;
    var doc = win.document;
    var input = doc.createElement('input');

    //"!win.ActiveXObject" is evaluated to true in IE11
    if (win.ActiveXObject === undefined) return -1;
    if (!win.XMLHttpRequest) return 6;
    if (!doc.querySelector) return 7;
    if (!doc.addEventListener) return 8;
    if (!win.atob) return 9;
    //"!doc.body.dataset" is faster but the body is null when the DOM is not
    //ready. Anyway, an input tag needs to be created to check if IE is being
    //emulated
    if (!input.dataset) return 10;
    return 11;
}
```

### 低版本IE特殊情况
 - CSS选择器不能嵌套
 - 要专门为`a`标签设置样式，否则在`a`标签包裹的DOM上设置没有下划线是不OK的
 - `a`标签点击不能跳转，要做一个蒙层，让`a`标签变成一个方块然后覆盖按钮，让用户点击按钮能够跳转链接
  

### IE5~6 png图片背景不透明
```js
function correctPNG() // correctly handle PNG transparency in Win IE 5.5 & 6.
{
    var arVersion = navigator.appVersion.split("MSIE")
    var version = parseFloat(arVersion[1])
    if ((version >= 5.5) && (document.body.filters)) {
        for (var j = 0; j < document.images.length; j++) {
            var img = document.images[j]
            var imgName = img.src.toUpperCase()
            if (imgName.substring(imgName.length - 3, imgName.length) == "PNG") {
                var imgID = (img.id) ? "id='" + img.id + "' " : ""
                var imgClass = (img.className) ? "class='" + img.className + "' " : ""
                var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' "
                var imgStyle = "display:inline-block;" + img.style.cssText
                if (img.align == "left") imgStyle = "float:left;" + imgStyle
                if (img.align == "right") imgStyle = "float:right;" + imgStyle
                if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle
                var strNewHTML = "<span " + imgID + imgClass + imgTitle +
                    " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";" +
                    "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader" +
                    "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>"
                img.outerHTML = strNewHTML
                j = j - 1
            }
        }
    }
}
```