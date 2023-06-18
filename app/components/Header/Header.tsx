import {
  AddIcon,
  EditIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  RepeatIcon,
} from '@chakra-ui/icons';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  const MenuItemStyle = 'hover:bg-white/20 transition duration-300';

  return (
    <div className='w-full px-10 py-5 flex justify-center bg-transparent'>
      <div className='flex items-center max-w-xl justify-between w-full'>
        <Link href={'/'}>
          <div className='bg-white/10 backdrop-blur-lg py-1 px-2 rounded-md transition duration-300 hover:bg-white/20   text-sm flex items-center'>
            <img src='/logo.png' alt='Logo' className='w-8 h-8' />
            Downloder
          </div>
        </Link>
        <div className='hidden md:flex gap-3 '>
          <div className='flex text-sm gap-2 relative'>
            <button
              className=' flex items-center  rounded-md hover:text-white/80 py-1 px-2  hover:bg-white/10 hover:backdrop-blur-lg transition duration-300'
              onMouseEnter={handleMenuOpen}
              onMouseLeave={handleMenuClose}
            >
              Actions <BiChevronDown />
            </button>
            {isMenuOpen && (
              <div
                className='absolute right-0 mt-5  bg-white/10 backdrop-blur-lg rounded-md w-52'
                onMouseEnter={handleMenuOpen}
                onMouseLeave={handleMenuClose}
              >
                <ul className='py-2 cursor-pointer'>
                  <li
                    className='px-4 py-2 hover:bg-white/20 transition duration-300'
                    onClick={handleMenuItemClick}
                  >
                    Twitter Downloader
                  </li>
                  <li
                    className='px-4 py-2 hover:bg-white/20 transition duration-300'
                    onClick={handleMenuItemClick}
                  >
                    Youtube Downloader
                  </li>
                  <li
                    className='px-4 py-2 hover:bg-white/20 transition duration-300'
                    onClick={handleMenuItemClick}
                  >
                    Instagram Downloader
                  </li>
                  <li
                    className='px-4 py-2 hover:bg-white/20 transition duration-300'
                    onClick={handleMenuItemClick}
                  >
                    Thumbnail Downloader
                  </li>
                </ul>
              </div>
            )}
          </div>

          <Link href={'/converter'}>
            <p className='text-sm rounded-md hover:text-white/80 py-1 px-2 transition duration-300  hover:bg-white/10 hover:backdrop-blur-lg'>
              Video Converter
            </p>
          </Link>
        </div>
        <div className='flex md:hidden'>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HamburgerIcon className='text-white' />}
              variant='outline'
              className='bg-white/10 border-none backdrop-blur-lg '
            />
            <MenuList className='bg-white/10 backdrop-blur-lg border-none '>
              <MenuItem className={MenuItemStyle}>Twitter Downloader</MenuItem>
              <MenuItem className={MenuItemStyle}>Youtube Downloader</MenuItem>
              <MenuItem className={MenuItemStyle}>
                Instagram Downloader
              </MenuItem>
              <MenuItem className={MenuItemStyle}>
                Thumbnail Downloader
              </MenuItem>
              <MenuItem className={MenuItemStyle}>Video Converter</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Header;
