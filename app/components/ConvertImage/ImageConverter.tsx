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
      <VStack spacing={4} maxW='md' mx='auto'>
        <Heading size='xl' fontWeight='bold' color='gray.800'>
          Image Converter
        </Heading>
        <Text color='gray.600'>
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
              bg='white'
              border='2px dashed'
              borderColor='gray.300'
              rounded='lg'
            >
              <input {...getInputProps()} />
              <Text color='gray.500' textAlign='center' cursor='pointer'>
                Drag and drop an image here or click to upload.
              </Text>
            </Box>
          )}
        </Dropzone>
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
            <Text mb={2} color='gray.700'>
              Select the conversion format:
            </Text>
            <Select
              value={selectedFormat}
              onChange={handleFormatChange}
              bg='white'
              borderColor='gray.300'
              borderWidth='1px'
              rounded='md'
              p={2}
              mb={4}
            >
              <option value=''>Select a format</option>
              <option value='jpeg'>JPEG</option>
              <option value='png'>PNG</option>
              <option value='gif'>GIF</option>
              <option value='bmp'>BMP</option>
              <option value='webp'>WebP</option>
              <option value='ico'>ICO</option>
              <option value='eps'>EPS</option>
              <option value='exr'>EXR</option>
              <option value='svg'>SVG</option>
              <option value='tga'>TGA</option>
              <option value='tiff'>TIFF</option>
              <option value='wbmp'>WBMP</option>
            </Select>
            {errorMessage && (
              <Text color='red.500' mb={4}>
                {errorMessage}
              </Text>
            )}
            <button
              onClick={handleConvertImage}
              className='w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 transition'
            >
              Convert
            </button>
          </Box>
        )}
      </VStack>
    </Box>
  );
}

export default ImageConverter;
