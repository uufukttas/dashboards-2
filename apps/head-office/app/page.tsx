import './page.css';
import Card from '../src/components/Card/Card';
import { styles } from '../src/constants/styles';

export default async function Index() {
  return (
    <div className={`w-full flex items-center h-screen bg-[${styles.backgroundColor}]`}>
      <Card />
      {/* <LoginCard className="w-1/4"/> */}
      {/* <Background className="w-3/4" backgroundUrl={constValues.backgroundImage}/>  */}
    </div>
  );
}
