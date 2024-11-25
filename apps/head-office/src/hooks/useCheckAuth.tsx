import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useCheckAuth = () => {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && router) {
      router.replace('/dashboards');
    }

    setTimeout(() => {
      setIsReady(true);
    }, 100);
  }, [router]);

  return { isReady };
};

export default useCheckAuth;
