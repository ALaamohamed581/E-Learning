import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { PrismaService } from '../global/prisma.service';
import { JWTAuthService } from '../utlis/JWTAuthServicer.service';
import { UtlisModule } from '../utlis/utlis.module';
import { JwtService } from '@nestjs/jwt';

describe('PermissionsController', () => {
  let controller: PermissionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionsController],
      imports: [UtlisModule],
      providers: [
        PermissionsService,
        PrismaService,
        JWTAuthService,
        JwtService,
      ],
    }).compile();

    controller = module.get<PermissionsController>(PermissionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
