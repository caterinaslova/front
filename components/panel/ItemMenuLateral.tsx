import Link from 'next/link'
import React, { JSX } from 'react'

type submenuType ={
  subtitulo:string;
  subruta:string;
  icon: JSX.Element
}

export default function ItemMenuLateral({submenu}:{submenu:submenuType}) {
  return (
    <Link href={submenu.subruta} className='flex items-center gap-2'>
      <span>{submenu.icon}</span>
      <span>{submenu.subtitulo}</span> 
    </Link>
  )
}
