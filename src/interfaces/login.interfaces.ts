import { z } from "zod";
import { loginSchema } from "../schemas/login.schemas";

type ILoginSchema = z.infer<typeof loginSchema>;
interface ILoginReturn {
  token: string;
}

export { ILoginSchema, ILoginReturn };
