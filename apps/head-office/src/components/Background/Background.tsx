import { BRAND_PREFIX } from '../../constants/constants';
import type { IBackgroundProps } from './types';
import './Background.css';

const Background: React.FC<IBackgroundProps> = ({ backgroundUrl, className }: IBackgroundProps) => {
  return (
    <div
      className={`${BRAND_PREFIX}-background-container h-screen ${className}`}
      style={{ backgroundImage: `url('${backgroundUrl}')` }}
    >
    </div>
  );
};

export default Background;
