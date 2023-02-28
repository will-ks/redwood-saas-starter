/*
  Warnings:

  - You are about to drop the column `authenticationProviderType` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authenticationProviderId" TEXT NOT NULL,
    "username" TEXT
);
INSERT INTO "new_User" ("authenticationProviderId", "createdAt", "id", "updatedAt", "username") SELECT "authenticationProviderId", "createdAt", "id", "updatedAt", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_authenticationProviderId_key" ON "User"("authenticationProviderId");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
