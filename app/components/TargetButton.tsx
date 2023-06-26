'use client';

import { Button } from '@chakra-ui/react';
import { BsBoxArrowUpRight } from 'react-icons/bs';

interface TargetButtonProps {
  value: string;
}

const TargetButton: React.FC<TargetButtonProps> = ({ value }) => {
  return (
    <a
      href={value}
      target='_blank'
      className='bg-sky-500 w-10 rounded-sm h-[40px] flex items-center justify-center hover:bg-sky-600 transition duration-200'
    >
      <BsBoxArrowUpRight />
    </a>
  );
};

export default TargetButton;
