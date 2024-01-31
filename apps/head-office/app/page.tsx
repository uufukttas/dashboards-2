import './page.css';
import Card from '../src/components/Card/Card';
import { styles } from '../src/constants/styles';
import Background from '../src/components/Background/Background';

export default async function Index() {
  return (
    <div className={`w-full flex items-center h-screen bg-[${styles.backgroundColor}]`}>
      <Card />
      <Background />
    </div>
  );
}
