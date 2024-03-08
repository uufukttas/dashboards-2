export const detectDevice = () => {
  const deviceType = {
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  };
  const userAgent = navigator.userAgent;

  deviceType.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  deviceType.isTablet = /iPad|Android|Tablet/i.test(userAgent);

  const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const mobileWidth = 767;
  const tabletWidth = 1024;

  if (deviceType.isMobile || (screenWidth <= mobileWidth)) {
    deviceType.isMobile = true;
  } else if (deviceType.isTablet || (screenWidth <= tabletWidth)) {
    deviceType.isTablet = true;
  } else {
    deviceType.isDesktop = true;
  }

  return deviceType;
};
