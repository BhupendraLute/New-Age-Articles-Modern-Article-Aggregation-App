-- CreateTable
CREATE TABLE "ArticleSummary" (
    "id" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArticleSummary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ArticleSummary_articleId_key" ON "ArticleSummary"("articleId");

-- AddForeignKey
ALTER TABLE "ArticleSummary" ADD CONSTRAINT "ArticleSummary_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
