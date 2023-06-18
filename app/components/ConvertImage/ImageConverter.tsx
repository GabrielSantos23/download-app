'use client';

import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { Box, Heading, Text, VStack, Select, Button } from '@chakra-ui/react';
import Dropzone, { FileWithPath } from 'react-dropzone';

function ImageConverter() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [convertedFile, setConvertedFile] = useState<File | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleFileDrop = (acceptedFiles: FileWithPath[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.type.startsWith('image/')) {
        setSelectedImage(URL.createObjectURL(file));
        setConvertedFile(null);
        setErrorMessage('');
      } else {
        setErrorMessage('Please upload a valid image file.');
      }
    }
  };

  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFormat(e.target.value);
    setErrorMessage('');
  };

  const handleConvertImage = () => {
    if (selectedImage && selectedFormat) {
      fetch(selectedImage)
        .then((response) => response.blob())
        .then((blob) => {
          saveAs(blob, `converted.${selectedFormat}`);
        })
        .catch((error) => {
          setErrorMessage('Failed to convert image. Please try again.');
        });
    } else {
      setErrorMessage('Please select an image and a format.');
    }
  };

  return (
    <Box textAlign='center' minHeight='100%' p={8}>
      <VStack spacing={4} className='max-w-lg' mx='auto'>
        <Heading size='xl' fontWeight='bold'>
          Image Converter
        </Heading>
        <Text className='text-white/80'>
          Upload an image and convert it to different formats.
        </Text>
        <Dropzone onDrop={handleFileDrop}>
          {({ getRootProps, getInputProps }) => (
            <Box
              {...getRootProps()}
              w='full'
              p={4}
              mx='auto'
              my={8}
              className='bg-transparent backdrop-blur-lg'
              border='2px dashed'
              borderColor='gray.300'
              rounded='lg'
            >
              <input {...getInputProps()} />
              <Text
                className='text-white/80'
                textAlign='center'
                cursor='pointer'
              >
                Drag and drop an image here or click to upload.
              </Text>
            </Box>
          )}
        </Dropzone>
        <div className='bg-[#2b2b2b] p-5 w-full rounded-md'>
          {selectedImage && (
            <Box w='full' mb={8}>
              <img
                src={selectedImage}
                alt='Uploaded Image'
                className='w-full rounded-lg'
              />
            </Box>
          )}
          {selectedImage && (
            <Box w='full'>
              <Text mb={2} className='text-white'>
                Select the conversion format:
              </Text>
              <select
                value={selectedFormat}
                onChange={handleFormatChange}
                // bg='transparent'
                className='w-full  border-sky-500 bg-white/10 backdrop-blur-lg  items-center p-2  rounded-md border-b-sky-500 border-b-2'
                // className='block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                // variant='flushed'
              >
                <option className='bg-[#2b2b2b]' value=''>
                  Select a format
                </option>
                <option className='bg-[#2b2b2b]' value='jpeg'>
                  JPEG
                </option>
                <option className='bg-[#2b2b2b]' value='png'>
                  PNG
                </option>
                <option className='bg-[#2b2b2b]' value='gif'>
                  GIF
                </option>
                <option className='bg-[#2b2b2b]' value='bmp'>
                  BMP
                </option>
                <option className='bg-[#2b2b2b]' value='webp'>
                  WebP
                </option>
                <option className='bg-[#2b2b2b]' value='ico'>
                  ICO
                </option>
                <option className='bg-[#2b2b2b]' value='eps'>
                  EPS
                </option>
                <option className='bg-[#2b2b2b]' value='exr'>
                  EXR
                </option>
                <option className='bg-[#2b2b2b]' value='svg'>
                  SVG
                </option>
                <option className='bg-[#2b2b2b]' value='tga'>
                  TGA
                </option>
                <option className='bg-[#2b2b2b]' value='tiff'>
                  TIFF
                </option>
                <option className='bg-[#2b2b2b]' value='wbmp'>
                  WBMP
                </option>
              </select>
              {errorMessage && (
                <Text color='red.500' mb={4}>
                  {errorMessage}
                </Text>
              )}
              <button
                onClick={handleConvertImage}
                className='w-full px-4 mt-5 py-2 text-white bg-sky-500 rounded-md hover:bg-sky-600 transition'
              >
                Convert
              </button>
            </Box>
          )}
        </div>
      </VStack>
    </Box>
  );
}

export default ImageConverter;
