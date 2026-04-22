import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Reservation } from '../../reservations/entities/reservation.entity';

/**
 * Represents a User within the library system.
 */
@ObjectType()
export class User {
  /**
   * Unique identifier for the user (Primary Key).
   */
  @Field(() => Int, { description: 'The unique ID of the user' })
  id!: number;

  /**
   * Full name of the user.
   */
  @Field(() => String, { description: 'The full name of the user' })
  name!: string;

  /**
   * Unique email address used for identification.
   */
  @Field(() => String, { description: 'The unique email of the user' })
  email!: string;

  /**
   * Timestamp when the user account was created.
   */
  @Field(() => Date, { description: 'The date when the user was registered' })
  createdAt!: Date;

  @Field(() => [Reservation], { nullable: true })
  reserves?: Reservation[];
}