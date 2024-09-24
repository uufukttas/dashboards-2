import { BRAND_PREFIX, stylesProps } from '../../constants/constants';
import './Loading.css';

const Loading: React.FC = () => {
  const loadingSpinner: string = `${BRAND_PREFIX}-loading-spinner`;

  return (
    <div
      className={`${loadingSpinner}-container flex items-center justify-center absolute top-0 left-0 w-full h-screen opacity-70 bg-[${stylesProps.opaqueColor}] z-20`}
    >
      <div className={`${loadingSpinner}`}></div>
    </div>
  );
};

export default Loading;
