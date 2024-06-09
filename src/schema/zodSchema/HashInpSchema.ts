import { z } from 'zod'
interface hashInpInterface {
    hash: string;

}
export const HashInpSchema = z.object({
    hash: z
        .string()
        .min(1, { message: 'Name Required' })
       
})

