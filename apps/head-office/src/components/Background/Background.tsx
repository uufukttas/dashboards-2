import { BRAND_PREFIX } from '../../constants/constants';
import type { IBackgroundProps } from './types';
import './Background.css';

const Background = ({ backgroundUrl, className }: IBackgroundProps): React.ReactNode => {
  return (
    <div
      className={`${BRAND_PREFIX}-background-container h-screen ${className}`}
      style={{ backgroundImage: `url('${backgroundUrl}')` }}
    >
    </div>
  );
};

export default Background;
