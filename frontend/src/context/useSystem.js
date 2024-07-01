'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const systemContext = createContext({});

export const useSystem = () => useContext(systemContext);

export const SystemContextProvider = ({ children }) => {
  const [searchContext, setSearchContext] = useState({});
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [searchSkeletonOverlayActive, setSearchSkeletonOverlayActive] =
    useState(false);

  return (
    <systemContext.Provider
      value={{
        searchContext,
        setSearchContext,
        searchSkeletonOverlayActive,
        setSearchSkeletonOverlayActive,
        isFilterActive,
        setIsFilterActive,
      }}
    >
      {children}
    </systemContext.Provider>
  );
};
