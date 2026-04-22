import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { PrismaService } from '../prisma/prisma.service';

/**
 * Service responsible for managing user-related business logic.
 * Handles database interactions via PrismaService.
 */
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Registers a new user in the system.
   * @param createUserInput - Data for the new user.
   * @returns The created user record.
   * @throws ConflictException if the email is already registered.
   */
  async create(createUserInput: CreateUserInput) {
    try {
      return await this.prisma.user.create({
        data: createUserInput,
      });
    } catch (error) {
        throw new ConflictException('A user with this email already exists');

    }
  }

  /**
   * Retrieves all registered users.
   * @returns A list of all users in the database.
   */
async findAll() {
  return this.prisma.user.findMany({
    include: {
      reserves: {
        where: { returnedAt: null },
        include: { book: true }
      }
    }
  });
}
  /**
   * Finds a single user by their unique identifier.
   * @param id - The numeric ID of the user.
   * @returns The user record if found.
   * @throws NotFoundException if the user does not exist.
   */
async findOne(id: number) {
  const user = await this.prisma.user.findUnique({
    where: { id },
    include: {
      reserves: {
        include: { book: true }
      }
    }
  });
  if (!user) throw new NotFoundException(`User with ID ${id} not found`);
  return user;
}
}