import { Button } from '@projects/button';
import { Input } from '@projects/input';
import React, { useRef, useState } from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/src/ReactCrop.scss';

interface IImageUploadProps {
  form: FieldValues;
  name: string;
  label?: string;
  onSuccess?: (croppedFile: File) => void;
  aspect?: number;
  minWidth?: number;
  minHeight?: number;
}

const ImageUpload: React.FC<IImageUploadProps> = ({
  form,
  name,
  label,
  onSuccess,
  aspect = 4 / 3,
  minWidth = 400,
  minHeight = 225,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageSrc, setImageSrc] = useState('');

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setImageSrc(reader.result?.toString() || ''));
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const getCroppedImg = (image: HTMLImageElement, crop: Crop): Promise<string> => {
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
      crop.height,
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Canvas is empty'));
            return;
          }
          const fileUrl = URL.createObjectURL(blob);
          resolve(fileUrl);
        },
        'image/jpeg',
        1,
      );
    });
  };

  const handleSubmit = async () => {
    if (!imageRef.current || !crop || !selectedFile) return;

    const croppedImageUrl = await getCroppedImg(imageRef.current, crop);
    const croppedFile = await fetch(croppedImageUrl)
      .then((r) => r.blob())
      .then((blobFile) => new File([blobFile], selectedFile.name, { type: 'image/jpeg' }));

    form.setValue(name, croppedFile);
    onSuccess?.(croppedFile);
    setIsSaved(true);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setImageSrc('');
    setCrop(undefined);
    form.setValue(name, null);
  };

  return (
    <div className="file-upload">
      {label && (
        <label htmlFor={`${name}-input`} className="block text-sm font-medium text-gray-900">
          {label}
        </label>
      )}
      <Controller
        control={form.control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <>
            {!selectedFile && (
              <div className="border border-dashed mt-4 items-center text-center p-12">
                <Input
                  id={`${name}-input`}
                  name={name}
                  type="file"
                  onChange={(e) => {
                    handleFileInput(e);
                    onChange(e.target.files?.[0]);
                  }}
                />
              </div>
            )}
            {imageSrc && (
              <div className="items-center justify-center flex flex-col">
                <ReactCrop crop={crop} onChange={setCrop} aspect={aspect} minWidth={minWidth} minHeight={minHeight}>
                  <img ref={imageRef} src={imageSrc} alt="Crop" />
                </ReactCrop>
                <div className="flex flex-row gap-4 mt-8 w-full">
                  <Button
                    id={`${name}-save-button`}
                    type="submit"
                    className="bg-blue-700 text-white rounded-md px-4 py-2 w-2/3"
                    onClick={handleSubmit}
                    disabled={!crop || isSaved}
                  >
                    Kaydet
                  </Button>
                  <Button
                    id={`${name}-reset-button`}
                    type="button"
                    className="bg-orange-500 text-white rounded-md px-4 py-2 w-1/3"
                    onClick={handleReset}
                  >
                    Sıfırla
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      />
    </div>
  );
};

export default ImageUpload;
