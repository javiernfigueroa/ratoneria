import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filters, setFilters] = useState({ category: '', rating: '' });
  const [shopsData, setShopsData] = useState([]);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    const token = localStorage.getItem('id');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        filters,
        updateFilters,
        shopsData,
        setShopsData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
