import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import ServicePointDetailsHeader from './ServicePointDetailsHeader';
import ServicePointDetailsModal from './ServicePointDetailsModal';
import Navbar from '../Navbar/Navbar';
import Accordion from '../../../src/components/Accordion/Accordion';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import { RootState } from '../../../app/redux/store';
import Modal from '../../../src/components/Modal/Modal';
import { BRAND_PREFIX, CITIES, DISTRICTS } from '../../../src/constants/constants';

interface IChargeUnitsProps {
  chargePointId: number;
  connectorNumber: number;
  connectorId: number;
  count: number;
  deviceCode: string;
  externalAddress: string;
  internalAddress: string;
  investor: string;
  isFreePoint: boolean;
  lastHeartBeat: string;
  limitedUsage: boolean;
  model: string;
  ocppVersion: number;
  sendRoaming: boolean;
  stationId: number;
  status: string;
};

interface IServicePointsDetailsInfoProps {
  id: number;
  stationId: number;
  address: string;
  phone1: string;
  phone2: string;
  lat: number;
  lon: number;
  cityId: number;
  districtId: number;
};

interface IServicePointsDetailsPageProps {
  slug: string;
};

interface IServicePointsDetailsProps {
  name: string;
  id: string;
  resellerId: string;
  companyId: string;
  resellerName: string;
  companyName: string;
  isActive: boolean;
  isDeleted: boolean;
};

const initialChargeUnitsStateValue = {
  chargePointId: 2026,
  connectorNumber: 1,
  connectorId: 1,
  count: 1,
  deviceCode: "9081000201",
  externalAddress: '',
  internalAddress: '',
  investor: "Operatör",
  isFreePoint: false,
  lastHeartBeat: '',
  limitedUsage: false,
  model: "Gersan",
  ocppVersion: 1500,
  sendRoaming: true,
  stationId: 2022,
  status: "Kullanılabilir",
};

const initialServicePointsDetailsInfoStateValue = {
  id: 0,
  stationId: 0,
  address: '',
  phone1: '',
  phone2: '',
  lat: 0,
  lon: 0,
  cityId: 0,
  districtId: 0
};

const initialServicePointsDetailsStateValue = {
  name: '',
  id: '',
  resellerId: '',
  companyId: '',
  resellerName: '',
  companyName: '',
  isActive: true,
  isDeleted: false,
};

const ServicePointsDetails = ({ slug }: IServicePointsDetailsPageProps) => {
  const dispatch = useDispatch();
  const [accessTypeList, setAccessTypeList] = useState([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [brands, setBrands] = useState([]);
  const [chargeUnits, setChargeUnits] = useState<IChargeUnitsProps[]>([initialChargeUnitsStateValue]);
  const [investors, setInvestors] = useState([]);
  const [servicePointDetails, setServicePointDetails] = useState<IServicePointsDetailsProps>(initialServicePointsDetailsStateValue);
  const [servicePointDetailsInfo, setServicePointDetailsInfo] = useState<IServicePointsDetailsInfoProps>(initialServicePointsDetailsInfoStateValue);
  const [statusList, setStatusList] = useState([]);
  const isModalVisible = useSelector((state: RootState) => state.isModalVisibleReducer.isModalVisible);

  const getBrands = () => {
    axios
      .get('https://sharztestapi.azurewebsites.net/Values/GetModels')
      .then((response) => (response.data.data))
      .then((response) => setBrands(response.data))
      .catch((error) => console.log(error));
  };

  const getInvestors = () => {
    axios
      .get('https://sharztestapi.azurewebsites.net/Values/GetInvestors')
      .then((response) => (response.data))
      .then((response) => setInvestors(response.data))
      .catch((error) => console.log(error));
  };

  const getChargeUnits = () => {
    axios.post(
      'https://sharztestapi.azurewebsites.net/ServicePoint/GetStationSettings',
      JSON.stringify({ stationId: Number(slug), PageNumber: 1, PageSize: 5 }),
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(response => response.data.data)
      .then(data => setChargeUnits(data))
      .catch(error => console.log(error));
  };

  const getServicePointsDetails = async (slug: string) => {
    axios.post(
      'https://sharztestapi.azurewebsites.net/ServicePoint/GetStationById',
      { id: slug },
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(response => response.data)
      .then(data => setServicePointDetails(data.data[0]))
      .catch(error => console.log(error));
  };

  const getServicePointsDetailsInfo = async (slug: string) => {
    axios.post(
      'https://sharztestapi.azurewebsites.net/StationInfo/GetByStationId',
      JSON.stringify({ stationId: Number(slug) }),
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(response => response.data)
      .then(data => setServicePointDetailsInfo(data.data[0]))
      .catch(error => console.log(error));
  };

  const getSelectedCity = (cityId: number) => {
    return CITIES[cityId?.toString()];
  };

  const getSelectedDistrict = (districtId: number) => {
    return DISTRICTS[districtId?.toString()];
  };

  const getChargeUnitFeatures = () => {
    axios
      .get('https://sharztestapi.azurewebsites.net/Values/GetChargePointFeatures')
      .then(response => response.data.data)
      .then(data => {
        setStatusList(data.statusList);
        setAccessTypeList(data.accessTypeList)
      })
      .catch(error => console.log(error));
  };

  const getWorkingHours = () => {
    axios.post(
      'https://sharztestapi.azurewebsites.net/ServicePoint/GetWorkHours',
      JSON.stringify({ stationID: Number(slug) }),
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(response => response.data)
      .then(data => console.log(data))
      .catch(error => console.log(error));
  };


  const handleClick = (event: React.MouseEvent) => {
    const chargeUnitId = event.currentTarget.getAttribute('data-charge-point-id');

    if (chargeUnitId) {
      console.log(chargeUnitId); //TO DO: Set Modal Input Value from Request
    }

    dispatch(toggleModalVisibility(isModalVisible))
  };

  const chargeUnitsContent = (
    <div className="charge-units-content py-8">
      <div className="charge-units-header flex justify-end">
        <Button
          buttonText={`Ekle`}
          className="charge-units-add-button bg-primary bg-primary text-white rounded-md px-4 py-2 mx-2"
          type="button"
          onClick={handleClick}
        />
      </div>
      <div className="charge-units-list">
        {
          chargeUnits.map((chargeUnit, index) => (
            <div
              key={index}
              className="charge-unit flex justify-between items-center border-b-2 border-gray-200 py-4"
              data-charge-point-id={chargeUnit.chargePointId}
            >
              <div className="charge-unit-info">
                <h3 className="charge-unit-name text-lg font-bold">{chargeUnit.model}</h3>
                <p className="charge-unit-status text-sm">{chargeUnit.status}</p>
                <div className="charge-unit-connector-number">
                  <p className="charge-unit-connector-number-label text-lg font-bold">Connectors</p>
                  <p className="charge-unit-connector-number-value text-lg font-normal">{chargeUnit.connectorNumber}</p>
                </div>
              </div>
              <div className="charge-unit-actions mx-2">
                <Button
                  buttonText={`Düzenle`}
                  className="charge-unit-edit-button bg-primary text-white rounded-md px-4 py-2 mx-2"
                  dataAttributes={{ 'data-charge-point-id': chargeUnit.chargePointId.toString() }}
                  type={'button'}
                  onClick={handleClick}
                />
                <Button
                  buttonText={'Sil'}
                  className="charge-unit-delete-button bg-secondary text-white rounded-md px-4 py-2"
                  type={'button'}
                />
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );

  const servicePointDetailsContent = (
    <div className="service-point-details-content py-8">
      <div className="service-point-details-info">
        <div className="service-point-details-info-item flex justify-start items-center">
          <p className="service-point-details-info-item-label text-lg font-bold w-1/12">Adres:</p>
          <p className="service-point-details-info-item-value text-lg font-normal">
            {servicePointDetailsInfo.address}
          </p>
        </div>
        <div className="service-point-details-info-item flex justify-start items-center">
          <p className="service-point-details-info-item-label text-lg font-bold w-1/12">Telefon:</p>
          <p className="service-point-details-info-item-value text-lg font-normal">{servicePointDetailsInfo.phone1}</p>
        </div>
        {
          servicePointDetailsInfo.phone2 && (
            <div className="service-point-details-info-item flex justify-start items-center">
              <p className="service-point-details-info-item-label text-lg font-bold w-1/12">Telefon 2:</p>
              <p className="service-point-details-info-item-value text-lg">{servicePointDetailsInfo.phone2}</p>
            </div>
          )
        }
        <div className="service-point-details-info-item flex justify-start items-center">
          <p className="service-point-details-info-item-label text-lg font-bold w-1/12">Il:</p>
          <p className="service-point-details-info-item-value text-lg font-normal">
            {getSelectedCity(servicePointDetailsInfo.cityId)}
          </p>
        </div>
        <div className="service-point-details-info-item flex justify-start items-center">
          <p className="service-point-details-info-item-label text-lg font-bold w-1/12">Ilce:</p>
          <p className="service-point-details-info-item-value text-lg font-normal">
            {getSelectedDistrict(servicePointDetailsInfo.districtId)}
          </p>
        </div>
        <div className="service-point-details-info-item flex justify-start items-center">
          <p className="service-point-details-info-item-label text-lg font-bold w-1/12">Konum:</p>
          <p className="service-point-details-info-item-value text-lg font-normal">
            {servicePointDetailsInfo.lat} - {servicePointDetailsInfo.lon}
          </p>
        </div>
      </div>
    </div>
  );

  const energySettingsContent = (
    <div className="energy-settings-content py-8">
      <div className="charge-units-header flex justify-end">
        <Button
          buttonText={`Ekle`}
          className="charge-units-add-button bg-primary bg-primary text-white rounded-md px-4 py-2 mx-2"
          type="button"
          onClick={handleClick}
        />
      </div>
      Bu servis istasyonunun enerji fiyat ayarlari burada gosterilecektir.
    </div>
  );

  const workingHoursContent = (
    <div className="working-hours-content py-8">
      <div className="charge-units-header flex justify-end">
        <Button
          buttonText={`Ekle`}
          className="charge-units-add-button bg-primary bg-primary text-white rounded-md px-4 py-2 mx-2"
          type="button"
          onClick={handleClick}
        />
      </div>
      Bu servis istasyonunun calisma saatleri 08:00 - 18:00 arasindadir.
    </div>
  );

  useEffect(() => {
    getServicePointsDetails(slug);
    getServicePointsDetailsInfo(slug);
    getChargeUnits();
    getBrands();
    getInvestors();
    getChargeUnitFeatures();
    getWorkingHours();
  }, [slug])

  return (
    servicePointDetailsInfo.cityId !== 0
    && servicePointDetailsInfo.districtId !== 0
    && (
      <>
        <ServicePointDetailsHeader
          servicePointDetailsName={servicePointDetails.name}
          servicePointDetailsStatus={servicePointDetails.isActive}
        />
        <Navbar
          activeIndex={activeIndex}
          items={[{
            title: 'Lokasyon Bilgileri'
          },
          {
            title: 'Şarj Üniteleri'
          },
          {
            title: 'Calisma Saatleri'
          },
          {
            title: 'Enerji Fiyat Ayarlari'
          },
          {
            title: 'Kullanici Ayarlari'
          }, {
            title: 'Sharz.net Fiyatlandirma'
          }
          ]}
          setActiveIndex={setActiveIndex}
        />
        <div className='service-point-details-container w-full mx-8'>
          {
            activeIndex === 0
            && < Accordion
              accordionTitle='Lokasyon Bilgileri'
              accordionContent={servicePointDetailsContent}
              titleClassName="font-bold"
            />
          } {
            activeIndex === 1
            && < Accordion
              accordionTitle='Sarj Üniteleri'
              accordionContent={chargeUnitsContent}
              titleClassName="font-bold"
              contentClassName="overflow-y-auto"
            />
          } {
            activeIndex === 2
            && < Accordion
              accordionTitle='Calisma Saatleri'
              accordionContent={workingHoursContent}
              titleClassName="font-bold"
            />
          } {
            activeIndex === 3
            && < Accordion
              accordionTitle='Enerji Fiyat Ayarlari'
              accordionContent={energySettingsContent}
              titleClassName="font-bold"
            />
          } {
            activeIndex === 4
            && < Accordion
              accordionTitle='Kullanici Ayarlari'
              accordionContent={workingHoursContent}
              titleClassName="font-bold"
            />
          } {
            activeIndex === 5
            && < Accordion
              accordionTitle='Sharz.net Fiyatlandirma'
              accordionContent={workingHoursContent}
              titleClassName="font-bold"
            />
          }
        </div>
        {
          isModalVisible &&
          <Modal
            className="charge-units-modal"
            modalHeaderTitle={`Şarj Ünitesi Ekle`}
            modalId={`${BRAND_PREFIX}-service-point-modal`}
          >
            <ServicePointDetailsModal slug={slug} brands={brands} investors={investors} statusList={statusList} accessTypeList={accessTypeList} />
          </Modal>
        }
      </>
    )
  );
};

export default ServicePointsDetails;
