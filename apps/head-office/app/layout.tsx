import { Montserrat } from 'next/font/google';
import ClientComponent from './ClientComponent';
import './global.css';

export const metadata = {
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

const montserrat = Montserrat({
  display: 'swap',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const RootLayout = ({ children }: { children: React.ReactNode; }) => {
  return (
    <html className={`${montserrat.className}`} lang="en">
      <body>
        <ClientComponent>
          {children}
        </ClientComponent>
      </body>
    </html>
  );
};

export default RootLayout;
