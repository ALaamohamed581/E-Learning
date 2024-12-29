import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('certificate')
  @Render('certificate')
  getCertificate() {
    return 'Hello World!';
  }
}
