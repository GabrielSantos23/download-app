import React from 'react';

const Footer = () => {
  return (
    <div className='flex items-center justify-center py-5'>
      <div className='flex max-w-xl w-full justify-center gap-5 text-sm text-white/80'>
        <div className=''>
          © {new Date().getFullYear()}{' '}
          <span className='text-sky-400'>Gabriel Santos</span>
        </div>
        <div>
          Inspired by <span className='text-sky-400'>inthistweet</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
