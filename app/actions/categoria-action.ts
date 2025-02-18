"use server"

import {  CategoriaSchemaAgregar,  CategoriaSchemaModificar,  RespuestaJsonDeApi } from "@/utils/schemasZod"
import { CategoriaSchemaType, RespuestaAction } from "@/utils/types"
import { revalidatePath } from "next/cache"

export const categoriaActionAgregar= async(mensajeria:RespuestaAction,formData:FormData)=>{

    console.log(mensajeria)

    const datosAenviar = CategoriaSchemaAgregar.safeParse({

        nombreCategoria: formData.get('nombreCategoria'),
        descripcionCategoria: formData.get('descripcionCategoria'),
        tipoCategoria: formData.get('tipoCategoria'),
        ordenEnMenu: formData.get('ordenEnMenu'),
        validaActualmente:formData.get('validaActualmente') ? formData.get('validaActualmente') : "off",
        carpetaFotos: formData.get('carpetaFotos')
    })
  

    if (!datosAenviar.success){
     
        return{
            success:'',
            errors:datosAenviar.error.errors.map(error=>error.message)
        }
    }

    const url = `${process.env.API_URL}/categorias`

    const req = await fetch(url,{
        method:'POST',
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
    const success = respuestaApi.mensaje
    revalidatePath('/panel/stock/categorias')
    return{
        success,
        errors:[]
    }
}
//##################################################################################################
//==================================== Categoria DELETE Action===========================================
//####################################################################################################

export const categoriaActionDelete= async (colorId:CategoriaSchemaType['_id'],mensajeria:RespuestaAction)=>{

    console.log(mensajeria)
   
    const url = `${process.env.API_URL}/categorias/${colorId}`
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

    const success = respuestaApi.mensaje
   
    return{
        success,
        errors:[]
    }
}

//##################################################################################################
//==================================== CCategoria MODIFICAR Action===========================================
//####################################################################################################

export const categoriaActionModificar = async (categoriaId:CategoriaSchemaType['_id'],mensajeria:RespuestaAction,formData:FormData)=>{

   
 
    console.log(mensajeria)
    const datosAenviar = CategoriaSchemaModificar.safeParse({
        nombreCategoria: formData.get('nombreCategoria'),
        descripcionCategoria: formData.get('descripcionCategoria'),
        tipoCategoria: formData.get('tipoCategoria'),
        ordenEnMenu: formData.get('ordenEnMenu'),
        validaActualmente: formData.get('validaActualmente') ? formData.get('validaActualmente') : "off",
        imagenCategoria:formData.get('imagenCategoria'),
        carpetaFotos: formData.get('carpetaFotos')
    })
  
    const file =formData.get('imagenCategoria')

    const archivo = new FormData

    if(file)archivo.append('imagenCategoria',file)

    if (!datosAenviar.success){

        return{
            success:'',
            errors:datosAenviar.error.errors.map(error=>error.message)
        }
    }

    const url = `${process.env.API_URL}/categorias/${categoriaId}`
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
 
    if(file){
        const urlUpload = `${process.env.API_URL}/categorias/${categoriaId}`
        const reqUpLoad = await fetch(urlUpload,{
            method:'POST',
            body: archivo
            
        })
        const reqUpLoadJson = await reqUpLoad.json()
        console.log(reqUpLoadJson)
    }

    const success = respuestaApi.mensaje
   
    return{
        success,
        errors:[]
    }


}