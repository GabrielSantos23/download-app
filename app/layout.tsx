'use client';

import { useEffect, useState } from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import { Layout } from './components/Layout/Layout';
import { ThemeContext } from './components/Styles/themeContext';
import { ChakraProvider } from '@chakra-ui/react';
import { Providers } from './providers';
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme !== null && storedTheme !== undefined) {
        setTheme(storedTheme);
      }
    }
  }, []);

  const updateTheme = (newTheme: string) => {
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
  };
  return (
    <html lang='en'>
      <body
        className={`${inter.className}  ${
          theme === 'dark' ? 'bg-darkTheme-body' : 'bg-lightTheme-body'
        }  ${
          theme === 'dark' ? 'text-darkTheme-text' : 'text-lightTheme-text'
        } transition  scrollbar-thin ${
          theme === 'dark'
            ? 'scrollbar-thumb-darkTheme-span scrollbar-track-darkTheme-scrollback'
            : 'scrollbar-thumb-lightTheme-span  scrollbar-track-lightTheme-scrollback'
        }  `}
      >
        <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
        </ThemeContext.Provider>
      </body>
    </html>
  );
}
