import { ImageResponse } from 'next/og';
import { promises as fs } from 'fs';
import path from 'path';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export default async function Icon() {
  const imagePath = path.join(process.cwd(), 'public', 'logo.png');
  const imageData = await fs.readFile(imagePath);
  const imageBase64 = imageData.toString('base64');
  const imgSrc = `data:image/png;base64,${imageBase64}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img 
          src={imgSrc} 
          alt="TradeX Logo" 
          width={28} 
          height={28} 
          style={{ objectFit: 'contain' }}
        />
      </div>
    ),
    { ...size }
  );
}