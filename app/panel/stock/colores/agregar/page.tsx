import ColoresForm from "@/components/panel/stock/ColoresForm";
import Titulo from "@/components/ui/Titulo";


export default function AgregarColorPage() {



  return (
    <div className="min-h-screen mt-5">
    
       <Titulo nombreTitulo={"Agregar un color"}/>
       <div className="  flex flex-col items-center">
        <ColoresForm tarea="agregar" />
       </div>
     

    </div>
  )
}
