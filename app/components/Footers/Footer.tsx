import React from 'react';

const Footer = () => {
  return (
    <div className='flex items-center justify-center   py-5'>
      <div className='flex max-w-xl w-full justify-center gap-5 text-sm text-white/80'>
        <div className=''>
          © {new Date().getFullYear()} by&nbsp;
          <span className='text-sky-400 hover:underline transition'>
            <a href='https://github.com/GabrielSantos23' target='_blank'>
              Gabriel Santos
            </a>
          </span>
        </div>
        <div>
          Inspired by&nbsp;
          <a target='_blank' href='https://twdown.app/'>
            <span className='text-sky-400 hover:underline transition '>
              EGOIST
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
