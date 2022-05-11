import { useContext, createContext, useEffect, useState } from 'react';
import { request } from '../utils/functions';

const Context = createContext();
const { Provider } = Context;

function GlobalContextProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);

  const [notification, setNotification] = useState(null);

  const [schemeTheme, setSchemeTheme] = useState('light');

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      setSchemeTheme(theme);
      applySchemeTheme();
    }

    setShowLoadingSpinner(true);
    request('/me')
      .then(data => {
        setShowLoadingSpinner(false);
        if (data) {
          setLoggedIn(true);
          setUser(data);
        } else {
          setLoggedIn(false);
          setUser({});
        }
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        setLoggedIn(false);
        setUser({});
      });
  }, []);

  useEffect(() => {
    let timer;

    if (notification) {
      timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [notification, setNotification]);

  const toggleSchemeTheme = () => {
    localStorage.setItem('theme', schemeTheme === 'light' ? 'dark' : 'light');
    setSchemeTheme(schemeTheme === 'light' ? 'dark' : 'light');

    applySchemeTheme();
  };

  const applySchemeTheme = () => {
    const theme = localStorage.getItem('theme');

    if (theme === 'light') {
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
    }
  };

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setShowLoadingSpinner(true);
      request('/auth/login', 'POST', { email, password })
        .then(data => {
          setShowLoadingSpinner(false);
          if (data) {
            setLoggedIn(true);
            setUser(data);
          } else {
            setLoggedIn(false);
            setUser({});
          }
          resolve(data);
        })
        .catch(err => {
          setShowLoadingSpinner(false);

          setLoggedIn(false);
          setUser({});

          console.log('err while logging in', err);
          reject(err);
        });
    });
  };

  const logout = () => {
    return new Promise((resolve, reject) => {
      setShowLoadingSpinner(true);
      request('/auth/logout', 'POST')
        .then(data => {
          setShowLoadingSpinner(false);

          setLoggedIn(false);
          setUser({});
          resolve(data);
        })
        .catch(err => {
          setShowLoadingSpinner(false);

          setLoggedIn(false);
          setUser({});

          console.log('err while logging out', err.message);
          reject(err);
        });
    });
  };

  const value = {
    loggedIn,
    user,
    login,
    logout,
    showLoadingSpinner,
    setShowLoadingSpinner,
    notification,
    setNotification,
    setSchemeTheme,
    toggleSchemeTheme,
  };

  return <Provider value={value}>{children}</Provider>;
}

const useGlobalContext = () => useContext(Context);

export { GlobalContextProvider, useGlobalContext };
