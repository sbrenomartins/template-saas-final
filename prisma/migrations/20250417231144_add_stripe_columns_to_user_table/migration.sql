-- AlterTable
ALTER TABLE "users" ADD COLUMN     "status" TEXT DEFAULT 'active',
ADD COLUMN     "stripeCustomerId" TEXT,
ADD COLUMN     "stripeSubscriptionId" TEXT;
