
import CategoriaForm from "@/components/panel/stock/CategoriaForm";
import Titulo from "@/components/ui/Titulo";


export default function AgregarColorPage() {



  return (
    <div className="min-h-screen mt-5">
    
       <Titulo nombreTitulo={"Agregar una categoría"}/>
       <div className="  flex flex-col items-center">
        <CategoriaForm tarea="agregar" />
       </div>
     

    </div>
  )
}
