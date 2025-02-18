

export default function Titulo ({nombreTitulo}:{nombreTitulo:string}) {
  return (
    <h2 className=' text-center  text-md font-normal md:text-right mb-3 md:text-xl border border-secondary-foreground py-1 px-4 md:font-semibold tracking-wider rounded text-secondary-foreground '>{nombreTitulo}</h2>
  )
}
