'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Image, Input } from '@chakra-ui/react';
import ButtonComponent from '../Button';
import SearchInput from '../Inputs/SearchInput';

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

const ThumbnailDownloader = () => {
  const [videoLink, setVideoLink] = useState('');
  const [thumbnails, setThumbnails] = useState<JSX.Element[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoLink(event.target.value);
  };

  const handleThumbnailClick = (thumbnailUrl: string) => {
    window.open(thumbnailUrl, '_blank');
  };

  const apiKey = 'AIzaSyDPnszSgAORZMscEmtlfuatIX2BceOkvdI';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (videoLink.trim() === '') {
      setError('Please enter a valid video URL');
      setIsLoading(false);
      return;
    }

    const videoId = extractVideoIdFromLink(videoLink);

    if (!videoId) {
      setError('Invalid YouTube video URL');
      setIsLoading(false);
      return;
    }

    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`
      )
      .then((response) => {
        const videoData = response.data.items[0].snippet;

        if (videoData.thumbnails) {
          const thumbnailList = Object.values<Thumbnail>(
            videoData.thumbnails
          ).map((thumbnail) => (
            <div key={thumbnail.url} className='my-4 relative'>
              <Image
                src={thumbnail.url}
                alt={thumbnail.url}
                onClick={() => handleThumbnailClick(thumbnail.url)}
                className='cursor-pointer'
              />
              <span className='absolute top-0 left-0 bg-black text-white p-1 text-xs font-bold'>{`${thumbnail.width}x${thumbnail.height}`}</span>
            </div>
          ));

          setThumbnails(thumbnailList);
          setIsLoading(false);
          setError('');
        } else {
          setError('Video not found');
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        setError('An error occurred. Please try again later.');
      });
  };

  const extractVideoIdFromLink = (link: string) => {
    const videoIdMatch = link.match(
      /^(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be\.com\/(?:watch\?v=|embed\/|v\/|user\/(?:\S+\/)?[^#\&\?]*))([^#\&\?]+)/
    );

    return videoIdMatch ? videoIdMatch[1] : '';
  };

  return (
    <div className='max-w-xl mx-auto mt-8 p-4 '>
      <div className='mb-5'>

      <h2 className='2xl:text-5xl xl:text-5xl text-2xl text-center font-bold text-white'>Thumb Downloader</h2>
      <p className='text-xs text-white/80 text-center'>
        Enter the YouTube video URL to download its thumbnails.
      </p>
      </div>
      <form onSubmit={handleSubmit} className='flex items-center gap-2 mb-10'>
        <SearchInput
          type='text'
          value={videoLink}
          onChange={handleInputChange}
          placeholder='Enter video URL'
          isInvalid={error !== ''}
          isLoading={isLoading}
        />

      </form>

      {error !== '' && <p className='text-red-500 mt-2'>{error}</p>}

      {thumbnails.length > 0 && (
        <div className='flex flex-col items-center mt-4 bg-[#2b2b2b] p-5 rounded-md'>
          {thumbnails}
        </div>
      )}
    </div>
  );
};

export default ThumbnailDownloader;
