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
    }
  }

  useEffect(() => {
    setContacts(list);
    setInitialContacts(list);
  }, []);

  useEffect(() => {
    api(searchContext);
  }, [searchContext]);

  useEffect(() => {
    //console.clear();
    console.log('Made by:');
    console.log(
      '%c▷%c▷%c▷%c www.sandrofilho.dev',
      'font-size: 24px;',
      'color:#FC5214;font-size: 24px; margin-left: -13px;',
      'color:initial;font-size: 24px; margin-left: -13px;',
      'font-size: 16px;'
    );
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#e8ebea] pt-0">
        <Filters />
        <div className="top w-full flex justify-between  text-[#009373] px-4 md:px-16 lg:px-24 pt-0">
          <h1 className="text-2xl md:text-4xl font-bold">CONTACTS</h1>

          <LayoutControl
            layoutMode={layoutMode}
            setLayoutMode={setLayoutMode}
          />
        </div>

        <div className="addContactButtonContact mt-4 md:mt-8 px-4 md:px-16 lg:px-24 pt-0">
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
          className={`contactsWrapper mt-4 md:mt-10 px-4 md:px-16 lg:px-24 pt-0  pb-8 ${
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
