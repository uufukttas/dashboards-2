import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from '@projects/input';
import { Button } from '@projects/button';
import { addServicePointImageRequest } from '../../../../app/api/servicePointDetails';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';
import { IServicePointDetailsModalProps } from '../types';

const FileUpload: React.FC<IServicePointDetailsModalProps> = ({ slug }: IServicePointDetailsModalProps) => {
    const dispatch = useDispatch();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

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

        dispatch(toggleModalVisibility(false));
    };

    return (
        <div className="file-upload">
            <form className="file-upload-form" onSubmit={handleSubmit}>
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
                    type="submit"
                >
                    Dosya Yukle
                </Button>
            </form>
        </div>
    );
};

export default FileUpload;
