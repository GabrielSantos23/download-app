'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Image } from '@chakra-ui/react';

import { motion } from 'framer-motion';
import CardStorage from '../Cards/CardStorage';
import SearchInput from '../Inputs/SearchInput';

interface MediaItem {
  resourceId: string;
  urls: MediaUrl[];
  meta: {
    title: string;
    sourceUrl: string;
  };
  pictureUrl?: string;
  videoQuality: number[];
}

interface MediaUrl {
  url: string;
  name: string;
  subName: string;
  extension: string;
  quality: number;
}

function VideoDownload() {
  const [videoUrl, setVideoUrl] = useState('');
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedUrl = localStorage.getItem('lastVideoUrl');
    if (storedUrl) {
      setVideoUrl(storedUrl);
      handleSubmit(storedUrl);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value);
  };

  const handleSubmit = async (url: string) => {
    setIsLoading(true);
    try {
      localStorage.setItem('lastVideoUrl', url);

      const options = {
        method: 'POST',
        url: 'https://twitter65.p.rapidapi.com/api/twitter/links',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key':
            'a3c79e6f86msh36ca69ce571df65p1cb0dfjsnda05cc69197a',
          'X-RapidAPI-Host': 'twitter65.p.rapidapi.com',
        },
        data: {
          url: url,
        },
      };

      const response = await axios(options);

      const filteredMediaItems = response.data.map((item: any) => {
        const highestQuality = Math.max(...item.videoQuality);
        const filteredUrls = item.urls.filter(
          (url: any) => url.quality === highestQuality
        );
        return { ...item, urls: filteredUrls };
      });

      setMediaItems(filteredMediaItems);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full flex-col items-center justify-center flex p-5'>
      <div className='max-w-xl'>
        <div className='p-10 flex flex-col items-center gap-5'>
          <div className='flex gap-5 items-center'>
            <h1 className='2xl:text-6xl xl:text-5xl text-2xl font-bold text-white'>
              In this tweet
            </h1>
            <Image
              src='/twitter-logo.png'
              alt='twitter logo'
              width={50}
              height={50}
            />
          </div>
          <p className='text-xs text-white/80 text-center'>
            Enter a Tweet URL, click search, and download the videos, gifs and
            images.
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(videoUrl);
          }}
          className='w-full py-5'
        >
          <SearchInput
            type='text'
            value={videoUrl}
            onChange={handleInputChange}
            placeholder='Type URL here...'
            variant='flushed'
            isLoading={isLoading}
          />
        </form>
        <div>
          <p className='text-white'>Results</p>
        </div>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          transition={{
            duration: 0.5,
            ease: 'linear',
          }}
          className='bg-[#2B2B2B] p-5 rounded-md w-full flex flex-col items-center mb-5'
        >
          {mediaItems.map((item) => (
            <div key={item.resourceId}>
              <ul>
                {item.videoQuality && (
                  <>
                    {item.urls.map((url: any) => (
                      <li key={url.url}>
                        {url.extension === 'mp4' && (
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
                            <source src={url.url} type='video/mp4' />
                          </motion.video>
                        )}
                      </li>
                    ))}
                  </>
                )}
                <div className=''>
                  {item.pictureUrl && item.videoQuality.length === 0 && (
                    <div className='flex flex-col gap-5 mb-5'>
                      <Image src={item.pictureUrl} alt={item.meta.title} />
                    </div>
                  )}
                </div>
              </ul>
            </div>
          ))}
          {mediaItems.length === 0 && (
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
        </motion.div>
        <CardStorage />
      </div>
    </div>
  );
}

export default VideoDownload;
