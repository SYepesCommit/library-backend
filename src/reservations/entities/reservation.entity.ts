import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Book } from '../../books/entities/book.entity';

/**
 * Represents a Reservation record in the library system.
 */
@ObjectType()
export class Reservation {
  /**
   * Unique identifier for the reservation.
   */
  @Field(() => Int, { description: 'The unique ID of the reservation' })
  id!: number;

  /**
   * The user who made the reservation.
   */
  @Field(() => User, { description: 'The user associated with this reservation' })
  user!: User;

  /**
   * Foreign key for the user.
   */
  @Field(() => Int)
  userId!: number;

  /**
   * The book being reserved.
   */
  @Field(() => Book, { description: 'The book associated with this reservation' })
  book!: Book;

  /**
   * Foreign key for the book.
   */
  @Field(() => Int)
  bookId!: number;

  /**
   * Date when the reservation was initially made.
   */
  @Field(() => Date, { description: 'The date when the book was borrowed' })
  dateReservation!: Date;

  /**
   * Expected date for the book to be returned.
   */
  @Field(() => Date, { description: 'The deadline for returning the book' })
  dateDevolucion!: Date;

  /**
   * The actual date when the book was returned. 
   * If null, the book is still with the user.
   */
  @Field(() => Date, { 
    description: 'The actual date of return', 
    nullable: true 
  })
  returnedAt?: Date;
}