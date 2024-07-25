import { BRAND_PREFIX } from '../../constants/constants';
import './Loading.css';

const Loading: React.FC = () => {
  const loadingSpinner: string = 'loading-spinner';

  return (
    <div
      className={`${BRAND_PREFIX}-${loadingSpinner}-container flex items-center justify-center absolute top-0 left-0 w-full h-screen opacity-70 bg-[#54565A] z-20`}
    >
      <div className={`${loadingSpinner}`}></div>
    </div>
  );
};

export default Loading;
