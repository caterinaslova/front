
import MenuLateralAdmin from '@/components/panel/MenuLateralAdmin';



export default function MenuCelularOpciones() {
  

  return (
    <>
      <div className={`w-full h-screen bg-slate-50 flex flex-col items-center justify-center -my-3  font-medium text-lg md:hidden dark:text-secondary-foreground dark:bg-primary-foreground `}>
      <MenuLateralAdmin celular={true}/>
      </div>
    </>
  );
}
