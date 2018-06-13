var pars = {
    rotateNum: 5,
    body: '.wrapper',
    button: '.btn',
    rotateBox: '.box',
    clickCb: clickCbFun,
    renderCb: renderCbFun
}

var lottery = new Lottery(pars);
function clickCbFun() {
    var random = Math.floor(Math.random() * 360);
    lottery.goRotate(random);
}
function renderCbFun(deg) {
    var str = '';
    if(deg >= 0 && deg < 45) {
        str = '二等奖';
    }else if(deg >= 45 && deg < 90 || deg >= 135 && deg < 180 || deg >= 225 && deg < 270 || deg >= 315 && deg < 360) {
        str = '四等奖';
    }else if(deg >= 90 && deg < 135 || deg >= 270 && deg < 315) {
        str = '三等奖';
    }else if(deg >= 180 && deg < 225) {
        str = '一等奖';
    }
    alert('恭喜你获得'+str);
}