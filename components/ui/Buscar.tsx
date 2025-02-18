"use client"

import { MdSearch } from 'react-icons/md'
import {useSearchParams , usePathname, useRouter} from 'next/navigation'



export default function Buscar({placeholder}:{placeholder:string}) {

  const pathname= usePathname()
  const searchParams = useSearchParams()
  const router= useRouter()

  const manejoInput = (evento:React.ChangeEvent<HTMLInputElement> )=>{

    const params = new URLSearchParams(searchParams)

    if (evento.target.value){
      params.set("page","1")
      params.set("search",evento.target.value)
    }else{
      params.delete("search")
    }
    router.replace(`${pathname}?${params}`)
  }

  return (
    <div className="flex items-center justify-start bg-black rounded-md p-1 md:w-64">
        <MdSearch size={24} className='text-white ' />
        <input type="text" className="bg-transparent max-w-28 md:w-64 md:max-w-64 text-primary-foreground dark:text-secondary-foreground" placeholder={placeholder} onChange={manejoInput}/>
    </div>
  )
}
