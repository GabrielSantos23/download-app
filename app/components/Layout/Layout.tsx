'use client';

import React, { useState, createContext, useContext } from 'react';
import Header from '../Header/Header';

// Crie o contexto

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className=' h-full  '>
      <Header />
      <div className='lg:px-10'>{children}</div>
    </div>
  );
};
