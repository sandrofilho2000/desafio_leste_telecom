'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const systemContext = createContext({});

export const useSystem = () => useContext(systemContext);

export const SystemContextProvider = ({ children }) => {
  const [searchContext, setSearchContext] = useState({});
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [isContactFormOverlayActive, setIContactFormOverlayActive] =
    useState(false);
  const [searchSkeletonOverlayActive, setSearchSkeletonOverlayActive] =
    useState(false);
  const [currContactEdit, setCurrContactEdit] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  return (
    <systemContext.Provider
      value={{
        firstLoad,
        setFirstLoad,
        searchContext,
        setSearchContext,
        searchSkeletonOverlayActive,
        setSearchSkeletonOverlayActive,
        isFilterActive,
        setIsFilterActive,
        isContactFormOverlayActive,
        setIContactFormOverlayActive,
        currContactEdit,
        setCurrContactEdit,
      }}
    >
      {children}
    </systemContext.Provider>
  );
};
