import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('certificate')
  @Render('certificate')
  getCertificate() {
    return {
      firstName: 'alaa',
      couseId: '123',
      studenId: '4000',
      duration: 5,
      earnedAt: 25 - 5 - 5252,
    };
  }
}
