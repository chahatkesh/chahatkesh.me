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
              fontSize: 72,
              fontWeight: 'bold',
              marginBottom: 20,
              background: 'linear-gradient(90deg, #fff 0%, #ccc 100%)',
              backgroundClip: 'text',
              color: 'transparent',
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
              lineHeight: 1.4,
              maxWidth: '90%',
            }}
          >
            {config.appDescription.substring(0, 120)}...
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 280,
            height: 280,
            borderRadius: '50%',
            backgroundColor: '#111',
            border: '4px solid #333',
            fontSize: 120,
          }}
        >
          👨‍💻
        </div>
      </div>
    ),
    size,
  );
}
