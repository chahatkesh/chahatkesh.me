import { ImageResponse } from 'next/og';
import config from '~/config';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          color: '#fff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            marginBottom: 20,
            color: '#fff',
          }}
        >
          {config.appName}
        </div>
        <div
          style={{
            fontSize: 36,
            marginBottom: 20,
            color: '#888',
          }}
        >
          {config.appDesignation}
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#aaa',
            textAlign: 'center',
            maxWidth: '80%',
          }}
        >
          {config.seo.defaultDescription}
        </div>
      </div>
    ),
    size,
  );
}
