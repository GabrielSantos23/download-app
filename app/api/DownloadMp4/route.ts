import { NextRequest, NextResponse } from 'next/server';
import ytdl from 'ytdl-core';

export async function GET(request: NextRequest) {
  try {
    const videoUrl = new URL(
      request.nextUrl,
      'http://dummy.com'
    ).searchParams.get('videoUrl');

    const info = await ytdl.getInfo(videoUrl);

    const formatsWithAudioAndVideo = info.formats.filter(
      (format) => format.hasAudio && format.hasVideo && format.qualityLabel
    );

    if (formatsWithAudioAndVideo.length === 0) {
      return new Response('No format with audio and video found', {
        status: 400,
      });
    }

    const selectedFormat = formatsWithAudioAndVideo[0];

    const videoStream = ytdl(videoUrl, { format: selectedFormat });

    const headers = {
      'Content-Disposition': `attachment; filename="${info.title}.mp4"`,
      'Content-Type': 'video/mp4',
    };

    return new Response(videoStream, { headers });
  } catch (error) {
    console.error('Error:', error);
    return new Response(`An error occurred ${error}`, { status: 500 });
  }
}
