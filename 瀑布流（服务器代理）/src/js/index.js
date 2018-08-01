
var pageNum = 1,
    isLoading = false;
    oLis = document.getElementsByClassName('box');

var httpdomain = "http://localhost:8088/waterfall/";

function getData() {
    if(!isLoading){ //加一个锁，不然滑到页底用户一直下拉就会一直触发这个事件
        isLoading = true;
        document.getElementsByClassName('loading')[0].style.display = "block";
        ajax('GET', httpdomain + 'src/js/getPics.php', addDom, 'cpage=' + pageNum, true);
        pageNum++;
    }
}
//将一页的数据插入到dom中，每单个插如都向最短的那一列中插入。
function addDom(data) {
    dataList = JSON.parse(data);
    if(dataList.length == 0){
        window.onscroll = null;
        document.getElementsByClassName('loading')[0].innerText = "我是有底线的";
        return;
    }
    dataList.forEach(function(ele, index){
        //算出要插入到那个li里
        var insertIndex = getMinLenLi();
        //创建dom
        var oItem = document.createElement('div'),
            oCont = document.createElement('div'),
            oImg = document.createElement('img'),
            oP = document.createElement('p');
        //添加class名
        oItem.setAttribute('class', 'item');
        oCont.setAttribute('class', 'cont');
        //插入文字描述
        oP.innerText = ele.title;
        //加载图片资源
        oImg.src = ele.preview;
        //构建dom结构
        oCont.appendChild(oImg);
        oItem.appendChild(oCont);
        oItem.appendChild(oP);
        //插入到li中
        oLis[insertIndex].appendChild(oItem);
    })
    document.getElementsByClassName('loading')[0].style.display = "none";
    isLoading = false;
}

/**
 * 求所有纵列中最短的那一个
 */
function getMinLenLi() {
    var minLen = parseInt(oLis[0].offsetHeight),
        minIndex = 0;
    for (var i = 1; i < oLis.length; i++) {
        var liHight = parseInt(oLis[i].offsetHeight);
        if (liHight < minLen) {
            minLen = liHight
            minIndex = i;
        }
    }
    return minIndex;
}
/**
 * 监听鼠标滚动事件，当滚到底部的时候开始加载
 */
window.onscroll = function(){
    var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var minLiLen = oLis[getMinLenLi()].offsetHeight;
    if(scrollHeight + clientHeight > minLiLen){
        getData();
    }
}

getData();