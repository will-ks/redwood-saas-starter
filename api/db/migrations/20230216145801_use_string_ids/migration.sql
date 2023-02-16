/*
  Warnings:

  - The primary key for the `UserRole` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `OrganizationMembership` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `OrganizationRole` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserRole" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roleType" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserRole" ("createdAt", "id", "roleType", "updatedAt", "userId") SELECT "createdAt", "id", "roleType", "updatedAt", "userId" FROM "UserRole";
DROP TABLE "UserRole";
ALTER TABLE "new_UserRole" RENAME TO "UserRole";
CREATE TABLE "new_OrganizationMembership" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    CONSTRAINT "OrganizationMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrganizationMembership_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrganizationMembership" ("createdAt", "id", "organizationId", "updatedAt", "userId") SELECT "createdAt", "id", "organizationId", "updatedAt", "userId" FROM "OrganizationMembership";
DROP TABLE "OrganizationMembership";
ALTER TABLE "new_OrganizationMembership" RENAME TO "OrganizationMembership";
CREATE TABLE "new_OrganizationRole" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roleType" TEXT NOT NULL,
    "organizationMembershipId" TEXT NOT NULL,
    CONSTRAINT "OrganizationRole_organizationMembershipId_fkey" FOREIGN KEY ("organizationMembershipId") REFERENCES "OrganizationMembership" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrganizationRole" ("createdAt", "id", "organizationMembershipId", "roleType", "updatedAt") SELECT "createdAt", "id", "organizationMembershipId", "roleType", "updatedAt" FROM "OrganizationRole";
DROP TABLE "OrganizationRole";
ALTER TABLE "new_OrganizationRole" RENAME TO "OrganizationRole";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
