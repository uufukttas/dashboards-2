import React from 'react';
import './Modal.css';

interface ModalBodyProps {
    children: React.ReactNode;
};

const ModalBody = ({ children }: ModalBodyProps) => {
    return (
        <div className="relative p-4 bg-white rounded-lg sm:p-5 max-h-[650px]">
            {children}
        </div>
    );
};

export default ModalBody;
