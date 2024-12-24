import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  UseInterceptors,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';

import { URLSearchParams } from 'url';
import axios from 'axios';
import { CreateStudentDto } from '../student/dto/create-student.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { SignIn } from 'src/common/Interceptores/signinInterceptor/signin.intecptor';
import { CreateTeacherDto } from 'src/modules/teacher/dto/create-teacher.dto';
import { RefrshGuradGuard } from 'src/common/gurds/refreshGuard.guard/refrshGurad.guard';
import { ApiCookieAuth } from '@nestjs/swagger';
import { AccessRokenInterceptor } from 'src/common/Interceptores/access-roken/access-roken.interceptor';
import { EntityInterCetor } from 'src/common/Interceptores/validation/valdiation.interceptor';

//
@Controller(':entity/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/google')
  Goggle(@Req() req: Request, @Res() res: Response) {
    const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
    const REDIRECT_URI =
      'http://localhost:8000/api/v1/students/auth/google/callback';
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.OAUTH_CLIENT_ID}&redirect_uri=${REDIRECT_URI}k&response_type=code&scope=profile email`;
    res.redirect(url);
  }
  @Get('/google/callback')
  async callback(@Req() req: Request, @Res() res: Response) {
    const code = req.query.code as string;
    const CLIENT_ID = process.env.OAUTH_CLIENT_ID;
    const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
    const REDIRECT_URI =
      'http://localhost:8000/api/v1/students/auth/google/callback';

    try {
      // Exchange authorization code for access token
      const { data } = await axios.post('https://oauth2.googleapis.com/token', {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      });

      const { access_token } = data;

      // Use access_token to fetch user profile
      const { data: profile } = await axios.get(
        'https://www.googleapis.com/oauth2/v1/userinfo',
        {
          headers: { Authorization: `Bearer ${access_token}` },
        },
      );

      // Code to handle user authentication and retrieval using the profile data

      res.redirect('http://localhost:8000/api/v1');
    } catch (error) {
      console.error('Error:', error.message);
      res.redirect('/api/v1/students/auth/signin');
    }
  }

  @Post('/signup')
  @UseInterceptors(EntityInterCetor)
  signUp(
    @Body() model: CreateStudentDto | CreateTeacherDto,
    @Param('entity') entity: 'student' | 'teacher',
  ) {
    return this.authService.signUp({ entity, model });
  }

  @UseInterceptors(SignIn({ role: 'student' }))
  @Post('/signin')
  async signIn(
    @Param('entity') entity: 'student' | 'teacher',
    @Body() { email, password }: Partial<CreateStudentDto>,

    @Req() req: Request,
  ) {
    const user = await this.authService.signIn(email, password, entity);
    req.payload = user;

    return 'succes';
  }

  @Post('/signout')
  async signOut(@Res() res: Response) {
    return res
      .cookie('refCookie', '', {
        maxAge: 0,
        secure: true,
        httpOnly: true,
        signed: true,
      })
      .cookie('authCookie', '', {
        maxAge: 0,
        secure: true,
        httpOnly: true,
        signed: true,
      })
      .status(200)
      .json({ message: 'Sign-out successful' });
  }

  @UseGuards(RefrshGuradGuard('user'))
  @UseInterceptors(AccessRokenInterceptor)
  @Get('acces-token')
  async getAccessToken(
    @Req() request: Request,

    @Param('entity') entity: 'student' | 'teacher',
  ) {
    const { userId } = request;
    request.payload = this.authService.getAuyhToken(userId, entity) as any;
    return 'succes';
  }
}
function typeOf(model: CreateStudentDto | CreateTeacherDto): any {
  throw new Error('Function not implemented.');
}
