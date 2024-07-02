import { iContactItem } from '../interfaces';
import axios from 'axios';
import HomePage from '@components/pages/HomePage';
import Cookies from 'js-cookie';

async function api(path: string) {
  const url = `${process.env.API_URL}/${path}`;
  console.log('🚀 ~ file: page.tsx:11 ~ url:', url);

  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error; // Throw the error to handle it in the caller function
  }
}

export default async function Home() {
  const { contacts }: { contacts: iContactItem[] } = await api('contacts');

  return <HomePage list={contacts} />;
}
