import { NextRequest, NextResponse } from 'next/server';
import ytdl from 'ytdl-core';

export async function GET(request: NextRequest) {
  try {
    const videoUrlParam = new URL(
      request.nextUrl,
      'http://dummy.com'
    ).searchParams.get('url');

    if (!videoUrlParam) {
      return new Response('Invalid video URL', { status: 400 });
    }

    const info = await ytdl.getInfo(videoUrlParam);

    if (!info || !info.formats) {
      return new Response('Failed to fetch video information', { status: 500 });
    }

    const availableFormats = info.formats;
    const qualities = availableFormats
      .filter((format) => format.hasAudio && format.hasVideo && format.url)
      .map((format) => format.qualityLabel);

    if (qualities.length === 0) {
      return new Response('No format with audio and video found', {
        status: 400,
      });
    }

    return new NextResponse(JSON.stringify({ qualities }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(`An error occurred ${error}`, { status: 500 });
  }
}
