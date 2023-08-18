import type { VoteScore } from "@prisma/client";
import { z, ZodType } from "zod";

const scores: ZodType<VoteScore> = z.enum(["UPVOTE", "DOWNVOTE"]);

export default scores;
