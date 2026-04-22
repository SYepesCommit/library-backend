import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsInt, IsDate } from 'class-validator';

/**
 * Data Transfer Object for creating a new Reservation.
 */
@InputType()
export class CreateReservationInput {
  /**
   * ID of the user borrowing the book.
   */
  @Field(() => Int, { description: 'ID of the user' })
  @IsInt()
  @IsNotEmpty()
  userId!: number;

  /**
   * ID of the book to be reserved.
   */
  @Field(() => Int, { description: 'ID of the book' })
  @IsInt()
  @IsNotEmpty()
  bookId!: number;

  /**
   * Expected date of return provided by the system or user.
   */
  @Field(() => Date, { description: 'Estimated return date' })
  @IsDate()
  @IsNotEmpty()
  dateDevolucion!: Date;
}