-- DropForeignKey
ALTER TABLE "rides" DROP CONSTRAINT "rides_driver_id_fkey";

-- AlterTable
ALTER TABLE "rides" ALTER COLUMN "driver_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "rides" ADD CONSTRAINT "rides_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "accounts"("account_id") ON DELETE SET NULL ON UPDATE CASCADE;
