import {useEffect, useState} from 'react';
import {useLocalStorage} from 'usehooks-ts';
import {useStores} from '../store/store-context';

export const useBootstrap = () => {
  const {authStore} = useStores();
  const [isInitiated, setIsInitiated] = useState(true);
  const [accessToken] = useLocalStorage<string>('accessToken', '');

  const setToken = async () => {
    if (accessToken) {
      authStore.setIsAuth(true);
      await authStore.setToken(accessToken)
    }
  };

  const getAppConfigs = async () => {
    try {
      await setToken();

      setIsInitiated(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAppConfigs();
  }, []);

  return [isInitiated];
};
