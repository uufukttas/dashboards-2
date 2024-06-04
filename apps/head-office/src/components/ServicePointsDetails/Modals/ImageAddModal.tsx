import React, { useState } from 'react';
import { Input } from '@projects/input';
import { Button } from '@projects/button';
import { addServicePointImageRequest } from '../../../../app/api/servicePointDetails';
import { IServicePointDetailsModalProps } from '../types';

const FileUpload: React.FC<IServicePointDetailsModalProps> = ({ slug }: IServicePointDetailsModalProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleSubmit = async () => {
        if (!selectedFile) {
            return;
        }

        const formData = new FormData();
        formData.append('Image', selectedFile);
        formData.append('StationId', slug);
        formData.append('FileName', selectedFile.name);

        try {
            await addServicePointImageRequest(formData);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="file-upload">
            <Input
                className="file-input text-sm rounded-lg block w-full p-2.5 mb-4 focus:border-primary mt-4"
                id="file-input"
                name="file-input"
                type="file"
                onChange={handleFileInput}
            />
            <Button
                className="file-upload-button bg-primary text-white rounded-md px-4 py-2"
                id="file-upload-button"
                type="button"
                onClick={handleSubmit}>
                Dosya Yukle
            </Button>
        </div>
    );
};

export default FileUpload;
