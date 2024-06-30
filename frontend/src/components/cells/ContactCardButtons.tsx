import Button from '@components/atoms/Button';
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';

const ContactCardButtons = ({ layoutMode = '' }) => {
  return (
    <div className="contactCardButtons flex items-center gap-1 h-9  text-sm text-gray-500">
      <Button
        classes="bg-green-400 hover:bg-green-500 hover:border-green-500 border-green-300"
        handlefunction={() => {
          confirm('Deseja realmente editar este usuário?');
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
