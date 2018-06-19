/*
 * 多物体链式运动，多值同时运动
 */
function startMove(obj, target){
	clearInterval(obj.timer);
	var iSpeed =40,
		a,
		u = 0.8; // 减速系数
	obj.timer = setInterval(function(){
		a = (target - obj.offsetLeft) / 8;
		iSpeed += a;
		iSpeed *= u;
		if(Math.abs(iSpeed) <=1 && Math.abs(target - obj.offsetLeft) <=1) {
			clearInterval(obj.timer);
			obj.style.left = target + 'px';
		} else {
			obj.style.left = obj.offsetLeft + iSpeed + 'px';
		}
	}, 30);
}
