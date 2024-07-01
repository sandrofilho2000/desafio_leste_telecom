import { iContactItem } from '../interfaces';
import axios from 'axios';
import HomePage from '@components/HomePage';

async function api(path: string) {
  let url = `${process.env.API_URL}/${path}`;
  console.log('🚀 ~ file: page.tsx:11 ~ url:', url);
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Api-Key ${process.env.API_KEY}`,
      },
    });
    return res.data;
  } catch (error) {
    // Trate erros aqui, se necessário
    console.error('Erro na requisição:', error);
    throw error; // Pode ser útil para tratar o erro no chamador da função
  }
}

export default async function Home() {
  const { contacts }: { contacts: iContactItem[] } = await api('contacts');
  return <HomePage list={contacts} />;
}
