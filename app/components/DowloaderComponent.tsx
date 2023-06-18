'use client';

import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from './Styles/themeContext';
import SearchYoutube from './Search/SearchYoutube';
import ClipLoader from 'react-spinners/ClipLoader';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import ButtonComponent from './Button';
import { DownloadIcon } from '@chakra-ui/icons';
import SearchInput from './Inputs/SearchInput';
type VideoInfo = {
  thumbnail: string;
  channelTitle: string;
  title: string;
  videoId: '';
};

export default function DownloadForm() {
  const [videoUrl, setVideoUrl] = useState('');
  const [format, setFormat] = useState('mp4');
  const [qualities, setQualities] = useState([]);
  const [selectedQuality, setSelectedQuality] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const { theme, setTheme } = useContext(ThemeContext);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isLoadingSearchText, setIsLoadingSearchText] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const theme2 = useTheme();
  const isDarkTheme = theme === 'dark';

  // const getColor = (color: string) => {
  //   return isDarkTheme
  //     ? theme2.colors.darkTheme[color]
  //     : theme2.colors.lightTheme[color];
  // };

  const handleConvert = () => {
    if (!videoUrl) {
      setErrorMessage('Please enter a video URL');
      return;
    }

    if (!videoUrl.includes('youtube.com') && !videoUrl.includes('youtu.be')) {
      searchVideos(videoUrl);
      return;
    }

    fetchVideoInfo();
  };

  const fetchVideoInfo = async () => {
    setIsLoadingSearch(true);

    try {
      // Fazer a chamada à API do YouTube para obter as informações do vídeo
      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/videos',
        {
          params: {
            part: 'snippet',
            id: getVideoIdFromUrl(videoUrl),
            key: 'AIzaSyDPnszSgAORZMscEmtlfuatIX2BceOkvdI',
          },
        }
      );

      const video = response.data.items[0];

      setVideoInfo({
        thumbnail: video.snippet.thumbnails.high.url,
        channelTitle: video.snippet.channelTitle,
        title: video.snippet.title,
        videoId: video.id,
      });
      setIsLoadingSearch(false);
    } catch (error) {
      console.error('Error:', error);
      setVideoInfo(null);
      setErrorMessage('Failed to fetch video information');
      setIsLoadingSearch(false);
    }
  };
  const getVideoIdFromUrl = (url: string) => {
    const regex = /[?&]v=([^&#]*)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    } else {
      throw new Error('Invalid YouTube video URL');
    }
  };

  const handleDownload = async (format: string) => {
    setIsLoading(true);
    try {
      let route;
      if (format === 'mp4') {
        route = '/api/DownloadMp4';
      } else if (format === 'mp3') {
        route = '/api/DownloadMp3';
      } else {
        return;
      }

      const response = await axios.get(route, {
        params: { videoUrl: videoUrl },
        responseType: 'blob',
      });

      const url = URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement('a');
      link.href = url;
      link.download = `video.${format}`;
      link.click();

      URL.revokeObjectURL(url);
      setIsLoading(false);
      setIsOpen(false); // Fechar o menu após o download
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
      setErrorMessage(`An error occurred ${error}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [videoUrl]);

  const searchVideos = async (query: string) => {
    setIsLoadingSearchText(true);
    try {
      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/search',
        {
          params: {
            part: 'snippet',
            maxResults: 5,
            type: 'video',
            q: query,
            key: 'AIzaSyDPnszSgAORZMscEmtlfuatIX2BceOkvdI',
          },
        }
      );

      setSearchResults(response.data.items);
      setIsLoadingSearchText(false);
    } catch (error) {
      console.error('Error:', error);
      setSearchResults([]);
      setErrorMessage('Failed to fetch search results');
      setIsLoadingSearchText(false);
    }
  };

  return (
    <div className='flex flex-col  mx-5 justify-center items-center gap-5 mt-40  '>
      <div className='flex flex-col  max-w-xl w-full  justify-center items-center gap-2'>
        <h1 className='  xl:text-5xl text-2xl font-bold text-white'>
          YouTube Downloader
        </h1>
        <h3 className='text-xs text-white/80 text-center '>
          Convert and download Youtube videos in MP4, MP3, MOV and FLV for free
        </h3>
      </div>
      <form
        className='flex  max-w-xl  w-full'
        onSubmit={(e) => {
          e.preventDefault();
          handleConvert();
        }}
      >
        <Stack direction='row' align='center' width={'100%'}>
          <SearchInput
            type='text'
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder='Enter video URL'
            isLoading={isLoadingSearch || isLoadingSearchText}
          />
        </Stack>
      </form>

      {videoInfo && (
        <Card
          className='max-w-xl  bg-[#2b2b2b] backdrop-blur-lg flex  text-white justify-center'
          direction={{ base: 'column', md: 'row' }}
        >
          <Image
            src={videoInfo.thumbnail}
            maxW={{ base: '100%', sm: '250px' }}
            alt='Video Thumbnail'
            objectFit='cover'
            className='rounded-md'
          />
          <Stack>
            <CardBody>
              <Heading size='sm'> {videoInfo.title}</Heading>
              <Text py={2} size={'xs'}>
                {videoInfo.channelTitle}
              </Text>
            </CardBody>
            <CardFooter>
              <Menu isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <MenuButton
                  as={Button}
                  rightIcon={<DownloadIcon />}
                  onClick={() => setIsOpen(!isOpen)}
                  colorScheme=''
                  className='bg-white/20 backdrop-blur-md text-white hover:bg-[#2b2b2b] duration-300'
                >
                  Download
                </MenuButton>
                <MenuList className='bg-[#2b2b2b] backdrop-blur-lg text-white border-none'>
                  <MenuItem
                    className='hover:bg-white/30  duration-300 transition'
                    onClick={() => handleDownload('mp4')}
                  >
                    Download MP4
                  </MenuItem>
                  <MenuItem
                    className='hover:bg-white/30 duration-300 transition '
                    onClick={() => handleDownload('mp3')}
                  >
                    Download MP3
                  </MenuItem>
                </MenuList>
              </Menu>
            </CardFooter>
          </Stack>
        </Card>
      )}
      <div className='w-1/3 text-red-600 text-center flex justify-center items-center'>
        {errorMessage && <p>{errorMessage}</p>}
      </div>

      {searchResults.length > 0 && (
        <>
          <SearchYoutube
            searchResults={searchResults}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
            setFormat={setFormat}
            qualities={qualities}
            setQualities={setQualities}
          />
        </>
      )}
    </div>
  );
}
