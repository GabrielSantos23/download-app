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
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-zinc-900 background-image    `}>
        <div className='w-full     	'>
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
        </div>
      </body>
    </html>
  );
}
