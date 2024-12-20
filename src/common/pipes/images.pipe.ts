import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
    console.log(files);
    const imageUrls = await Promise.all(
      files.map(async (file) => {
        const imageBuffer = file.buffer.slice(0, 8);
        const magicNumber = Array.from(new Uint8Array(imageBuffer))
          .map((byte) => byte.toString(16).padStart(2, '0'))
          .join(' ');
        if (
          magicNumber === '30 26 b2 75 8e 66 cf 11' ||
          magicNumber === '00 00 00 18 66 74 79 70' ||
          magicNumber === '30 26 b2 75 8e 66 cf 11 a6 d9'
        ) {
          const b64 = Buffer.from(file.buffer).toString('base64');
          const dataUrl = `data:image/jpeg;base64,${b64}`;

          const img = await cloudinary.uploader.upload(dataUrl, {
            resource_type: 'video',
          });
          return img.url;
        }

        throw new BadRequestException('Valid image types are .png and .jpeg');
      }),
    );

    return imageUrls;
  }
}
