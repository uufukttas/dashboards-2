import styles from './card.module.css';

/* eslint-disable-next-line */
export interface CardProps { }

export function Card(props: CardProps) {
  return (
    <div className='card-container'>
      <div className='card-header'>
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <img src="https://sharz.net/build/img/logo.svg" alt="sharz logo" className="w-24 mx-auto mb-6" width="200" height="200" />
      </div>
    </div>
  );
}

export default Card;
