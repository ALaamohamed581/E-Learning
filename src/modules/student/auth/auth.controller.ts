import { Controller, Post, Body, Req } from '@nestjs/common';

import { CreateStudentDto } from '../dto/create-student.dto';
import { AuthService } from './auth.service';

@Controller('students/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() createUserDto: CreateStudentDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('/signin')
  async signIn(
    @Body() { email, password }: Partial<CreateStudentDto>,

    @Req() req: Request,
  ) {
    const user = await this.authService.signIn(email, password);
    // req.payload = user;

    return user;
  }

  // @Post('/signout')
  // async signOut(@Res() res: Response) {
  //   return res
  //     .cookie('refCookie', '', {
  //       maxAge: 0,
  //       secure: true,
  //       httpOnly: true,
  //       signed: true,
  //     })
  //     .cookie('authCookie', '', {
  //       maxAge: 0,
  //       secure: true,
  //       httpOnly: true,
  //       signed: true,
  //     })
  //     .status(200)
  //     .json({ message: 'Sign-out successful' });
  // }

  // @UseGuards(RefrshGuradGuard('user'))
  // @Get('acces-token')
  // @ApiCookieAuth('refCookie')
  // @UseInterceptors(accessToken({ role: 'user' }))
  // async getAccessToken(@Req() request: Request, @Res() res: Response) {
  //   const id = request.payload._id as string;
  //   res.send(this.authService.getAuyhToken(id));
  // }
}
