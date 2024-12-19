// import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { v2 as cloudinary } from 'cloudinary';

// @Injectable()
// export class ImagesPipe implements PipeTransform {
//   constructor() {}

//   async transform(value: any) {
//     if (!value) return;
//     const config = new ConfigService();
//     cloudinary.config(config.get('cloudinary.config'));
//     const files = Array.isArray(value) ? value : [value];

//     const imageUrls = await Promise.all(
//       files.map(async (file) => {
//         const imageBuffer = file.buffer.slice(0, 8);
//         const magicNumber = Array.from(new Uint8Array(imageBuffer))
//           .map((byte) => byte.toString(16).padStart(2, '0'))
//           .join(' ');

//         if (
//           magicNumber === '89 50 4e 47 0d 0a 1a 0a' ||
//           magicNumber.startsWith('ff d8 ff')
//         ) {
//           const b64 = Buffer.from(file.buffer).toString('base64');
//           const dataUrl = `data:image/jpeg;base64,${b64}`;

//           const img = await cloudinary.uploader.upload(dataUrl);
//           return img.url;
//         }

//         throw new BadRequestException('Valid image types are .png and .jpeg');
//       }),
//     );

//     return imageUrls;
//   }
// }
