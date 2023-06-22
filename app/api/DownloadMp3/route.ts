import { NextRequest, NextResponse } from 'next/server';
import ytdl from 'ytdl-core';
import streamToArray from 'stream-to-array';

export async function GET(request: NextRequest) {
  try {
    const videoUrl = new URL(
      request.nextUrl,
      'http://dummy.com'
    ).searchParams.get('videoUrl');

    if (videoUrl === null) {
      return new Response('Invalid video URL', { status: 400 });
    }

    const info: any = await ytdl.getInfo(videoUrl);

    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
    const selectedFormat = audioFormats[0];
    if (!selectedFormat) {
      return new Response('No audio format available', { status: 400 });
    }

    const audioStream = ytdl(videoUrl, { format: selectedFormat });

    const arrayBuffer = await streamToArray(audioStream);
    const byteArray = new Uint8Array(Buffer.concat(arrayBuffer));

    const headers = {
      'Content-Disposition': `attachment; filename="${info.title}.mp3"`,
      'Content-Type': 'audio/mpeg',
    };

    return new Response(byteArray, { headers });
  } catch (error) {
    console.error('Error:', error);
    return new Response(`An error occurred ${error}`, { status: 500 });
  }
}
