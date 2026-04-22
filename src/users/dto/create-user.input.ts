import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * Data Transfer Object for registering a new User in the system.
 */
@InputType()
export class CreateUserInput {
  /**
   * Full name of the user.
   */
  @Field(() => String, { description: 'The full name of the user' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  /**
   * Unique electronic mail address for the user.
   * This field is used for identification and notifications.
   */
  @Field(() => String, { description: 'Unique email address of the user' })
  @IsEmail({}, { message: 'The email format is invalid' })
  @IsNotEmpty()
  email!: string;
}