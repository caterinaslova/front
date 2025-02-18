import Image from 'next/image'
import Link from 'next/link'
import styles from "@/styles/PaginaNoEncontrada.module.css"
 
export default function NotFound() {
  return (
    <div className={styles.container}>
      <h2>Página No encontrada</h2>
       <Link className={styles.link} href="/">Presione enter para volver</Link>
      <div>
        <Image src='/notFound.png' alt="no encontrado" width={600} height={600} priority className={styles.img} />
      </div>
  
    </div>
  )
}
