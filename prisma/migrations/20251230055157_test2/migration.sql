/*
  Warnings:

  - You are about to drop the column `createdAt` on the `FieldValue` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `FieldValue` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FieldValue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "textValue" TEXT,
    "textareaValue" TEXT,
    "emailValue" TEXT,
    "numberValue" REAL,
    "currencyValue" DECIMAL,
    "percentValue" REAL,
    "booleanValue" BOOLEAN,
    "dateValue" DATETIME,
    "datetimeValue" DATETIME,
    "selectValue" TEXT,
    "multiselectValue" TEXT,
    "userId" TEXT,
    "statusValue" TEXT,
    CONSTRAINT "FieldValue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_FieldValue" ("booleanValue", "currencyValue", "dateValue", "datetimeValue", "emailValue", "id", "multiselectValue", "numberValue", "percentValue", "selectValue", "statusValue", "textValue", "textareaValue", "userId") SELECT "booleanValue", "currencyValue", "dateValue", "datetimeValue", "emailValue", "id", "multiselectValue", "numberValue", "percentValue", "selectValue", "statusValue", "textValue", "textareaValue", "userId" FROM "FieldValue";
DROP TABLE "FieldValue";
ALTER TABLE "new_FieldValue" RENAME TO "FieldValue";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
