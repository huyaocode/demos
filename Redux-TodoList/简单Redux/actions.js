/**
 * actionCreator
 * 避免每一次都写action, 而且统一Action
 * 引入actionCreator就是为了把action的创建过程化，目前用actionCreator的唯一用处就是用dispath去派发
 */

export function createAdd(payload) {
  return {
    type: 'add',
    payload
  };
}

export function createRemove(payload) {
  return {
    type: 'remove',
    payload
  };
}

export function createToggle(payload) {
  return {
    type: 'toggle',
    payload
  };
}

export function createSet(payload) {
  return {
    type: 'set',
    payload
  };
}
