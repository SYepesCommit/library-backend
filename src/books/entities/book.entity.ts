import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Reservation } from '../../reservations/entities/reservation.entity';

/**
 * Represents a Book entity within the library system.
 */
@ObjectType()
export class Book {
  /**
   * Unique identifier (Primary Key) from the database.
   */
  @Field(() => Int, { description: 'The unique ID of the book' })
  id!: number;

  /**
   * Main title of the book.
   */
  @Field(() => String, { description: 'The title of the book' })
  title!: string;

  /**
   * Author's full name.
   */
  @Field(() => String, { description: 'The author of the book' })
  author!: string;

  /**
   * Genre classification.
   */
  @Field(() => String, { description: 'The genre of the book' })
  gender!: string;

  /**
   * Whether the book is currently available for a new reservation.
   */
  @Field(() => Boolean, { description: 'True if the book can be borrowed' })
  isAvailable!: boolean;

  @Field(() => [Reservation], { nullable: true })
  reserves?: Reservation[];
}