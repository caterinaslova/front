import {z} from 'zod'

export const ColorSchema = z.object({
    _id:z.string(),
    codigoColor:z.string(),
    nombreColor:z.string(),
    updatedAt:z.string(),
    createdAt:z.string()
})
export const ColoresSchema = z.array(ColorSchema)


export const ColorSchemaAgregar= z.object({
    codigoColor:z.string().min(1,{message:'El código no puede ir vacío'}).max(15,{message:'El código no puede tener más de 15 caracteres.'}),
    nombreColor:z.string().min(1,{message:'El nombre no puede ir vacío'}).max(25,{message:'El nombre no puede tener más de 25 caracteres.'})
})

export const RespuestaJsonDeApi = z.object({
    mensaje:z.string()
})

export const MetaDatos = z.object({
    total:z.coerce.number({message:"El total debe ser un número"}),
    actual:z.coerce.number({message:"El total debe ser un número"}),
    paginas:z.coerce.number({message:"El total debe ser un número"}),
    paginacion:z.coerce.number({message:"El total debe ser un número"})
})

export const CategoriaSchema = z.object({
    _id:z.string({message:'type del _id'}),
    nombreCategoria: z.string().min(1,{message:'El nombre de la categoría no puede estar vacío'}),
    descripcionCategoria: z.string().min(1,{message:'La descripción de la categoría no puede estar vacía'}),
    tipoCategoria: z.enum(['Mercadería Reventa','Ingreso Contable','Egreso Contable'],{message:'El tipo de categoría debe ser una de las opciones especificadas'}),
    ordenEnMenu:z.coerce.number({message:'numero'}).refine(valor=>valor>0,{message:"El valor debe ser positivo mayor o igual a 1"}),
    validaActualmente: z.string({message:'En validaActualmente debe ingresar un string -on - off'}).optional(),
    imagenCategoria:z.any(),
    carpetaFotos:z.string({message:'La carpetaFotos debe ser un string.Estoy front'}),
    updatedAt:z.string({message:'Fecha de actualización del registro'}),
    createdAt:z.string({message:'Fecha de creación del registro'})

})

export const CategoriasSchema = z.array(CategoriaSchema)

export const CategoriaSchemaAgregar = CategoriaSchema.omit({_id:true,updatedAt:true,createdAt:true,imagenCategoria:true})
export const CategoriaSchemaModificar = CategoriaSchema.omit({_id:true,updatedAt:true,createdAt:true})

