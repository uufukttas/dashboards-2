import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@projects/alert';
import { Dialog } from '@projects/dialog';
import ChargeUnitAddModal from './Modals/ChargeUnitAddModal';
import ComissionModal from './Modals/ComissionModal';
import ConnectorAddModal from './Modals/ConnectorAddModal';
import EnergyPricesModal from './Modals/EnergyPricesModal';
import ImageAddModal from './Modals/ImageAddModal';
import ServicePointPermissionsModal from './Modals/ServicePointPermissionsModal';
import ServicePointsDetailsBody from './ServicePointsDetailsComponents/ServicePointsDetailsBody';
import ServicePointDetailsHeader from './ServicePointsDetailsComponents/ServicePointDetailsHeader';
import Loading from '../Loading/Loading';
import Modal from '../Modal/Modal';
import Navbar from '../Navbar/Navbar';
import { BRAND_PREFIX } from '../../constants/constants';
import {
  deleteComissionRequest,
  deleteEnergyPriceRequest,
  deleteServicePointPermissionRequest,
  getChargePointConnetors,
  getChargePointFeatureStatus,
  getChargePointInvestors,
  getChargeUnitBrands,
  getChargeUnitsRequest,
  getComissionDetails,
  getConnectorPropertiesRequest,
  getEnergyPriceDetails,
  getPermissionRequest,
} from '../../../app/api/servicePointDetails';
import { deleteChargePointRequest } from '../../../app/api/servicePoints/deleteChargePointRequest';
import { setAccessTypeList } from '../../../app/redux/features/accessTypeList';
import { hideAlert, showAlert } from '../../../app/redux/features/alertInformation';
import { setChargeUnitBrands } from '../../../app/redux/features/chargeUnitBrands';
import { setChargeUnitData } from '../../../app/redux/features/chargeUnitData';
import { setChargeUnitInvestors } from '../../../app/redux/features/chargeUnitInvestors';
import { setChargeUnitList } from '../../../app/redux/features/chargeUnitList';
import { setComissionData } from '../../../app/redux/features/comissionData';
import { setConnectors } from '../../../app/redux/features/connectorsData';
import { hideDialog } from '../../../app/redux/features/dialogInformation';
import { setEnergyPriceDetails } from '../../../app/redux/features/energyPriceDetails';
import { toggleChargePointDataUpdated } from '../../../app/redux/features/isChargePointDataUpdated';
import { toggleConnectorUpdated } from '../../../app/redux/features/isConnectorUpdated';
import { toggleEnergyPriceListUpdate } from '../../../app/redux/features/isEnergyPriceListUpdated';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import { toggleServicePointPermissionsUpdated } from '../../../app/redux/features/isServicePointPermissionsUpdated';
import { setPermissionData } from '../../../app/redux/features/permissionsData';
import { getServicePointDataRequest } from '../../../app/api/servicePoints';
import { setServicePointData } from '../../../app/redux/features/servicePointData';
import {
  setAddChargeUnit,
  setAddComission,
  setAddConnector,
  setAddEnergyPrice,
  setAddPermission,
  setAddServicePointImage,
} from '../../../app/redux/features/setVisibleModal';
import { setStatusList } from '../../../app/redux/features/statusList';
import { RootState } from '../../../app/redux/store';
import type {
  IChargeUnitsProps,
  IConnectorProps,
  IServicePointsDetailsPageProps,
} from './types';
import './ServicePointDetails.css';

const ServicePointsDetails: React.FC<IServicePointsDetailsPageProps> = ({ slug }: IServicePointsDetailsPageProps) => {
  const dispatch = useDispatch();
  const addChargeUnit = useSelector((state: RootState) => state.setVisibleModal.addChargeUnit);
  const addComission = useSelector((state: RootState) => state.setVisibleModal.addComission);
  const addConnector = useSelector((state: RootState) => state.setVisibleModal.addConnector);
  const addEnergyPrice = useSelector((state: RootState) => state.setVisibleModal.addEnergyPrice);
  const addPermission = useSelector((state: RootState) => state.setVisibleModal.addPermission);
  const addServicePointImage = useSelector((state: RootState) => state.setVisibleModal.addServicePointImage);
  const alertInformation = useSelector((state: RootState) => state.alertInformation);
  const chargeUnits = useSelector((state: RootState) => state.chargeUnitList);
  const dialogInformation = useSelector((state: RootState) => state.dialogInformation);
  const isChargePointDataUpdated = useSelector((state: RootState) => {
    return state.isChargePointDataUpdated.isChargePointDataUpdated
  });
  const isComissionsListUpdated = useSelector((state: RootState) => state.isComissionListUpdated.isComissionListUpdated);
  const isConnectorUpdated = useSelector((state: RootState) => state.isConnectorUpdated.isConnectorUpdated);
  const isEnergyPriceListUpdated = useSelector((state: RootState) => state.isEnergyPriceListUpdated.isEnergyPriceListUpdated);
  const isLoadingVisible = useSelector((state: RootState) => state.isLoadingVisible.isLoading);
  const isModalVisible = useSelector((state: RootState) => state.isModalVisible.isModalVisible);
  const isServicePointPermissionsUpdated = useSelector((state: RootState) => {
    return state.isServicePointPermissionsUpdated.isServicePointPermissionsUpdated
  });

  // const [isModalOpen, setModalOpen] = useState(false);

  const modalConfig = [
    {
      condition: addServicePointImage,
      headerTitle: 'Resim Ekle',
      modalId: `${BRAND_PREFIX}-service-point-image-add-modal`,
      content: <ImageAddModal />,
      closeAction: () => setAddServicePointImage(false),
    },
    {
      condition: addChargeUnit,
      headerTitle: 'Şarj Ünitesi Ekle',
      modalId: `${BRAND_PREFIX}-charge-points-add-modal`,
      content: <ChargeUnitAddModal slug={slug} />,
      closeAction: () => setChargeUnitData({
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
      }) && setAddChargeUnit(false),
    },
    {
      condition: addConnector,
      headerTitle: 'Konnektör Ekle',
      modalId: `${BRAND_PREFIX}-connector-add-modal`,
      content: <ConnectorAddModal />,
      closeAction: () => setAddConnector(false),
    },
    {
      condition: addEnergyPrice,
      headerTitle: 'Enerji Fiyat Ayarlari',
      modalId: `${BRAND_PREFIX}-energy-prices-modal`,
      content: <EnergyPricesModal slug={slug} />,
      closeAction: () => setAddEnergyPrice(false),
    },
    {
      condition: addPermission,
      headerTitle: 'Yetki Ekle',
      modalId: `${BRAND_PREFIX}-service-point-permissions-modal`,
      content: <ServicePointPermissionsModal slug={slug} />,
      closeAction: () => setAddPermission(false),
    },
    {
      condition: addComission,
      headerTitle: 'Komisyon Ekle',
      modalId: `${BRAND_PREFIX}-service-point-comission-modal`,
      content: <ComissionModal slug={Number(slug)} />,
      closeAction: () => setAddComission(false),
    }
  ];

  const deleteChargePoint = async (deletedChargeUnitData: IChargeUnitsProps[]): Promise<void> => {
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

    setTimeout(() => {
      dispatch(hideAlert());
    }, 5000);
  };
  const deleteEnergyPrices = async (deletedEnergyPriceId: number): Promise<void | null> => {
    const response = await deleteEnergyPriceRequest(deletedEnergyPriceId);

    if (!response.success) {
      console.error('Error deleting energy price', response.error);

      return;
    }

    dispatch(hideDialog());
    dispatch(toggleEnergyPriceListUpdate(true));
    dispatch(
      showAlert({
        type: 'success',
        message: response.message
      })
    );

    setTimeout(() => {
      dispatch(hideAlert());
    }, 5000);
  };
  const deleteServicePointPermission = async (deletedPermissionId: number): Promise<void | null> => {
    const response = await deleteServicePointPermissionRequest(deletedPermissionId);

    if (!response.success) {
      console.error('Error deleting service point permission', response.error);

      return;
    }

    dispatch(hideDialog());
    dispatch(toggleServicePointPermissionsUpdated(true));
    dispatch(
      showAlert({
        type: 'success',
        message: response.message
      })
    );

    setTimeout(() => {
      dispatch(hideAlert());
    }, 5000);
  };
  const getBrands = async (): Promise<void | null> => {
    const chargeUnitBrands = await getChargeUnitBrands();

    if (!chargeUnitBrands.success) {
      console.error('Error getting charge unit brands', chargeUnitBrands.error);

      return null;
    }

    dispatch(setChargeUnitBrands(chargeUnitBrands.data));
  };
  const getChargeUnits = async (): Promise<void | null> => {
    const response = await getChargeUnitsRequest(Number(slug));

    if (!response.success) {
      console.error('Error getting charge units', response.error);

      return;
    }

    dispatch(setChargeUnitList(response.data));
  };
  const getChargeUnitFeatures = async (): Promise<void> => {
    const featureResponse = await getChargePointFeatureStatus();

    if (!featureResponse.success) {
      console.error('Error getting charge point features', featureResponse.error);

      return;
    }

    dispatch(setAccessTypeList(featureResponse.data.accessTypeList));
    dispatch(setStatusList(featureResponse.data.statusList));
  };
  const getComissionDetail = async (): Promise<void | null> => {
    const comissionResponse = await getComissionDetails(slug);

    if (!comissionResponse.success) {
      console.error('Error getting comission details', comissionResponse.error);
    }

    dispatch(setComissionData(comissionResponse.data));
  };
  const getConnectors = async () => {
    const promises = chargeUnits.map(async (chargeUnit: IChargeUnitsProps) => {
      const connectorResponse = await getChargePointConnetors(chargeUnit.chargePointId);

      return getConnectorProperties(connectorResponse.data);
    });

    await Promise.all(promises).then(data => dispatch(setConnectors([data])));

    dispatch(toggleConnectorUpdated(false));
  };
  const getConnectorProperties = async (connectorData: []) => {
    const promises = connectorData.map(async (connector: IConnectorProps) => {
      const connectorPropertiesResponse = await getConnectorPropertiesRequest(connector.stationChargePointID);

      connectorPropertiesResponse.data.forEach((element: IConnectorProps) => {
        if (connector.RID === element.id)
          connector.kw = element.kw;
        connector.connectorName = element.connectorName;
        connector.isAC = element.isAC;
      });

      return connectorData;
    });

    return Promise.all(promises);
  };
  const getEnergyPrices = async (): Promise<void | null> => {
    const energyPriceResponse = await getEnergyPriceDetails(slug)

    if (!energyPriceResponse.success) {
      console.error('Error getting energy prices', energyPriceResponse.error);
    }

    dispatch(setEnergyPriceDetails(energyPriceResponse.data));
    dispatch(toggleEnergyPriceListUpdate(false));
  };
  const getInvestors = async (): Promise<void | null> => {
    const investorResponse = await getChargePointInvestors();

    if (!investorResponse.success) {
      console.error('Error getting charge point investors', investorResponse.error);
    }

    dispatch(setChargeUnitInvestors(investorResponse.data));
  };
  const getServicePointPermissions = async (): Promise<void | null> => {
    const permissionResponse = await getPermissionRequest(Number(slug));

    if (!permissionResponse.success) {
      console.error('Error getting service point permissions', permissionResponse.error);
    }

    dispatch(setPermissionData(permissionResponse.data))
    dispatch(toggleServicePointPermissionsUpdated(false));
  };
  const getServicePointsDetails = async (slug: string): Promise<void | null> => {
    const stationResponse = await getServicePointDataRequest(Number(slug));

    if (!stationResponse.success) {
      console.error('Error getting service point details', stationResponse.error);

      return;
    }

    dispatch(setServicePointData(stationResponse.data[0]));
  };
  const deleteServicePointComission = async (dialogData: number): Promise<void | null> => {
    const comissionResponse = await deleteComissionRequest(dialogData, slug);

    if (!comissionResponse.success) {
      console.error('Error deleting comission', comissionResponse.error);

      return;
    }

    dispatch(hideDialog());
    dispatch(
      showAlert({
        type: 'success',
        message: 'Komisyon başarıyla silindi.'
      })
    );

    setTimeout(() => {
      dispatch(hideAlert());
    }, 5000);
  };
  const handleDialogSuccess = (): void => {
    if (dialogInformation.actionType === 'deleteChargePoint') {
      deleteChargePoint(dialogInformation.data);
    } else if (dialogInformation.actionType === 'deleteEnergyPrice') {
      deleteEnergyPrices(dialogInformation.data);
    } else if (dialogInformation.actionType === 'deleteServicePointPermission') {
      deleteServicePointPermission(dialogInformation.data);
    } else if (dialogInformation.actionType === 'deleteServicePointComission') {
      deleteServicePointComission(dialogInformation.data);
    } else if (dialogInformation.actionType === 'deleteComission') {
      deleteServicePointComission(dialogInformation.data);
    }

    setTimeout(() => {
      dispatch(hideDialog());
    }, 5000);
  };

  useEffect(() => {
    getBrands();
    getChargeUnits();
    getChargeUnitFeatures();
    getEnergyPrices();
    getInvestors();
    getServicePointsDetails(slug);
    getServicePointPermissions();
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
    getComissionDetail();
  }, [isComissionsListUpdated]);

  return (
    isLoadingVisible
      ? (
        <Loading />
      )
      : (
        <div className={`${BRAND_PREFIX}-service-point-details-page-content-wrapper w-full`}>
          <div className={`${BRAND_PREFIX}-service-point-details-page-content-container w-full`}>
            <ServicePointDetailsHeader />
            <Navbar />
            <ServicePointsDetailsBody slug={slug} />
          </div>
          {
            modalConfig.map((modal) => {
              if (modal.condition && isModalVisible) {
                return (
                  <Modal
                    key={modal.modalId}
                    modalHeaderTitle={modal.headerTitle}
                    modalId={modal.modalId}
                    onClose={() => {
                      dispatch(toggleModalVisibility(false));
                      dispatch(modal.closeAction());
                    }}
                  >
                    {modal.content}
                  </Modal>
                );
              }
              return null;
            })
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
