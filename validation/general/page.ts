import { number } from "zod"

export const page = number().int().min(0).max(2_147_483_647)
export const offset = number().int().min(5).max(50)