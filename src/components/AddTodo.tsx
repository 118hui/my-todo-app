// 定義組件的 Props 型別

type Props = {
    text: string;// 綁定輸入框的值
    setText: (value: string) => void;// 更新輸入框的函式
    addTodo: () => void;// 點擊按鈕時要呼叫的新增函式
}

const AddTodo: React.FC<Props> = ({ text, setText, addTodo }) => {
    return (
        <div className="flex mb-4">
            <input
                className="flex-1 p-2 border rounded"
                value={text}// 綁定輸入值
                onChange={e => setText(e.target.value)}// 文字輸入時更新狀態
                placeholder="輸入待辦事項"
            />

            <button
                onClick={addTodo}// 點擊呼叫外部傳入的 addTodo 方法
                className="cursor-pointer ml-2 px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
            >新增</button>
        </div>
    )
}

export default AddTodo