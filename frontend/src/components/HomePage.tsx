'use client';
import React, { useEffect, useState } from 'react';
import Navbar from './organisms/Navbar';
import { iContactItem, iSearchContext } from '../interfaces';
import ContactCard from './organisms/ContactCard';
import LayoutControl from './cells/LayoutControl';
import { useSystem } from '@context/useSystem';
import SkeletonCard from './cells/SkeletonCard';
import { useContact } from '@context/useContact';
import { slugify } from '@utils/slugify';
import axios from 'axios';
import NotFound from './organisms/NotFound';

const HomePage = ({ list }: { list: iContactItem[] }) => {
  const [layoutMode, setLayoutMode] = useState('grid');
  const { searchContext, setSearchContext, searchSkeletonOverlayActive }: any =
    useSystem();
  const { contacts, setContacts, setInitialContacts }: any = useContact();

  async function api(searchContext: iSearchContext) {
    let url = `http://localhost:8000/api/contacts`;
    const { term } = searchContext;
    if (term) {
      url += `?slug=${slugify(term)}`;
      try {
        const { data } = await axios.get(url);
        const { contacts: filteredContacts } = data;
        setContacts(filteredContacts);
      } catch (error) {
        console.log('Erro na requisição:', error);
        throw error;
      }
    }
  }

  useEffect(() => {
    setContacts(list);
    setInitialContacts(list);
  }, []);

  useEffect(() => {
    api(searchContext);
  }, [searchContext]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#e8ebea] px-8 md:px-16 lg:px-24 pt-8">
        <div className="top w-full flex justify-between text-[#009373]">
          <h1 className="text-4xl font-bold">Contacts</h1>
          <LayoutControl
            layoutMode={layoutMode}
            setLayoutMode={setLayoutMode}
          />
        </div>
        <div
          className={`contactsWrapper mt-10 ${
            layoutMode === 'grid' ? 'gridLayout' : 'listLayout'
          }`}
        >
          {contacts.length ? (
            !searchSkeletonOverlayActive ? (
              contacts.map((item: iContactItem, index: number) => (
                <ContactCard
                  layoutMode={layoutMode}
                  contact={item}
                  key={index}
                />
              ))
            ) : (
              Array.from({ length: 9 }).map((_, index) => (
                <SkeletonCard
                  layoutMode={layoutMode}
                  key={index}
                />
              ))
            )
          ) : (
            <NotFound />
          )}
        </div>
      </main>
    </>
  );
};

export default HomePage;
