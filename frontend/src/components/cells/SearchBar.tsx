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
    isFilterActive,
    setIsFilterActive,
  }: any = useSystem();

  var typingTimer: any;
  let handleSkeletonOverlay = (slug: string) => {
    clearTimeout(typingTimer);
    setSearchSkeletonOverlayActive(true);
    typingTimer = setTimeout(() => {
      setSearchContext({ ...searchContext, slug: slug });
      setSearchSkeletonOverlayActive(false);
    }, 1300);
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
            handleSkeletonOverlay(e.target.value);
          }}
          className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none bg-transparent"
          placeholder="search"
          x-model="search"
        />
      </div>
      <div>
        <button
          onClick={() => {
            setIsFilterActive(!isFilterActive);
          }}
          className="flex items-center bg-[#009373] justify-center w-12 h-12 text-[#e8ebea] rounded-r-lg text-lg"
        >
          <FaFilter />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
