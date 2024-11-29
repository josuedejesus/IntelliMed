import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-lg max-w-md w-full p-4 relative"
                onClick={(e) => e.stopPropagation()} 
            >
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button
                        className="text-gray-500 hover:text-gray-700 font-bold text-xl"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>
                <div className="text-gray-700">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
