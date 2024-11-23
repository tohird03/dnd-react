import { TokenType } from '@/types/TokenType';
import {useEffect, useState} from 'react';
import {useLocalStorage} from 'usehooks-ts';

export const useBootstrap = () => {
  const [isInitiated, setIsInitiated] = useState(true);
  const [accessToken] = useLocalStorage<TokenType['accessToken']>('token', '');

  const getProfile = async () => {
    // Get Profile fn
  };

  const setToken = async () => {
    if (accessToken) {
      // Is Auth true and Get profile

      await getProfile()
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
