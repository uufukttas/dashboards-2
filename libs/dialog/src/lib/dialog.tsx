import { Button } from "@projects/button";
import { FaRegCircleXmark } from "react-icons/fa6";

export interface DialogProps {
  handleCancel: () => void;
  handleSuccess?: () => void;
};

export function Dialog({ handleCancel, handleSuccess }: DialogProps) {
  return (
    <div className="dialog-wrapper flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-40 justify-center items-center w-full md:inset-0 bg-[#54565a33] block h-full">
      <div className="dialog-container relative p-4 bg-white rounded-lg shadow sm:p-5 relative p-4 w-full max-w-2xl sm:h-auto">
        <div className="dialog-header-container flex justify-between items-center border-b">
          <h2 className="dialog-text text-lg font-semibold">Emin Misin?</h2>
          <Button
            className="dialog-close-button flex items-center justify-center h-8 w-8 rounded-lg p-1.5 hover:cursor-pointer"
            id={`dialog-close-button`}
            type="button"
          >
            <FaRegCircleXmark />
          </Button>
        </div>
        <div className={`dialog-content-container flex justify-between items-center flex-col py-4`}>
          <p className="dialog-content-text">Silme işlemi geri alınamaz.</p>
          <div className="dialog-button-container mt-8 flex items-center justify-evenly w-full">
            <Button
              className="dialog-accept-button bg-red-700 text-white hover:bg-red-600 border rounded-md w-1/3"
              id={`dialog-accept-button`}
              type="button"
              onClick={handleSuccess}
            >
              Sil
            </Button>
            <Button
              className="dialog-cancel-button bg-secondary hover:bg-secondary-lighter border rounded-md w-1/3 text-white"
              id={`dialog-cancel-button`}
              type="button"
              onClick={handleCancel}
            >
              İptal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
