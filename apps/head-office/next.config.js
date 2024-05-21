//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  env: {
    ADD_STATION_FEATURE: 'https://sharztestapi.azurewebsites.net/StationFeature/AddStationFeature',
    ADD_STATION_INFO_URL: 'https://sharztestapi.azurewebsites.net/StationInfo/AddStationInfo',
    ADD_STATION_URL: 'https://sharztestapi.azurewebsites.net/ServicePoint/AddStation',
    ADD_STATION_SETTINGS: 'https://sharztestapi.azurewebsites.net/ServicePoint/AddStationSettings',
    CITY_URL: 'https://sharztestapi.azurewebsites.net/Values/GetCities',
    DELETE_STATION_URL: 'https://sharztestapi.azurewebsites.net/ServicePoint/DeleteStation',
    DISTRICT_URL: 'https://sharztestapi.azurewebsites.net/Values/GetDistricts',
    GET_ALL_SERVICE_POINTS: 'https://sharztestapi.azurewebsites.net/ServicePoint/GetAllPoints',
    GET_ALL_FEATURES: 'https://sharztestapi.azurewebsites.net/StationFeature/GetAllFeatures',
    GET_CHARGE_POINT_CONNECTORS: 'https://sharztestapi.azurewebsites.net/StationInfo/GetChargePointConnectors',
    GET_CHARGE_POINT_CONNECTORSV2: 'https://sharztestapi.azurewebsites.net/StationInfo/GetChargePointConnectorsV2',
    GET_CHARGE_POINT_FEATURES: 'https://sharztestapi.azurewebsites.net/Values/GetChargePointFeatures',
    GET_CHARGE_POINT_STATION_FEATURE: 'https://sharztestapi.azurewebsites.net/StationFeature/GetChargePointFeature',
    GET_CHARGE_UNIT_MODELS: 'https://sharztestapi.azurewebsites.net/Values/GetModels',
    GET_COMPANIES_URL: 'https://sharztestapi.azurewebsites.net/ServicePoint/GetCompanies',
    GET_CONNECTOR_INFO: 'https://sharztestapi.azurewebsites.net/ServicePoint/StationConnectorInfo',
    GET_CONNECTOR_MODELS: 'https://sharztestapi.azurewebsites.net/Values/GetConnectorModels',
    GET_DEVICE_CODE: 'https://sharztestapi.azurewebsites.net/Values/GetDeviceCode',
    GET_ENERGY_PRICE: 'https://sharztestapi.azurewebsites.net/ServicePoint/GetEnergyPrice',
    GET_STATION_FEATURES: 'https://sharztestapi.azurewebsites.net/StationFeature/GetStationFeature',
    GET_STATION_SELECTED_FEATURES: 'https://sharztestapi.azurewebsites.net/StationFeature/StationSelectedValues',
    GET_FEATURE_VALUES: 'https://sharztestapi.azurewebsites.net/StationFeature/GetFeatureValues',
    GET_INVESTORS: 'https://sharztestapi.azurewebsites.net/Values/GetInvestors',
    GET_RESELLERS_URL: 'https://sharztestapi.azurewebsites.net/ServicePoint/GetResellers',
    GET_STATION_BY_ID: 'https://sharztestapi.azurewebsites.net/ServicePoint/GetStationById',
    GET_STATION_INFO_BY_ID: 'https://sharztestapi.azurewebsites.net/StationInfo/GetByStationId',
    GET_STATION_SETTINGS: 'https://sharztestapi.azurewebsites.net/ServicePoint/GetStationSettings',
    GET_USERS: 'https://sharztestapi.azurewebsites.net/Auth/Users',
    GET_SEARCH_USERS: 'https://sharztestapi.azurewebsites.net/Auth/SearchUser',
    GET_WORKING_HOURS: 'https://sharztestapi.azurewebsites.net/ServicePoint/GetWorkHours',
    LOGIN_URL: 'https://sharztestapi.azurewebsites.net/Auth/Login',
    REMOVE_ENERGY_PRICE: 'https://sharztestapi.azurewebsites.net/ServicePoint/RemoveEnergyPrice',
    UPDATE_CONNECTOR_URL: 'https://sharztestapi.azurewebsites.net/ServicePoint/UpdateConnector',
    UPDATE_STATION_INFO_URL: 'https://sharztestapi.azurewebsites.net/StationInfo/UpdateStationInfo',
    UPDATE_STATION_SETTINGS: 'https://sharztestapi.azurewebsites.net/ServicePoint/UpdateStationSettings',
    UPDATE_STATION_URL: 'https://sharztestapi.azurewebsites.net/ServicePoint/UpdateStation',
  },
  generateStaticParams: async () => {
    return [
      {
        params: {},
        path: '/'
      },
    ];
  },
};

const plugins = [withNx];

module.exports = composePlugins(...plugins)(nextConfig);

