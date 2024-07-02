'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '../organisms/Navbar';
import { iContactItem, iSearchContext } from '../../interfaces';
import ContactCard from '../organisms/ContactCard';
import LayoutControl from '../cells/LayoutControl';
import { useSystem } from '@context/useSystem';
import SkeletonCard from '../cells/SkeletonCard';
import { useContact } from '@context/useContact';
import { slugify } from '@utils/slugify';
import axios from 'axios';
import NotFound from '../organisms/NotFound';
import Filters from '../organisms/Filters';
import Button from '../atoms/Button';
import { IoMdPersonAdd } from 'react-icons/io';
import Link from 'next/link';
import ContactFormOverlay from '@components/organisms/ContactFormOverlay';

const HomePage = ({ list }: { list: iContactItem[] }) => {
  const [layoutMode, setLayoutMode] = useState('grid');
  const [firstLoad, setFirstLoad] = useState(true);
  const {
    searchContext,
    setSearchContext,
    searchSkeletonOverlayActive,
    isContactFormOverlayActive,
    setIContactFormOverlayActive,
  }: any = useSystem();
  const { contacts, setContacts, setInitialContacts }: any = useContact();

  async function api(searchContext: iSearchContext) {
    let url = 'http://localhost:8000/api/contacts';
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
      <main className="min-h-screen bg-[#e8ebea] pt-0">
        <Filters />
        <div className="top w-full flex justify-between px-8 md:px-16 lg:px-24 text-[#009373]">
          <h1 className="text-4xl font-bold">CONTACTS</h1>

          <LayoutControl
            layoutMode={layoutMode}
            setLayoutMode={setLayoutMode}
          />
        </div>

        <div className="addContactButtonContact px-8 md:px-16 lg:px-24 mt-8">
          <Button
            icon={<IoMdPersonAdd className="icon" />}
            text="ADD CONTACT"
            classes="bg-[#009373]"
            handlefunction={() => {
              setIContactFormOverlayActive(true);
            }}
          />
        </div>

        <div
          className={`contactsWrapper mt-10  px-8 md:px-16 lg:px-24  pb-8 ${
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
          ) : !firstLoad ? (
            <NotFound />
          ) : (
            Array.from({ length: 9 }).map((_, index) => (
              <SkeletonCard
                layoutMode={layoutMode}
                key={index}
              />
            ))
          )}
        </div>
      </main>
      <ContactFormOverlay />
    </>
  );
};

export default HomePage;
