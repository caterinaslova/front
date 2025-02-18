import CategoriaForm from "@/components/panel/stock/CategoriaForm";
import Titulo from "@/components/ui/Titulo";
import { CategoriaSchema } from "@/utils/schemasZod";
import { CategoriaSchemaType, Params } from "@/utils/types";

const getCategoria = async function(categoriaId:CategoriaSchemaType['_id']){

  const url= `${process.env.API_URL}/categorias/${categoriaId}`
  const req = await fetch(url)
  const categoria = CategoriaSchema.parse(await req.json())
  
  return categoria
}



export default async  function EditarCategoriaPage({params}:{params:Params}) {

  const {id:categoriaId}= await  params
  const categoria = await getCategoria(categoriaId)
  
  return (
    <div className="min-h-screen  mt-5">
      <Titulo nombreTitulo={"Modificar una categoría"}/>
      <div className="flex flex-col  items-center">
        <CategoriaForm tarea="modificar" categoria={categoria}/>
      </div>
    </div>
  )
}
