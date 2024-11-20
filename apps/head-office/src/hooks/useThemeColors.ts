import { useEffect } from 'react';
import { useGetKeyByListMutation } from '../../app/api/services/static/static.service';

const useThemeColors = () => {
  const [getColors] = useGetKeyByListMutation();

  useEffect(() => {
    getColors({
      body: {
        resourceKeyList: ['Alternate', 'Backup', 'Primary', 'Secondary'],
      },
    })
      .unwrap()
      .then((colors) => {
        if (colors.length > 1) {
          document.documentElement.style.setProperty(
            '--primary-color',
            colors[0].value,
          );
          document.documentElement.style.setProperty(
            '--secondary-color',
            colors[1].value,
          );
        }
      })
      .catch((error) => {
        console.error('Error fetching theme colors:', error);
      });
  }, [getColors]);
};

export default useThemeColors;
