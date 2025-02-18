import Link from "next/link";
import { ModeToggle } from "../ui/ModeToggle";


export default function MenuSuperiorAdmin() {
  return (
    <div className="h-10 bg-gray-900 text-primary-foreground dark:text-primary flex justify-between items-center py-7 px-4">
        <h1>KyV muebles</h1>
        <div className="flex items-center justify-end gap-2">
          <ModeToggle/>
          <Link href="/autenticacion/login">Mi cuenta</Link>
        </div>
    </div>
  )
}
