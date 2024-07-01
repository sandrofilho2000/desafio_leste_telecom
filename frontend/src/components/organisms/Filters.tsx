import { useContact } from '@context/useContact';
import { useSystem } from '@context/useSystem';
import React, { useEffect, useRef, useState } from 'react';
import { BsCalendar2Month } from 'react-icons/bs';
import { ImManWoman } from 'react-icons/im';
import { IoLanguage } from 'react-icons/io5';
import { iContactItem } from '@interfaces/index';

const Filters = () => {
  const {
    searchContext,
    setSearchContext,
    setSearchSkeletonOverlayActive,
    isFilterActive,
    setIsFilterActive,
  }: any = useSystem();

  const [languages, setLanguages] = useState<string[]>();

  const { setContacts, initialContacts }: any = useContact();

  const formRef = useRef<HTMLFormElement>(null);
  var typingTimer: any;
  let handleSkeletonOverlay = () => {
    clearTimeout(typingTimer);
    setSearchSkeletonOverlayActive(true);
    typingTimer = setTimeout(() => {
      setSearchSkeletonOverlayActive(false);
    }, 1300);

    let context = {
      slug: searchContext.slug,
      gender: '',
      language: searchContext.language,
      birthMonth: searchContext.birthMonth,
    };
    if (formRef.current) {
      let gender = formRef.current.gender.value;
      context.gender = gender;

      let language = formRef.current.language.value;
      context.language = language;

      let birthMonth = formRef.current.birthMonth.value;
      context.birthMonth = birthMonth;

      if (!gender && !language && !birthMonth) {
        setContacts(initialContacts);
      } else {
        setSearchContext(context);
      }
    }
  };

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  useEffect(() => {
    let list: any = [];
    initialContacts.forEach((item: iContactItem) => {
      if (!list.includes(item.language)) {
        list.push(item.language);
      }
    });

    setLanguages(list);
  }, [initialContacts]);

  return (
    <div
      className={`lg:h-12 flex h-36 flex-col lg:flex-row items-center justify-center bg-[#F4F5F5] mb-8 px-8 md:px-16 lg:px-24 transition-all duration-300 z-10 ${
        !isFilterActive && '-mt-36 lg:-mt-12'
      }`}
    >
      <form
        className="flex flex-col lg:flex-row w-full gap-2 lg:gap-4 relative justify-center lg:justify-start"
        ref={formRef}
        onChange={() => {
          handleSkeletonOverlay();
        }}
      >
        <div className="genderSelect flex items-center gap-1 text-[#00997B]">
          <ImManWoman />
          <select
            name="gender"
            id="gender"
            className="shadow-md rounded-md px-2 py-1"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="languageSelect flex items-center text-[#00997B] gap-1">
          <IoLanguage />
          <select
            name="language"
            id="language"
            className="shadow-md rounded-md px-2 py-1"
          >
            <option value="">Select Language</option>
            {languages &&
              languages.map((item, index: number) => (
                <option
                  key={index}
                  value={item.toLowerCase()}
                >
                  {item}
                </option>
              ))}
          </select>
        </div>

        <div className="birthMonthSelect flex items-center text-[#00997B] gap-1">
          <BsCalendar2Month />
          <select
            name="birthMonth"
            id="birthMonth"
            className="shadow-md rounded-md px-2 py-1"
          >
            <option value="">Select Birth Month</option>
            {months.map((month, index) => (
              <option
                key={index}
                value={month}
              >
                {month}
              </option>
            ))}
          </select>
        </div>

        <button
          className="px-2 py-[6px] flex  bg-[#00997B] shadow-md rounded-md text-white text-sm absolute right-0 items-center"
          type="reset"
          onClick={() => {
            setContacts(initialContacts);
          }}
        >
          RESET FORM
        </button>
      </form>
    </div>
  );
};

export default Filters;
