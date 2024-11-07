import React, { useEffect, useRef, useState } from 'react';
import { FaClock, FaCoins, FaLocationDot, FaUserGear } from 'react-icons/fa6';
import { RiBattery2ChargeFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { SlEnergy } from 'react-icons/sl';
import { detectDevice } from '@projects/common';
import { Dialog } from '@projects/dialog';
import { initialChargeUnitDataValue } from './constants';
import ChargeUnitAddModal from './Modals/ChargeUnitAddModal';
import ComissionModal from './Modals/ComissionModal';
import ConfigurationModal from './Modals/ConfigurationModal';
import ConnectorAddModal from './Modals/ConnectorAddModal';
import EnergyPricesModal from './Modals/EnergyPricesModal';
import ImageAddModal from './Modals/ImageAddModal';
import ServicePointPermissionsModal from './Modals/ServicePointPermissionsModal';
import StationManagementModal from './Modals/StationManagementModal';
import ServicePointsDetailsContent from './ServicePointsDetailsComponents/ServicePointsDetailsContent';
import Loading from '../Loading/Loading';
import Modal from '../Modal/Modal';
import Tabs from '../Tabs/Tabs';
import { BRAND_PREFIX } from '../../constants/constants';
import { getColorsRequest } from '../../../app/api/profile';
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
  getEnergyPriceDetails,
  getPermissionRequest,
} from '../../../app/api/servicePointDetails';
import { getServicePointDataRequest } from '../../../app/api/servicePoints';
import { deleteChargePointRequest } from '../../../app/api/servicePoints/deleteChargePointRequest';
import { setAccessTypeList } from '../../../app/redux/features/accessTypeList';
import {
  hideAlert,
  showAlert,
} from '../../../app/redux/features/alertInformation';
import { setChargeUnitBrands } from '../../../app/redux/features/chargeUnitBrands';
import { setChargeUnitData } from '../../../app/redux/features/chargeUnitData';
import { setChargeUnitInvestors } from '../../../app/redux/features/chargeUnitInvestors';
import { setChargeUnitList } from '../../../app/redux/features/chargeUnitList';
import { setComissionData } from '../../../app/redux/features/comissionData';
import { setConnectors } from '../../../app/redux/features/connectorsData';
import { hideDialog } from '../../../app/redux/features/dialogInformation';
import { setEnergyPriceDetails } from '../../../app/redux/features/energyPriceDetails';
import { toggleChargePointDataUpdated } from '../../../app/redux/features/isChargePointDataUpdated';
import { toggleComissionListUpdate } from '../../../app/redux/features/isComissionListUpdated';
import { toggleConnectorUpdated } from '../../../app/redux/features/isConnectorUpdated';
import { toggleEnergyPriceListUpdate } from '../../../app/redux/features/isEnergyPriceListUpdated';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import { toggleServicePointPermissionsUpdated } from '../../../app/redux/features/isServicePointPermissionsUpdated';
import { setPermissionData } from '../../../app/redux/features/permissionsData';
import { setServicePointData } from '../../../app/redux/features/servicePointData';
import { setConfigs } from '../../../app/redux/features/setConfig';
import {
  setAddChargeUnit,
  setAddComission,
  setAddConnector,
  setAddEnergyPrice,
  setAddPermission,
  setAddServicePointImage,
  setConfigureStation,
  setManageStation,
  setStationImages,
} from '../../../app/redux/features/setVisibleModal';
import { setStatusList } from '../../../app/redux/features/statusList';
import { RootState } from '../../../app/redux/store';
import type {
  IChargeUnitsProps,
  IModalConfigProps,
  IServicePointsDetailsPageProps,
  ITabsItemProps,
} from './types';
import './ServicePointDetails.css';
import { Toast } from 'primereact/toast';
import StationImagesModal from './Modals/StationImagesModal';

const ServicePointsDetails: React.FC<IServicePointsDetailsPageProps> = ({
  slug,
}: IServicePointsDetailsPageProps) => {
  const tabItems: ITabsItemProps[] = [
    {
      title: (
        <>
          <FaLocationDot />
          {detectDevice().isMobile ? '' : 'İstasyon Bilgileri'}
        </>
      ),
    },
    {
      title: (
        <>
          <RiBattery2ChargeFill />
          {detectDevice().isMobile ? '' : 'Şarj Üniteleri'}
        </>
      ),
    },
    {
      title: (
        <>
          <FaClock />
          {detectDevice().isMobile ? '' : 'Çalışma Saatleri'}
        </>
      ),
    },
    {
      title: (
        <>
          <SlEnergy />
          {detectDevice().isMobile ? '' : 'Enerji Fiyat Ayarlari'}
        </>
      ),
    },
    {
      title: (
        <>
          <FaCoins />
          {detectDevice().isMobile ? '' : 'Komisyonlar'}
        </>
      ),
    },
    {
      title: (
        <>
          <FaUserGear />
          {detectDevice().isMobile ? '' : 'İstasyon Yetkilileri'}
        </>
      ),
    },
  ];
  const dispatch = useDispatch();
  const toastRef = useRef(null); // toastRef isminde güncellenmiş bir useRef
  const addChargeUnit = useSelector(
    (state: RootState) => state.setVisibleModal.addChargeUnit
  );
  const addComission = useSelector(
    (state: RootState) => state.setVisibleModal.addComission
  );
  const addConnector = useSelector(
    (state: RootState) => state.setVisibleModal.addConnector
  );
  const addEnergyPrice = useSelector(
    (state: RootState) => state.setVisibleModal.addEnergyPrice
  );
  const addPermission = useSelector(
    (state: RootState) => state.setVisibleModal.addPermission
  );
  const addServicePointImage = useSelector(
    (state: RootState) => state.setVisibleModal.addServicePointImage
  );
  const alertInformation = useSelector(
    (state: RootState) => state.alertInformation
  );
  const chargeUnitList = useSelector(
    (state: RootState) => state.chargeUnitList
  );
  const colors = useSelector((state: RootState) => state.configs.colors);
  const configureStation = useSelector(
    (state: RootState) => state.setVisibleModal.configureStation
  );
  const dialogInformation = useSelector(
    (state: RootState) => state.dialogInformation
  );
  const isChargePointDataUpdated = useSelector((state: RootState) => {
    return state.isChargePointDataUpdated.isChargePointDataUpdated;
  });
  const isComissionsListUpdated = useSelector(
    (state: RootState) => state.isComissionListUpdated.isComissionListUpdated
  );
  const isConnectorUpdated = useSelector(
    (state: RootState) => state.isConnectorUpdated.isConnectorUpdated
  );
  const isEnergyPriceListUpdated = useSelector(
    (state: RootState) =>
      state.isEnergyPriceListUpdated.isEnergyPriceListUpdated
  );
  const isLoadingVisible = useSelector(
    (state: RootState) => state.isLoadingVisible.isLoading
  );
  const isModalVisible = useSelector(
    (state: RootState) => state.isModalVisible.isModalVisible
  );
  const isServicePointPermissionsUpdated = useSelector((state: RootState) => {
    return state.isServicePointPermissionsUpdated
      .isServicePointPermissionsUpdated;
  });
  const manageStation = useSelector(
    (state: RootState) => state.setVisibleModal.manageStation
  );
  const stationImages = useSelector(
    (state: RootState) => state.setVisibleModal.stationImages
  );
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const modalConfig: IModalConfigProps[] = [
    {
      condition: addServicePointImage,
      headerTitle: 'Resim Ekle',
      modalId: `${BRAND_PREFIX}-service-point-image-add-modal`,
      content: <ImageAddModal slug={slug} />,
      closeAction: () => dispatch(setAddServicePointImage(false)),
    },
    {
      condition: addChargeUnit,
      headerTitle: 'Şarj Ünitesi Ekle',
      modalId: `${BRAND_PREFIX}-charge-points-add-modal`,
      content: <ChargeUnitAddModal slug={slug} />,
      closeAction: () =>
        dispatch(setChargeUnitData(initialChargeUnitDataValue)) &&
        dispatch(setAddChargeUnit(false)),
    },
    {
      condition: addConnector,
      headerTitle: 'Soket Tanımla',
      modalId: `${BRAND_PREFIX}-connector-add-modal`,
      content: <ConnectorAddModal />,
      closeAction: () => dispatch(setAddConnector(false)),
    },
    {
      condition: addEnergyPrice,
      headerTitle: 'Enerji Fiyat Ayarlari',
      modalId: `${BRAND_PREFIX}-energy-prices-modal`,
      content: <EnergyPricesModal slug={slug} />,
      closeAction: () => dispatch(setAddEnergyPrice(false)),
    },
    {
      condition: addPermission,
      headerTitle: 'Yetki Ekle',
      modalId: `${BRAND_PREFIX}-service-point-permissions-modal`,
      content: <ServicePointPermissionsModal slug={slug} />,
      closeAction: () => dispatch(setAddPermission(false)),
    },
    {
      condition: addComission,
      headerTitle: 'Komisyon Ekle',
      modalId: `${BRAND_PREFIX}-service-point-comission-modal`,
      content: <ComissionModal slug={Number(slug)} />,
      closeAction: () => dispatch(setAddComission(false)),
    },
    {
      condition: manageStation,
      headerTitle: 'İstasyon Yönetimi',
      modalId: `${BRAND_PREFIX}-service-point-station-management-modal`,
      content: (
        <StationManagementModal
          unitCode={manageStation.unitCode}
          connectorNumber={manageStation.connectorNumber}
        />
      ),
      closeAction: () =>
        dispatch(
          setManageStation({
            isVisible: false,
            unitCode: manageStation.unitCode,
            connectorNumber: manageStation.connectorNumber,
          })
        ),
    },
    {
      condition: configureStation,
      headerTitle: 'İstasyon Konfigurasyon Ayarlari',
      modalId: `${BRAND_PREFIX}-service-point-configuration-modal`,
      content: <ConfigurationModal />,
      closeAction: () => dispatch(setConfigureStation(false)),
    },
    {
      condition: stationImages,
      headerTitle: 'İstasyon Görselleri',
      modalId: `${BRAND_PREFIX}-station-images`,
      content: <StationImagesModal stationId={slug} />,
      closeAction: () => dispatch(setStationImages(false)),
      containerClassName: 'max-w-auto max-w-6xl min-w-6xl',
    },
  ];

  const deleteChargePoint = async (
    deletedChargeUnitData: IChargeUnitsProps[]
  ): Promise<void> => {
    try {
      const data = await deleteChargePointRequest(deletedChargeUnitData);

      if (data.success) {
        dispatch(hideDialog());
        dispatch(toggleChargePointDataUpdated(true));
        dispatch(
          showAlert({
            type: 'success',
            message: data.message,
          })
        );
      } else {
        dispatch(
          showAlert({
            type: 'error',
            message: data.message,
          })
        );
        dispatch(hideDialog());
      }
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      dispatch(hideAlert());
    }, 5000);
  };
  const deleteEnergyPrices = async (
    deletedEnergyPriceId: number
  ): Promise<void | null> => {
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
        message: response.message,
      })
    );

    setTimeout(() => {
      dispatch(hideAlert());
    }, 5000);
  };
  const deleteServicePointPermission = async (
    deletedPermissionId: number
  ): Promise<void | null> => {
    const response = await deleteServicePointPermissionRequest(
      deletedPermissionId
    );

    if (!response.success) {
      console.error('Error deleting service point permission', response.error);

      return;
    }

    dispatch(hideDialog());
    dispatch(toggleServicePointPermissionsUpdated(true));
    dispatch(
      showAlert({
        type: 'success',
        message: response.message,
      })
    );

    setTimeout(() => {
      dispatch(hideAlert());
    }, 5000);
  };
  const fetchConfigurations = async (): Promise<void> => {
    const colors = await getColorsRequest([
      'Primary',
      'Secondary',
      'Alternate',
      'Backup',
    ]);

    dispatch(setConfigs(colors.data));
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
      console.error(
        'Error getting charge point features',
        featureResponse.error
      );

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
    try {
      const promises = chargeUnitList.map((chargeUnit: IChargeUnitsProps) =>
        getChargePointConnetors(chargeUnit.chargePointId)
      );
      const responses = await Promise.all(promises);
      const connectorData = responses.map((response) => response.data);
      const updatedConnectorList = [...connectorData];

      dispatch(setConnectors(updatedConnectorList));
    } catch (error) {
      console.error('Failed to fetch connectors:', error);
    }

    dispatch(toggleConnectorUpdated(false));
  };
  const getEnergyPrices = async (): Promise<void | null> => {
    const energyPriceResponse = await getEnergyPriceDetails(slug);

    if (!energyPriceResponse.success) {
      console.error('Error getting energy prices', energyPriceResponse.error);
    }

    dispatch(setEnergyPriceDetails(energyPriceResponse.data));
    dispatch(toggleEnergyPriceListUpdate(false));
  };
  const getInvestors = async (): Promise<void | null> => {
    const investorResponse = await getChargePointInvestors();

    if (!investorResponse.success) {
      console.error(
        'Error getting charge point investors',
        investorResponse.error
      );
    }

    dispatch(setChargeUnitInvestors(investorResponse.data));
  };
  const getServicePointPermissions = async (): Promise<void | null> => {
    const permissionResponse = await getPermissionRequest(Number(slug));

    if (!permissionResponse.success) {
      console.error(
        'Error getting service point permissions',
        permissionResponse.error
      );
    }

    dispatch(setPermissionData(permissionResponse.data));
    dispatch(toggleServicePointPermissionsUpdated(false));
  };
  const getServicePointsDetails = async (
    slug: string
  ): Promise<void | null> => {
    const stationResponse = await getServicePointDataRequest(Number(slug));

    if (!stationResponse.success) {
      console.error(
        'Error getting service point details',
        stationResponse.error
      );

      return;
    }

    dispatch(setServicePointData(stationResponse.data[0]));
  };
  const deleteServicePointComission = async (
    dialogData: number
  ): Promise<void | null> => {
    const comissionResponse = await deleteComissionRequest(
      dialogData,
      Number(slug)
    );

    if (!comissionResponse.success) {
      console.error('Error deleting comission', comissionResponse.error);

      return;
    }

    dispatch(hideDialog());
    dispatch(
      showAlert({
        type: 'success',
        message: 'Komisyon başarıyla silindi.',
      })
    );

    setTimeout(() => {
      dispatch(hideAlert());
    }, 5000);

    dispatch(toggleComissionListUpdate(true));
  };
  const handleDialogSuccess = (): void => {
    if (dialogInformation.actionType === 'deleteChargePoint') {
      deleteChargePoint(dialogInformation.data);
    } else if (dialogInformation.actionType === 'deleteEnergyPrice') {
      deleteEnergyPrices(dialogInformation.data);
    } else if (
      dialogInformation.actionType === 'deleteServicePointPermission'
    ) {
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
    fetchConfigurations();
    getBrands();
    getChargeUnits();
    getChargeUnitFeatures();
    getComissionDetail();
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
    if (chargeUnitList.length > 0) {
      getConnectors();
    }
  }, [chargeUnitList]);

  useEffect(() => {
    getEnergyPrices();
  }, [isEnergyPriceListUpdated]);

  useEffect(() => {
    getServicePointPermissions();
  }, [isServicePointPermissionsUpdated]);

  useEffect(() => {
    getConnectors();
  }, [isConnectorUpdated]);

  useEffect(() => {
    if (isComissionsListUpdated) {
      getComissionDetail();
    }

    dispatch(toggleComissionListUpdate(false));
  }, [isComissionsListUpdated]);

  useEffect(() => {
    if (alertInformation.isVisible && toastRef.current) {
      // @ts-ignore
      toastRef.current.show({
        severity: `${alertInformation.type}`,
        summary: `${alertInformation.message}`,
      });
    }
  }, [alertInformation.isVisible]);

  return isLoadingVisible ? (
    <Loading />
  ) : (
    <div
      className={`${BRAND_PREFIX}-service-point-details-page-content-wrapper w-full`}
      style={
        {
          '--primary-color': `${colors && colors[0]?.value}`,
          '--secondary-color': `${colors && colors[1]?.value}`,
        } as React.CSSProperties
      }
    >
      <div
        className={`${BRAND_PREFIX}-service-point-details-page-content-container w-full`}
      >
        <Tabs
          activeTabIndex={activeTabIndex}
          setActiveTabIndex={setActiveTabIndex}
          tabItems={tabItems}
        />
        <ServicePointsDetailsContent
          activeTabIndex={activeTabIndex}
          slug={slug}
        />
      </div>
      {alertInformation.isVisible && <Toast ref={toastRef} />}
      {dialogInformation.isVisible && (
        <Dialog
          handleCancel={() => dispatch(hideDialog())}
          handleSuccess={() => handleDialogSuccess()}
        />
      )}
      {modalConfig.map((modal) => {
        // @ts-ignore
        if (
          (
            typeof modal.condition !== 'object' &&
            modal.condition &&
            isModalVisible) ||
          // @ts-ignore
          (modal.condition.isVisible && isModalVisible)
        ) {
          return (
            <Modal
              key={modal.modalId}
              modalHeaderTitle={modal.headerTitle}
              modalId={modal.modalId}
              onClose={() => {
                dispatch(toggleModalVisibility(false));
                modal.closeAction();
              }}
              modalContainerClassName={modal.containerClassName}
              className={modal.className}
            >
              {modal.content}
            </Modal>
          );
        }
      })}
    </div>
  );
};

export default ServicePointsDetails;
