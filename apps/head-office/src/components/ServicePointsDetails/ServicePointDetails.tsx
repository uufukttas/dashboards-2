import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCoins } from 'react-icons/fa';
import { FaLocationDot, FaClock, FaUserGear } from 'react-icons/fa6';
import { RiBattery2ChargeFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { SlEnergy } from 'react-icons/sl';
import { detectDevice } from '@projects/common';
import { Dialog } from '@projects/dialog';
import ServicePointDetailsHeader from './ServicePointsDetailsComponents/ServicePointDetailsHeader';
import ServicePointsDetailsBody from './ServicePointsDetailsComponents/ServicePointsDetailsBody';
import ServicePointDetailsModal from './Modals/ChargeUnitAddModal';
import ConnectorAddModal from './Modals/ConnectorAddModal';
import EnergyPricesModal from './Modals/EnergyPricesModal';
import Loading from '../Loading/Loading';
import Modal from '../Modal/Modal';
import Navbar from '../Navbar/Navbar';
import { BRAND_PREFIX } from '../../constants/constants';
import { setChargeUnitData } from '../../../app/redux/features/chargeUnitData';
import { hideDialog } from '../../../app/redux/features/dialogInformation';
import { toggleChargePointDataUpdated } from '../../../app/redux/features/isChargePointDataUpdated';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import { RootState } from '../../../app/redux/store';
import './ServicePointDetails.css';
import type {
  IAccessTypeListItemProps,
  IBrandsProps,
  IChargeUnitsProps,
  IConnectorProps,
  IConnectorStateProps,
  IInvestorsProps,
  IServicePointsDetailsPageProps,
  IServicePointsDetailsProps,
  IStatusListItemProps
} from './types';

const ServicePointsDetails = ({ slug }: IServicePointsDetailsPageProps) => {
  const dispatch = useDispatch();
  const dialogInformation = useSelector((state: RootState) => state.dialogInformation);
  const isChargePointDataUpdated = useSelector(
    (state: RootState) => state.isChargePointDataUpdated.isChargePointDataUpdated
  );
  const isLoadingVisible = useSelector((state: RootState) => state.isLoadingVisible.isLoading);
  const isModalVisible = useSelector((state: RootState) => state.isModalVisible.isModalVisible);
  const [accessTypeList, setAccessTypeList] = useState<IAccessTypeListItemProps[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [addChargeUnit, setAddChargeUnit] = useState<boolean>(false);
  const [addConnector, setAddConnector] = useState(false);
  const [addEnergyPrice, setAddEnergyPrice] = useState<boolean>(false);
  const [brands, setBrands] = useState<IBrandsProps[]>([]);
  const [chargeUnits, setChargeUnits] = useState<IChargeUnitsProps[]>([]);
  const [connectorProperty, setConnectorProperty] = useState<{ chargePointId: number; chargePointModelId: number; connectorNumber: number; connectorId: number }>({
    chargePointId: 0,
    chargePointModelId: 0,
    connectorNumber: 0,
    connectorId: 0
  });
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

  const deleteChargePoint = async (deletedChargeUnitData: IChargeUnitsProps[]) => {
    try {
      await axios.post(
        process.env.UPDATE_STATION_SETTINGS || '',
        JSON.stringify(deletedChargeUnitData),
        { headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.log(error);
    };
  };
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
          JSON.stringify({
            stationId: Number(slug),
            PageNumber: 1,
            PageSize: 10
          }),
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
      const promises = chargeUnits.map(async (chargeUnit) => {
        try {
          const response = await axios.post(
            process.env.GET_CHARGE_POINT_CONNECTORSV2 || '',
            JSON.stringify({ stationChargePointId: chargeUnit.chargePointId }),
            { headers: { 'Content-Type': 'application/json' } }
          );
          const data = response.data;

          // setConnectors((prev) => [...prev, getConnectorProperties(data.data)])
          return getConnectorProperties(data.data);  // Promise dönüyor, ama hemen beklemiyoruz.
        } catch (error) {
          console.error(error);
        }
      });

      // @ts-expect-error We did not wait for the checking to be resolved.
      // TODO : We need to wait for the checking to be resolved.
      await Promise.all(promises).then(data => setConnectors((prev) => [...prev, data]));

    } catch (error) {
      console.error(error);
    }
  };

  const getConnectorProperties = async (connectorData: []) => {
    const promises = connectorData.map(async (connector: IConnectorProps) => {
      try {
        await axios.post(
          process.env.GET_CHARGE_POINT_CONNECTORS || '',
          JSON.stringify({ stationChargePointId: connector.stationChargePointID }),
          { headers: { 'Content-Type': 'application/json' } }
        ).then(data => {
          data.data.data.forEach((element: IConnectorProps) => {
            if (connector.RID === element.id)
              connector.kw = element.kw;
            connector.connectorName = element.connectorName;
            connector.isAc = element.isAc;
          })
        });

        return connectorData
      } catch (error) {
        console.error(error);
      }
    });

    // Tüm promise'leri bekleyip, sonuçları döndürüyoruz.
    return Promise.all(promises);
  };





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
      title: <><FaUserGear />Servis Noktasi Yetkisi</>,
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
      setTimeout(() => {
        getChargeUnits();
      }, 750);

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
              connectorsList={connectors}
              setAddChargeUnit={setAddChargeUnit}
              setAddConnector={setAddConnector}
              setAddEnergyPrice={setAddEnergyPrice}
              setConnectorProperty={setConnectorProperty}
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
                      accessType: 1,
                      brandId: 1,
                      chargePointId: 0,
                      code: '',
                      connectorCount: 1,
                      isFreeUsage: false,
                      isLimitedUsage: false,
                      investor: 1,
                      location: '',
                      ocppVersion: 1600,
                      status: 1,
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
                />
              </Modal>
            )
          }
          {
            addConnector && isModalVisible && (
              <Modal
                modalHeaderTitle='Konnektör Ekle'
                modalId={`${BRAND_PREFIX}-connector-add-modal`}
                onClose={() => { }}
              >
                <ConnectorAddModal
                  connectorProperty={connectorProperty}
                />
              </Modal>
            )
          }
          {
            addEnergyPrice && isModalVisible && (
              <Modal
                modalHeaderTitle='Enerji Fiyat Ayarlari'
                modalId={`${BRAND_PREFIX}-energy-prices-modal`}
                onClose={() => { }}
              >
                <EnergyPricesModal
                  setAddEnergyPrice={setAddEnergyPrice}
                  slug={slug}
                />
              </Modal>
            )
          }
          {
            dialogInformation.isVisible && (
              <Dialog
                handleCancel={() => dispatch(hideDialog())}
                handleSuccess={() => {
                  deleteChargePoint(dialogInformation.data);
                  dispatch(hideDialog());
                  dispatch(toggleChargePointDataUpdated(true));
                }}
              />
            )
          }
        </div >
      )
  );
};

export default ServicePointsDetails;
