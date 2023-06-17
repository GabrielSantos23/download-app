import { items } from '@/app/data/imageConverter';
import React from 'react';
import { IconType } from 'react-icons';
import {
  FcCancel,
  FcClock,
  FcDownload,
  FcList,
  FcPrivacy,
  FcTabletAndroid,
} from 'react-icons/fc';

interface Item {
  icon: IconType;
  title: string;
  text: string;
}

const ImageConverterFooter = () => {
  const getIconComponent = (iconName: string): IconType => {
    switch (iconName) {
      case 'FcClock':
        return FcClock;
      case 'FcList':
        return FcList;
      case 'FcTabletAndroid':
        return FcTabletAndroid;
      case 'FcPrivacy':
        return FcPrivacy;
      case 'FcDownload':
        return FcDownload;
      default:
        return FcCancel;
    }
  };
  return (
    <div className='flex items-center justify-center '>
      <div className='lg:w-[40%] 2xl:w-[900px] w-full p-5'>
        <div className='grid 2xl:grid-cols-3 lg:grid-cols-2 gap-5'>
          {items.map((item, index) => {
            const Icon = getIconComponent(item.icon);
            return (
              <div key={index}>
                <div className='rounded-full bg-lightTheme-card flex items-center justify-center w-14 h-14'>
                  {Icon && <Icon className='' size={35} />}
                </div>
                <div className='flex flex-col gap-2 mt-5'>
                  <h2 className='text-sm font-bold '>{item.title}</h2>
                  <p className='text-sm'>{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ImageConverterFooter;
