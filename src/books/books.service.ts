import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { PrismaService } from '../prisma/prisma.service';

/**
 * Service responsible for managing book-related business logic.
 * Interacts with the database using PrismaService.
 */
@Injectable()
export class BooksService {
  constructor(private readonly prismaService: PrismaService) { }

  /**
   * Creates a new book record in the database.
   * @param createBookInput - Data required to create a new book.
   * @returns The newly created book record.
   */
  async create(createBookInput: CreateBookInput) {
    return this.prismaService.book.create({
      data: createBookInput
    });
  }

  /**
   * Retrieves all books currently stored in the system.
   * @returns A list of book entities.
   */
  async findAll() {
    return this.prismaService.book.findMany({
      include: {
        reserves: {
          include: { user: true }
        }
      }
    });
  }

  /**
   * Finds a specific book by its unique identifier.
   * @param id - The numeric ID of the book.
   * @returns The found book entity.
   * @throws NotFoundException if no book is found with the given ID.
   */
  // src/books/books.service.ts

  async findOne(id: number) {
    const book = await this.prismaService.book.findUnique({
      where: { id },
      include: {
        reserves: {
          orderBy: { dateReservation: 'desc' },
          include: { user: true }
        }
      }
    });
    if (!book) throw new NotFoundException(`Book with ID ${id} not found`);
    return book;
  }

  /**
   * Updates an existing book's information.
   * @param id - The ID of the book to update.
   * @param updateBookInput - Partial data to be updated.
   * @returns The updated book record.
   */
  async update(id: number, updateBookInput: UpdateBookInput) {
    // We call findOne first to ensure the record exists before updating
    await this.findOne(id);

    return this.prismaService.book.update({
      where: { id },
      data: updateBookInput,
    });
  }

  /**
   * Permanently removes a book from the system.
   * @param id - The ID of the book to delete.
   * @returns The deleted book record.
   */
  async remove(id: number) {
    await this.findOne(id);

    return this.prismaService.book.delete({
      where: { id }
    });
  }
}