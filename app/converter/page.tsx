import React from 'react'
import ImageConverter from '../components/ConvertImage/ImageConverter';

export const metadata = {
    title: 'Downloader | Converter',
    description: 'Download videos and photos, mp3 from twitter,instagram, and more!',
  };


const page = () => {
  return (
    <div>
      <ImageConverter />
    </div>
  )
}

export default page
