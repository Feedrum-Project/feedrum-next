-- CreateEnum
CREATE TYPE "VoteScore" AS ENUM ('UPVOTE', 'DOWNVOTE');

-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('POST', 'COMMENT', 'USER');

-- CreateTable
CREATE TABLE "Vote" (
    "id" SERIAL NOT NULL,
    "score" "VoteScore" NOT NULL,
    "type" "VoteType" NOT NULL,
    "fieldId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
