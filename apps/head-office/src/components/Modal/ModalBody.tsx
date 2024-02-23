import './Modal.css';

interface IModalBodyProps {
    children: React.ReactNode;
};

const ModalBody = ({ children }: IModalBodyProps) => {
    return (
        <div className="relative p-4 bg-white rounded-lg sm:p-5 max-h-[650px]">
            {children}
        </div>
    );
};

export default ModalBody;
