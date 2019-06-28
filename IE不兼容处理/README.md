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