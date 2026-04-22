import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { ReservationsService } from '../reservations/reservations.service';
import { BooksService } from '../books/books.service';

describe('UsersService', () => {
  let service: UsersService;

  const mockPrismaService = {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  const mockReservationsService = {}; 
  const mockBooksService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: ReservationsService,
          useValue: mockReservationsService,
        },
        {
          provide: BooksService,
          useValue: mockBooksService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of users with reserves', async () => {
      const usersArray = [
        {
          id: 1,
          name: 'User 1',
          email: 'u1@test.com',
          reserves: []
        },
        {
          id: 2,
          name: 'User 2',
          email: 'u2@test.com',
          reserves: []
        },
      ];

      mockPrismaService.user.findMany.mockResolvedValue(usersArray);

      const result = await service.findAll();

      expect(result).toEqual(usersArray);

      expect(mockPrismaService.user.findMany).toHaveBeenCalledWith({
        include: {
          reserves: {
            where: { returnedAt: null },
            include: { book: true },
          },
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a user if found with its relations', async () => {
      const user = {
        id: 1,
        name: 'User 1',
        email: 'u1@test.com',
        reserves: []
      };

      mockPrismaService.user.findUnique.mockResolvedValue(user);

      const result = await service.findOne(1);

      expect(result).toEqual(user);
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          reserves: {
            include: { book: true },
          },
        },
      });
    });

    it('should throw NotFoundException if user does not exist', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });
});