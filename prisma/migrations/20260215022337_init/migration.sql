-- CreateEnum
CREATE TYPE "PlaybookStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateTable
CREATE TABLE "Playbook" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "problem" TEXT NOT NULL,
    "bodyMd" TEXT NOT NULL,
    "inputsJson" JSONB,
    "outputContractMd" TEXT,
    "failureModesMd" TEXT,
    "testedWithJson" JSONB,
    "status" "PlaybookStatus" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Playbook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaybookTag" (
    "playbookId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "PlaybookTag_pkey" PRIMARY KEY ("playbookId","tagId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Playbook_slug_key" ON "Playbook"("slug");

-- CreateIndex
CREATE INDEX "Playbook_status_publishedAt_idx" ON "Playbook"("status", "publishedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_slug_key" ON "Tag"("slug");

-- CreateIndex
CREATE INDEX "Tag_name_idx" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "PlaybookTag_tagId_idx" ON "PlaybookTag"("tagId");

-- AddForeignKey
ALTER TABLE "PlaybookTag" ADD CONSTRAINT "PlaybookTag_playbookId_fkey" FOREIGN KEY ("playbookId") REFERENCES "Playbook"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaybookTag" ADD CONSTRAINT "PlaybookTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
