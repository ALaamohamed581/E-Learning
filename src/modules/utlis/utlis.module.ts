import { DynamicModule, Module } from '@nestjs/common';
import { JWTAuthService } from './JWTAuthServicer.service';
import { Email } from './Email.service';
import { JwtService } from '@nestjs/jwt';

@Module({})
export class UtlisModule {
  static forRoot(): DynamicModule {
    return {
      module: UtlisModule,
      providers: [JWTAuthService, Email, JwtService],
      exports: [JWTAuthService, JwtService, Email],
      global: true,
    };
  }
}
