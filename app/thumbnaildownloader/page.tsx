import React from 'react'
import ThumbnailDownloader from '../components/ThumbnailDownloader/ThumbnailDownloader'


export const metadata = {
    title: 'Downloader | Thumbnail',
    description: 'Download videos and photos, mp3 from twitter,instagram, and more!',
  };


const page = () => {
  return (
    <div>
      <ThumbnailDownloader/>
    </div>
  )
}

export default page
