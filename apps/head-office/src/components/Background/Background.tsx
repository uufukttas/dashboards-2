import { BRAND_PREFIX } from '../../constants/constants';
import type { IBackgroundProps } from './types';
import './Background.css';

const Background: React.FC<IBackgroundProps> = ({ backgroundUrl, className }: IBackgroundProps) => {
  const backgroundPrefix: string = `${BRAND_PREFIX}-background`;

  return (
    <div
      className={`${backgroundPrefix}-container h-screen ${className ? className : ''}`}
      style={{ backgroundImage: `url('${backgroundUrl}')` }}
    >
    </div>
  );
};

export default Background;
