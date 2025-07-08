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
          padding: '40px',
        }}
      >
        <div
          style={{
            fontSize: 60,
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: 'center',
          }}
        >
          {config.appName}
        </div>
        <div
          style={{
            fontSize: 36,
            textAlign: 'center',
            marginBottom: 40,
          }}
        >
          {config.appDesignation}
        </div>
        <div
          style={{
            fontSize: 24,
            textAlign: 'center',
            color: '#ccc',
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
