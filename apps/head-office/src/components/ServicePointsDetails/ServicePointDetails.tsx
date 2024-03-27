import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCoins } from 'react-icons/fa';
import { FaLocationDot, FaClock, FaUserGear } from 'react-icons/fa6';
import { RiBattery2ChargeFill } from 'react-icons/ri';
import { SlEnergy } from 'react-icons/sl';
import { detectDevice } from '@projects/common';
import ChargeUnitsContent from './Accordions/ChargeUnitsContent';
import ServicePointDetailsContent from './Accordions/ServicePointDetailsContent';
import WorkingHoursContent from './Accordions/WorkingHoursContent';
import ServicePointDetailsHeader from './ServicePointDetailsHeader';
import ServicePointDetailsModal from './ServicePointDetailsModal';
import Navbar from '../Navbar/Navbar';
import Accordion from '../../../src/components/Accordion/Accordion';
import Modal from '../../../src/components/Modal/Modal';
import { BRAND_PREFIX } from '../../../src/constants/constants';
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
  ocppVersion: string;
  sendRoaming: boolean;
  stationId: number;
  status: string;
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
interface IConnectorProps {
    connectorName: string;
    connectorNr: number;
    id: number;
    isAc: boolean;
    kw: number;
    stationChargePointId: number;
};
interface IConnectorStateProps {
  [key: number]: IConnectorProps;
};

const initialServicePointsDetailsStateValue = {
  name: '',
  id: '',
  resellerId: '',
  companyId: '',
  resellerName: '',
  companyName: '',
  isActive: false,
  isDeleted: false,
};

const ServicePointsDetails = ({ slug }: IServicePointsDetailsPageProps) => {
  const [accessTypeList, setAccessTypeList] = useState([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [brands, setBrands] = useState([]);
  const [chargeUnits, setChargeUnits] = useState<IChargeUnitsProps[]>([]);
  const [connectors, setConnectors] = useState<{ [chargePointId: number]: IConnectorStateProps }>({});
  const [investors, setInvestors] = useState([]);
  const [servicePointDetails, setServicePointDetails] =
    useState<IServicePointsDetailsProps>(initialServicePointsDetailsStateValue);
  const [statusList, setStatusList] = useState([]);

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

  const getChargeUnits = async () => {
    await axios
      .post(
        'https://sharztestapi.azurewebsites.net/ServicePoint/GetStationSettings',
        JSON.stringify({ stationId: Number(slug), PageNumber: 1, PageSize: 5 }),
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((response) => response.data.data)
      .then(async (data) => setChargeUnits(data))
      .catch((error) => console.log(error));
  };

  const getConnectors = (chargePointId: number) => {
    axios
      .post(
        'https://sharztestapi.azurewebsites.net/StationInfo/GetChargePointConnectors',
        JSON.stringify({ "stationChargePointId": chargePointId }),
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((response) => response.data)
      .then((data) => {
        setConnectors((prevConnectors) => ({
          ...prevConnectors,
          [chargePointId]: data.data
        }));
      })
      .catch((error) => console.log(error));
  };

  const navbarItems = [
    {
      title: <><FaLocationDot />Lokasyon Bilgileri</>,
    },
    {
      title: <><FaLocationDot />Şarj Üniteleri</>,
    },
    {
      title: <><FaClock />Calisma Saatleri</>,
    },
    {
      title: <><SlEnergy />Enerji Fiyat Ayarlari</>,
    },
    {
      title: <><FaUserGear />Kullanici Ayarlari</>,
    },
    {
      title: <><FaCoins />Komisyonlar</>,
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

  useEffect(() => {
    getServicePointsDetails(slug);
    getBrands();
    getInvestors();
    getChargeUnitFeatures();
    getChargeUnits();
    getWorkingHours();
  }, [slug]);

  useEffect(() => {
    chargeUnits.length > 0 && chargeUnits.map((chargeUnit) => {
      getConnectors(chargeUnit.chargePointId);
      console.log('connectors', connectors)
    });
  }, [chargeUnits]);

  return (
    (
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
              accordionContent={<ServicePointDetailsContent slug={slug} />}
              titleClassName="font-bold"
            />
          )}
          {activeIndex === 1 && (
            <Accordion
              accordionTitle="Sarj Üniteleri"
              accordionContent={<ChargeUnitsContent chargeUnits={chargeUnits} connectors={connectors} />}
              titleClassName="font-bold"
              contentClassName="overflow-y-auto"
            />
          )}
          {activeIndex === 2 && (
            <Accordion
              accordionTitle="Calisma Saatleri"
              accordionContent={<WorkingHoursContent slug={Number(slug)} />}
              titleClassName="font-bold"
            />
          )}
          {activeIndex === 3 && (
            // <Accordion
            //   accordionTitle="Enerji Fiyat Ayarlari"
            //   accordionContent={energySettingsContent}
            //   titleClassName="font-bold"
            // />
            <></>
          )}
          {activeIndex === 4 && (
            <Accordion
              accordionTitle="Kullanici Ayarlari"
              accordionContent={'workingHoursContent'}
              titleClassName="font-bold"
            />
          )}
          {activeIndex === 5 && (
            <Accordion
              accordionTitle="Sharz.net Fiyatlandirma"
              accordionContent={''}
              titleClassName="font-bold"
            />
          )}
        </div>
        {false && (
          <Modal
            className="charge-units-modal"
            modalHeaderTitle={`Şarj Ünitesi Ekle`}
            modalId={`${BRAND_PREFIX}-service-point-modal`}
            onClose={() => { }}
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
