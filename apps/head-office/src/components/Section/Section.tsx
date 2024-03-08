import { BRAND_PREFIX } from "../../constants/constants";

interface ISectionProps {
  children?: React.ReactNode;
};

export function Section({ children }: ISectionProps) {
  return (
    <section className={`${BRAND_PREFIX}-section-container flex-wrap w-full px-8 xl:px-20 py-4`}>
      {children}
    </section>
  );
};

export default Section;
