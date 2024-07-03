'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useSystem } from './useSystem';
import axios from 'axios';

const contactsContext = createContext({});

export const useContact = () => useContext(contactsContext);

export const ContactContextProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [initialContacts, setInitialContacts] = useState([]);
  const { searchContext } = useSystem();

  async function api() {
    let url = 'https://leste-telecom-rrwtejtbla-rj.a.run.app/api/contacts';

    try {
      const res = await axios.get(url);
      const { contacts } = res.data;
      console.log('RES DATA: ', contacts);
      setContacts(contacts);
      setInitialContacts(contacts);
    } catch (error) {
      console.log('Erro na requisição:', error);
      throw error;
    }
  }

  /*   
  async function api({searchContext = {}}) {
    let url = 'https://leste-telecom-rrwtejtbla-rj.a.run.app/api/contacts';
    const { slug, gender, language, birthMonth } = searchContext;
    if (slug || gender || language || birthMonth) {
      try {
        const { data } = await axios.get(url, { params: searchContext });
        const { contacts: filteredContacts } = data;
        setContacts(filteredContacts);
        setFirstLoad(false);
      } catch (error) {
        console.log('Error na requisição:', error);
        throw error;
      }
    } else if (!slug && !gender && !language && !birthMonth && !firstLoad) {
      setContacts(initialContacts);
    }
  } */

  useEffect(() => {
    /* api(searchContext); */
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
