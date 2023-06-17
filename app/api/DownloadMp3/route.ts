import { NextRequest, NextResponse } from 'next/server';
import ytdl from 'ytdl-core';

export async function GET(request: NextRequest) {
  try {
    const videoUrl = new URL(
      request.nextUrl,
      'http://dummy.com'
    ).searchParams.get('videoUrl');

    const info = await ytdl.getInfo(videoUrl);

    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
    const selectedFormat = audioFormats[0]; // Seleciona o primeiro formato de áudio disponível
    if (!selectedFormat) {
      return new Response('No audio format available', { status: 400 });
    }

    const audioStream = ytdl(videoUrl, { format: selectedFormat });

    const headers = {
      'Content-Disposition': `attachment; filename="${info.title}.mp3"`,
      'Content-Type': 'audio/mpeg',
    };

    return new Response(audioStream, { headers });
  } catch (error) {
    console.error('Error:', error);
    return new Response(`An error occurred ${error}`, { status: 500 });
  }
}
