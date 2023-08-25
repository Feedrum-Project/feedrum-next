import { z } from "zod";

export const TagModel = z
  .object({
    name: z.string()
  })
  .strict();

export type TagModel = z.infer<typeof TagModel>;

export const Tags = z.array(TagModel).min(3);
export type Tags = z.infer<typeof Tags>;
