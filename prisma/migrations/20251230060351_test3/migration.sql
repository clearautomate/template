/*
  Warnings:

  - You are about to alter the column `currencyValue` on the `FieldValue` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.

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
    "currencyValue" REAL,
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
