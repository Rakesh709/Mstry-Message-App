import {z} from 'zod';

export const signInSchema = z.object({
    identifier: z.string(),
    // identifier is username or email identifier is used in production
    password:z.string(),
})