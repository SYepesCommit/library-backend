import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationInput } from './dto/create-reservation.input';

/**
 * Service for handling library reservations and business rules.
 */
@Injectable()
export class ReservationsService {
  constructor(private readonly prisma: PrismaService) { }

  /**
   * (a) Create a new reservation with business logic validation.
   */
  async create(createReservationInput: CreateReservationInput) {
    const { userId, bookId, dateDevolucion } = createReservationInput;

    const book = await this.prisma.book.findUnique({ where: { id: bookId } });
    if (!book) throw new NotFoundException('Book not found');
    if (!book.isAvailable) {
      throw new BadRequestException('The book is currently not available for reservation');
    }

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const activeReservationsCount = await this.prisma.reservation.count({
      where: { userId, returnedAt: null },
    });

    if (activeReservationsCount >= 3) {
      throw new BadRequestException('El usuario ya ha alcanzado el límite de 3 reservas activas.');
    }

    return this.prisma.$transaction(async (tx) => {
      const reservation = await tx.reservation.create({
        data: {
          userId,
          bookId,
          dateDevolucion,
        },
        include: { book: true, user: true }
      });

      await tx.book.update({
        where: { id: bookId },
        data: { isAvailable: false },
      });

      return reservation;
    });
  }

  /**
   * (b) Consult reservations for a specific book.
   */
  async findByBookId(bookId: number, startDate?: Date, endDate?: Date) {
    return this.prisma.reservation.findMany({
      where: {
        bookId,
        dateReservation: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: { user: true },
      orderBy: { dateReservation: 'desc' },
    });
  }

  /**
   * (c) Consult reservations for a specific user.
   */
  async findByUserId(userId: number, startDate?: Date, endDate?: Date) {
    return this.prisma.reservation.findMany({
      where: {
        userId,
        dateReservation: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: { book: true },
      orderBy: { dateReservation: 'desc' },
    });
  }

  /**
   * (d) Return book: Marks the reservation as finished and frees the book.
   */
// library-backend/src/reservations/reservations.service.ts

async returnBook(reservationId: number) {
  const reservation = await this.prisma.reservation.findUnique({
    where: { id: reservationId },
  });

  if (!reservation) throw new NotFoundException('Reservation not found');
  if (reservation.returnedAt) {
    throw new BadRequestException('This book has already been returned');
  }

  return this.prisma.$transaction(async (tx) => {
    const updatedReservation = await tx.reservation.update({
      where: { id: reservationId },
      data: { returnedAt: new Date() },
      include: {
        book: true,
        user: true,
      },
    });

    await tx.book.update({
      where: { id: reservation.bookId },
      data: { isAvailable: true },
    });

    return updatedReservation;
  });
}
}