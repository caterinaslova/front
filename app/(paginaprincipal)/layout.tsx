import MenuSuperior from "@/components/paginaprincipal/MenuSuperior";

export default function PaginaPrincipalLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <>
     <MenuSuperior/>
     {children}
    </>
  );
}
