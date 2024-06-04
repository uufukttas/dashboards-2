import React, { useState } from 'react';
import FormData from 'form-data';
import { Input } from '@projects/input';
import { Button } from '@projects/button';
import { addServicePointImageRequest } from '../../../../app/api/servicePointDetails';
import type FormData from 'form-data'

interface FileUploadProps {
    slug: string; // Optional callback function to inform parent components
}

const FileUpload: React.FC<FileUploadProps> = ({ slug }: FileUploadProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>("");

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleSubmit = async () => {
        if (!selectedFile) {
            setUploadStatus("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append('Image', selectedFile);
        formData.append('StationId', slug);
        formData.append('FileName', selectedFile.name);

        console.log('formData', formData)
        try {
            // const response = await addServicePointImageRequest(formData);

            // setUploadStatus("File uploaded successfully: " + response.message);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="file-upload">
            <Input
                className="file-input text-sm rounded-lg block w-full p-2.5 mb-4  focus:border-primary mt-4"
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
                Yukle
            </Button>
            {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
        </div>
    );
};

export default FileUpload;
