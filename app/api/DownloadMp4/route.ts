import { NextRequest, NextResponse } from 'next/server';
import ytdl from 'ytdl-core';
import toArray from 'stream-to-array';

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

    const formatsWithAudioAndVideo = info.formats.filter(
      (format:any) => format.hasAudio && format.hasVideo && format.qualityLabel
    );

    if (formatsWithAudioAndVideo.length === 0) {
      return new Response('No format with audio and video found', {
        status: 400,
      });
    }

    const selectedFormat = formatsWithAudioAndVideo[0];

    const videoStream = ytdl(videoUrl, { format: selectedFormat });

    const chunks = await toArray(videoStream);
    const byteArray = new Uint8Array(Buffer.concat(chunks));
    const readableStream = new ReadableStream({
      start(controller) {
        controller.enqueue(byteArray);
        controller.close();
      },
    });

    const headers = {
      'Content-Disposition': `attachment; filename="${info.title}.mp4"`,
      'Content-Type': 'video/mp4',
    };

    return new Response(readableStream, { headers });
  } catch (error) {
    console.error('Error:', error);
    return new Response(`An error occurred ${error}`, { status: 500 });
  }
}
