/*
  Warnings:

  - You are about to drop the column `userId` on the `OrganizationRole` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrganizationRole" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roleType" TEXT NOT NULL,
    "organizationMembershipId" INTEGER NOT NULL,
    CONSTRAINT "OrganizationRole_organizationMembershipId_fkey" FOREIGN KEY ("organizationMembershipId") REFERENCES "OrganizationMembership" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrganizationRole" ("createdAt", "id", "organizationMembershipId", "roleType", "updatedAt") SELECT "createdAt", "id", "organizationMembershipId", "roleType", "updatedAt" FROM "OrganizationRole";
DROP TABLE "OrganizationRole";
ALTER TABLE "new_OrganizationRole" RENAME TO "OrganizationRole";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
