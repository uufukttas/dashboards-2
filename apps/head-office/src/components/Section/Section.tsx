import { BRAND_PREFIX } from '../../constants/constants';
import './Section.css';

interface ISectionProps {
  children?: React.ReactNode;
};

export function Section({ children }: ISectionProps) {
  return (
    <section className={`${BRAND_PREFIX}-section-container flex-wrap w-full px-8 xl:px-20 py-4 bg-background`}>
      {children}
    </section>
  );
};

export default Section;
