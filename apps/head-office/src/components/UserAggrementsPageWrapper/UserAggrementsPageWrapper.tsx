import { BRAND_PREFIX } from '../../constants/constants';
import MainComponent from '../MainComponent/MainComponent';
import UserAggrementsSection from './UserAggrementsSection';

const UserAggrementsPageWrapper = () => {
  const pagePrefix: string = `${BRAND_PREFIX}-user-agreements-page`;

  return (
    <div className={`${pagePrefix}-wrapper w-full flex h-screen`}>
      <MainComponent headerName="Kullanıcı Sözleşmeleri">
        <div className={`${pagePrefix}-container w-full justify-center items-center md:pt-6 flex-wrap`}>
          <UserAggrementsSection />
        </div>
      </MainComponent>
    </div>
  )
}

export default UserAggrementsPageWrapper
