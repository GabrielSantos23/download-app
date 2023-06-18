import { NextRequest, NextResponse } from 'next/server';
import { TwitterApi } from 'twitter-api-v2';

export async function POST(request: NextRequest) {
  try {
    const { tweetUrl } = await request.json();

    // Extrair o ID do tweet do URL
    const tweetId = tweetUrl.split('/').pop();

    // Criar uma instância do TwitterApi com suas credenciais
    const client = new TwitterApi({
      appKey: apikey,
      appSecret: keySecret,
      accessToken: '1013962092066562049-2SQp1r9Eyd4TnTGsZEwAWWQUUg68pt',
      accessSecret: '0Nic8cJmiBJ5qhZ1ZBNHXDInCMHCvT150BAc5lNnejKvz',
    });

    // Obter informações do tweet
    const tweet = await client.v2.tweet(tweetId);

    // Verificar se o tweet contém um vídeo
    if (tweet.data.attachments && tweet.data.attachments.media_keys) {
      const mediaKey = tweet.data.attachments.media_keys[0];

      // Obter informações do vídeo
      const media = await client.v2.media(mediaKey);

      // Obter o URL do vídeo
      const videoUrl = media.data.url;

      // Redirecionar o usuário para o URL do vídeo
      return NextResponse.redirect(videoUrl);
    } else {
      return new Response('O tweet não contém um vídeo.', { status: 404 });
    }
  } catch (error) {
    console.error('Erro ao baixar o vídeo do Twitter:', error);
    return new Response('Ocorreu um erro ao baixar o vídeo do Twitter.', {
      status: 500,
    });
  }
}
