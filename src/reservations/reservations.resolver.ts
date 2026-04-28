import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReservationsService } from './reservations.service';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationInput } from './dto/create-reservation.input';

/**
 * Resolver for handling GraphQL operations related to Reservations.
 */
@Resolver(() => Reservation)
export class ReservationsResolver {
  constructor(private readonly reservationsService: ReservationsService) { }

  /**
   * (a) Mutation to create a new reservation.
   * Validates book availability and user limits.
   */
  @Mutation(() => Reservation, { name: 'createReservation' })
  createReservation(
    @Args('createReservationInput') createReservationInput: CreateReservationInput,
  ) {
    return this.reservationsService.create(createReservationInput);
  }

  /**
   * (b) Query to get all reservations for a specific book.
   * Useful for seeing the borrowing history of a book.
   */
  @Query(() => [Reservation], { name: 'reservationsByBook' })
  findByBook(@Args('bookId', { type: () => Int }) bookId: number) {
    return this.reservationsService.findByBookId(bookId);
  }

  /**
   * (c) Query to get all reservations for a specific user.
   * Useful for the user's "My Profile" or "My Loans" section.
   */
  @Query(() => [Reservation], { name: 'reservationsByUser' })
  findByUser(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('startDate', { type: () => Date, nullable: true }) startDate?: Date,
    @Args('endDate', { type: () => Date, nullable: true }) endDate?: Date,
  ) {
    return this.reservationsService.findByUserId(userId, startDate, endDate);
  }

  @Query(() => [Reservation], { name: 'bookReservations' })
  bookReservations(
    @Args('bookId', { type: () => Int }) bookId: number,
    @Args('startDate', { type: () => Date, nullable: true }) startDate?: Date,
    @Args('endDate', { type: () => Date, nullable: true }) endDate?: Date,
  ) {
    return this.reservationsService.findByBook(bookId, startDate, endDate);
  }


  /**
   * (d) Mutation to return a book.
   * Updates returnedAt and sets book isAvailable to true.
   */
  @Mutation(() => Reservation, { name: 'returnBook' })
  returnBook(@Args('id', { type: () => Int }) id: number) {
    return this.reservationsService.returnBook(id);
  }


}