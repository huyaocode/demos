# Reudx 

### Action
在写业务代码时，我们往往直接在组件中操作数据，比如说这样：
```jsx
  const removeTodo = useCallback(id => {
    setTodos(todos =>
      todos.filter(todo => {
        return todo.id !== id;
      })
    );
  }, []);
```
缺点：**不能直观简洁的看出对todos做了怎样的操作，而且处理业务与视图揉在一起**
所以使用`action`替代。
```js
{
  type: '' // 描述对数据进行怎样操作
  payload: '' // 描述执行这个操作需要怎样的数据
}
```

### dispatch
让每一个action都经过一个中间函数，这个函数里就可以集中处理副作用或者一些状态更新行为
