import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { Toast } from 'primereact/toast';
import { Tooltip } from 'primereact/tooltip';
import { FaTrashCan } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from '@projects/dialog';
import Modal from '../Modal/Modal';
import { BRAND_PREFIX } from '../../constants/constants';
import { getChargeUnitBrands } from '../../../app/api/servicePointDetails';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import {
  hideDialog,
  showDialog,
} from '../../../app/redux/features/dialogInformation';
import { RootState } from '../../../app/redux/store';
import { Dropdown } from 'primereact/dropdown';
import { Label } from '@projects/label';
import { Input } from '@projects/input';
import ReactCrop, { Crop } from 'react-image-crop';

const DevicesSection: React.FC = () => {
  const deviceManagementPrefix = `${BRAND_PREFIX}-device-management`;
  const deviceListData = [
    {
      brand: 'Circontrol',
      id: 1,
      name: 'E-Next Elite',
      kw: 22,
      used_kw: 22,
      imageUrl: <img src='https://circontrol.com/wp-content/uploads/2023/03/circontrol-1080x1080-enext-elite-product-1-2048x2048.png' width={75} height={75}/>
    }, {
      brand: 'Circontrol',
      id: 2,
      name: 'E-Next Park',
      kw: 22,
      used_kw: 22,
      // imageUrl: 'https://circontrol.com/wp-content/uploads/2023/03/circontrol-1080x1080-enext-park-product.png'
      imageUrl: <img src='https://circontrol.com/wp-content/uploads/2023/03/circontrol-1080x1080-enext-park-product.png' width={75} height={75}/>
    }, {
      brand: 'Circontrol',
      id: 3,
      name: 'Raption 100',
      kw: 100,
      used_kw: 100,
      // imageUrl: 'https://circontrol.com/wp-content/uploads/2023/10/R100-300x400-1.png'
      imageUrl: <img src='https://circontrol.com/wp-content/uploads/2023/10/R100-300x400-1.png' width={75} height={75}/>
    }, {
      brand: 'HyperCharger',
      id: 4,
      name: 'HYC 50',
      kw: 50,
      used_kw: 50,
      imageUrl: <img src="/HYC_50.png" width={75} height={75}/>
    }, {
      brand: 'HyperCharger',
      id: 5,
      name: 'HYC 150',
      kw: 150,
      used_kw: 150,
      imageUrl: <img src="/HYC_150.png" width={75} height={75}/>
    }, {
      brand: 'Sinexcel',
      id: 6,
      name: 'SEC 240',
      kw: 240,
      used_kw: 180,
      imageUrl: <img src="https://en.sinexcel.com/evcharger/240w/pic3-1.png?v=1.0" width={75} height={75}/>
    }, {
      brand: 'Sinexcel',
      id: 7,
      name: 'SEC 160',
      kw: 160,
      used_kw: 120,
      imageUrl: <img src="/SEC160.png" width={75} height={75}/>
    }, {
      brand: 'Sinexcel',
      id: 8,
      name: 'Interstaller',
      kw: 22,
      used_kw: 22,
      imageUrl: <img src='/Interstaller_22.png' width={75} height={75}/>
    }
  ];
  const tableHeaderData = [
    {
      header: 'Ünite Markası',
      field: 'brand',
      isRemovable: true,
    },
    {
      header: 'Ünite Modeli',
      field: 'name',
      isRemovable: true,
    },
    {
      header: 'Kw Değeri',
      field: 'kw',
      isRemovable: true,
    },
    {
      header: 'Ünite Gücü',
      field: 'used_kw',
      isRemovable: true,
    },
    {
      header: 'Ünite Fotoğrafı',
      field: 'imageUrl',
      isRemovable: true,
    },
    {
      header: 'İşlemler',
      field: 'actions',
      isRemovable: false,
    },
  ];
  const dispatch = useDispatch();
  const alertInformation = useSelector(
    (state: RootState) => state.alertInformation
  );
  const dialogInformation = useSelector(
    (state: RootState) => state.dialogInformation
  );
  const isModalVisible = useSelector(
    (state: RootState) => state.isModalVisible.isModalVisible
  );
  const toastRef = useRef<Toast>(null);
  const [visibleColumns, setVisibleColumns] = useState(tableHeaderData);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedModel, setSelectedModel] = useState(null);
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
      }, 'image/jpeg', 1);
    });
  };

  const getBrands = async () => {
    const res = await getChargeUnitBrands().then((res) => res.data);

    // @ts-ignore
    setBrands(res.map((item: any) => ({ label: item.name, value: item.id })));
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
      // await addServicePointImageRequest(formData);

      // sendRequest
    } catch (error) {
      console.error('Error uploading file:', error);
    }
    dispatch(toggleModalVisibility(false));
  };

  useEffect(() => {
    if (isModalVisible) {
      getBrands();
    }
  }, [isModalVisible]);

  const dataTableHeader = (): JSX.Element => {
    return (
      <>
        <div className={`${BRAND_PREFIX}-data-table-header-container w-full flex justify-between items-center`}>
          <div className={`${BRAND_PREFIX}-data-table-select-container`}>
            <MultiSelect
              value={visibleColumns}
              options={tableHeaderData.filter((item) => item.isRemovable)}
              optionLabel="header"
              onChange={onColumnToggle}
              className="w-full sm:w-20rem"
              display="chip"
            />
          </div>
          <div className={`${BRAND_PREFIX}-data-table-action-button-container flex justify-center items-center`}>
            <div className={`${BRAND_PREFIX}-data-table-add-button-container mx-4`}>
              <Button
                className={`${BRAND_PREFIX}-table-header-add-button flex justify-center items-center bg-primary text-primary-font-color rounded text-base font-semibold hover:bg-primary-lighter p-2`}
                icon="pi pi-plus"
                id={`${BRAND_PREFIX}-table-header-add-button`}
                rounded
                type="button"
                onClick={() => dispatch(toggleModalVisibility(true))}
              />
              <Tooltip
                className={`${BRAND_PREFIX}-data-table-add-button-tooltip text-base`}
                content="Ünite Ekle"
                position="bottom"
                target={`#${BRAND_PREFIX}-table-header-add-button`}
                style={{ fontSize: '12px', padding: '4px' }}
              />
            </div>
          </div>
        </div>
      </>
    );
  };
  const prepareTableData = () => {
    debugger;
    const data = deviceListData.map((device) => {
      return (
        <div className={`${BRAND_PREFIX}-device-management-container flex justify-between items-center flex-col`}>
          <div className={`${deviceManagementPrefix}-listing-container items-center w-full`}>
            <div className={`${deviceManagementPrefix}-device-brand-container w-full flex justify-between items-center my-4`}>
              <span className={`${deviceManagementPrefix}-device-brand font-semibold text-base`}>{device.brand}</span>
            </div>
            <div className={`${deviceManagementPrefix}-device-model-container w-full flex justify-between items-center my-4`}>
              <span className={`${deviceManagementPrefix}-device-model font-semibold text-base`}>{device.name}</span>
            </div>
            <div className={`${deviceManagementPrefix}-device-kw-container w-full flex justify-between items-center my-4`}>
              <span className={`${deviceManagementPrefix}-device-kw font-semibold text-base`}>{device.kw}</span>
            </div>
            <div className={`${deviceManagementPrefix}-used-kw-container w-full flex justify-between items-center my-4`}>
              <span className={`${deviceManagementPrefix}-used-kw font-semibold text-base`}>{device.used_kw}</span>
            </div>
            <div className={`${deviceManagementPrefix}-image-container w-full flex justify-between items-center my-4`}>
              <img
                className={`${deviceManagementPrefix}-image`}
                src={device.imageUrl}
                alt="device"
              />
            </div>
          </div>
        </div>
      );
    });

    return data;
  };
  const onColumnToggle = (event: MultiSelectChangeEvent): void => {
    const selectedColumns = event.target.value;
    const orderedSelectedColumns = tableHeaderData.filter(
      (col) =>
        selectedColumns.some(
          (sCol: { field: string; header: string; isRemovable: boolean }) => {
            return sCol.field === col.field;
          }
        ) || col.field === 'actions'
    );

    setVisibleColumns(orderedSelectedColumns);
  };

  return (
    <div className={`${BRAND_PREFIX}-device-management-container flex justify-between items-center flex-col`}>
      <div className={`${deviceManagementPrefix}-listing-container items-center w-full`}>
        <DataTable
          className="w-full shadow"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          filterDisplay="menu"
          // filters={filters}
          header={dataTableHeader}
          paginator={true}
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          removableSort
          reorderableColumns
          resizableColumns
          rows={10}
          rowsPerPageOptions={[10, 20, 50]}
          showGridlines={true}
          sortMode="multiple"
          stripedRows={true}
          value={deviceListData}
        >
          {visibleColumns.map((headerProps, index) => {
            if (headerProps.field !== 'actions') {
              return (
                <Column
                  className="border-none"
                  field={headerProps.field}
                  filter
                  filterMenuClassName="border-none shadow-lg"
                  filterPlaceholder={`${headerProps.header}...`}
                  header={headerProps.header}
                  headerClassName="border-0"
                  key={index}
                  sortable={true}
                />
              );
            } else {
              return (
                <Column
                  body={(rowData) => {
                    return (
                      <div
                        className={`${BRAND_PREFIX}-data-table-actions-button-container flex justify-start items-center`}
                      >
                        <a
                          className="font-medium text-red-600 cursor-pointer hover:scale-125 mx-4 transition-transform duration-300 ease-in-out"
                          data-user-management-id={rowData['id']}
                          onClick={() => {
                            dispatch(
                              showDialog({
                                actionType: 'delete',
                                data: rowData['id'],
                              })
                            );
                          }}
                        >
                          <FaTrashCan />
                        </a>
                      </div>
                    );
                  }}
                  field={headerProps.field}
                  frozen
                  header={headerProps.header}
                  headerClassName={`flex justify-start items-center`}
                  key={index}
                />
              );
            }
          })}
        </DataTable>
      </div>
      {isModalVisible && (
        <Modal
          className={`${deviceManagementPrefix}-modal-container`}
          modalHeaderTitle={`Ünite Ekle`}
          modalId={`${deviceManagementPrefix}-modal`}
          onClose={() => dispatch(toggleModalVisibility(false))}
        >
          <>
            <div
              className={`${deviceManagementPrefix}-brand-input-container w-full flex justify-between items-center my-4`}
            >
              <Label
                className={`${deviceManagementPrefix}-brand-input-label`}
                htmlFor="device_brand"
                labelText="Ünite Markası"
              />
              <Input
                className={`${deviceManagementPrefix}-brand-input rounded-md border border-gray-400`}
                id={`${deviceManagementPrefix}-brand-input`}
                name="device_brand"
                placeholder="Marka Seçiniz"
                type="text"
                value={selectedBrand}
                onChange={(event) => setSelectedBrand(event.value)}
              />
            </div>
            <div
              className={`${deviceManagementPrefix}-model-input-container w-full flex justify-between items-center my-4`}
            >
              <Label
                className={`${deviceManagementPrefix}-model-input-label`}
                htmlFor="device_model"
                labelText="Ünite Modeli"
              />
              <Input
                className={`${deviceManagementPrefix}-model-input rounded-md border border-gray-400`}
                id={`${deviceManagementPrefix}-model-input`}
                name="device_model"
                placeholder="Model Seçiniz"
                type="text"
                value={selectedBrand}
                onChange={(event) => { console.log('event.target.value', event.target.value) }}
              />
            </div>
            <div
              className={`${deviceManagementPrefix}-device-kw-input-container w-full flex justify-between items-center my-4`}
            >
              <Label
                className={`${deviceManagementPrefix}-device-kw-input-label`}
                htmlFor="device_kw"
                labelText="Kasa Gücü"
              />
              <Input
                className={`${deviceManagementPrefix}-device-kw-input rounded-md border border-gray-400`}
                id={`${deviceManagementPrefix}-device-kw-input`}
                name="device_kw"
                placeholder="Kasa Gücünü Belirtiniz"
                type="number"
                value={selectedBrand}
                onChange={(event) => { console.log('event.target.value', event.target.value) }}
              />
            </div>
            <div
              className={`${deviceManagementPrefix}-used-kw-input-container w-full flex justify-between items-center my-4`}
            >
              <Label
                className={`${deviceManagementPrefix}-used-kw-input-label`}
                htmlFor="used_kw"
                labelText="Kullanılacak Güç"
              />
              <Input
                className={`${deviceManagementPrefix}-used-kw-input rounded-md border border-gray-400`}
                id={`${deviceManagementPrefix}-used-kw-input`}
                name="used_kw"
                placeholder="Kullanılacak Gücü Belirtiniz"
                type="number"
                value={selectedBrand}
                onChange={(event) => { console.log(event.target.value) }}
              />
            </div>
            <div className={`${deviceManagementPrefix}-image-input-container w-full flex justify-between my-4 flex flex-col items-start`}>
              <Input
                className=""
                id="file-input"
                name="file-input"
                type="file"
                onChange={handleFileInput}
              />
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
                </div>
              )}
            </div>
            <div className={`${deviceManagementPrefix}-submit-button-container bg-primary border rounded-md`}>
              <Button
                className={`${deviceManagementPrefix}-submit-button w-full flex justify-center items-center text-primary-font-color font-semibold text-base p-2`}
                label="Ekle"
                onClick={() => { }}
              />
            </div>
          </>
        </Modal>
      )}
      {alertInformation.isVisible && <Toast ref={toastRef} />}
      {dialogInformation.isVisible && (
        <Dialog
          handleCancel={() => dispatch(hideDialog())}
          handleSuccess={() => { }}
        />
      )}
    </div>
  );
};

export default DevicesSection;
