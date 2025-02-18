import MenuLateralAdmin from "@/components/panel/MenuLateralAdmin";
import MenuLateralCelular from "@/components/panel/MenuLateralCelular";
import MenuSuperiorAdmin from "@/components/panel/MenuSuperiorAdmin";

export default function PanelAdminLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <>
      <MenuSuperiorAdmin/>
      <div className="flex flex-col md:flex-row w-full">
        <div className="hidden md:block md:w-1/5 md:min-w-[220] md:p-4">
           <MenuLateralAdmin celular={false}/>
        </div>
        <div className="w-full md:hidden">
          <MenuLateralCelular/>
        </div>
        <div className="bg-slate-50 w-full min-h-screen dark:bg-primary-foreground dark:text-primary  py-3 px-5">
           {children}
        </div>
      </div>
    </>
  );
}