'use client';

import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../Styles/themeContext';
import ClipLoader from 'react-spinners/ClipLoader';
import { format } from 'date-fns';
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Select,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  useColorMode,
  Tooltip,
  Spinner,
} from '@chakra-ui/react';
import { ChevronDownIcon, DownloadIcon, TimeIcon } from '@chakra-ui/icons';
import { useTheme } from '@chakra-ui/react';
import Link from 'next/link';
interface SearchYoutubeProps {
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  qualities: string[];
  setQualities: React.Dispatch<React.SetStateAction<never[]>>;
  setFormat: React.Dispatch<React.SetStateAction<string>>;
  searchResults: SearchResult[];
}

interface SearchResult {
  id: { videoId: string };
  snippet: {
    title: string;
    thumbnails: { high: { url: string } };
    publishedAt: string;
  };
}

const SearchYoutube: React.FC<SearchYoutubeProps> = ({
  searchResults,
  setErrorMessage,
}) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [formated, setFormated] = useState('mp4');
  const [isLoadingItems, setIsLoadingItems] = useState<{
    [key: string]: boolean;
  }>({});

  console.log(formated);

  const formatPublishedDate = (publishedAt: string) => {
    const date = new Date(publishedAt);
    return format(date, 'MM-dd-yyyy');
  };

  const handleDownloadVideo = async (videoId: string, format: string) => {
    setIsLoadingItems((prevLoadingItems) => ({
      ...prevLoadingItems,
      [videoId]: true,
    }));

    try {
      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/videos',
        {
          params: {
            part: 'contentDetails',
            id: videoId,
            key: 'AIzaSyDPnszSgAORZMscEmtlfuatIX2BceOkvdI',
          },
        }
      );

      // const video = response.data.items[0];
      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

      let route;
      if (format === 'mp4') {
        route = '/api/DownloadMp4';
      } else if (format === 'mp3') {
        route = '/api/DownloadMp3';
      } else {
        return;
      }
      const response2 = await axios.get(route, {
        params: { videoUrl: videoUrl },
        responseType: 'blob',
      });
      const url = URL.createObjectURL(response2.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = `video.${format}`;
      link.click();

      URL.revokeObjectURL(url);
      setIsLoadingItems((prevLoadingItems) => ({
        ...prevLoadingItems,
        [videoId]: false,
      }));
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to fetch video information');
      setIsLoadingItems((prevLoadingItems) => ({
        ...prevLoadingItems,
        [videoId]: false,
      }));
    }
  };

  return (
    <div>
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <h3 className='font-bold text-3xl'>Search Results:</h3>
        <div className='grid  lg:grid-cols-2 grid-cols-1  gap-5 my-10 '>
          {searchResults.map((result) => (
            <div className='group' key={result.id.videoId}>
              <Card
                maxW={'sm'}
                boxShadow={'xl'}
                className={`bg-[#2b2b2b] text-white transition`}
              >
                <CardBody>
                  <Link
                    target='_blank'
                    href={`https://youtube.com/watch?v=${result.id.videoId}`}
                  >
                    <Image
                      src={result.snippet.thumbnails.high.url}
                      alt={result.snippet.title}
                      borderRadius='lg'
                    />
                  </Link>
                  <Stack mt='6' spacing='3'>
                    <Heading className='text-lg truncate'>
                      {result.snippet.title}
                    </Heading>
                    <div className='flex justify-between items-center'>
                      <Menu>
                        <MenuButton
                          isLoading={isLoadingItems[result.id.videoId]}
                          disabled={isLoadingItems[result.id.videoId]}
                          spinner={<Spinner size='sm' />}
                          as={Button}
                          rightIcon={<DownloadIcon />}
                          colorScheme=''
                          className='bg-white/10 text-white hover:bg-white/20 transition duration-300'
                        >
                          Download
                        </MenuButton>
                        <MenuList className='bg-[#2b2b2b] border-none'>
                          <MenuItem
                            className='hover:bg-white/10 transition duration-300'
                            onClick={() => {
                              handleDownloadVideo(result.id.videoId, 'mp4');
                            }}
                          >
                            Download MP4
                          </MenuItem>
                          <MenuItem
                            className='hover:bg-white/10 transition duration-300'
                            onClick={() => {
                              handleDownloadVideo(result.id.videoId, 'mp3');
                            }}
                          >
                            Download MP3
                          </MenuItem>
                        </MenuList>
                      </Menu>
                      <Tooltip
                        label={` Published at ${formatPublishedDate(
                          result.snippet.publishedAt
                        )}`}
                      >
                        <TimeIcon className='cursor-pointer' />
                      </Tooltip>
                    </div>
                  </Stack>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchYoutube;
