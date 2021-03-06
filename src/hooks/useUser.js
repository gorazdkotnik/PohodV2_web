import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { request } from '../utils/functions';

export default function useUser(authRequired) {
  const { pathname } = useLocation();

  const [user, setUser] = useState({});

  const getUser = () => {
    request('/me').then(data => {
      if (data) {
        setUser(data);
      }
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getUser();
  }, [pathname]);

  return { user };
}
