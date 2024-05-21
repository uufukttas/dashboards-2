import { BRAND_PREFIX } from '../../constants/constants';
import type { ISectionProps } from './types';
import './Section.css';

const Section: React.FC<ISectionProps> = ({ children, sectionName }: ISectionProps) => {
  const sectionPrefix: string = `${BRAND_PREFIX}-section`;

  return (
    <section
      className={`${sectionPrefix}-container flex-wrap w-full px-8 xl:px-20 py-4 bg-white py-4 h-auto min-h-full`}>
      <div className={`${sectionPrefix}-header-container`}>
        <h2 className={`${sectionPrefix}-header-text text-text text-lg font-bold`}>
          {sectionName}
        </h2>
      </div>
      {children}
    </section>
  );
};

export default Section;
