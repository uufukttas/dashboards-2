import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@projects/alert';
import { Dialog } from '@projects/dialog';
import ChargeUnitAddModal from './Modals/ChargeUnitAddModal';
import ComissionModal from './Modals/ComissionModal';
import ConnectorAddModal from './Modals/ConnectorAddModal';
import EnergyPricesModal from './Modals/EnergyPricesModal';
import ServicePointPermissionsModal from './Modals/ServicePointPermissionsModal';
import ServicePointsDetailsBody from './ServicePointsDetailsComponents/ServicePointsDetailsBody';
import ServicePointDetailsHeader from './ServicePointsDetailsComponents/ServicePointDetailsHeader';
import Loading from '../Loading/Loading';
import Modal from '../Modal/Modal';
import Navbar from '../Navbar/Navbar';
import { BRAND_PREFIX } from '../../constants/constants';
import { getChargePointFeatureStatus, getChargePointInvestors, getChargeUnitBrands } from '../../../app/api/servicePointDetails';
import { deleteChargePointRequest } from '../../../app/api/servicePoints/deleteChargePointRequest';
import { setAccessTypeList } from '../../../app/redux/features/accessTypeList';
import { hideAlert, showAlert } from '../../../app/redux/features/alertInformation';
import { setChargeUnitBrands } from '../../../app/redux/features/chargeUnitBrands';
import { setChargeUnitData } from '../../../app/redux/features/chargeUnitData';
import { hideDialog } from '../../../app/redux/features/dialogInformation';
import { toggleChargePointDataUpdated } from '../../../app/redux/features/isChargePointDataUpdated';
import { toggleConnectorUpdated } from '../../../app/redux/features/isConnectorUpdated';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import { toggleServicePointPermissionsUpdated } from '../../../app/redux/features/isServicePointPermissionsUpdated';
import { setStatusList } from '../../../app/redux/features/statusList';
import { RootState } from '../../../app/redux/store';
import type {
  IChargeUnitsProps,
  IConnectorProps,
  IConnectorPropertyProps,
  IConnectorStateProps,
  IInvestorsProps,
  IServicePointsDetailsPageProps,
  IServicePointsDetailsProps,
  IEnergyPriceDetailsProps,
  IPermissionsProps
} from './types';
import './ServicePointDetails.css';
import { setChargeUnitInvestors } from 'apps/head-office/app/redux/features/chargeUnitInvestors';

const ServicePointsDetails: React.FC<IServicePointsDetailsPageProps> = ({ slug }: IServicePointsDetailsPageProps) => {
  const dispatch = useDispatch();
  const alertInformation = useSelector((state: RootState) => state.alertInformation);
  const dialogInformation = useSelector((state: RootState) => state.dialogInformation);
  const isChargePointDataUpdated = useSelector((state: RootState) => {
    return state.isChargePointDataUpdated.isChargePointDataUpdated
  });
  const isConnectorUpdated = useSelector((state: RootState) => state.isConnectorUpdated.isConnectorUpdated);
  const isLoadingVisible = useSelector((state: RootState) => state.isLoadingVisible.isLoading);
  const isModalVisible = useSelector((state: RootState) => state.isModalVisible.isModalVisible);
  const isServicePointPermissionsUpdated = useSelector((state: RootState) => {
    return state.isServicePointPermissionsUpdated.isServicePointPermissionsUpdated
  });
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [addChargeUnit, setAddChargeUnit] = useState<boolean>(false);
  const [addComission, setAddComission] = useState<boolean>(false);
  const [addConnector, setAddConnector] = useState(false);
  const [addEnergyPrice, setAddEnergyPrice] = useState<boolean>(false);
  const [addPermission, setAddPermission] = useState<boolean>(false);
  const [chargeUnits, setChargeUnits] = useState<IChargeUnitsProps[]>([]);
  const [comissions, setComissions] = useState([]);
  const [connectorProperty, setConnectorProperty] = useState<IConnectorPropertyProps>({
    chargePointId: 0,
    chargePointModelId: 0,
    connectorId: 0,
    connectorNumber: 0,
  });
  const [connectors, setConnectors] = useState<IConnectorStateProps[]>([]);
  const [energyPriceDetails, setEnergyPriceDetails] = useState<IEnergyPriceDetailsProps[]>([]);
  const [investors, setInvestors] = useState<IInvestorsProps[]>([]);
  const [isEnergyPriceListUpdated, setIsEnergyPriceListUpdated] = useState<boolean>(false);
  const [isComissionsListUpdated, setIsComissionListUpdated] = useState<boolean>(false);
  const [permissions, setPermissions] = useState<IPermissionsProps[]>([]);
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

  const deleteChargePoint = async (deletedChargeUnitData: IChargeUnitsProps[]) => {
    try {
      const data = await deleteChargePointRequest(deletedChargeUnitData);

      if (data.success) {
        dispatch(hideDialog());
        dispatch(toggleChargePointDataUpdated(true));
        dispatch(
          showAlert({
            type: 'success',
            message: data.message
          })
        );
      } else {
        dispatch(showAlert({
          type: 'error',
          message: data.message
        })
        );
        dispatch(hideDialog());
      }

    } catch (error) {
      console.log(error);
    };
  };
  const deleteEnergyPrice = async (deletedEnergyPriceId: number) => {
    await axios
      .post(
        process.env.REMOVE_ENERGY_PRICE || '',
        JSON.stringify({ Id: deletedEnergyPriceId }),
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(() => {
        dispatch(hideDialog());
        setIsEnergyPriceListUpdated(true);
      })
  };
  const deleteServicePointPermission = async (deletedPermissionId: number) => {
    try {
      await axios
        .post(
          'https://sharztestapi.azurewebsites.net/Auth/ChargePointUserDelete',
          JSON.stringify({ userId: deletedPermissionId }),
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then((response) => {
          dispatch(
            showAlert({
              type: 'success',
              message: response.data.message
            })
          );
          dispatch(toggleServicePointPermissionsUpdated(true));
          dispatch(hideDialog());

          setTimeout(() => {
            dispatch(hideAlert());
          }, 5000);
        });
    } catch (error) {
      console.log(error);
    };
  };
  const getBrands = async () => {
    const chargeUnitBrands = await getChargeUnitBrands();

    if (!chargeUnitBrands.success) {
      console.error('Error getting charge unit brands', chargeUnitBrands.error);
    }

    dispatch(setChargeUnitBrands(chargeUnitBrands.data));
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
  const getChargeUnitFeatures = async (): Promise<void> => {
    const featureResponse = await getChargePointFeatureStatus();

    if (!featureResponse.success) {
      console.error('Error getting charge point features', featureResponse.error);
    }

    dispatch(setAccessTypeList(featureResponse.data.accessTypeList));
    dispatch(setStatusList(featureResponse.data.statusList));
  };
  const getComissionDetails = async () => {
    await axios
      .post(
        'https://sharztestapi.azurewebsites.net/ServicePoint/SelectCommisionRate',
        {
          "stationId": slug
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ).then((response) => setComissions(response.data.data));
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

      dispatch(toggleConnectorUpdated(false));
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
    const investorResponse = await getChargePointInvestors();

    if (!investorResponse.success) {
      console.error('Error getting charge point investors', investorResponse.error);
    }

    dispatch(setChargeUnitInvestors(investorResponse.data));
  };
  const getServicePointPermissions = async () => {
    await axios
      .post(
        'https://sharztestapi.azurewebsites.net/auth/ChargePointUsers',
        { stationId: Number(slug) },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((response) => response.data.data)
      .then((data) => setPermissions(data))
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
  const deleteServicePointComission = async (dialogData: number) => {
    await axios
      .post(
        'https://sharztestapi.azurewebsites.net/ServicePoint/UpdateCommisionRate',
        JSON.stringify({
          "rid": dialogData,
          "stationId": Number(slug),
          "isActive": false
        }),
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(() => {
        dispatch(hideDialog());
        dispatch(
          showAlert({
            type: 'success',
            message: 'Komisyon başarıyla silindi.'
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDialogSuccess = () => {
    if (dialogInformation.actionType === 'deleteChargePoint') {
      deleteChargePoint(dialogInformation.data);
    } else if (dialogInformation.actionType === 'deleteEnergyPrice') {
      deleteEnergyPrice(dialogInformation.data);
    } else if (dialogInformation.actionType === 'deleteServicePointPermission') {
      deleteServicePointPermission(dialogInformation.data);
    } else if (dialogInformation.actionType === 'deleteWorkingHours') {
      // deleteWorkingHours(dialogInformation.data);
    } else if (dialogInformation.actionType === 'deleteServicePointComission') {
      deleteServicePointComission(dialogInformation.data);
    }
    hideDialog();
  };

  useEffect(() => {
    getBrands();
    getChargeUnits();
    getChargeUnitFeatures();
    getEnergyPrices();
    getInvestors();
    getServicePointsDetails(slug);
    getServicePointPermissions();
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

  useEffect(() => {
    getServicePointPermissions();
  }, [isServicePointPermissionsUpdated]);

  useEffect(() => {
    getConnectors();
  }, [isConnectorUpdated])

  useEffect(() => {
    getComissionDetails();
  }, [isComissionsListUpdated]);

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
              comissions={comissions}
              connectorsList={connectors}
              energyPriceDetails={energyPriceDetails}
              permissions={permissions}
              setAddChargeUnit={setAddChargeUnit}
              setAddComission={setAddComission}
              setAddConnector={setAddConnector}
              setAddEnergyPrice={setAddEnergyPrice}
              setAddPermission={setAddPermission}
              setConnectorProperty={setConnectorProperty}
              setIsEnergyPriceListUpdated={setIsEnergyPriceListUpdated}
              setPermissions={setPermissions}
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
                  dispatch(toggleModalVisibility(false));
                }}
              >
                <ChargeUnitAddModal
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
                onClose={() => dispatch(toggleModalVisibility(false))}
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
                onClose={() => dispatch(toggleModalVisibility(false)) && setAddEnergyPrice(false)}
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
                onClose={() => dispatch(toggleModalVisibility(false)) && setAddPermission(false)}
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
                onClose={() => dispatch(toggleModalVisibility(false)) && setAddComission(false)}
              >
                <ComissionModal
                  slug={Number(slug)}
                  setIsComissionListUpdated={setIsComissionListUpdated}
                />
              </Modal>
            )
          }
          {
            dialogInformation.isVisible && (
              <Dialog
                handleCancel={() => dispatch(hideDialog())}
                handleSuccess={() => handleDialogSuccess()}
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

