"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { HiMiniArrowLongDown, HiMiniArrowLongUp } from 'react-icons/hi2';

export default function ColorOrdenarCodigo() {

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const params = new URLSearchParams(searchParams)


    const ordenarDes = ()=>{
      params.set("sort","codigoColor")    
      params.set("page","1") 
      router.replace(`${pathname}?${params}`)           
    }
    const ordenarAsc = ()=>{ 
      params.set("sort","-codigoColor") 
      params.set("page","1")
      router.replace(`${pathname}?${params}`) 
    }
  return (
    <div className='flex gap-0 items-center justify-center'>
    <span className='mr-1'>Código </span>
    <button type="button" onClick={ordenarDes}>
      <HiMiniArrowLongDown size={20} className='m-0 p-0' />
    </button>
    <button type="button" onClick={ordenarAsc}>
      <HiMiniArrowLongUp size={20} className='m-0 p-0' />
    </button>
   
  </div>
  )
}
