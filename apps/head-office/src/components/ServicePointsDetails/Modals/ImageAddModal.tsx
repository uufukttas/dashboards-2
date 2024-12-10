import { Button } from '@projects/button';
import { Input } from '@projects/input';
import { isNil } from 'lodash';
import React, { useRef, useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/src/ReactCrop.scss';
import { useAddServicePointImageMutation } from '../../../../app/api/services/service-point-details/servicePointDetails.service';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import ModalLayout from '../../Modal/Layouts/ModalLayout';
import { IStationIdProps } from '../types';

const FileUpload: React.FC<IStationIdProps> = ({ stationId }: IStationIdProps) => {
  const cropInitialState: Crop = {
    height: 360,
    unit: 'px',
    width: 480,
    x: 0,
    y: 0,
  };
  const sectionPrefix: string = `${BRAND_PREFIX}-service-point-add-image`;
  const [addServicePointImage] = useAddServicePointImageMutation();
  const imageRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>(cropInitialState);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const getCroppedImg = async (image: HTMLImageElement, crop: Crop): Promise<string> => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.height = crop.height;
    canvas.width = crop.width;

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

    return new Promise<string>((resolve, reject) => {
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
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.addEventListener('load', () => setImageSrc(reader.result?.toString() || ''));
      !isNil(event.target.files) && reader.readAsDataURL(event?.target?.files[0]);

      setSelectedFile(file);
    }
  };
  const handleReset = (): void => {
    setCrop(cropInitialState);
    setImageSrc('');
    setSelectedFile(null);
  };
  const handleSubmit = async (): Promise<void> => {
    if (!imageRef.current || !crop || !selectedFile) {
      return;
    }

    const croppedImageUrl = await getCroppedImg(imageRef.current, crop);
    const _file = await fetch(croppedImageUrl)
      .then((r) => r.blob())
      .then((blobFile) => new File([blobFile], selectedFile.name, { type: 'image/jpeg' }));
    const formData = new FormData();

    formData.append('fileName', selectedFile.name);
    formData.append('forceWrite', 'true');
    formData.append('image', _file);
    formData.append('pathKey', 'station');
    formData.append('stationId', stationId.toString());

    await addServicePointImage({ body: formData });
  };

  return (
    <ModalLayout
      className={`${sectionPrefix}-modal`}
      footerVisible={false}
      id={`${sectionPrefix}-modal`}
      name="addServicePointImageModal"
      title={`Servis Noktası Göreseli Ekle`}
    >
      <div className={`${sectionPrefix}-modal-file-container w-full`}>
        {!selectedFile && (
          <form
            className={`${sectionPrefix}-modal-file-form border border-dashed my-8 items-center text-center p-12`}
            onSubmit={handleSubmit}
          >
            <Input
              className={`${sectionPrefix}-modal-file-form-input`}
              id={`${sectionPrefix}-modal-file-form-input`}
              name={`${sectionPrefix}`}
              type="file"
              onChange={handleFileInput}
            />
          </form>
        )}
        {
          <div className={`${sectionPrefix}-container flex flex-col items-center justify-center`}>
            {selectedFile && crop && (
              <ReactCrop aspect={4 / 3} crop={crop} minHeight={360} minWidth={480} onChange={setCrop}>
                <img alt="Service Point Image" ref={imageRef} src={imageSrc} />
              </ReactCrop>
            )}
            <div className={`${sectionPrefix}-action-buttons-container w-full flex flex-row gap-4 mt-8`}>
              <Button
                className={`${sectionPrefix}-submit-button w-2/3 px-4 py-2 bg-primary text-white rounded-md`}
                disabled={!crop}
                id={`${sectionPrefix}-submit-button`}
                type="submit"
                onClick={handleSubmit}
              >
                Ekle
              </Button>
              <Button
                className={`${sectionPrefix}-reset-button w-1/3 px-4 py-2 bg-secondary text-white rounded-md`}
                id={`${sectionPrefix}-reset-button`}
                type="reset"
                onClick={handleReset}
              >
                Sıfırla
              </Button>
            </div>
          </div>
        }
      </div>
    </ModalLayout>
  );
};

export default FileUpload;
