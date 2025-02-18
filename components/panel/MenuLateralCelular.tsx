'use client';


import { useRouter } from "next/navigation";
import {  useState } from "react";



export default function MenuLateralCelular() {

  const [open,setOpen]= useState(false)
  const router = useRouter()

  // cuando es true - aparece la X
  // cuando es false - aparece Menu - abrir- se abre

  const showMenu = ()=>{

    setOpen((prev) => !prev)
  // Si está false- - lo pongo true para que aparezca la X - y abro el menu
    if (!open){ 
      setOpen(true)
      router.push('/panel/menu')
    }
    // Si está true- significa que quiero volver
    if(open) router.push('/panel')
 
  }
 
  return (
    <>
 

<div
          className="cursor-pointer text-4xl m-3 flex items-center gap-2"
          onClick={() => showMenu()}
        >
          {/* Change Hamburger Icon */}
          {/* {open ? "X" : "☰"} */}
          <div className="flex flex-col gap-[5.4px]">
            <div
              className={`h-[3px] rounded-md w-6 bg-black dark:bg-secondary-foreground origin-left transition-all ease-in-out ${
                open && "rotate-45"
              }`}
            ></div>
            <div
              className={`h-[3px] rounded-md w-6 bg-black dark:bg-secondary-foreground transition-all ease-in-out ${
                open && "opacity-0"
              }`}
            ></div>
            <div
              className={`h-[3px] rounded-md w-6 bg-black dark:bg-secondary-foreground origin-left transition-all ease-in-out ${
                open && "-rotate-45"
              }`}
            ></div>
          </div>
          {open ?<span className="text-lg">Volver</span>:null}
        </div>

    </>
  );
}
