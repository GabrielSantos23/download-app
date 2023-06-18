import ImageConverter from './components/ConvertImage/ImageConverter';
import DownloadForm from './components/DowloaderComponent';
import ThumbnailDownloader from './components/ThumbnailDownloader/ThumbnailDownloader';
import TwitterDownloader from './components/TwitterDownloader/TwitterDownloader';

export default function Home() {
  return (
    <div>
      <TwitterDownloader />
    </div>
  );
}
