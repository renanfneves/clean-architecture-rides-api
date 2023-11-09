/*
  Warnings:

  - Changed the type of `status` on the `rides` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Ride_Statuses" AS ENUM ('requested', 'accepted', 'ongoing', 'completed');

-- AlterTable
ALTER TABLE "rides" DROP COLUMN "status",
ADD COLUMN     "status" "Ride_Statuses" NOT NULL;
