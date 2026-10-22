import * as z from "zod";

export const signInSchema = z.object({
    email: z.email({ error: 'Please enter a valid e-mail address.' }),
    password: z.string().min(1, { error: 'Please enter your password.' })
});

export const registerSchema = z.object({
    name: z.string().trim().min(1, { error: 'Please enter a user name.' }),
    email: z.email({ error: 'Please enter a valid e-mail address.' }),
    password: z.string().min(6, { error: 'The password has to be 6 characters or longer.' }),
    rewritePassword: z.string()
}).refine((data) => data.password === data.rewritePassword, {
    error: 'The passwords do not match. Try again.',
    path: ['rewritePassword']
});
