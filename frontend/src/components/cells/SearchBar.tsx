import { useContact } from '@context/useContact';
import { useSystem } from '@context/useSystem';
import React, { useEffect, useRef, useState } from 'react';
import { CiFilter } from 'react-icons/ci';
import { FaFilter } from 'react-icons/fa';

const SearchBar = () => {
  const {
    searchContext,
    setSearchContext,
    setSearchSkeletonOverlayActive,
  }: any = useSystem();

  const { contacts, setContacts, initialContacts, setInitialContacts }: any =
    useContact();

  var typingTimer: any;
  let handlePostSearchOverlay = (term: string) => {
    clearTimeout(typingTimer);
    if (!term) {
      setSearchSkeletonOverlayActive(false);
      setContacts(initialContacts);
    } else {
      setSearchSkeletonOverlayActive(true);
      typingTimer = setTimeout(() => {
        setSearchContext({ ...searchContext, term: term });
        setSearchSkeletonOverlayActive(false);
      }, 1300);
    }
  };

  return (
    <div
      className="flex items-center max-w-md bg-[#e8ebea] rounded-lg "
      x-data="{ search: '' }"
    >
      <div className="w-full">
        <input
          type="search"
          onChange={(e) => {
            handlePostSearchOverlay(e.target.value);
          }}
          className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none bg-transparent"
          placeholder="search"
          x-model="search"
        />
      </div>
      <div>
        <button
          type="submit"
          className="flex items-center bg-[#009373] justify-center w-12 h-12 text-[#e8ebea] rounded-r-lg text-lg"
        >
          <FaFilter />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
