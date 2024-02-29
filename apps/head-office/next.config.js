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
    LOGIN_URL: 'https://testapideneme.azurewebsites.net/Auth/Login',
    CITY_URL:'https://testapideneme.azurewebsites.net/Values/GetCities',
    DISTRICT_URL:'https://testapideneme.azurewebsites.net/Values/GetDistricts',
    ADD_STATION_URL: 'https://testapideneme.azurewebsites.net/ServicePoint/AddStation',
    ADD_STATION_INFO_URL: 'https://testapideneme.azurewebsites.net/StationInfo/AddStationInfo',
    GET_RESELLERS_URL: 'https://testapideneme.azurewebsites.net/ServicePoint/GetResellers',
    GET_COMPANIES_URL: 'https://testapideneme.azurewebsites.net/ServicePoint/GetCompanies',
    UPDATE_SERVICE_POINT: 'https://testapideneme.azurewebsites.net/ServicePoint/Update',
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
