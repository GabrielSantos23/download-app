'use client';

import React, { useState, createContext, useContext } from 'react';
import Header from '../Header/Header';
import Footer from '../Footers/Footer';

// Crie o contexto

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='    '>
      <Header />
      <div className=''>{children}</div>
      <Footer />
    </div>
  );
};
