import { BRAND_PREFIX } from '../../constants/constants';
import './Loading.css';

const Loading: React.FC = () => {
  return (
    <div
      className={`${BRAND_PREFIX}-loading-spinner-container flex items-center justify-center absolute top-0 left-0 w-full h-screen opacity-70 bg-[#54565A]`}
    >
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Loading;
