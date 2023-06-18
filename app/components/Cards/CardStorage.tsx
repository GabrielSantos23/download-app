import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { MdVerified } from 'react-icons/md';

const CardStorage = () => {
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
      className='bg-white/5 backdrop-blur-lg text-white border-none'
    >
      <Stack>
        <CardBody>
          <Heading size='md' className='flex items-center  gap-1 '>
            <MdVerified className='text-green-500' /> Note
          </Heading>

          <p className='text-xs py-2'>
            You can store the videos, images, and gifs, share them and/or,
            create a meme from the them, the world is your oyester.
          </p>
        </CardBody>

        {/* <CardFooter>
          <Button variant='solid' colorScheme='blue'>
            Buy Latte
          </Button>
        </CardFooter> */}
      </Stack>
    </Card>
  );
};

export default CardStorage;
