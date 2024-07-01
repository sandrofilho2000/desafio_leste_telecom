import React from 'react';
import { IoLanguage } from 'react-icons/io5';
import { LiaBirthdayCakeSolid } from 'react-icons/lia';
import { MdOutlineEmail } from 'react-icons/md';
import { formatDate } from '@utils/formatDate';
import { iContactItem } from '@interfaces/index';
const ContactCardInfo = ({
  full_name,
  age,
  layoutMode,
  email,
  birthdate,
  language,
}: iContactItem) => {
  return (
    <div className="contactCardInfo flex flex-col items-start gap-1">
      <h2 className="w-full flex-none text-lg text-[#009373] font-bold leading-none">
        {full_name} ({age})
      </h2>

      <div className="cardInfo flex items-center gap-1 text-gray-500 text-sm">
        <span>
          <MdOutlineEmail className="text-base" />
        </span>
        <span>{email}</span>
      </div>

      <div className="cardInfo flex items-center gap-1 text-gray-500 text-sm">
        <span>
          <LiaBirthdayCakeSolid className="text-base" />
        </span>
        <span>{formatDate(birthdate)}</span>
      </div>

      <div className="cardInfo flex items-center gap-1 text-gray-500 text-sm">
        <span>
          <IoLanguage className="text-base" />
        </span>
        <span>{language}</span>
      </div>
    </div>
  );
};

export default ContactCardInfo;
