import { BRAND_PREFIX } from '../../constants/constants';
import type { ISectionProps } from './types';
import './Section.css';

export function Section({ children }: ISectionProps) {
  return (
    <section
      className={`${BRAND_PREFIX}-section-container flex-wrap w-full px-8 xl:px-20 py-4 bg-background py-4 h-auto min-h-full`}>
      {children}
    </section>
  );
};

export default Section;
