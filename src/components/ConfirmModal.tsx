// ConfirmModal 元件：提示用戶「是否確定刪除」的彈出視窗
import React from 'react';
import '../ConfirmModal.scss';
// 定義元件所需的 props 類型
interface ConfirmModalProps {
    open: boolean; // 是否開啟 modal
    onClose: () => void; // 點取消或背景時關閉 modal
    onConfirm: () => void; // 點「確定」時觸發父層動作
    message: string; // 顯示的提示訊息
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ open, message, onClose, onConfirm }) => {
    //如果 open 為 false 則不渲染任何東西
    if (!open) return null;
    return (
        <div className='modal-backdrop'>
            <div className='modal'>
                <p>{message}</p>

                <div className='actions'>
                    <button className='cursor-pointer ml-2 px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600'
                        onClick={onClose}
                    >
                        取消
                    </button>

                    <button className='cursor-pointer ml-2 px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600'
                        onClick={onConfirm}
                    >
                        確定
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal