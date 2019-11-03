import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  memo
} from 'react';
import './App.css';

let idSeq = Date.now();
const LS_KEY = '_$-todos_';

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
            removeTodo={removeTodo}
            toggleTodo={toggleTodo}
          />
        );
      })}
    </ul>
  );
});

const TodoList = memo(() => {
  console.log('TodoList render');
  const [todos, setTodos] = useState([]);

  const addTodo = useCallback(todo => {
    console.log('add todos ');
    setTodos(todos => [...todos, todo]);
  }, []);

  const removeTodo = useCallback(id => {
    setTodos(todos =>
      todos.filter(todo => {
        return todo.id !== id;
      })
    );
  }, []);

  const toggleTodo = useCallback(id => {
    setTodos(todos =>
      todos.map(todo => {
        return todo.id === id
          ? {
              ...todo,
              complete: !todo.complete
            }
          : todo;
      })
    );
  }, []);

  // 副作用 ：读取缓存 保存到缓存
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(LS_KEY)) || [];
    setTodos(todos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todo-list">
      <Control addTodo={addTodo} />
      <Todos todos={todos} removeTodo={removeTodo} toggleTodo={toggleTodo} />
    </div>
  );
});

export default TodoList;

/**
 * 对于函数组件，使用memo可以节省很多不必要的开销
 */
