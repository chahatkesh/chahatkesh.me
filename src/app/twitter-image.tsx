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
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#000',
          color: '#fff',
          fontFamily: 'sans-serif',
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 'bold',
              marginBottom: 16,
              background: 'linear-gradient(90deg, #1DA1F2 0%, #0E71A8 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {config.appName}
          </div>
          <div
            style={{
              fontSize: 32,
              marginBottom: 16,
              color: '#888',
            }}
          >
            {config.appDesignation}
          </div>
          <div
            style={{
              fontSize: 22,
              color: '#aaa',
              lineHeight: 1.4,
              maxWidth: '90%',
            }}
          >
            {config.appDescription.substring(0, 100)}...
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 240,
            height: 240,
            borderRadius: '50%',
            backgroundColor: '#111',
            border: '3px solid #1DA1F2',
            fontSize: 100,
          }}
        >
          👨‍💻
        </div>
      </div>
    ),
    size,
  );
}
