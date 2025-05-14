// 定義 Todo 的型別資料結構

export interface Todo {
    id: string;// - id: 每筆待辦的唯一識別碼
    text: string;// - text: 使用者輸入的待辦事項內容
    completed: boolean;// - completed: 是否已完成
}