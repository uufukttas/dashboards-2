import { BRAND_PREFIX } from '../../constants/constants';
import type { ISectionProps } from './types';
import './Section.css';

const Section: React.FC<ISectionProps> = ({ children }: ISectionProps) => {
  const sectionPrefix: string = `${BRAND_PREFIX}-section`;

  return (
    <section
      className={`${sectionPrefix}-container w-full px-8 xl:px-20 py-4 flex-wrap bg-gray-200 overflow-x-hidden no-scrollbar`}
    >
      {children}
    </section>
  );
};

export default Section;
