/*
  Warnings:

  - You are about to drop the column `autor` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `genero` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `titulo` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `fechaDevolucion` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `fechaReserva` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `User` table. All the data in the column will be lost.
  - Added the required column `author` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateDevolucion` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "autor",
DROP COLUMN "genero",
DROP COLUMN "titulo",
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "fechaDevolucion",
DROP COLUMN "fechaReserva",
ADD COLUMN     "dateDevolucion" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dateReservation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "nombre",
ADD COLUMN     "name" TEXT NOT NULL;
