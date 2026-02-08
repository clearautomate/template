-- CreateTable
CREATE TABLE "FieldValue" (
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FieldValue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
