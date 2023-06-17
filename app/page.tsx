import Image from 'next/image';
import DowloaderComponent from './components/DowloaderComponent';
import VideoFooter from './components/Footers/VideoFooter';
import ImageConverter from './components/ConvertImage/ImageConverter';

export default function Home() {
  return (
    <div>
      <ImageConverter />
      <VideoFooter />
    </div>
  );
}
