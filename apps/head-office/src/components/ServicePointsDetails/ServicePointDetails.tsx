import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@projects/alert';
import { Dialog } from '@projects/dialog';
import ServicePointDetailsHeader from './ServicePointsDetailsComponents/ServicePointDetailsHeader';
import ServicePointsDetailsBody from './ServicePointsDetailsComponents/ServicePointsDetailsBody';
import ChargeUnitAddModal from './Modals/ChargeUnitAddModal';
import ComissionModal from './Modals/ComissionModal';
import ConnectorAddModal from './Modals/ConnectorAddModal';
import EnergyPricesModal from './Modals/EnergyPricesModal';
import ServicePointPermissionsModal from './Modals/ServicePointPermissionsModal';
import Loading from '../Loading/Loading';
import Modal from '../Modal/Modal';
import Navbar from '../Navbar/Navbar';
import { BRAND_PREFIX } from '../../constants/constants';
import { setChargeUnitData } from '../../../app/redux/features/chargeUnitData';
import { hideDialog } from '../../../app/redux/features/dialogInformation';
import { toggleChargePointDataUpdated } from '../../../app/redux/features/isChargePointDataUpdated';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import { RootState } from '../../../app/redux/store';
import './ServicePointDetails.css';
import type {
  IAccessTypeListItemProps,
  IBrandsProps,
  IChargeUnitsProps,
  IConnectorProps,
  IConnectorPropertyProps,
  IConnectorStateProps,
  IInvestorsProps,
  IServicePointsDetailsPageProps,
  IServicePointsDetailsProps,
  IStatusListItemProps,
  IEnergyPriceDetailsProps
} from './types';

const ServicePointsDetails: React.FC<IServicePointsDetailsPageProps> = ({ slug }: IServicePointsDetailsPageProps) => {
  const dispatch = useDispatch();
  const alertInformation = useSelector((state: RootState) => state.alertInformation);
  const dialogInformation = useSelector((state: RootState) => state.dialogInformation);
  const isChargePointDataUpdated = useSelector(
    (state: RootState) => state.isChargePointDataUpdated.isChargePointDataUpdated
  );
  const isLoadingVisible = useSelector((state: RootState) => state.isLoadingVisible.isLoading);
  const isModalVisible = useSelector((state: RootState) => state.isModalVisible.isModalVisible);

  const [accessTypeList, setAccessTypeList] = useState<IAccessTypeListItemProps[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(3);
  const [addChargeUnit, setAddChargeUnit] = useState<boolean>(false);
  const [addComission, setAddComission] = useState<boolean>(false);
  const [addConnector, setAddConnector] = useState(false);
  const [addEnergyPrice, setAddEnergyPrice] = useState<boolean>(false);
  const [addPermission, setAddPermission] = useState<boolean>(false);
  const [brands, setBrands] = useState<IBrandsProps[]>([]);
  const [chargeUnits, setChargeUnits] = useState<IChargeUnitsProps[]>([]);
  const [connectorProperty, setConnectorProperty] = useState<IConnectorPropertyProps>({
    chargePointId: 0,
    chargePointModelId: 0,
    connectorNumber: 0,
    connectorId: 0
  });
  const [connectors, setConnectors] = useState<IConnectorStateProps[]>([]);
  const [energyPriceDetails, setEnergyPriceDetails] = useState<IEnergyPriceDetailsProps[]>([]);
  const [investors, setInvestors] = useState<IInvestorsProps[]>([]);
  const [isEnergyPriceListUpdated, setIsEnergyPriceListUpdated] = useState<boolean>(false);
  const [servicePointDetails, setServicePointDetails] =
    useState<IServicePointsDetailsProps>({
      name: '',
      id: 0,
      resellerCompanyId: 0,
      companyId: 0,
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
          setChargeUnits(data)
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

          return getConnectorProperties(data.data);  // Promise dönüyor, ama hemen beklemiyoruz.
        } catch (error) {
          console.error(error);
        }
      });

      // @ts-expect-error We did not wait for the checking to be resolved.
      // TODO : We need to wait for the checking to be resolved.
      await Promise.all(promises).then(data => setConnectors([data]));

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
  const getEnergyPrices = async () => {
    try {
      await axios
        .post(
          process.env.GET_ENERGY_PRICE || '',
          ({ stationId: Number(slug) }),
        )
        .then((response) => {
          setEnergyPriceDetails(response.data.data);
          setIsEnergyPriceListUpdated(false);
        });
    } catch (error) {
      console.log(error);
    };
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

  useEffect(() => {
    getBrands();
    getChargeUnits();
    getChargeUnitFeatures();
    getEnergyPrices();
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

  useEffect(() => {
    getEnergyPrices();
  }, [isEnergyPriceListUpdated]);

  return (
    isLoadingVisible
      ? (
        <Loading />
      )
      : (
        <div className={`${BRAND_PREFIX}-service-point-details-page-content-wrapper w-full`}>
          <div className={`${BRAND_PREFIX}-service-point-details-page-content-container w-full`}>
            <ServicePointDetailsHeader
              servicePointDetailsName={servicePointDetails.name}
              servicePointDetailsStatus={servicePointDetails.isActive}
            />
            <Navbar
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
            <ServicePointsDetailsBody
              activeIndex={activeIndex}
              chargeUnits={chargeUnits}
              connectorsList={connectors}
              energyPriceDetails={energyPriceDetails}
              setAddChargeUnit={setAddChargeUnit}
              setAddComission={setAddComission}
              setAddConnector={setAddConnector}
              setAddEnergyPrice={setAddEnergyPrice}
              setAddPermission={setAddPermission}
              setConnectorProperty={setConnectorProperty}
              setIsEnergyPriceListUpdated={setIsEnergyPriceListUpdated}
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
                  dispatch(toggleModalVisibility());
                }}
              >
                <ChargeUnitAddModal
                  accessTypeList={accessTypeList}
                  brands={brands}
                  statusList={statusList}
                  investors={investors}
                  slug={slug}
                  setAddChargeUnit={setAddChargeUnit}
                />
              </Modal>
            )
          }
          {
            addConnector && isModalVisible && (
              <Modal
                modalHeaderTitle='Konnektör Ekle'
                modalId={`${BRAND_PREFIX}-connector-add-modal`}
                onClose={() => dispatch(toggleModalVisibility())}
              >
                <ConnectorAddModal
                  connectorProperty={connectorProperty}
                  setAddConnector={setAddConnector}
                />
              </Modal>
            )
          }
          {
            addEnergyPrice && isModalVisible && (
              <Modal
                modalHeaderTitle='Enerji Fiyat Ayarlari'
                modalId={`${BRAND_PREFIX}-energy-prices-modal`}
                onClose={() => dispatch(toggleModalVisibility()) && setAddEnergyPrice(false) }
              >
                <EnergyPricesModal
                  setIsEnergyPriceListUpdated={setIsEnergyPriceListUpdated}
                  setAddEnergyPrice={setAddEnergyPrice}
                  slug={slug}
                />
              </Modal>
            )
          }
          {
            addPermission && isModalVisible && (
              <Modal
                modalHeaderTitle='Yetki Ekle'
                modalId={`${BRAND_PREFIX}-service-point-permissions-modal`}
                onClose={() => dispatch(toggleModalVisibility()) && setAddPermission(false)}
              >
                <ServicePointPermissionsModal
                  slug={slug}
                />
              </Modal>
            )
          }
          {
            addComission && isModalVisible && (
              <Modal
                modalHeaderTitle='Komisyon Ekle'
                modalId={`${BRAND_PREFIX}-service-point-comission-modal`}
                onClose={() => dispatch(toggleModalVisibility()) && setAddComission(false)}
              >
                <ComissionModal />
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
          {
            alertInformation.isVisible && (
              <Alert
                alertText={alertInformation.message}
                alertType={alertInformation.type}
                id={`${BRAND_PREFIX}-service-point-details-alert`}
              />
            )
          }
        </div>
      )
  );
};

export default ServicePointsDetails;
