export interface SectionProps {
  children?: React.ReactNode;
 }

export function Section({
  children,
}: SectionProps) {

  return (
    <section className={`sh-dashboard-section-container flex-wrap w-full px-8 xl:px-20`}>
      {children}
    </section>
  );
};

export default Section;
