import ImageConverter from './components/ConvertImage/ImageConverter';
import DownloadForm from './components/DowloaderComponent';
import { InstagramForm } from './components/Instagram/InstagramDownloader';
import ThumbnailDownloader from './components/ThumbnailDownloader/ThumbnailDownloader';
import TwitterDownloader from './components/TwitterDownloader/TwitterDownloader';

export const metadata = {
  title: 'Downloader',
  description: 'Download videos and photos, mp3 from twitter,instagram, and more!',
};



export default function Home() {
  return (
    <div>
      <DownloadForm />
    </div>
  );
}
