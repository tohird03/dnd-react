import {useEffect, useState} from 'react';
import {useLocalStorage} from 'usehooks-ts';
import {useStores} from '../store/store-context';
import { authApi } from '../service/auth/auth';
import { toast } from 'react-toastify';

export const useBootstrap = () => {
  const {authStore} = useStores();
  const [isInitiated, setIsInitiated] = useState(true);
  const [accessToken] = useLocalStorage<string>('accessToken', '');

  const getUser = () =>
    authApi.getUserById(accessToken)
      .then((res) => {
        authStore.setUser(res)
      })
      .catch(toast.error)

  const setToken = async () => {
    if (accessToken) {
      authStore.setIsAuth(true);
      await authStore.setToken(accessToken)
      await getUser()
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
