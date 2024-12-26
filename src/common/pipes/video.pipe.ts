import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class VideoPipe implements PipeTransform {
  constructor() {}

  async transform(value: any) {
    if (!value) return;

    cloudinary.config({
      cloud_name: process.env.CLOUDNAIRY_CLOUD_NAME,
      api_key: process.env.CLOUDNAIRY_CLOUD_KEY,
      api_secret: process.env.CLOUDNAIRY_CLOUD_SECRET,
    });

    const files = Array.isArray(value) ? value : [value];

    const videoUrls = await Promise.all(
      files.map(async (file) => {
        const videoBuffer = file.buffer.slice(0, 8);
        const magicNumber = Array.from(new Uint8Array(videoBuffer))
          .map((byte) => byte.toString(16).padStart(2, '0'))
          .join(' ');

        const validMagicNumbers = [
          '30 26 b2 75 8e 66 cf 11',
          '00 00 00 18 66 74 79 70',
        ];

        if (!validMagicNumbers.includes(magicNumber)) {
          throw new BadRequestException('Valid video types are .mp4 and .wmv');
        }

        const b64 = Buffer.from(file.buffer).toString('base64');
        const dataUrl = `data:video/mp4;base64,${b64}`;

        const video = await cloudinary.uploader.upload(dataUrl, {
          resource_type: 'video',
        });

        return cloudinary.url(video.public_id, {
          resource_type: 'video',
          type: 'upload',
          transformation: [{ quality: 'auto' }, { format: 'mp4' }],
        });
      }),
    );

    return videoUrls;
  }
}
