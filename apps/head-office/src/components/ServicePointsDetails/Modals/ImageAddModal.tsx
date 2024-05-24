import { Button } from '@projects/button';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { BRAND_PREFIX } from 'apps/head-office/src/constants/constants';
// import React, { useState } from 'react';

const ImageAddModal: React.FC= () => {
    // const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.files && event.target.files[0]) {
    //         setSelectedFile(event.target.files[0]);
    //     } else {
    //         setSelectedFile(null);
    //     }
    // };

    // const handleUpload = async () => {
    //     if (!selectedFile) {
    //         alert('Please select a file first.');
    //         return;
    //     }

    //     // Placeholder for file upload logic
    //     console.log('Uploading', selectedFile);
    //     // After uploading you might want to close the modal or clear the selected file
    //     setSelectedFile(null);
    //     onClose();
    // };

    // if (!isOpen) return null;

    const handleSubmit = (event: React.FormEvent) => {
        console.log('event', event)
    };

    return (
        <div className={`${BRAND_PREFIX}-modal-form-container relative p-6 bg-white rounded-lg`}>
            <form
                className={`${BRAND_PREFIX}-add-form w-full`}
                onSubmit={handleSubmit}
            >
                <div className={`${BRAND_PREFIX}-connector-type-container`}>
                    <Label
                        className={`connector-type-label block mb-2 text-heading font-semibold`}
                        htmlFor={`connector-type-dropdown`}
                        labelText={`Konnektör Tipi`}
                    >
                        <span className="text-md text-error">*</span>
                    </Label>
                    <Input

                        className={`connector-type-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary`}
                        id={`connector-type-dropdown`}
                        name={`connector-type-dropdown`}
                        type="file"
                        onChange={() => { }}
                    />
                    <Button
                        buttonText='Kaydet'
                        className={`connector-type-add-button bg-primary text-white w-full py-2.5 rounded-lg`}
                        // disabled={isDisabled}
                        id='addConnectorButton'
                        type='submit'
                    />
                </div>
            </form>
        </div>
    );
};

export default ImageAddModal;
