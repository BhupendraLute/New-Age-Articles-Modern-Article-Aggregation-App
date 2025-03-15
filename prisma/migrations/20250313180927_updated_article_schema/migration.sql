/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Article` table. All the data in the column will be lost.
  - Added the required column `description` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "imageUrl",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "source" TEXT;
