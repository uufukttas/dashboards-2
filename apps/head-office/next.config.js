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
    LOGIN_URL: 'https://sharztestapi.azurewebsites.net/Auth/Login',
    CITY_URL:'https://sharztestapi.azurewebsites.net/Values/GetCities',
    DISTRICT_URL:'https://sharztestapi.azurewebsites.net/Values/GetDistricts',
    ADD_STATION_URL: 'https://sharztestapi.azurewebsites.net/ServicePoint/AddStation',
    DELETE_STATION_URL: 'https://sharztestapi.azurewebsites.net/ServicePoint/DeleteStation',
    ADD_STATION_INFO_URL: 'https://sharztestapi.azurewebsites.net/StationInfo/AddStationInfo',
    GET_ALL_SERVICE_POINTS: 'https://sharztestapi.azurewebsites.net/ServicePoint/GetAllPoints',
    GET_RESELLERS_URL: 'https://sharztestapi.azurewebsites.net/ServicePoint/GetResellers',
    GET_STATION_BY_ID: 'https://sharztestapi.azurewebsites.net/ServicePoint/GetStationById',
    GET_STATION_INFO_BY_ID: 'https://sharztestapi.azurewebsites.net/StationInfo/GetByStationId',
    GET_COMPANIES_URL: 'https://sharztestapi.azurewebsites.net/ServicePoint/GetCompanies',
    UPDATE_STATION_URL: 'https://sharztestapi.azurewebsites.net/ServicePoint/UpdateStation',
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
