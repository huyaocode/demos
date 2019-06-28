/**
 * 检测IE版本，当判断低于目标版本号时提示用户
 *
 * 将body的 visibility 置为 hidden， 再将希望展示的DOM visibility 置为 visible;
 * 但是有的DOM的 visibility 默认为 visible， 需要将他们置为 hidden
 * 注：使用 visibility = "hidden" 来隐藏其他元素
 */
var ieVersion = getIEVersion();
var isSheet = window.location.pathname.match(/^\/sheet/) ? true : false;

function compatibilityCheck() {
    if ((ieVersion > 0 && ieVersion <= 9) || (isSheet && ieVersion > 0 && ieVersion <= 10)) {
        insertStyle();
        hideOtherDom();
        showSuggest();
    }
}

function hideOtherDom() {
    document.getElementsByTagName('body')[0].style.visibility = 'hidden';

    var hidddenClases = ['web_header_bottom'];
    var hidddenIds = ['doc-bottom-tools', 'padAloneTitle', 'input-title'];
    var showClases = ['brand-container', 'form-header-brank-wrap'];
    var showIds = ['brand-container'];

    var i, j, dom, doms;

    for (i = 0; i < hidddenClases.length; i++) {
        var doms = document.getElementsByClassName(hidddenClases[i]);
        for (j = 0; j < doms.length; j++) {
            doms[j].style.visibility = 'hidden';
        }
    }
    for (i = 0; i < hidddenIds.length; i++) {
        var dom = document.getElementById(hidddenIds[i]);
        if (dom) {
            dom.style.visibility = 'hidden';
        }
    }
    for (i = 0; i < showClases.length; i++) {
        doms = document.getElementsByClassName(showClases[i]);
        for (j = 0; j < doms.length; j++) {
            doms[j].style.visibility = 'visible';
            doms[j].style.zIndex = '100';
        }
    }
    for (i = 0; i < showIds.length; i++) {
        dom = document.getElementById(showIds[i]);
        if (dom) {
            dom.style.visibility = 'visible';
            dom.style.zIndex = '100';
        }
    }
}

function showSuggest() {
    var nosupprtDom = document.createElement('div');
    nosupprtDom.className = 'nosupprt';
    nosupprtDom.innerHTML =
        '<div class="suggest-wrap">\
            <img src="http://s1.url.cn/tim/docs/forms/img/img/low-version-ie10-524672.png" alt="" />\
            <div class="suggest-content">\
                <p>很抱歉，我们暂不支持您的浏览器版本（' +
        (isSheet ? 'IE10' : 'IE9') +
        '及以下）。</p>\
                <p>推荐您下PC客户端，体验更流畅。</p>\
            </div>\
                <a href="">\
                    <button class="dui-button dui-button-type-primary dui-button-size-large">\
                        <div class="dui-button-container">立即下载</div>\
                    </button>\
                </a>\
            </div>';
    var bodyDom = document.getElementsByTagName('body')[0];
    bodyDom.style.backgroundColor = '#f7f8f9';
    bodyDom.appendChild(nosupprtDom);
}

function insertStyle() {
    var st = document.createElement('style');
    document.body.appendChild(st);
    st.innerHTML = "\
    .nosupprt {\
            position: absolute;\
            top: 0px;\
            left: 0;\
            width: 100%;\
            height: 100%;\
            color: #bfbfbf;\
            visibility: visible;\
            z-index: 99;\
        }\
        .nosupprt .suggest-wrap {\
            position: absolute;\
            top: 50%;\
            left: 50%;\
            margin-top: -200px;\
            margin-left: -204px;\
            text-align: center;\
        }\
        .nosupprt .suggest-wrap .suggest-content {\
            margin-bottom: 30px;\
        }\
        .nosupprt .suggest-wrap p {\
            margin: 5px;\
            padding: 0;\
            font-size: 16px;\
        }\
        .nosupprt .suggest-wrap img {\
            width: 170px;\
            margin-left: -60px;\
        }\
    ";
}

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






compatibilityCheck();
