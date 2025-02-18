"use server"

import { ColorSchemaAgregar, RespuestaJsonDeApi } from "@/utils/schemasZod"
import { ColorSchemaType, RespuestaAction } from "@/utils/types"
import { revalidatePath } from "next/cache"

export const colorActionAgregar= async(mensajeria:RespuestaAction,formData:FormData)=>{

    console.log(mensajeria)

    const datosAenviar = ColorSchemaAgregar.safeParse({
        codigoColor:formData.get('codigoColor'),
        nombreColor: formData.get('nombreColor')
    })
  

    if (!datosAenviar.success){
        console.log(datosAenviar)
        return{
            success:'',
            errors:datosAenviar.error.errors.map(error=>error.message)
        }
    }
    console.log('mandé los datos')
    const url = `${process.env.API_URL}/colores`

    const req = await fetch(url,{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(datosAenviar.data)
    })

    console.log('obtuve respuesta')
    console.log(req)
    const respuestaApi = RespuestaJsonDeApi.parse(await req.json())

    if (!req.ok){
        const {mensaje} = respuestaApi
        return{
            success:'',
            errors:[mensaje]
        }
       
    }
    const success = respuestaApi.mensaje
    revalidatePath('/panel/stock/colores')
    return{
        success,
        errors:[]
    }
}
//##################################################################################################
//==================================== Color DELETE Action===========================================
//####################################################################################################

export const colorActionDelete= async (colorId:ColorSchemaType['_id'],mensajeria:RespuestaAction)=>{
   

    console.log(mensajeria)
    const url = `${process.env.API_URL}/colores/${colorId}`
    const req = await fetch(url,{
        method:'DELETE'
    })
    const respuestaApi = RespuestaJsonDeApi.parse(await req.json())

       if (!req.ok){
        const {mensaje} = respuestaApi
        return{
            success:'',
            errors:[mensaje]
        }
       
    }
    // revalidatePath('/panel/stock/colores')

    const success = respuestaApi.mensaje
   
    return{
        success,
        errors:[]
    }
}

//##################################################################################################
//==================================== Color MODIFICAR Action===========================================
//####################################################################################################

export const colorActionModificar = async (colorId:ColorSchemaType['_id'],mensajeria:RespuestaAction,formData:FormData)=>{
    

    console.log(mensajeria)
    const datosAenviar = ColorSchemaAgregar.safeParse({
        codigoColor:formData.get('codigoColor'),
        nombreColor: formData.get('nombreColor')
    })
  

    if (!datosAenviar.success){
     
        return{
            success:'',
            errors:datosAenviar.error.errors.map(error=>error.message)
        }
    }
    const url = `${process.env.API_URL}/colores/${colorId}`
    const req = await fetch(url,{
        method:'PATCH',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(datosAenviar.data)
    })
    const respuestaApi = RespuestaJsonDeApi.parse(await req.json())

       if (!req.ok){
        const {mensaje} = respuestaApi
        return{
            success:'',
            errors:[mensaje]
        }
       
    }
    // revalidatePath('/panel/stock/colores')

    const success = respuestaApi.mensaje
   
    return{
        success,
        errors:[]
    }


}