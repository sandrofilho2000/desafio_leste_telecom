import Button from '@components/atoms/Button';
import { useSystem } from '@context/useSystem';
import { iContactItem } from '@interfaces/index';
import React, { useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';

const ContactCardButtons = ({
  layoutMode = '',
  contact,
}: {
  layoutMode: string;
  contact: iContactItem;
}) => {
  const {
    isContactFormOverlayActive,
    setIContactFormOverlayActive,
    currContactEdit,
    setCurrContactEdit,
  }: any = useSystem();

  /*   useEffect(() => {
    console.log(
      '🚀 ~ file: ContactCardButtons.tsx:25 ~ currContactEdit:',
      currContactEdit
    );
  }, [currContactEdit]); */

  return (
    <div className="contactCardButtons flex items-center gap-1 h-9  text-sm text-gray-500">
      <Button
        classes="bg-green-400 hover:bg-green-500 hover:border-green-500 border-green-300"
        handlefunction={() => {
          setCurrContactEdit(contact);
        }}
        icon={<FaPencil />}
        text={layoutMode === 'grid' ? `EDITAR` : ''}
      />
      <Button
        classes="bg-red-400 hover:bg-red-500 hover:border-red-500 border-red-300"
        icon={<FaTrash />}
        handlefunction={() => {
          confirm('Deseja realmente deletar este usuário?');
        }}
        text={layoutMode === 'grid' ? `DELETAR` : ''}
      />
    </div>
  );
};

export default ContactCardButtons;
