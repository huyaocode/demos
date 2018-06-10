/**
 * 状态管理、
 * 所有的状态都由这个闭包的函数管理
 * 每次修改状态都通过这里，修改状态后就可以调用函数了
 * @param {obj} initState 初始状态
 */
function createStore(initState) {
    var handleList = [];
    var state = initState;
    /**
     * 获得状态的唯一接口
     */
    function getState() {
        return state;
    }
    /**
     * 函数订阅
     * @param {function} handle 对state的处理函数
     */
    function subscribe(handle){
        handleList.push(handle);
    }
    /**
     * 修改状态的唯一接口
     * 每一次获得新的状态，会触发所有的订阅事件
     * @param {obj} action 
     */
    function dispath(action){
        state[action.type] = action.value;
        handleList.forEach(function(ele, index){
            ele();
        })
    }
    return {
        getState: getState,
        subscribe: subscribe,
        dispath: dispath
    }
}
// var store = createStore({type: 'text', value: ''})