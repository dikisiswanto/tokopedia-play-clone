/* eslint-disable react-hooks/exhaustive-deps */
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

function useSession() {
  const sessionKeys = ['username', 'avatar', 'fullname'];
  const [session, setSessionValue] = useState({});

  useEffect(() => {
    const sessionData = {};

    sessionKeys.forEach((key) => {
      const cookieValue = Cookies.get(key);
      if (cookieValue) {
        sessionData[key] = cookieValue;
      }
    });

    setSessionValue(sessionData);
  }, []);

  const setSession = (newSessionValue) => {
    Object.keys(newSessionValue).forEach((key) => {
      Cookies.set(key, newSessionValue[key]);
    });

    setSessionValue(newSessionValue);
  };

  return [session, setSession];
}

export default useSession;
