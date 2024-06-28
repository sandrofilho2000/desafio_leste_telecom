'use client';
import React, { useEffect, useState } from 'react';
import { iContact } from '../../interfaces';
import { MdMale } from 'react-icons/md';
import { IoMdFemale } from 'react-icons/io';
import { LiaBirthdayCakeSolid } from 'react-icons/lia';

const ContactCard = ({ contact }: { contact: iContact }) => {
  const { first_name, last_name, email, birthday, gender, language } = contact;
  const [age, setAge] = useState(0);

  useEffect(() => {
    const birthDate = new Date(birthday);
    const today = new Date();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    setAge(today.getFullYear() - birthDate.getFullYear());
  }, []);

  return (
    <div className=" w-full mx-auto z-10">
      <div className="flex flex-col">
        <div className="bg-white border border-white hover:shadow-lg  shadow-md transition ease-in duration-300 rounded-3xl p-4 my-4">
          <div className="flex-none sm:flex">
            <div className=" relative h-32 w-32   sm:mb-0 mb-3">
              <img
                src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
                alt="aji"
                className=" w-32 h-32 object-cover rounded-2xl"
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
            <div className="flex-auto sm:ml-5 justify-evenly">
              <div className="flex items-center justify-between sm:mt-2">
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <div className="w-full flex-none text-lg text-[#009373] font-bold leading-none">
                      {first_name} {last_name} ({age})
                    </div>
                    <div className="flex-auto text-gray-500 my-1">
                      <span className="mr-3 ">{email}</span>
                      <span className="mr-3 border-r border-gray-200  max-h-0"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center text-gray-500">
                <span>
                  <LiaBirthdayCakeSolid />
                </span>
                <span className=" my-1">{birthday}</span>
              </div>
              <div className="flex pt-2  text-sm text-gray-500">
                <div className="flex-1 inline-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                  </svg>
                  <p className="">1.2k Followers</p>
                </div>

                <button className="flex-no-shrink bg-red-400 hover:bg-red-500 px-5 ml-4 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-300 hover:border-red-500 text-white rounded-full transition ease-in duration-300">
                  DELETAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
