'use client';
import React, { useState } from 'react';
import Navbar from './organisms/Navbar';
import { iContactItem } from '../interfaces';
import ContactCard from './organisms/ContactCard';
import LayoutControl from './cells/LayoutControl';

const HomePage = ({ contacts }: { contacts: iContactItem[] }) => {
  const [layoutMode, setLayoutMode] = useState('grid');

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#e8ebea] p-8 md:p-16 lg:p-24 pt-8">
        <div className="top w-full flex justify-between text-[#009373]">
          <h1 className="text-4xl font-bold">Contatos</h1>
          <LayoutControl
            layoutMode={layoutMode}
            setLayoutMode={setLayoutMode}
          />
        </div>
        <div
          className={`contactsWrapper mt-8 ${
            layoutMode === 'grid'
              ? 'grid grid-cols-custom gap-10'
              : ' flex-wrap flex flex-col gap-4'
          }`}
        >
          {contacts.map((item: iContactItem, index) => (
            <ContactCard
              layoutMode={layoutMode}
              contact={item}
              key={index}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default HomePage;
