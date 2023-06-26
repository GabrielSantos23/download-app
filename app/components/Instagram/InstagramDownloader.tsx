'use client';

import { useState, FormEvent, useEffect } from 'react';
import { Exception, ClientException } from '@/exceptions';
import { Button } from '@chakra-ui/react';
import SearchInput from '../Inputs/SearchInput';
import { motion } from 'framer-motion';
import CardStorage from '../Cards/CardStorage';
const validateInput = (postUrl: string) => {
  if (!postUrl) {
    throw new ClientException('Instagram URL was not provided');
  }

  if (!postUrl.includes('instagram.com/')) {
    throw new ClientException('Invalid URL does not contain Instagram domain');
  }

  if (!postUrl.startsWith('https://')) {
    throw new ClientException(
      'Invalid URL it should start with "https://www.instagram.com..."'
    );
  }

  const postRegex =
    /^https:\/\/(?:www\.)?instagram\.com\/p\/([a-zA-Z0-9_-]+)\/?/;

  const reelRegex =
    /^https:\/\/(?:www\.)?instagram\.com\/reels?\/([a-zA-Z0-9_-]+)\/?/;

  if (!postRegex.test(postUrl) && !reelRegex.test(postUrl)) {
    throw new ClientException('URL does not match Instagram post or reel');
  }
};

const fetchVideo = async (postUrl: string) => {
  const response = await fetch(`/api/InstagramDownloader?url=${postUrl}`, {
    method: 'POST',
  });

  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new ClientException('Internal server error');
  }

  const data = await response.json();
  if (data.error) {
    throw new ClientException(data.error);
  }

  return data.downloadUrl;
};

export const InstagramForm = () => {
  const [postUrl, setPostUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleError = (error: any) => {
    if (error instanceof Exception) {
      setErrorMsg(error.message);
    } else {
      console.error(error);
      setErrorMsg(
        'Something went wrong. If this problem persists, please contact the developer.'
      );
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      validateInput(postUrl);
    } catch (error: any) {
      return handleError(error);
    }

    try {
      const videoUrl = await fetchVideo(postUrl);
      setVideoUrl(videoUrl);
      setDownloadUrl('');
    } catch (error: any) {
      return handleError(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (postUrl !== '') {
      const formElement = document.createElement('form');
      formElement.dispatchEvent(new Event('submit'));
    }
  }, [postUrl]);
  return (
    <>
      <div className='flex items-center  flex-col lg:p-32 p-5 '>
        <div className='mb-5'>
          <h1 className='2xl:text-6xl xl:text-5xl text-2xl font-bold text-white'>
            Insta Downloader
          </h1>
          <p className='text-xs text-white/80 text-center'>
            Enter a Reels or post URL, click search, and download the video.
          </p>
        </div>
        <form
          className='max-w-xl flex w-full flex-col gap-5 mt-6'
          onSubmit={handleSubmit}
        >
          <SearchInput
            id='url-input'
            type='url'
            value={postUrl}
            onChange={(e) => setPostUrl(e.target.value)}
            placeholder='e.g. https://www.instagram.com/p/CGh4a0iASGS'
            aria-label='Instagram video download URL input'
            title='Instagram video download URL input'
            isLoading={isLoading}
          />
          {errorMsg !== '' && <div className='text-red-500'>{errorMsg}</div>}

          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            transition={{
              duration: 0.5,
              ease: 'linear',
            }}
            className={`
             
              p-5 rounded-md w-full flex flex-col items-center mb-5  bg-[#2B2B2B]`}
          >
            {videoUrl.length === 0 && (
              <motion.video
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.4,
                }}
                controls
                preload='auto'
                className='w-full max-h-[500px] bg-black'
              >
                <source src={'/placeholder-video.mp4'} type='video/mp4' />
              </motion.video>
            )}
            {videoUrl !== '' && (
              <motion.video
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.4,
                }}
                preload='auto'
                className='w-full max-h-[500px] bg-black'
                controls
              >
                <source src={videoUrl} type='video/mp4' />
                Your browser does not support the video tag.
              </motion.video>
            )}
          </motion.div>
          <CardStorage />
        </form>
      </div>
    </>
  );
};
