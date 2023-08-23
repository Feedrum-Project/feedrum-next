import { object, string, z } from "zod";

const User = object({
  email: string().regex(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/),
  name: string()
    .regex(/[a-zA-Z0-9_\.]/)
    .min(4)
    .max(16),
  password: string()
    .regex(/[a-zA-Z0-9]/)
    .min(8)
    .max(16)
}).strict();

export default User;
export type UserType = z.infer<typeof User>;
