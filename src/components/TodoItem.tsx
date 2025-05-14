import type { Todo } from '../types/todo';
import React, { useState } from "react";
import ConfirmModal from './ConfirmModal';


// 定義 Props 型別，從父層接收的資料與操作函式
interface Props {
    todo: Todo;
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
}

const TodoItem: React.FC<Props> = ({ todo, toggleTodo, deleteTodo }) => {

    const [modalOpen, setModalOpen] = useState(false);

    const handleConfirmDelete = () => {
        deleteTodo(todo.id);
        setModalOpen(false);
    }
    return (
        <div>
            <div className='flex justify-between items-center p-2 border rounded mb-2'>
                <div className={`cursor-pointer flex items-center gap-2 transition-all duration-200 hover:scale-110 ${todo.completed ? 'line-through text-green-600' : ''}`}
                    onClick={() => toggleTodo(todo.id)}
                    title={todo.completed ? '已完成，點擊取消完成' : '點擊標記為完成'}
                >{todo.completed ? '✅' : '☐'}
                    {todo.text}
                </div>
                <button
                    onClick={() => setModalOpen(true)}
                    className="cursor-pointer ml-4 text-red-500 hover:text-red-700"
                >刪除</button>
            </div>

            <ConfirmModal
                open={modalOpen} // 控制開關
                onClose={() => setModalOpen(false)} // 點取消或背景關閉 modal
                onConfirm={handleConfirmDelete} // 點確認後刪除 todo
                message="確定要刪除這筆待辦事項嗎？"
            />
        </div>
    )
}

export default TodoItem