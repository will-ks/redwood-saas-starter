/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "authenticationProviderType" TEXT NOT NULL,
    "authenticationProviderId" TEXT NOT NULL
);
INSERT INTO "new_User" ("authenticationProviderId", "authenticationProviderType", "createdAt", "id", "updatedAt") SELECT "authenticationProviderId", "authenticationProviderType", "createdAt", "id", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_authenticationProviderId_key" ON "User"("authenticationProviderId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
