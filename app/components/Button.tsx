import { Button, Spinner } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';

import React, { useContext } from 'react';
import { ThemeContext } from './Styles/themeContext';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  colorScheme?: string;
  variant?: string;
  onClick: () => void;
  isLoading: boolean;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  children,
  type,
  colorScheme,
  variant,
  onClick,
  isLoading,
}) => {
  const theme2 = useTheme();
  const { theme, setTheme } = useContext(ThemeContext);
  // const isDarkTheme = theme === 'dark';

  // const getColor = (color: string) => {
  //   return isDarkTheme
  //     ? theme2.colors.darkTheme[color]
  //     : theme2.colors.lightTheme[color];
  // };

  return (
    <Button
      style={
        {
          // backgroundColor: getColor('card'),
          // color: getColor('text'),
        }
      }
      onClick={onClick}
      isLoading={isLoading}
      spinner={<Spinner size='sm' />}
      type={type}
      colorScheme='gray'
      variant='solid'
      className='  rounded-md p-2 text-xs lg:text-base px-4  flex items-center gap-2 hover:opacity-50 transition bg-gray-300'
    >
      {children}
    </Button>
  );
};

export default ButtonComponent;
