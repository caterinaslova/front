import { z } from "zod";
import { CategoriaSchema, ColorSchema } from "./schemasZod";

export type RespuestaAction={
    success:string;
    errors:string[]
}

export type ColorSchemaType = z.infer<typeof ColorSchema>
export type CategoriaSchemaType = z.infer<typeof CategoriaSchema>

export type SearchParams = Promise<{page:string,search:string, sort:string}>


export type Params = Promise<{id:string}>