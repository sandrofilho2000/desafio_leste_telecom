'use client';
import Button from '@components/atoms/Button';
import { useSystem } from '@context/useSystem';
import axios from 'axios';
import Image from 'next/image';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { BsCalendar2Month } from 'react-icons/bs';
import { FaRegUser, FaSave } from 'react-icons/fa';
import { ImManWoman } from 'react-icons/im';
import { IoMdClose } from 'react-icons/io';
import { IoLanguage, IoSaveOutline } from 'react-icons/io5';
import { MdOutlineEmail } from 'react-icons/md';
import Cookies from 'js-cookie';
import defaultPic from '@public/assets/default_user.webp';

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const avatar = useRef<HTMLImageElement>(null);
  const [imageSrc, setImageSrc] = useState<string>(defaultPic.src);
  const {
    isContactFormOverlayActive,
    setIContactFormOverlayActive,
    currContactEdit,
    setCurrContactEdit,
  }: any = useSystem();

  const handleAvatarImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmitAdd = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current) {
      const newContact = {
        first_name: formRef.current.first_name.value,
        last_name: formRef.current.last_name.value,
        email: formRef.current.email.value,
        birthdate: formRef.current.birthdate.value,
        gender: formRef.current.gender.value,
        language: formRef.current.language.value,
      };

      const csrfToken = Cookies.get('csrftoken');

      try {
        const response = await axios.post(
          'http://localhost:8000/api/create_contact/',
          newContact,
          {
            headers: {
              'X-CSRFToken': csrfToken,
            },
          }
        );
        alert('Contact added successfully!');
      } catch (error) {
        console.error('Error saving contact:', error);
      }
    }
  };

  const handleFormSubmitUpdate = async (
    e: FormEvent<HTMLFormElement>,
    contactId: string
  ) => {
    e.preventDefault();
    if (formRef.current) {
      const updatedContact = {
        first_name: formRef.current.first_name.value,
        last_name: formRef.current.last_name.value,
        email: formRef.current.email.value,
        birthdate: formRef.current.birthdate.value,
        gender: formRef.current.gender.value,
        language: formRef.current.language.value,
      };

      const csrfToken = Cookies.get('csrftoken');

      try {
        const response = await axios.post(
          `http://localhost:8000/api/update_contact/${contactId}/`,
          updatedContact,
          {
            headers: {
              'X-CSRFToken': csrfToken,
            },
          }
        );
        alert('Contact updated successfully!');
        window.location.reload();
      } catch (error) {
        console.error('Error updating contact:', error);
      }
    }
  };

  useEffect(() => {
    if (currContactEdit.id) {
      console.log(
        '🚀 ~ file: ContactForm.tsx:71 ~ currContactEdit:',
        currContactEdit
      );
      setIContactFormOverlayActive(true);
      const {
        first_name,
        last_name,
        email,
        birthdate,
        gender,
        language,
        avatar,
      } = currContactEdit;
      if (formRef.current) {
        formRef.current.first_name.value = first_name;
        formRef.current.last_name.value = last_name;
        formRef.current.email.value = email;
        formRef.current.birthdate.value = birthdate;
        formRef.current.gender.value = gender;
        formRef.current.language.value = language;
        setImageSrc(avatar);
      }
    }
  }, [currContactEdit]);

  useEffect(() => {
    if (!isContactFormOverlayActive) {
      setCurrContactEdit(false);
      if (formRef.current) {
        formRef.current.reset();
      }
      setImageSrc(defaultPic.src);
    }
  }, [isContactFormOverlayActive]);

  return (
    <form
      ref={formRef}
      className="contactForm "
      onSubmit={(e) => {
        if (currContactEdit.id) {
          handleFormSubmitUpdate(e, currContactEdit.id);
        } else {
          handleFormSubmitAdd(e);
        }
      }}
    >
      <IoMdClose
        className="absolute top-2 right-2 text-2xl cursor-pointer text-[#00997B]"
        onClick={() => {
          setIContactFormOverlayActive(false);
        }}
      />

      <div className="contactAvatar">
        <label className="relative">
          <div className="avatarOverlay bg-[#00000090]  cursor-pointer absolute top-0 left-0 w-full flex items-center justify-center h-full rounded-md hover:opacity-0 transition-all duration-300">
            <p className="text-white font-bo">CLICK TO UPDATE</p>
          </div>
          <input
            type="file"
            name="avatar"
            id="avatar"
            className="sr-only"
            onChange={handleAvatarImg}
          />
          <Image
            alt="Contact avatar"
            title="Contact Avatar"
            ref={avatar}
            className="bg-white w-32 h-32 md:w-40 md:h-40 rounded-lg shadow-md hover:shadow-lg min-h-40 min-w-40 object-cover"
            height={160}
            width={160}
            src={imageSrc}
          />
        </label>
      </div>
      <div className="contactFields">
        <div className="contactFieldsTop flex gap-4">
          <div className="first_name inputWrapper">
            <FaRegUser />
            <input
              type="text"
              required={true}
              name="first_name"
              id="first_name"
              placeholder="First name:"
            />
          </div>
          <div className="last_name inputWrapper">
            <FaRegUser />
            <input
              type="text"
              required={true}
              name="last_name"
              id="last_name"
              placeholder="Last name:"
            />
          </div>
        </div>

        <div className="contactFieldsTop flex  gap-4">
          <div className="email inputWrapper">
            <MdOutlineEmail />
            <input
              type="text"
              required={true}
              name="email"
              id="email"
              placeholder="E-mail:"
            />
          </div>

          <div className="birthdate inputWrapper">
            <BsCalendar2Month />
            <input
              type="date"
              required={true}
              name="birthdate"
              id="birthdate"
              placeholder="Birthdate:"
            />
          </div>
        </div>

        <div className="contactFieldsBottom flex  gap-4">
          <div className="gender inputWrapper">
            <ImManWoman />
            <select
              required={true}
              name="gender"
              id="gender"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="language inputWrapper">
            <IoLanguage />
            <input
              type="text"
              required={true}
              name="language"
              id="language"
              placeholder="Language:"
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-400 hover:border-green-300 border-green-500 flex items-center gap-1 flex-no-shrink px-4 py-[6px] text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2   text-white rounded-md transition ease-in duration-300"
      >
        <FaSave />
        SUBMIT FORM
      </button>
    </form>
  );
};

export default ContactForm;
