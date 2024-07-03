import { iContactItem } from '../interfaces';
import axios from 'axios';
import HomePage from '@components/pages/HomePage';

async function api(path: string) {
  const url = `${process.env.API_URL}/${path}`;

  try {
    const res = await axios.get(url, {
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
    return res.data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}

export default async function Home() {
  const { contacts }: { contacts: iContactItem[] } = await api('contacts');
  console.log('🚀 ~ file: page.tsx:19 ~ contacts:', contacts);

  return <HomePage list={contacts} />;
}
