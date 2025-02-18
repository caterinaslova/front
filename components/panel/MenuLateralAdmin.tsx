import Link from "next/link";

import ItemMenuLateral from "./ItemMenuLateral";
import{ menuItems } from "@/datos"
export default function MenuLateralAdmin({celular}:{celular:boolean}) {
  return (
    <>
   
    <ul className={`${!celular ? "hidden": ""}p-3 space-y-3 md:block` }>
        {menuItems.map(titulo=>(
            <li key={titulo.titulo}>
                <Link href={titulo.ruta} className="capitalize font-bold pb-2">{titulo.titulo}</Link>
                <ul className="flex flex-col space-y-1 capitalize px-3">
                    {titulo.submenues.map(submenu=>(
                        <ItemMenuLateral key={submenu.subtitulo} submenu={submenu}/>
                    ))}

                </ul>
            </li>
        ))}
    </ul>
    </>
  )
}
