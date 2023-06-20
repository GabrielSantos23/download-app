'use client';
import React, { useState, useEffect } from 'react';

export const DisplayVideo = ({ videoLink }) => {
  const [videoToShow, setVideoToShow] = useState('');

  useEffect(() => {
    setVideoToShow(videoLink);
  }, [videoLink]);

  return (
    <div>
      <video controls src={videoToShow} type='video/mp4'></video>
    </div>
  );
};
