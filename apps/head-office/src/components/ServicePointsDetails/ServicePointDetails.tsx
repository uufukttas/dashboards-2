import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCoins } from 'react-icons/fa';
import { FaLocationDot, FaClock, FaUserGear } from 'react-icons/fa6';
import { RiBattery2ChargeFill } from 'react-icons/ri';
import { SlEnergy } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { detectDevice } from '@projects/common';
import ServicePointDetailsHeader from './ServicePointDetailsHeader';
import ServicePointDetailsModal from './ServicePointDetailsModal';
import Navbar from '../Navbar/Navbar';
import Accordion from '../../../src/components/Accordion/Accordion';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import { RootState } from '../../../app/redux/store';
import Modal from '../../../src/components/Modal/Modal';
import { BRAND_PREFIX, CITIES, DISTRICTS } from '../../../src/constants/constants';
import './ServicePointDetails.css';

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
  deviceCode: '9081000201',
  externalAddress: '',
  internalAddress: '',
  investor: 'Operatör',
  isFreePoint: false,
  lastHeartBeat: '',
  limitedUsage: false,
  model: 'Gersan',
  ocppVersion: 1500,
  sendRoaming: true,
  stationId: 2022,
  status: 'Kullanılabilir',
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
  districtId: 0,
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
  const [servicePointDetails, setServicePointDetails] =
    useState<IServicePointsDetailsProps>(initialServicePointsDetailsStateValue);
  const [servicePointDetailsInfo, setServicePointDetailsInfo] =
    useState<IServicePointsDetailsInfoProps>(
      initialServicePointsDetailsInfoStateValue
    );
  const [statusList, setStatusList] = useState([]);
  const isModalVisible = useSelector(
    (state: RootState) => state.isModalVisibleReducer.isModalVisible
  );
  const [schedule, setSchedule] = useState([
    { day: 'Monday', hours: Array(24).fill('') },
    { day: 'Tuesday', hours: Array(24).fill('') },
    { day: 'Wednesday', hours: Array(24).fill('') },
    { day: 'Thursday', hours: Array(24).fill('') },
    { day: 'Friday', hours: Array(24).fill('') },
    { day: 'Saturday', hours: Array(24).fill('') },
    { day: 'Sunday', hours: Array(24).fill('') }
  ]);
  const [isPassive, setIsPassive] = useState(false);

  const handleChange = (dayIndex: number, hourIndex: number, event: React.ChangeEvent) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].hours[hourIndex] = !newSchedule[dayIndex].hours[hourIndex];
    setSchedule(newSchedule);
  };

  const getBrands = () => {
    axios
      .get('https://sharztestapi.azurewebsites.net/Values/GetModels')
      .then((response) => response.data)
      .then((response) => setBrands(response.data))
      .catch((error) => console.log(error));
  };

  const getInvestors = () => {
    axios
      .get('https://sharztestapi.azurewebsites.net/Values/GetInvestors')
      .then((response) => response.data)
      .then((response) => setInvestors(response.data))
      .catch((error) => console.log(error));
  };

  const getChargeUnits = () => {
    axios
      .post(
        'https://sharztestapi.azurewebsites.net/ServicePoint/GetStationSettings',
        JSON.stringify({ stationId: Number(slug), PageNumber: 1, PageSize: 5 }),
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((response) => response.data.data)
      .then((data) => setChargeUnits(data))
      .catch((error) => console.log(error));
  };

  const getServicePointsDetails = async (slug: string) => {
    axios
      .post(
        'https://sharztestapi.azurewebsites.net/ServicePoint/GetStationById',
        { id: slug },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((response) => response.data)
      .then((data) => setServicePointDetails(data.data[0]))
      .catch((error) => console.log(error));
  };

  const getServicePointsDetailsInfo = async (slug: string) => {
    axios
      .post(
        'https://sharztestapi.azurewebsites.net/StationInfo/GetByStationId',
        JSON.stringify({ stationId: Number(slug) }),
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((response) => response.data)
      .then((data) => setServicePointDetailsInfo(data.data[0]))
      .catch((error) => console.log(error));
  };

  const getSelectedCity = (cityId: number) => {
    return CITIES[cityId?.toString()];
  };

  const getSelectedDistrict = (districtId: number) => {
    return DISTRICTS[districtId?.toString()];
  };

  const getChargeUnitFeatures = () => {
    axios
      .get(
        'https://sharztestapi.azurewebsites.net/Values/GetChargePointFeatures'
      )
      .then((response) => response.data.data)
      .then((data) => {
        setStatusList(data.statusList);
        setAccessTypeList(data.accessTypeList);
      })
      .catch((error) => console.log(error));
  };

  const getWorkingHours = () => {
    axios
      .post(
        'https://sharztestapi.azurewebsites.net/ServicePoint/GetWorkHours',
        JSON.stringify({ stationID: Number(slug) }),
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((response) => response.data)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  const handleClick = (event: React.MouseEvent) => {
    const chargeUnitId = event.currentTarget.getAttribute(
      'data-charge-point-id'
    );

    if (chargeUnitId) {
      console.log(chargeUnitId); //TO DO: Set Modal Input Value from Request
    }

    dispatch(toggleModalVisibility(isModalVisible));
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
        {chargeUnits.map((chargeUnit, index) => (
          <div
            key={index}
            className="charge-unit flex justify-between items-baseline border-b-2 border-gray-200 py-4"
            data-charge-point-id={chargeUnit.chargePointId}
          >
            <div className="charge-unit-info">
              <h3 className="charge-unit-name text-lg font-bold text-heading">
                {chargeUnit.model}
              </h3>
              <div className="charge-unit-connector-number">
                <p className="charge-unit-connector-number-label text-lg font-bold text-text">
                  {chargeUnit.deviceCode}
                </p>
                <p className="charge-unit-connector-number-value text-lg font-normal pl-8 text-text">{`soket1..........................................`}</p>
                <p className="charge-unit-connector-number-value text-lg font-normal pl-8 text-text">{`soket2..........................................`}</p>
                <p className="charge-unit-connector-number-value text-lg font-normal pl-8 text-text">{`soket3..........................................`}</p>
                <p className="charge-unit-connector-number-value text-lg font-normal pl-8 text-text">{`soket4..........................................`}</p>
                <p className="charge-unit-connector-number-value text-lg font-normal pl-8 text-text">{`soket5..........................................`}</p>
              </div>
            </div>
            <div className="charge-unit-actions mx-2">
              <Button
                buttonText={`Düzenle`}
                className="charge-unit-edit-button bg-primary text-white rounded-md px-4 py-2 mx-2"
                dataAttributes={{
                  'data-charge-point-id': chargeUnit.chargePointId.toString(),
                }}
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
        ))}
      </div>
    </div>
  );

  const servicePointDetailsContent = (
    <div className="service-point-details-content py-8">
      <div className="service-point-details-info">
        <div className="service-point-details-info-item flex justify-start md:items-center flex-col md:flex-row">
          <p className="service-point-details-info-item-label text-lg font-bold md:w-1/12 text-text">
            Adres:
          </p>
          <p className="service-point-details-info-item-value text-lg font-normal text-text">
            {servicePointDetailsInfo.address}
          </p>
        </div>
        <div className="service-point-details-info-item flex justify-start md:items-center flex-col md:flex-row">
          <p className="service-point-details-info-item-label text-lg font-bold w-1/12 text-text">
            Telefon:
          </p>
          <p className="service-point-details-info-item-value text-lg font-normal text-text">
            {servicePointDetailsInfo.phone1}
          </p>
        </div>
        {servicePointDetailsInfo.phone2 && (
          <div className="service-point-details-info-item flex justify-start md:items-center flex-col md:flex-row">
            <p className="service-point-details-info-item-label text-lg font-bold w-1/12 text-text">
              Telefon 2:
            </p>
            <p className="service-point-details-info-item-value text-lg text-text">
              {servicePointDetailsInfo.phone2}
            </p>
          </div>
        )}
        <div className="service-point-details-info-item flex justify-start md:items-center flex-col md:flex-row">
          <p className="service-point-details-info-item-label text-lg font-bold w-1/12 text-text">
            Il:
          </p>
          <p className="service-point-details-info-item-value text-lg font-normal text-text">
            {getSelectedCity(servicePointDetailsInfo.cityId)}
          </p>
        </div>
        <div className="service-point-details-info-item flex justify-start md:items-center flex-col md:flex-row">
          <p className="service-point-details-info-item-label text-lg font-bold w-1/12 text-text">
            Ilce:
          </p>
          <p className="service-point-details-info-item-value text-lg font-normal text-text">
            {getSelectedDistrict(servicePointDetailsInfo.districtId)}
          </p>
        </div>
        <div className="service-point-details-info-item flex justify-start md:items-center flex-col md:flex-row">
          <p className="service-point-details-info-item-label text-lg font-bold w-1/12 text-text">
            Konum:
          </p>
          <p className="service-point-details-info-item-value text-lg font-normal text-text">
            {servicePointDetailsInfo.lat} - {servicePointDetailsInfo.lon}
          </p>
        </div>
      </div>
    </div>
  );

  const navbarItems = [
    {
      title: 'Lokasyon Bilgileri',
    },
    {
      title: 'Şarj Üniteleri',
    },
    {
      title: 'Calisma Saatleri',
    },
    {
      title: 'Enerji Fiyat Ayarlari',
    },
    {
      title: 'Kullanici Ayarlari',
    },
    {
      title: 'Komisyonlar',
    },
  ];

  const NavbarItemsMobile = [
    {
      title: <FaLocationDot />,
    },
    {
      title: <RiBattery2ChargeFill />,
    },
    {
      title: <FaClock />,
    },
    {
      title: <SlEnergy />,
    },
    {
      title: <FaUserGear />,
    },
    {
      title: <FaCoins />,
    },
  ];

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
      <div className="charge-units-header flex justify-center p-4">
        <h3> <strong>Aktif olmayan</strong> gun ve saatleri seciniz</h3>
      </div>
      <div className='w-full'>
        <table className='w-full'>
          <thead className='text-left'>
            <tr>
              <th>Time</th>
              {schedule.map((day, index) => (
                <th key={index}>{day.day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 24 }).map((_, hourIndex) => (
              <tr key={hourIndex}>
                <td className='w-[25px]'>{hourIndex}:00</td>
                {schedule.map((day, dayIndex) => (
                  <td key={dayIndex} className={`w-[40px] h-[40px] ${day.hours[hourIndex] ? 'isPassive' : ''}`}>
                    <input
                      type="checkbox"
                      value={schedule[dayIndex].hours[hourIndex]}
                      onChange={(event) =>
                        handleChange(dayIndex, hourIndex, event)
                      }
                      className='text-center border-2 border-gray-200 p-1 text-sm w-full h-full'
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
  }, [slug]);

  return (
    servicePointDetailsInfo.cityId !== 0 &&
    servicePointDetailsInfo.districtId !== 0 && (
      <>
        <ServicePointDetailsHeader
          servicePointDetailsName={servicePointDetails.name}
          servicePointDetailsStatus={servicePointDetails.isActive}
        />
        <Navbar
          activeIndex={activeIndex}
          items={detectDevice().isMobile ? NavbarItemsMobile : navbarItems}
          setActiveIndex={setActiveIndex}
        />
        <div className="service-point-details-container w-full mx-8">
          {activeIndex === 0 && (
            <Accordion
              accordionTitle="Lokasyon Bilgileri"
              accordionContent={servicePointDetailsContent}
              titleClassName="font-bold"
            />
          )}{' '}
          {activeIndex === 1 && (
            <Accordion
              accordionTitle="Sarj Üniteleri"
              accordionContent={chargeUnitsContent}
              titleClassName="font-bold"
              contentClassName="overflow-y-auto"
            />
          )}{' '}
          {activeIndex === 2 && (
            <Accordion
              accordionTitle="Calisma Saatleri"
              accordionContent={workingHoursContent}
              titleClassName="font-bold"
            />
          )}{' '}
          {activeIndex === 3 && (
            <Accordion
              accordionTitle="Enerji Fiyat Ayarlari"
              accordionContent={energySettingsContent}
              titleClassName="font-bold"
            />
          )}{' '}
          {activeIndex === 4 && (
            <Accordion
              accordionTitle="Kullanici Ayarlari"
              accordionContent={workingHoursContent}
              titleClassName="font-bold"
            />
          )}{' '}
          {activeIndex === 5 && (
            <Accordion
              accordionTitle="Sharz.net Fiyatlandirma"
              accordionContent={workingHoursContent}
              titleClassName="font-bold"
            />
          )}
        </div>
        {isModalVisible && (
          <Modal
            className="charge-units-modal"
            modalHeaderTitle={`Şarj Ünitesi Ekle`}
            modalId={`${BRAND_PREFIX}-service-point-modal`}
          >
            <ServicePointDetailsModal
              slug={slug}
              brands={brands}
              investors={investors}
              statusList={statusList}
              accessTypeList={accessTypeList}
            />
          </Modal>
        )}
      </>
    )
  );
};

export default ServicePointsDetails;
