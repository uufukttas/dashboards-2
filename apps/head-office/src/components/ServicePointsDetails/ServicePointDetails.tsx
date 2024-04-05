import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCoins } from 'react-icons/fa';
import { FaLocationDot, FaClock, FaUserGear } from 'react-icons/fa6';
import { RiBattery2ChargeFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { SlEnergy } from 'react-icons/sl';
import { detectDevice } from '@projects/common';
import ServicePointDetailsHeader from './ServicePointsDetailsComponents/ServicePointDetailsHeader';
import ServicePointsDetailsBody from './ServicePointsDetailsComponents/ServicePointsDetailsBody';
import ServicePointDetailsModal from './Modals/ServicePointDetailsModal';
import Loading from '../Loading/Loading';
import Modal from '../Modal/Modal';
import Navbar from '../Navbar/Navbar';
import { BRAND_PREFIX } from '../../constants/constants';
import { setChargeUnitData } from '../../../app/redux/features/chargeUnitData';
import { toggleChargePointDataUpdated } from '../../../app/redux/features/isChargePointDataUpdated';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import { RootState } from '../../../app/redux/store';
import './ServicePointDetails.css';
import type {
  IAccessTypeListItemProps,
  IBrandsProps,
  IChargeUnitsProps,
  IConnectorStateProps,
  IInvestorsProps,
  IServicePointsDetailsPageProps,
  IServicePointsDetailsProps,
  IStatusListItemProps
} from './types';

const ServicePointsDetails = ({ slug }: IServicePointsDetailsPageProps) => {
  const dispatch = useDispatch();
  const isChargePointDataUpdated = useSelector(
    (state: RootState) => state.isChargePointDataUpdated.isChargePointDataUpdated
  );
  const isLoadingVisible = useSelector((state: RootState) => state.loadingReducer.isLoading);
  const isModalVisible = useSelector((state: RootState) => state.isModalVisibleReducer.isModalVisible);
  const [accessTypeList, setAccessTypeList] = useState<IAccessTypeListItemProps[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [addChargeUnit, setAddChargeUnit] = useState<boolean>(false);
  const [addConnector, setAddConnector] = useState(false);
  const [brands, setBrands] = useState<IBrandsProps[]>([]);
  const [chargeUnits, setChargeUnits] = useState<IChargeUnitsProps[]>([]);
  const [connectorCount, setConnectorCount] = useState<number>(0);
  const [connectors, setConnectors] = useState<IConnectorStateProps[]>([]);
  const [investors, setInvestors] = useState<IInvestorsProps[]>([]);
  const [servicePointDetails, setServicePointDetails] =
    useState<IServicePointsDetailsProps>({
      name: '',
      id: '',
      resellerId: '',
      companyId: '',
      resellerName: '',
      companyName: '',
      isActive: false,
      isDeleted: false,
    });
  const [statusList, setStatusList] = useState<IStatusListItemProps[]>([]);

  const getBrands = async () => {
    try {
      await axios
        .get(process.env.GET_CHARGE_UNIT_MODELS || '')
        .then((response) => response.data)
        .then((response) => setBrands(response.data))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    };
  };
  const getChargeUnits = async () => {
    try {
      await axios
        .post(
          process.env.GET_STATION_SETTINGS || '',
          JSON.stringify({ stationId: Number(slug), PageNumber: 1, PageSize: 10 }),
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then((response) => response.data.data)
        .then((data) => {
          if (chargeUnits.length !== data.length) {
            setChargeUnits(data)
          }

          dispatch(toggleLoadingVisibility(false));
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    };
  };
  const getChargeUnitFeatures = async () => {
    try {
      await axios
        .get(process.env.GET_CHARGE_POINT_FEATURES || '')
        .then((response) => response.data.data)
        .then((data) => {
          setStatusList(data.statusList);
          setAccessTypeList(data.accessTypeList);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    };
  };
  const getConnectors = async () => {
    try {
      chargeUnits.map(async (chargeUnit) => {
        await axios
          .post(
            process.env.GET_CHARGE_POINT_CONNECTORS || '',
            JSON.stringify({ stationChargePointId: chargeUnit.chargePointId }),
            { headers: { 'Content-Type': 'application/json' } }
          )
          .then((response) => response.data)
          .then((data) => {
            setTimeout(() => {
              setConnectors((prev) => [...prev, { [chargeUnit.chargePointId]: data.data }])
            }, 1000)
          })
          .catch((error) => console.log(error));
      });
    } catch (error) {
      console.log(error);
    };
  }
  const getInvestors = async () => {
    try {
      await axios
        .get(process.env.GET_INVESTORS || '')
        .then((response) => response.data)
        .then((response) => setInvestors(response.data))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    };
  };
  const getServicePointsDetails = async (slug: string) => {
    try {
      await axios
        .post(
          process.env.GET_STATION_BY_ID || '',
          { id: slug },
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then((response) => response.data)
        .then((data) => setServicePointDetails(data.data[0]))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    };
  };
  const getWorkingHours = async () => {
    try {
      await axios
        .post(
          process.env.GET_WORKING_HOURS || '',
          JSON.stringify({ stationID: Number(slug) }),
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then((response) => response.data)
        .then((data) => data)
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    };
  };

  const navbarItems = [
    {
      title: <><FaLocationDot />Lokasyon Bilgileri</>,
    },
    {
      title: <><RiBattery2ChargeFill />Şarj Üniteleri</>,
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
    dispatch(toggleLoadingVisibility(true));
    getBrands();
    getChargeUnits();
    getChargeUnitFeatures();
    getInvestors();
    getServicePointsDetails(slug);
    getWorkingHours();
  }, [slug]);

  useEffect(() => {
    if (isChargePointDataUpdated) {
      getChargeUnits();

      dispatch(toggleChargePointDataUpdated(false));
    }
  }, [isChargePointDataUpdated]);

  useEffect(() => {
    if (chargeUnits.length > 0) {
      getConnectors();
    }
  }, [chargeUnits]);

  return (
    isLoadingVisible
      ? (
        <Loading />
      )
      : (
        <div className={`${BRAND_PREFIX}-service-point-details-page-content-wrapper w-full`}>
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
            <ServicePointsDetailsBody
              activeIndex={activeIndex}
              chargeUnits={chargeUnits}
              connectorCount={connectorCount}
              connectors={connectors}
              setAddChargeUnit={setAddChargeUnit}
              setAddConnector={setAddConnector}
              slug={slug}
            />
          </div>
          {
            addChargeUnit && isModalVisible && (
              <Modal
                modalHeaderTitle='Şarj Ünitesi Ekle'
                modalId={`${BRAND_PREFIX}-charge-points-add-modal`}
                onClose={() => {
                  dispatch(
                    setChargeUnitData({
                      brandId: 1,
                      connectorCount: 1,
                      ocppVersion: 1600,
                      isFreeUsage: false,
                      isLimitedUsage: false,
                      investor: 1,
                      status: 1,
                      accessType: 1,
                      location: '',
                      code: '',
                      chargePointId: 0,
                    })
                  );
                }}
              >
                <ServicePointDetailsModal
                  accessTypeList={accessTypeList}
                  brands={brands}
                  statusList={statusList}
                  investors={investors}
                  slug={slug}
                  setConnectorCount={setConnectorCount}
                />
              </Modal>
            )
          }
          {
            addConnector && isModalVisible && (
              <Modal
                modalHeaderTitle='Connector Ekle'
                modalId={`${BRAND_PREFIX}-connector-add-modal`}
                onClose={() => { }}
              >
                <>
                </>
              </Modal>
            )
          }
        </div >
      )
  );
};

export default ServicePointsDetails;
