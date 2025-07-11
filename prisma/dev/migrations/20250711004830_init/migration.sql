/*
  Warnings:

  - You are about to drop the column `used` on the `passwordRecoveryTokens` table. All the data in the column will be lost.
  - Added the required column `token` to the `passwordRecoveryTokens` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_passwordRecoveryTokens" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "valid" BOOLEAN NOT NULL DEFAULT false,
    "token" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "passwordRecoveryTokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_passwordRecoveryTokens" ("created_at", "id", "updated_at", "userId") SELECT "created_at", "id", "updated_at", "userId" FROM "passwordRecoveryTokens";
DROP TABLE "passwordRecoveryTokens";
ALTER TABLE "new_passwordRecoveryTokens" RENAME TO "passwordRecoveryTokens";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
