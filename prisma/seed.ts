import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

import * as dotenv from 'dotenv';
import { Pool } from 'pg';
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Limpiando datos existentes...');

  await prisma.reservation.deleteMany({});
  await prisma.book.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('Datos limpiados correctamente');

  console.log('Creando usuarios...');

  const user1 = await prisma.user.create({
    data: {
      name: 'Santiago Yepes',
      email: 'santiago@example.com',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Lector Nex',
      email: 'lector@nex.com',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: 'María García',
      email: 'maria.garcia@example.com',
    },
  });

  const user4 = await prisma.user.create({
    data: {
      name: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@example.com',
    },
  });

  const user5 = await prisma.user.create({
    data: {
      name: 'Ana Martínez',
      email: 'ana.martinez@example.com',
    },
  });

  const user6 = await prisma.user.create({
    data: {
      name: 'Pedro López',
      email: 'pedro.lopez@example.com',
    },
  });

  const user7 = await prisma.user.create({
    data: {
      name: 'Laura Fernández',
      email: 'laura.fernandez@example.com',
    },
  });

  const user8 = await prisma.user.create({
    data: {
      name: 'Diego Torres',
      email: 'diego.torres@example.com',
    },
  });

  const user9 = await prisma.user.create({
    data: {
      name: 'Sofía Ramírez',
      email: 'sofia.ramirez@example.com',
    },
  });

  const user10 = await prisma.user.create({
    data: {
      name: 'Andrés Morales',
      email: 'andres.morales@example.com',
    },
  });



  console.log('Creando libros...');

  await prisma.book.createMany({
    data: [
      {
        title: 'Clean Code',
        author: 'Robert C. Martin',
        gender: 'Software Engineering',
        isAvailable: true,
      },
      {
        title: 'The Pragmatic Programmer',
        author: 'Andrew Hunt & David Thomas',
        gender: 'Software Development',
        isAvailable: true,
      },
      {
        title: 'Design Patterns',
        author: 'Erich Gamma et al.',
        gender: 'Arquitectura',
        isAvailable: true,
      },
      {
        title: 'Refactoring',
        author: 'Martin Fowler',
        gender: 'Software Engineering',
        isAvailable: true,
      },
      {
        title: 'Domain-Driven Design',
        author: 'Eric Evans',
        gender: 'Arquitectura',
        isAvailable: true,
      },
      {
        title: 'Introduction to Algorithms',
        author: 'Thomas H. Cormen',
        gender: 'Algoritmos',
        isAvailable: true,
      },
      {
        title: 'Structure and Interpretation of Computer Programs',
        author: 'Harold Abelson',
        gender: 'Computer Science',
        isAvailable: true,
      },
      {
        title: 'Code Complete',
        author: 'Steve McConnell',
        gender: 'Software Engineering',
        isAvailable: true,
      },
      {
        title: 'Cien años de soledad',
        author: 'Gabriel García Márquez',
        gender: 'Realismo Mágico',
        isAvailable: true,
      },
      {
        title: 'Don Quijote de la Mancha',
        author: 'Miguel de Cervantes',
        gender: 'Clásico',
        isAvailable: true,
      },
      {
        title: '1984',
        author: 'George Orwell',
        gender: 'Distopía',
        isAvailable: true,
      },
      {
        title: 'Orgullo y Prejuicio',
        author: 'Jane Austen',
        gender: 'Clásico',
        isAvailable: true,
      },
      {
        title: 'El Gran Gatsby',
        author: 'F. Scott Fitzgerald',
        gender: 'Clásico',
        isAvailable: true,
      },
      {
        title: 'Crimen y Castigo',
        author: 'Fiódor Dostoyevski',
        gender: 'Clásico',
        isAvailable: true,
      },
      {
        title: 'Matar a un Ruiseñor',
        author: 'Harper Lee',
        gender: 'Clásico',
        isAvailable: true,
      },
      {
        title: 'Dune',
        author: 'Frank Herbert',
        gender: 'Ciencia Ficción',
        isAvailable: true,
      },
      {
        title: 'El Hobbit',
        author: 'J.R.R. Tolkien',
        gender: 'Fantasía',
        isAvailable: true,
      },
      {
        title: 'Neuromante',
        author: 'William Gibson',
        gender: 'Cyberpunk',
        isAvailable: true,
      },
      {
        title: 'Fundación',
        author: 'Isaac Asimov',
        gender: 'Ciencia Ficción',
        isAvailable: true,
      },
      {
        title: 'Harry Potter y la Piedra Filosofal',
        author: 'J.K. Rowling',
        gender: 'Fantasía',
        isAvailable: true,
      },
      {
        title: 'El Señor de los Anillos',
        author: 'J.R.R. Tolkien',
        gender: 'Fantasía',
        isAvailable: true,
      },
      {
        title: 'Juego de Tronos',
        author: 'George R.R. Martin',
        gender: 'Fantasía',
        isAvailable: true,
      },
      {
        title: 'Snow Crash',
        author: 'Neal Stephenson',
        gender: 'Cyberpunk',
        isAvailable: true,
      },
      {
        title: 'Inteligencia Artificial: Un Enfoque Moderno',
        author: 'Stuart Russell & Peter Norvig',
        gender: 'Inteligencia Artificial',
        isAvailable: true,
      },
      {
        title: 'El Gen Egoísta',
        author: 'Richard Dawkins',
        gender: 'Ciencia',
        isAvailable: true,
      },
      {
        title: 'Breve Historia del Tiempo',
        author: 'Stephen Hawking',
        gender: 'Ciencia',
        isAvailable: true,
      },
      {
        title: 'Sapiens: De Animales a Dioses',
        author: 'Yuval Noah Harari',
        gender: 'Historia',
        isAvailable: true,
      },
      {
        title: 'Homo Deus',
        author: 'Yuval Noah Harari',
        gender: 'Historia',
        isAvailable: true,
      },
      {
        title: 'Los 7 Hábitos de la Gente Altamente Efectiva',
        author: 'Stephen Covey',
        gender: 'Desarrollo Personal',
        isAvailable: true,
      },
      {
        title: 'El Poder del Ahora',
        author: 'Eckhart Tolle',
        gender: 'Desarrollo Personal',
        isAvailable: true,
      },
      {
        title: 'Atomic Habits',
        author: 'James Clear',
        gender: 'Desarrollo Personal',
        isAvailable: true,
      },
    ],
  });

  console.log('Proceso de seeding finalizado con éxito!');
}

main()
  .catch((e) => {
    console.error('Error en el seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });