import './Modal.css';

interface IModalBodyProps {
    children: React.ReactNode;
};

const ModalBody = ({ children }: IModalBodyProps) => {
    return (
        <div className="sh-service-point-modal-content-container relative bg-white rounded-lg max-h-[650px]">
            {children}
        </div>
    );
};

export default ModalBody;
