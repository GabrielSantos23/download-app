import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from '@chakra-ui/react';
import React from 'react';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  variant?: string;
  placeholder?: string;
  isLoading?: boolean;
  isInvalid?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  type,
  variant,
  placeholder,
  isLoading,
  isInvalid,
}) => {
  return (
    <div className='w-full'>
      <InputGroup size='sm'>
        <Input
          pr='4.5rem'
          type='text'
          value={value}
          onChange={onChange}
          className='text-white focus:bg-[#1a1a1a] bg-white/10 w-full backdrop-blur-lg p-4 rounded-sm'
          placeholder={placeholder}
          variant='flushed'
          isInvalid={isInvalid}
        />
        <InputRightElement width='3.5rem' gap={2}>
          <Button
            type='submit'
            disabled={isLoading}
            h='1.75rem'
            spinner={<Spinner size='sm' />}
            as={Button}
            className='hover:bg-white/10 rounded-sm p-1 transition'
          >
            {isLoading ? (
              <Spinner size={'xs'} className='text-white' />
            ) : (
              <HiOutlineMagnifyingGlass size={14} className='text-white' />
            )}
          </Button>
        </InputRightElement>
      </InputGroup>
    </div>
  );
};

export default SearchInput;
