'use client';

import { useState, FormEvent } from 'react';
import { Exception, ClientException } from '@/exceptions';
import { Button } from '@chakra-ui/react';

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

  return (
    <>
      {errorMsg !== '' && <div>{errorMsg}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor='url-input' className='sr-only'>
          Instagram URL input
        </label>
        <input
          id='url-input'
          type='url'
          value={postUrl}
          autoFocus={true}
          onChange={(e) => setPostUrl(e.target.value)}
          placeholder='e.g. https://www.instagram.com/p/CGh4a0iASGS'
          aria-label='Instagram video download URL input'
          title='Instagram video download URL input'
        />
        {videoUrl !== '' && (
          <video controls>
            <source src={videoUrl} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        )}
        {downloadUrl !== '' && (
          <a href={downloadUrl} download>
            Download Video
          </a>
        )}
        <Button type='submit' isLoading={isLoading}>
          Get Video
        </Button>
      </form>
    </>
  );
};
