import React from 'react';
import { Button } from '@projects/button';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import { FaTrashCan } from 'react-icons/fa6';
import useModalManager from 'apps/head-office/src/hooks/useModalManager';
import ConfirmationModal from '../../Modals/ConfirmationModal';

const FileUploadSection: React.FC = () => {
    const profilePagePrefix: string = `${BRAND_PREFIX}-profile`;
    const fileUploadPrefix: string = `${profilePagePrefix}-file-upload`;
    const { openModal } = useModalManager();
    const files = [{
        id: 1,
        name: 'file1.pdf',
        size: '100 KB',
        uploadedAt: '2024-01-01 10:00:00',
        cdnUrl: 'https://cdn.example.com/file1.pdf',
    }]

    return (
        <div className={`${fileUploadPrefix}-form-container flex flex-col justify-between items-center`}>
            <form className={`${fileUploadPrefix}-form flex flex-col  justify-between w-full`}>
                <div className={`${fileUploadPrefix}-input-container flex items-end w-full`}>
                    <div className={`${fileUploadPrefix}-input-container w-2/3 mx-2`}>
                        <Label
                            className={`${fileUploadPrefix}-label block mb-2 text-heading font-semibold px-2`}
                            htmlFor={`${fileUploadPrefix}-input`}
                            labelText='Dosya Yükle'
                        />
                        <Input
                            className={`${fileUploadPrefix}-input border text-text text-sm rounded-lg block w-full p-2.5 focus:ring-primary focus:border-primary`}
                            id={`${fileUploadPrefix}-input`}
                            name={`${fileUploadPrefix}-input`}
                            type='file'
                        />
                    </div>
                    <div className={`${fileUploadPrefix}-submit-button-container mx-2 w-1/3`}>
                        <Button
                            className={`${fileUploadPrefix}-submit-button w-full p-2 bg-primary text-white rounded-lg`}
                            id={`${fileUploadPrefix}-submit-button`}
                            type='submit'
                        >
                            Dosya Yükle
                        </Button>
                    </div>
                </div>
            </form>
            <div className={`${fileUploadPrefix}-file-list-container w-full`}>
                <div className={`${fileUploadPrefix}-file-list flex items-center justify-between p-2 hover:bg-gray-100`}>

                    {files.map((file) => (
                        <div key={file.id} className={`${fileUploadPrefix}-file-item w-2/3 flex items-center justify-between p-2 hover:bg-gray-100`}>
                            <a
                                href={file.cdnUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${fileUploadPrefix}-file-name text-blue-600 hover:text-blue-800 hover:underline`}
                            >
                                {file.name}
                            </a>
                            <div className="flex items-center gap-4">
                                <span className={`${fileUploadPrefix}-file-size text-gray-500`}>
                                    {file.size}
                                </span>
                                <button
                                    onClick={() => openModal('deleteFileModal', <ConfirmationModal name={'confirmationModal'} onConfirm={() => { }} />)}
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                    title="Delete file"
                                >
                                    <FaTrashCan className="text-red-500" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FileUploadSection;
