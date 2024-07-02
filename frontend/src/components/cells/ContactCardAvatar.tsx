import React from 'react';
import { IoMdFemale } from 'react-icons/io';
import { MdMale } from 'react-icons/md';
import { iContactItem } from '@interfaces/index';
import Image from 'next/image';

const ContactCardAvatar = ({
  full_name,
  avatar,
  gender,
  layoutMode,
}: iContactItem) => {
  return (
    <div className="contactCardAvatar relative sm:mb-0 mb-3">
      <Image
        src={avatar || 'placeholder'}
        alt={full_name + ' avatar'}
        width={112}
        height={112}
        className={'object-cover rounded-xl bg-white'}
      />
      {gender == 'male' && (
        <div className="gender absolute bottom-0 right-0 translate-x-[20%] translate-y-[20%] text-xl rounded-full bg-[#0ba5fe] text-white p-1">
          <MdMale />
        </div>
      )}
      {gender == 'female' && (
        <div className="gender absolute bottom-0 right-0 translate-x-[20%] translate-y-[20%] text-xl rounded-full bg-[#ee50aa] text-white p-1">
          <IoMdFemale />
        </div>
      )}
    </div>
  );
};

export default ContactCardAvatar;
