Lo que hice en la shell
1) npx create-next-app@latest
2) npm i react-icons
3) npm i zod
4) npm i react-toastify
5) npm i react-hook-form
6) npm install @hookform/resolvers
7) npx shadcn@latest init -d
8) npm install next-themes
9) npx shadcn@latest add button
10) npx shadcn@latest add dropdown-menu
11) npm install @headlessui/react


 Para probar tiempos: await new Promise((resolve) => setTimeout(resolve, 1500))

1-ycreo las rutas. Pongo el error general- la pagina no encontrada general
2-genero la circulacion de publico y privado
3-Hago el menu superior y lateral principal
4-Comienzo con un crud:
  4.1 la tabla donde se leen todos los datos -Fetch- Paginacion - Input de busqueda - loading.tsx
  4.2 Agregar item : conexion con server action- validación de datos en el cliente, en el servidor.
      Control de los submit boton que se disabled y que el formulario se resetee
  4.3 Eliminar item- Controlar el button mientas ejecuta la accion
  4.4 Editar: Leer el dato y luego hacer el form- controlar boton submit mandar info al server action y traer el mensaje de finalizado.Volver al listado
5-Poner el noche/día de shadcn o reactUsless
6-Ponerlo lindo como me guste en cuanto a css-tailwind
7-Acomodarlo para pantallas pequeñas, medianas y grandes
8-Ver si conviene Tanstack- react query en los fetch
9-Seguir con backend-autenticación para incorporarlo
10- Seguir con los otros crud ya siempre iguales


npx create-next-app@latest
nombre .
typescript - eslint - approuter - tailwind sin src no cambio @

Primero hago la pantalla principal que la ve cualquiera que const:
Menú superior- Logo en la izquierda- derecha: cambio oscuro - mi cuenta
Menú Lateral: donde van las categorias y una barra de búsqueda
Listado en cuadrados o en lista de productos

  Logo      =         domicilio  teléfono           dia/noche     Mi cuenta
---------------------------------------------------------------------------
            =
 cat 1      =
 cat 2      =               Listado de productos con fotos y precios
            =

En celulares

Logo        Mi cuenta
    domicilio
    telefono

    Select categorias
    input busqueda
-------------------------
listado en cuadrados


Una vez autenticado - se entra al panel de control - panel

Menu superior
Menulateral de opciones
area de trabajo

Primero- defino mis colores en tailwind- el azul y el rosa
Segundo instalo las caracteristicas de noche/día

1----------------------------------------------
Defino las rutas para que cada carpeta tenga su propio layout
(paginaprincipal) ----------------> publica
panel---------->1)compras 2)ventas 3) contabilidad 4)stock
autenticacion----> 1) login 2 ) register

layout (solo tiene las definiciones generales)- letras-metadata-css
----------------------------------------

Voy a generar los botones y menues para moverme-

Creo la carpeta de components dentro de frontend, fuera app
Para que tailwind funcione debo llamarla components, sino debo agregarla con su nuevo nombre a la configuración de tailwind

Divido los components según en la parte que vayan.
paginaprincial- autenticacion - panel -ui(lo general)

##########################################################################################
          Los componentes y paginas- SIEMPRE VAN CON MAYUSCULAS
#########################################################################################

Hago el circuito de movimiento:
MenuSuperior.tsx - de la paginaprincipal
import Link from "next/link";


export default function MenuSuperior() {
  return (
    <div className="h-10 bg-gray-900 text-white flex justify-between items-center py-2 px-4">
        <h1>KyV muebles</h1>
        <Link href="/autenticacion/login">Mi cuenta</Link>
    </div>
  )
}
---------------------------
LoginPage

import Link from "next/link";


export default function LoginPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center space-y-4">
      <Link href="/panel" className="py-4 px-6 bg-gray-900 text-white text-xl rounded hover:bg-gray-700">Entrar al admin</Link>
      <h1>Si no estas registrado, <Link href="/autenticacion/register" className="underline">registrarme</Link></h1>
    </div>
  )
}
---------------------------
RegisterPage
import Link from "next/link";


export default function RegisterPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center space-y-4">
      <Link href="/autenticacion/login" className="py-4 px-6 bg-gray-900 text-white text-xl rounded hover:bg-gray-700">Volver al login</Link>
    </div>
  )
}
---------------------------------
LLego al PanelAdminPage.

#####################################################
Layout del PanelAdminLayout

<MenuSuperiorAdmin/>
<MenuLateralAdmin/>
Hago esos componentes

npm i react-icons

Hago el array con los items del menu y le pongo los icons que me parecieron

Creo todas las carpetas del menu, o las primeras para continuar
----------------------------------------------------------------------
Comienzo con el crud de colores en /stock/colores/page.tsx

1-Tabla para el listado
2-Hago el fetch

///////////////////////////////////////////////////////////////////////////

const getColores = async ()=>{

  const url="http://localhost:4000/api/colores"

  const req = await fetch(url)
  const json = await req.json()
  console.log(json)
}
export default async function ColoresPage() {

  await getColores()
  return (
    <div className=' flex flex-col items-center mt-3'>
      <h1> Listado de Colores</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Código</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>09</td>
            <td>haya</td>
          </tr>
          <tr>
            <td>1</td>
            <td>09</td>
            <td>haya</td>
          </tr>
          <tr>
            <td>1</td>
            <td>09</td>
            <td>haya</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

//////////////////////////////////////////////////////////////////////////

Como el json con los datos es any- descargo zod para tiparlo.
Realizo el schema y paso el json con parse para pasar la info abajo

###################################################
npm i zod
##############################################
Creo la carpeta utils y dentro schemasZod.ts- Es para tipar datos recogidos de la base de datos o para validar datos del formdata

## - Hice todo el CRUD- agregar - modificar- eliminar
## - falta anotar- Botones para ordenar los datos de manera ascendente y descendente 
## - Buscar - poniendo todo en los params de la url que se leen en el backend

## -------------------  Noche día con Shadcn --------------------------- ##
#)Dark Mode

npx shadcn@latest init -d
npm install next-themes
creo components/theme-provider.tsx
--------------------------------------------
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

--------------------------------------------
en app/layout.tsx

import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
----------------------------------------------------------------

Add a mode toggle
Place a mode toggle on your site to toggle between light and dark mode.
------------------------------------------------------------------------
"use client"

import * as React from "react"
import { Moon, MoonIcon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

---------------------------------------------------------------------

npx shadcn@latest add button
npx shadcn@latest add dropdown-menu



## -- ############################################################### -- ##

## ---------------- Menu para que funcione en celulares ---------------- ##

En el frontend -->
input type="file"


en el action del formulario correspondiente Tengo que fetch 2 url- una para el body que lo paso en json
y otra para el archivo que lo paso como FormData


Para que lea las fotos next.config.ts
  images:{
    remotePatterns:[
      {
        protocol:'http',
        hostname:process.env.DOMAIN!
      }
    ]
  }

  en el .env
  DOMAIN=localhost


## -- ############################################################### -- ##

## -------- Crud categorias- Productos -ItemsComprobante---------------- ##
## -- ############################################################### -- ##


