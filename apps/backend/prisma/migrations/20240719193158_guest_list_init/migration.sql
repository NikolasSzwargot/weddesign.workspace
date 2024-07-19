-- CreateTable
CREATE TABLE "guestStatuses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guestStatuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guests" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "isVege" BOOLEAN NOT NULL DEFAULT false,
    "isCompanion" BOOLEAN NOT NULL DEFAULT false,
    "isChild" BOOLEAN NOT NULL DEFAULT false,
    "canGetThere" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guestStatusId" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "guests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "guestStatuses_name_key" ON "guestStatuses"("name");

-- AddForeignKey
ALTER TABLE "guests" ADD CONSTRAINT "guests_guestStatusId_fkey" FOREIGN KEY ("guestStatusId") REFERENCES "guestStatuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
