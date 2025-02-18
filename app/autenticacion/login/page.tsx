import Link from "next/link";


export default function LoginPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center space-y-4">
      <Link href="/panel" className="py-4 px-6 bg-gray-900 text-white text-xl rounded hover:bg-gray-700">Entrar al admin</Link>
      <h1>Si no estas registrado, <Link href="/autenticacion/register" className="underline">registrarme</Link></h1>
    </div>
  )
}
