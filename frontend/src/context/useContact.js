'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { isObjectEmpty } from '@utils/isObjectEmpty';
import { useSystem } from './useSystem';
import axios from 'axios';

const contactsContext = createContext({});

export const useContact = () => useContext(contactsContext);

export const ContactContextProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [initialContacts, setInitialContacts] = useState([]);
  const { searchContext, firstLoad, setFirstLoad } = useSystem();

  async function api(searchContext = null) {
    const url = 'https://leste-telecom-rrwtejtbla-rj.a.run.app/api/contacts';
    try {
      if (searchContext) {
        const { slug, gender, language, birthMonth } = searchContext;
        if (slug || gender || language || birthMonth) {
          const { data } = await axios.get(url, { params: searchContext });
          const { contacts: filteredContacts } = data;
          setContacts(filteredContacts);
          setFirstLoad(false);
        } else if (!slug && !gender && !language && !birthMonth && !firstLoad) {
          setContacts(initialContacts);
        }
      } else {
        const res = await axios.get(url);
        const { contacts } = res.data;
        setContacts(contacts);
        setInitialContacts(contacts);
      }
    } catch (error) {
      console.log('Erro na requisição:', error);
      throw error;
    }
  }

  useEffect(() => {
    if (!isObjectEmpty(searchContext)) {
      api(searchContext);
      console.log(
        '🚀 ~ file: useContact.js:44 ~ searchContext:',
        searchContext
      );
    }
  }, [searchContext]);

  useEffect(() => {
    api();
  }, []);

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
