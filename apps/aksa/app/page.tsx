// Main page  for the aksa app ho.sharz.net
import './page.css';
import LoginCard from '../src/components/LoginCard'
import Background from "../src/components/Background";
import constValues from "../src/constants/index";

export default async function Index() {
  return (
    <div className="w-full flex">
      <LoginCard className="w-1/4"/>
      <Background className="w-3/4" backgroundUrl={constValues.backgroundImage}/>
    </div>
  );
}
