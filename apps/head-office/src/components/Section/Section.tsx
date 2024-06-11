import { BRAND_PREFIX } from '../../constants/constants';
import type { ISectionProps } from './types';
import './Section.css';

const Section: React.FC<ISectionProps> = ({ children }: ISectionProps) => {
  const sectionPrefix: string = `${BRAND_PREFIX}-section`;

  return (
    <section
      className={`${sectionPrefix}-container flex-wrap w-full px-8 xl:px-20 py-20 bg-white py-4 h-auto min-h-full`}>
      {children}
    </section>
  );
};

export default Section;
