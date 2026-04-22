import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsService } from './reservations.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ReservationsService', () => {
  let service: ReservationsService;

  const mockPrismaService = {
    book: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
    },
    reservation: {
      count: jest.fn(),
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
    },
    // Simulación de transacciones interactivas de Prisma
    $transaction: jest.fn((callback) => callback(mockPrismaService)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ReservationsService>(ReservationsService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    const createDto = { 
      userId: 1, 
      bookId: 10, 
      dateDevolucion: new Date() 
    };

    it('should throw BadRequestException if book is not available (Rule #2)', async () => {
      mockPrismaService.book.findUnique.mockResolvedValue({ id: 10, isAvailable: false });

      await expect(service.create(createDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if user has 3 active reservations (Rule #4)', async () => {
      mockPrismaService.book.findUnique.mockResolvedValue({ id: 10, isAvailable: true });
      mockPrismaService.user.findUnique.mockResolvedValue({ id: 1 });
      mockPrismaService.reservation.count.mockResolvedValue(3); // Límite alcanzado

      await expect(service.create(createDto)).rejects.toThrow(BadRequestException);
    });

    it('should create reservation and update book status successfully', async () => {
      mockPrismaService.book.findUnique.mockResolvedValue({ id: 10, isAvailable: true });
      mockPrismaService.user.findUnique.mockResolvedValue({ id: 1 });
      mockPrismaService.reservation.count.mockResolvedValue(1); 
      
      const expectedReservation = { 
        id: 50, 
        ...createDto,
        book: { id: 10, title: 'Test Book' },
        user: { id: 1, name: 'Santiago' }
      };
      
      mockPrismaService.reservation.create.mockResolvedValue(expectedReservation);

      const result = await service.create(createDto);

      expect(result).toEqual(expectedReservation);
      expect(mockPrismaService.$transaction).toHaveBeenCalled();
      expect(mockPrismaService.book.update).toHaveBeenCalledWith({
        where: { id: 10 },
        data: { isAvailable: false },
      });
    });
  });

  describe('findByUserId (with Date Filter - Rule #5)', () => {
    it('should return filtered reservations for a user', async () => {
      const userId = 1;
      const startDate = new Date('2026-04-01');
      const endDate = new Date('2026-04-30');
      
      const mockReserves = [
        { id: 1, userId, bookId: 10, dateReservation: new Date('2026-04-10'), book: { title: 'Book 1' } }
      ];
      mockPrismaService.reservation.findMany.mockResolvedValue(mockReserves);

      const result = await service.findByUserId(userId, startDate, endDate);

      expect(result).toEqual(mockReserves);
      expect(mockPrismaService.reservation.findMany).toHaveBeenCalledWith({
        where: {
          userId,
          dateReservation: {
            gte: startDate,
            lte: endDate,
          },
        },
        include: { book: true },
        orderBy: { dateReservation: 'desc' }
      });
    });
  });

  describe('findByBookId (with Date Filter - Rule #5)', () => {
    it('should return filtered reservations for a book', async () => {
      const bookId = 10;
      const startDate = new Date('2026-01-01');
      const endDate = new Date('2026-12-31');
      
      mockPrismaService.reservation.findMany.mockResolvedValue([]);

      await service.findByBookId(bookId, startDate, endDate);

      expect(mockPrismaService.reservation.findMany).toHaveBeenCalledWith({
        where: {
          bookId,
          dateReservation: {
            gte: startDate,
            lte: endDate,
          },
        },
        include: { user: true },
        orderBy: { dateReservation: 'desc' }
      });
    });
  });

  describe('returnBook (Rule #3)', () => {
    it('should mark reservation as returned and free the book', async () => {
      const existingReservation = { id: 1, bookId: 10, returnedAt: null };
      mockPrismaService.reservation.findUnique.mockResolvedValue(existingReservation);
      mockPrismaService.reservation.update.mockResolvedValue({ ...existingReservation, returnedAt: new Date() });

      await service.returnBook(1);

      expect(mockPrismaService.reservation.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: expect.objectContaining({ returnedAt: expect.any(Date) }),
      });
      expect(mockPrismaService.book.update).toHaveBeenCalledWith({
        where: { id: 10 },
        data: { isAvailable: true },
      });
    });

    it('should throw BadRequestException if book was already returned', async () => {
      mockPrismaService.reservation.findUnique.mockResolvedValue({ 
        id: 1, 
        returnedAt: new Date() 
      });

      await expect(service.returnBook(1)).rejects.toThrow(BadRequestException);
    });
  });
});