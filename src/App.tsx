import AddTodo from "./components/AddTodo";
import TodoItem from './components/TodoItem';
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Todo } from './types/todo';

// 定義過濾類型（Filter）選項為常數陣列
const FILTERS = ['全部', '未完成', '已完成'] as const;
type FilterType = typeof FILTERS[number];
const App: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>(() => {
    // 嘗試從 localStorage 獲取之前存儲的 todos 資料
    const stored = localStorage.getItem('todos');
    // 如果存在資料則解析 JSON 並作為初始值
    // 如果不存在則返回空陣列作為初始值
    return stored ? JSON.parse(stored) : [];
  });
  const [text, setText] = useState('');
  const [filter, setFilter] = useState<FilterType>('全部');

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos([...todos, { id: uuidv4(), text, completed: false }]);
    setText('');
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === '全部') return true;
    if (filter === '未完成') return !todo.completed;
    return todo.completed;
  });

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 每當 todos 狀態改變時，將最新的 todos 陣列轉換為字串後存入 localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md'>
      <h1 className="text-2xl font-bold mb-4 text-center">📝 Todo List</h1>

      <AddTodo text={text} setText={setText} addTodo={addTodo} />

      <div className="flex justify-center gap-2 mb-4">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`px-2 py-1 border rounded cursor-pointer ${filter === f ? 'bg-sky-500 text-white hover:bg-sky-600' : ''
              }`}
            onClick={() => setFilter(f)}
          >{f}</button>
        ))}
      </div>

      <div>
        {filteredTodos.length === 0 ? (
          <p className="text-center text-gray-500">目前沒有待辦事項</p>
        ) : (
          filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default App