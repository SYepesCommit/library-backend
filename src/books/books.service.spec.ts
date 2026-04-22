import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { PrismaService } from '../prisma/prisma.service';

describe('BooksService', () => {
  let service: BooksService;
  
  const mockPrismaService = {
    book: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const booksArray = [
        { id: 1, title: 'Book 1', author: 'A1', gender: 'G1', isAvailable: true, reserves: [] },
        { id: 2, title: 'Book 2', author: 'A2', gender: 'G2', isAvailable: false, reserves: [] },
      ];

      mockPrismaService.book.findMany.mockResolvedValue(booksArray);

      const result = await service.findAll();

      expect(result).toEqual(booksArray);
      expect(mockPrismaService.book.findMany).toHaveBeenCalledWith({
        include: {
          reserves: {
            include: { user: true }
          }
        }
      });
    });
  });

  describe('findOne', () => {
    it('should return a single book by id with its history', async () => {
      const book = { 
        id: 1, 
        title: 'Test Book', 
        author: 'Author', 
        gender: 'G1', 
        isAvailable: true,
        reserves: [] 
      };
      mockPrismaService.book.findUnique.mockResolvedValue(book);

      const result = await service.findOne(1);

      expect(result).toEqual(book);
      expect(mockPrismaService.book.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          reserves: {
            orderBy: { dateReservation: 'desc' },
            include: { user: true }
          }
        }
      });
    });
  });

  describe('remove', () => {
    it('should delete a book successfully', async () => {
      const bookToDelete = { id: 1, title: 'Deleted' };
      
      mockPrismaService.book.findUnique.mockResolvedValue(bookToDelete);
      mockPrismaService.book.delete.mockResolvedValue(bookToDelete);

      const result = await service.remove(1);

      expect(result).toEqual(bookToDelete);
      expect(mockPrismaService.book.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});