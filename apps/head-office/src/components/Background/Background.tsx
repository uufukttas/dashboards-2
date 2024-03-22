import { BRAND_PREFIX } from '../../constants/constants';
import './Background.css';

interface IBackgroundProps {
  backgroundUrl: string;
  className?: string;
};

const Background = ({ backgroundUrl, className }: IBackgroundProps) => {
  return (
    <div
      className={`${BRAND_PREFIX}-background-container h-screen ${className}`}
      style={{ backgroundImage: `url('${backgroundUrl}')` }}
    >
    </div>
  );
};

export default Background;
