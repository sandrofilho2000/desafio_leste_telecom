import Image from 'next/image';
import React from 'react';
import logo from '../../../public/assets/logo.svg';
import SearchBar from '@components/cells/SearchBar';
const Navbar = () => {
  return (
    <nav className="bg-white border border-gray-200 sm:px-4 px-8 md:px-16 lg:px-24 py-2.5 rounded relative z-30">
      <div className="flex flex-wrap justify-between items-center">
        <a
          href="/"
          className="flex items-center p-2"
        >
          <Image
            src={logo}
            height={48}
            width={135}
            alt="logo"
            title="logo"
          />
        </a>
        <SearchBar />
      </div>
    </nav>
  );
};

export default Navbar;
