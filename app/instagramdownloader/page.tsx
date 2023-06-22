import React from 'react'
import { InstagramForm } from '../components/Instagram/InstagramDownloader'

export const metadata = {
    title: 'Downloader | Instagram',
    description: 'Download videos and photos, mp3 from twitter,instagram, and more!',
  };

const page = () => {
  return (
    <div>
      <InstagramForm/>
    </div>
  )
}

export default page
