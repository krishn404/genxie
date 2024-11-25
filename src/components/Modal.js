// src/components/Modal.js
import React from 'react';
import { motion } from 'framer-motion';

const Modal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null; // Don't render the modal if it's not open

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <motion.div
                className="bg-white p-6 rounded-lg shadow-lg w-80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <h2 className="text-lg font-semibold text-center">{message}</h2>
                <div className="flex justify-around mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                    >
                        No
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                        Yes
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Modal;
