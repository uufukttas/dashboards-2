export const detectDevice = () => {
  const deviceType = {
    isDesktop: false,
    isMobile: false,
    isTablet: false,
  };
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';

  deviceType.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  deviceType.isTablet = /iPad|Android|Tablet/i.test(userAgent);

  const screenWidth = typeof window !== 'undefined' ? (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) : 0;
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
