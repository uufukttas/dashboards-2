import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from '@projects/input';
import { Button } from '@projects/button';
import { addServicePointImageRequest } from '../../../../app/api/servicePointDetails';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';
import { IServicePointDetailsModalProps } from '../types';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/src/ReactCrop.scss';

const FileUpload: React.FC<IServicePointDetailsModalProps> = ({
  slug,
}: IServicePointDetailsModalProps) => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageSrc, setImageSrc] = useState('');

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setImageSrc(reader.result?.toString() || '')
      );
      // @ts-ignore
      reader.readAsDataURL(e.target.files[0]);

      setSelectedFile(file);
    }
  };

  const getCroppedImg = (image: HTMLImageElement, crop: Crop) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx?.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise<string>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        const fileUrl = URL.createObjectURL(blob);
        resolve(fileUrl);
      }, 'image/jpeg',1);
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    if (!imageRef.current || !crop) {
      return;
    }
    if (!selectedFile) {
      return;
    }

    const croppedImageUrl = await getCroppedImg(imageRef.current, crop);

    const _file = await fetch(croppedImageUrl)
      .then((r) => r.blob())
      .then(
        (blobFile) =>
          new File([blobFile], selectedFile.name, { type: 'image/jpeg' })
      );

    const formData = new FormData();

    formData.append('forceWrite', 'true');
    formData.append('fileName', selectedFile.name);
    formData.append('pathKey', 'station');
    formData.append('stationId', slug);
    formData.append('image', _file);

    try {
      await addServicePointImageRequest(formData);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
    dispatch(toggleModalVisibility(false));
    window.location.reload();
  };

  const handleReset = () => {
    setSelectedFile(null);
    setImageSrc('');
    setCrop(undefined);
  };

  return (
    <div className="file-upload">
      {!selectedFile && (
        <form
          className="file-upload-form border border-dashed my-8 items-center text-center p-12 "
          onSubmit={handleSubmit}
        >
          <Input
            className=""
            id="file-input"
            name="file-input"
            type="file"
            onChange={handleFileInput}
          />
        </form>
      )}
      {selectedFile && (
        <div className="items-center justify-center flex flex-col">
          <ReactCrop
            crop={crop}
            onChange={setCrop}
            aspect={4 / 3}
            minWidth={400}
            minHeight={225}
          >
            <img ref={imageRef} src={imageSrc} alt="Crop" />
          </ReactCrop>
          <div className="flex flex-row gap-4 mt-8 w-full">
            <Button
              className="file-upload-button bg-blue-700 text-white rounded-md px-4 py-2 w-2/3"
              id="file-upload-button"
              type="submit"
              onClick={handleSubmit}
              disabled={!crop}
            >
              Kaydet
            </Button>
            <Button
              className="file-upload-button bg-orange-500 text-white rounded-md px-4 py-2 w-1/3"
              id="file-upload-button"
              type="submit"
              onClick={handleReset}
            >
              Sıfırla
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
