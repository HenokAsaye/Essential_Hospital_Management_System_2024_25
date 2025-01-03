-- AlterEnum
ALTER TYPE "requestStatus" ADD VALUE 'REJECTED';

-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "date" SET DATA TYPE TEXT;
