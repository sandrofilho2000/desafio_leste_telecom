import ContactCard from '@components/cells/ContactCard';
import Navbar from '@components/organisms/Navbar';
import Image from 'next/image';
import data from 'public/mock.json';
import { iContact } from '../interfaces';

export default async function Home() {
  const { contacts }: { contacts: iContact[] } = data;
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {contacts.map((item: iContact, index) => (
          <ContactCard
            contact={item}
            key={index}
          />
        ))}
      </main>
    </>
  );
}
