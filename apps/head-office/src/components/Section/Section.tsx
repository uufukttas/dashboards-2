import { BRAND_PREFIX } from '../../constants/constants';
import type { ISectionProps } from './types';
import './Section.css';

const Section: React.FC<ISectionProps> = ({ children, sectionName }: ISectionProps) => {
  return (
    <section
      className={`${BRAND_PREFIX}-section-container flex-wrap w-full px-8 xl:px-20 py-4 bg-background py-4 h-auto min-h-full`}>
        <div className={`${BRAND_PREFIX}-section-header-container`}>
          <h2 className={`${BRAND_PREFIX}-section-header-text text-text text-lg font-bold`}>
            {sectionName}
          </h2>
        </div>
      {children}
    </section>
  );
};

export default Section;
