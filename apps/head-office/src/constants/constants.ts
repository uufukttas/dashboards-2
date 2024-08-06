export const BRAND_PREFIX = 'sh';
export const metaData = {
    author: 'Sharz.net',
    description: 'Sharz.net is Turkey\'s leading electric vehicle charging station platform, offering comprehensive management solutions for EV charging stations. Manage service points, tariffs, and user access with our advanced dashboard. Experience seamless integration and real-time monitoring to enhance the efficiency and accessibility of EV charging across the country.',
    keywords: 'EV charging Turkey, electric vehicle charging, charging station management, EV service points, EV tariffs management, EV user management, Sharz.net',
    title: 'Welcome to Sharz.net',
    viewport: 'width=device-width, initial-scale=1.0',
    'og:title': 'Sharz.net - Electric Vehicle Charging Station Management',
    'og:description': 'Manage and monitor electric vehicle charging stations with Sharz.net. Explore our services for efficient EV charging point management, tariff settings, and user management through an intuitive dashboard.',
    'og:type': 'website',
    'og:url': 'https://www.ho.sharz.net',
    'og:image': 'https://www.sharz.net/og-image.jpg',
    'og:site_name': 'Sharz.net',
    'og:locale': 'en_US',
};
export const sidebarItems = [
    {
        icon: 'FaLocationDot',
        link: '/service-points',
        name: 'Istasyonlar',
    },
    {
        icon: 'FaUser',
        link: '/users-management',
        name: 'Kullanici Yonetimi',
    },
    {
        icon: 'IoMdAnalytics',
        link: '/reports',
        name: 'Rapor Merkezi',
        subItems: [
            {
                icon: 'PiArrowElbowDownRightBold',
                link: '/reports/all-reports',
                name: 'Tüm Raporlar'
            },
            {
                icon: 'PiArrowElbowDownRightBold',
                link: '/reports/charging-reports',
                name: 'Şarj Raporları'
            },
            {
                icon: 'PiArrowElbowDownRightBold',
                link: '/reports/service-points-reports',
                name: 'İstasyon Raporları'
            }
        ]
    },
    {
        icon: 'LuReceipt',
        link: '/tariffs-management',
        name: 'Tarifeler',
    },
    {
        icon: 'FaGift',
        link: '/campaigns',
        name: 'Kampanyalar',
    },
    {
        icon: 'FaQuestion',
        link: '/faq',
        name: 'FAQ',
    },
]
export const stylesProps = {
    primaryColor: '#FFCE0B',
    secondaryColor: '#54565A',
    borderColor: '#000000',
    borderFocusColor: '#FFCE0B',
    borderRadius: '6px',
    fontColor: '#000000',
    fontSize: '16px',
    loginPageBackgroundImage: '../../background.jpg',
};
export const userInfo = {
    logo: '../../logo.svg',
    name: 'sharz',
};