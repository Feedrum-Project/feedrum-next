import { number } from "zod"

export default number().int().positive().max(2_147_483_647)