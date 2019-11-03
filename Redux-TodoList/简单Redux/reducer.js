/*
 * reducer按照不同模块拆分后需要合并
 * 使得不同数据字段，分开使用action
 */
function combineReducers(reducers) {
  return function reducer(state, action) {
    const changed = {};
    for (let key in reducers) {
      changed[key] = reducers[key](state[key], action);
    }
    return {
      ...state,
      ...changed
    };
  };
}
/**
 * reduer意义在于从数据维度来处理aciton 
 */
const reducers = {
  todos(state, action) {
    const { type, payload } = action;
    switch (type) {
      case 'set':
        return payload;

      case 'add':
        return [...state, payload];

      case 'remove':
        return state.filter(todo => {
          return todo.id !== payload;
        });

      case 'toggle':
        return state.map(todo => {
          return todo.id === payload
            ? {
                ...todo,
                complete: !todo.complete
              }
            : todo;
        });

      default:
        return state;
    }
  },
  incrementCount(state, action) {
    const { type } = action;
    switch (type) {
      case 'add':
        return state + 1;
      default:
        return state;
    }
  }
};

// 从数据的维度来做统一处理
export default combineReducers(reducers);
