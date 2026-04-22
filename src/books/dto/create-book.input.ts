import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

/**
 * Data Transfer Object for creating a new Book record.
 */
@InputType()
export class CreateBookInput {
  /**
   * Full name of the book's author.
   */
  @Field(() => String, { description: 'The name of the author' })
  @IsString()
  @IsNotEmpty()
  author!: string;

  /**
   * The category or genre of the book.
   */
  @Field(() => String, { description: 'The genre or category of the book' })
  @IsString()
  @IsNotEmpty()
  gender!: string;

  /**
   * Flag to set initial availability.
   * @default true
   */
  @Field(() => Boolean, { 
    description: 'Initial availability status of the book', 
    defaultValue: true 
  })
  @IsBoolean()
  @IsOptional()
  isAvailable!: boolean;

  /**
   * The official title of the book.
   */
  @Field(() => String, { description: 'The main title of the book' })
  @IsString()
  @IsNotEmpty()
  title!: string;
}