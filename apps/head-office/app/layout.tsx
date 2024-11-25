import { Montserrat } from 'next/font/google';
import { metaData } from '../src/constants/constants';
import ClientComponent from './ClientComponent';
import './global.css';

export const metadata = metaData;

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
