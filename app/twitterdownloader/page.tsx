import React from 'react'
import VideoDownload from '../components/TwitterDownloader/TwitterDownloader'


export const metadata = {
  title: 'Downloader | Twitter',
  description: 'Download videos and photos, mp3 from twitter,instagram, and more!',
};


const page = () => {
  return (
    <div>
      <VideoDownload/>
    </div>
  )
}

export default page
