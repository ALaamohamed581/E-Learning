import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PrismaService } from '../global/prisma.service';

describe('AdminController', () => {
  let controller: AdminController;
  let mockAdminSerci = {
    findOne: jest.fn((num) => ({
      num: 1,
      name: 'alaa',
      email: 'admin@admin.com',
      sessionId: '3534tsdgsdgsg',
      role: 'ADMIN',
      createdAt: '12-12-2020',
      updatedAt: '12-12-2020',
    })),
    findAll: jest.fn(() => [
      {
        num: 1,
        name: 'alaa',
        email: 'admin@admin.com',
        sessionId: '3534tsdgsdgsg',
        role: 'ADMIN',
        createdAt: '12-12-2020',
        updatedAt: '12-12-2020',
      },
    ]),
    remove: jest.fn((num) => null),
    update: jest.fn((num, dto) => {
      return {
        id: num,
        name: dto.name,
        email: dto.email,

        role: dto.role,
        createdAt: '12-12-2024',
        updatedAt: Date.now(),
      };
    }),
  };
  let mockPrismaService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [AdminService, PrismaService],
    })
      .overrideProvider(AdminService) // mock provider
      .useValue(mockAdminSerci)
      .overrideProvider(mockPrismaService)
      .useValue(mockPrismaService)
      .compile();

    controller = module.get<AdminController>(AdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('shoid retrive an admin', () => {
    expect(controller.findOne('1')).toEqual({
      num: 1,
      name: 'alaa',
      email: 'admin@admin.com',
      sessionId: '3534tsdgsdgsg',
      role: 'ADMIN',
      createdAt: '12-12-2020',
      updatedAt: '12-12-2020',
    });
  });
  it('shoid retrive an array of  admins', () => {
    expect(controller.findAll()).toEqual([
      {
        num: 1,
        name: 'alaa',
        email: 'admin@admin.com',
        sessionId: '3534tsdgsdgsg',
        role: 'ADMIN',
        createdAt: '12-12-2020',
        updatedAt: '12-12-2020',
      },
    ]);
  });
  it('shoid retrive an remove anadmin', () => {
    expect(controller.remove('1')).toEqual(null);
  });
  it('shoid retrive an update an admin', () => {
    expect(
      controller.update('1', {
        name: 'asd',
        email: 'asd',

        role: 'ADMIN',
      }),
    ).toEqual({
      id: 1,
      name: 'asd',
      email: 'asd',

      role: 'ADMIN',
      createdAt: '12-12-2024',
      updatedAt: Date.now(),
    });
  });
});
