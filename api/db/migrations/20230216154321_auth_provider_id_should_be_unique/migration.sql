/*
  Warnings:

  - A unique constraint covering the columns `[authenticationProviderId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_authenticationProviderId_key" ON "User"("authenticationProviderId");
