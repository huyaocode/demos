/*
 * 多物体链式运动，多值同时运动
 */
function startMove(obj, json, callback) {
	clearInterval(obj.timer);
	var iSpeed, iCur;
	obj.timer = setInterval(function () {
		var stopFlag = true;
		for (var attr in json) {
			if (attr == 'opacity') {
				iCur = parseFloat(getStyle(obj, 'opacity')) * 100;
			} else {
				iCur = parseInt(getStyle(obj, attr));
			}
			iSpeed = (json[attr] - iCur) / 7;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			if (attr == 'opacity') {
				obj.style.opacity = (iCur + iSpeed) / 100;
			} else {
				obj.style[attr] = iCur + iSpeed + 'px';
			}
			if (iCur != json[attr]) {
				stopFlag = false;
			}
		}
		if (stopFlag) {
			clearInterval(obj.timer);
			callback && callback();
		}
	}, 30);
}

//获取样式属性值
function getStyle(obj, attr) {
	if (obj.currentStyle) {	//兼容IE
		return obj.currentStyle[attr];
	} else {
		return window.getComputedStyle(obj, false)[attr];
	}
}