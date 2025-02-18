import Link from "next/link";


export default function RegisterPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center space-y-4">
      <Link href="/autenticacion/login" className="py-4 px-6 bg-gray-900 text-white text-xl rounded hover:bg-gray-700">Volver al login</Link>
    </div>
  )
}
