'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const contactsContext = createContext({});

export const useContact = () => useContext(contactsContext);

export const ContactContextProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [initialContacts, setInitialContacts] = useState([]);

  return (
    <contactsContext.Provider
      value={{
        contacts,
        setContacts,
        initialContacts,
        setInitialContacts,
      }}
    >
      {children}
    </contactsContext.Provider>
  );
};
