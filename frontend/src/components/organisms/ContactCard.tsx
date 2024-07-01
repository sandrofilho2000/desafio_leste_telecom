'use client';
import React, { useEffect, useState } from 'react';
import { iContactItem } from '../../interfaces';
import Button from '@components/atoms/Button';
import ContactCardAvatar from '@components/cells/ContactCardAvatar';
import ContactCardInfo from '@components/cells/ContactCardInfo';
import ContactCardButtons from '@components/cells/ContactCardButtons';

const ContactCard = ({
  contact,
  layoutMode,
}: {
  contact: iContactItem;
  layoutMode: string;
}) => {
  const { first_name, last_name, email, birthdate, gender, language, avatar } =
    contact;
  const [age, setAge] = useState(0);

  useEffect(() => {
    const birthDate = new Date(birthdate || '01-01-2000');
    const today = new Date();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    setAge(today.getFullYear() - birthDate.getFullYear());
  }, []);

  return (
    <div
      className={`contactCard relative flex justify-between items-center sm:flex border  border-b-[#00937333] pb-4 ${
        layoutMode === 'list' ? 'listLayout' : 'gridLayout'
      }`}
    >
      <ContactCardAvatar
        full_name={first_name + ' ' + last_name}
        avatar={avatar}
        gender={gender}
        layoutMode={layoutMode}
      />

      <ContactCardInfo
        full_name={first_name + ' ' + last_name}
        age={age}
        email={email}
        gender={gender}
        birthdate={birthdate}
        language={language}
      />

      <ContactCardButtons layoutMode={layoutMode} />
    </div>
  );
};

export default ContactCard;
