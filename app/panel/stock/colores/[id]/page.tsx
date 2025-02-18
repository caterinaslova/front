import ColoresForm from "@/components/panel/stock/ColoresForm";
import Titulo from "@/components/ui/Titulo";
import { ColorSchema } from "@/utils/schemasZod";
import { ColorSchemaType, Params } from "@/utils/types";

const getColor = async function(colorId:ColorSchemaType['_id']){

  const url= `${process.env.API_URL}/colores/${colorId}`
  const req = await fetch(url)
  const color = ColorSchema.parse(await req.json())
  return color
}
export default async  function EditarColorPage({params}:{params:Params}) {

  const {id:colorId}= await params
  const color = await getColor(colorId)
  return (
    <div className="min-h-screen  mt-5">
      <Titulo nombreTitulo={"Modificar un color"}/>
      <div className="flex flex-col  items-center">
        <ColoresForm tarea="modificar" color={color}/>
      </div>
    </div>
  )
}
