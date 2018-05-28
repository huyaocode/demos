# 可筛选列表

## 效果展示
[demo]('')
## 多条件筛选的实现

```javascript
//选择条件&实现函数
var stateFilter = {
    text: {
        value: '',
        func: filterText
    },
    sex: {
        value: 'all',
        func: filterSex
    }
}
/**
 * 叠加选择
 * 把多种属性一起拿来做筛选条件
 */
function addFunc(obj, arr){

    var lastArr = arr;
    for(var prop in obj){
        lastArr = obj[prop].func(obj[prop].value, lastArr);
    }

    return lastArr;
}
```

## filter方法总结
filter可实现筛选</br>
在filter中传入一个回掉函数，这个函数接受的第一个参数为数组中的每一项</br>
回掉函数对这一项进行判断， 返回true则把这个元素添加到被返回的新数组中</br>

```javascript
arr.filter(function(ele, index, arr){
    return true / false; 
})
```
返回的新数组与旧数组独立，但是不代表在filter的回掉函数中不可以改变原数组的引用类型值
```javascript
var arr = [ {name: 'a', age: 2},
			{name: 'b', age: 3},
			{name: 'c', age: 4},
			{name: 'd', age: 5},
			{name: 'e', age: 6}
		];
console.log(arr.filter(function(ele){
	return ele.age++;
}));
```
以上操作后原数组中的age都被加一

## 单选效果实现
```
//将被添加的选中类的类名置为空，然后将被选中的div的dom添加选中类名
document.getElementsByClassName('active')[0].className = '';
 e.target.className = 'active';
```

## JS中的字符串

单引号内可以加双引号，双引号内可以加单引号</br>
如果需要字符串拼接,可以使用这种方法,在每行末尾添加反斜杠

```javascript
'<li>\
    <img src="./img/'+ ele.src +'" alt="" srcset="">\
    <span class="name">'+ ele.name +'</span>\
    <span class="des">'+ ele.des +'</span>\
</li>'
```