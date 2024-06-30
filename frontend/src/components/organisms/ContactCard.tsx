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

  const gridLayout =
    'bg-white border border-white shadow-[0_3px_10px_rgb(0,0,0,0.1)] hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl mx-auto p-4 gap-4 flex-col [&>.contactCardAvatar>img]:h-28 [&>.contactCardAvatar>img]:mt-[-40px] [&>.contactCardAvatar>img]:shadow-[0_3px_10px_rgb(0,0,0,0.1)] [&>.contactCardInfo>h2]:text-center  [&>.contactCardInfo>.cardInfo]:mx-auto [&>.contactCardButtons]:w-full [&>.contactCardButtons]:justify-between';

  const listLayout =
    'w-full rounded-b-[0px] [&>.contactCardAvatar>img]:w-[100px] [&>.contactCardAvatar>img]:h-[100px] pb-[60px] [&>.contactCardInfo]:absolute [&>.contactCardInfo]:left-[120px] [&>.contactCardInfo]:transform  [&>.contactCardButtons]:absolute [&>.contactCardButtons]:bottom-3 [&>.contactCardButtons]:left-0';

  return (
    <div
      className={`relative flex justify-between items-center sm:flex border  border-b-[#00937333] pb-4 ${
        layoutMode === 'list' ? listLayout : gridLayout
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
