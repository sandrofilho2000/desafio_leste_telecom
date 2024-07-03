import React from 'react';
import { IoLanguage } from 'react-icons/io5';
import { LiaBirthdayCakeSolid } from 'react-icons/lia';
import { MdOutlineEmail } from 'react-icons/md';
import { formatDate } from '@utils/formatDate';
import { iContactCardInfo } from '@interfaces/index';
const ContactCardInfo = ({
  full_name,
  age,
  email,
  birthdate,
  language,
}: iContactCardInfo) => {
  const enshortString = (string: string, maxlength: number) => {
    let new_string = string;

    if (new_string.length > maxlength) {
      new_string = string.slice(0, maxlength) + '...';
    }
    return new_string;
  };

  return (
    <div className="contactCardInfo flex flex-col items-start gap-1">
      <h2 className="w-full flex-none text-lg text-[#009373] font-bold leading-none">
        {full_name} ({age})
      </h2>

      <div
        className="cardInfo flex items-center gap-1 text-gray-500 text-sm"
        title={email}
      >
        <span>
          <MdOutlineEmail className="text-base" />
        </span>
        <span>{enshortString(email, 22)}</span>
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
