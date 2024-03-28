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
import Navbar from '../Navbar/Navbar';
import Accordion from '../../../src/components/Accordion/Accordion';
import './ServicePointDetails.css';
import { BRAND_PREFIX } from '../../constants/constants';
import { useSelector } from 'react-redux';

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
  modelId: number;
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
interface IAccessTypeProps {
  id: number;
  stationChargePointFeatureType: number;
  name: string;
  rid: null;
};

interface IInvestorsProps {
  id: number,
  name: string
  rid: null;
}

interface IBrandsProps {
  id: number,
  name: string,
  isDeleted: boolean
  rid: null;
};

interface IStatusListProps {
  statusList: IStatusListProps[];
  accessTypeList: IAccessTypeProps[];
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
  const isModalVisible = useSelector((state: any) => state.isModalVisibleReducer.isModalVisible);
  const [accessTypeList, setAccessTypeList] = useState<IAccessTypeProps[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [brands, setBrands] = useState<IBrandsProps[]>([]);
  const [chargeUnits, setChargeUnits] = useState<IChargeUnitsProps[]>([]);
  const [connectors, setConnectors] = useState<{ [chargePointId: number]: IConnectorStateProps }>({});
  const [investors, setInvestors] = useState<IInvestorsProps[]>([]);
  const [servicePointDetails, setServicePointDetails] =
    useState<IServicePointsDetailsProps>(initialServicePointsDetailsStateValue);
  const [statusList, setStatusList] = useState<IStatusListProps[]>([]);

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
    });
  }, [chargeUnits]);

  return (
    (
      <div className={`${BRAND_PREFIX}-service-point-detail-page-container w-full`}>
        <div className={`${BRAND_PREFIX}-service-point-details-content-container w-full`}>
          <ServicePointDetailsHeader
            servicePointDetailsName={servicePointDetails.name}
            servicePointDetailsStatus={servicePointDetails.isActive}
          />
          <Navbar
            activeIndex={activeIndex}
            items={detectDevice().isMobile ? NavbarItemsMobile : navbarItems}
            setActiveIndex={setActiveIndex}
          />
          <div className="service-point-details-container mx-8">
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
                accordionContent={
                  <ChargeUnitsContent
                    accessTypeList={accessTypeList}
                    brands={brands}
                    chargeUnits={chargeUnits}
                    connectors={connectors}
                    investors={investors}
                    slug={slug}
                    statusList={statusList}
                  />
                }
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
        </div>
        {
          isModalVisible && <div className="modal-container"></div>
        }
      </div>
    )
  );
};

export default ServicePointsDetails;
