import styles from './Section.module.scss';
import { Card } from '../Card/Card';
/* eslint-disable-next-line */
export interface SectionProps { }

export function Section(props: SectionProps) {
  return (
    <section className={styles['container']}>
      <div className='flex justify-between items-center pt-12'>
        <Card className={'w-1/4'} onClick={() => { }} />
        <Card className={'w-1/4'} onClick={() => { }} />
        <Card className={'w-1/4'} onClick={() => { }} />
      </div>
      <div className='flex justify-between items-center pt-12'>
        <Card className={'w-1/4'} onClick={() => { }} />
        <Card className={'w-1/4'} onClick={() => { }} />
        <Card className={'w-1/4'} onClick={() => { }} />
      </div>
      <div className='flex justify-between items-center pt-12'>
        <Card className={'w-1/4'} onClick={() => { }} />
        <Card className={'w-1/4'} onClick={() => { }} />
        <Card className={'w-1/4'} onClick={() => { }} />
      </div>
    </section>
  );
}

export default Section;
