import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import { createAdd, createRemove, createSet, createToggle } from './actions';
import './App.css';
import reducer from './reducer';
let idSeq = Date.now();
const LS_KEY = '_$-todos_';

/**
 * 先创建action对象，然后通过dispath统一处理action
 * 既然都要dispath，那么就直接使用bindActionCreators去绑定来派发
 */
function bindActionCreators(actionCreators, dispath) {
  let ret = {};
  for (let key in actionCreators) {
    ret[key] = function(...args) {
      const actionCreator = actionCreators[key];
      const action = actionCreator(...args);
      dispath(action);
    };
  }
  return ret;
}

const Control = memo(props => {
  console.log('Control render');
  const { addTodo } = props;
  const inputRef = useRef();

  const onSubmit = e => {
    e.preventDefault();
    const newText = inputRef.current.value.trim();
    if (newText === '') {
      return;
    }

    addTodo({
      id: ++idSeq,
      text: newText,
      complete: false
    });

    inputRef.current.value = '';
  };

  return (
    <div className="control">
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          ref={inputRef}
          className="new-todo"
          placeholder="What needs to be done"
        />
      </form>
    </div>
  );
});

const TodoItem = memo(props => {
  console.log('TodoItem render');
  const {
    todo: { id, text, complete },
    toggleTodo,
    removeTodo
  } = props;

  const onChange = () => {
    toggleTodo(id);
  };

  const onRemove = () => {
    removeTodo(id);
  };

  return (
    <li className="todo-item">
      <input type="checkbox" onChange={onChange} checked={complete} />
      <label className={complete ? 'complete' : ''}>{text}</label>
      <button onClick={onRemove}>&#xd7;</button>
    </li>
  );
});

const Todos = memo(props => {
  console.log('Todos render');
  const { todos, toggleTodo, removeTodo } = props;

  return (
    <ul>
      {todos.map(todo => {
        return (
          <TodoItem
            todo={todo}
            key={todo.id}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
          />
        );
      })}
    </ul>
  );
});

const TodoList = memo(() => {
  console.log('TodoList render');
  const [todos, setTodos] = useState([]);
  const [incrementCount, setIncrementCount] = useState(0);

  const dispath = useCallback(
    action => {
      const state = {
        todos,
        incrementCount
      };
      const setters = {
        todos: setTodos,
        incrementCount: setIncrementCount
      };

      const newState = reducer(state, action);

      for (let key in newState) {
        setters[key](newState[key]);
      }
    },
    [todos, incrementCount]
  );

  // 副作用 ：读取缓存 保存到缓存
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(LS_KEY)) || [];
    dispath(createSet(todos));

  }, []);// eslint-disable-line

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todo-list">
      <Control
        {...bindActionCreators(
          {
            addTodo: createAdd
          },
          dispath
        )}
      />
      <Todos
        todos={todos}
        {...bindActionCreators(
          {
            toggleTodo: createToggle,
            removeTodo: createRemove
          },
          dispath
        )}
      />
    </div>
  );
});

export default TodoList;

/**
 * 对于函数组件，使用memo可以节省很多不必要的开销
 */
