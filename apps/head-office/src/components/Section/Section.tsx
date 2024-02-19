export interface SectionProps {
  children?: React.ReactNode;
 };

export function Section({
  children,
}: SectionProps) {
  return (
    <section className={`sh-section-container flex-wrap w-full px-8 xl:px-20 py-4`}>
      {children}
    </section>
  );
};

export default Section;
