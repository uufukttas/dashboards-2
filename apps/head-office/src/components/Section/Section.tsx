import './Section.scss';
import { Card } from '../Card/Card';
/* eslint-disable-next-line */
export interface SectionProps { }


export function Section(props: SectionProps) {

  const cardBodyChildren = (
    <>
      <div className='flex justify-center items-center text-center pb-4'>Aktif Kullanicilar </div>
      <div className='flex justify-center items-center border rounded-full p-4 bg-blue-500 text-white'>
        <h2 className='text-sm flex justify-center items-end'><span className='text-2xl'>78</span>%</h2>
      </div>
    </>
  );

  return (
    <section className={`sh-dashboard-section-container flex-wrap w-full`}>
      <div className='flex justify-between items-center pt-12'>
        <Card
          cardBodyChildren={cardBodyChildren}
          className={'w-1/6 rounded-lg'}
          onClick={() => { }}
        />
        <Card
          cardBodyChildren={cardBodyChildren}
          className={'w-1/6'}
          onClick={() => { }}
        />
        <Card
          cardBodyChildren={cardBodyChildren}
          className={'w-1/6'}
          onClick={() => { }}
        />
        <Card
          cardBodyChildren={cardBodyChildren}
          className={'w-1/6'}
          onClick={() => { }}
        />
        <Card
          cardBodyChildren={cardBodyChildren}
          className={'w-1/6'}
          onClick={() => { }}
        />
        <Card
          cardBodyChildren={cardBodyChildren}
          className={'w-1/6'}
          onClick={() => { }}
        />
        <Card
          cardBodyChildren={cardBodyChildren}
          className={'w-1/6'}
          onClick={() => { }}
        />
        <Card
          cardBodyChildren={cardBodyChildren}
          className={'w-1/6'}
          onClick={() => { }}
        />
      </div>
    </section>
  );
}

export default Section;
