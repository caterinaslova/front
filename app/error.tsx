'use client' // Error boundaries must be Client Components

import Image from "next/image"
import styles from '@/styles/ErrorPage.module.css'

 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  console.log(error)
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <div className={styles.container}>
          <h2>Algo anduvo Mal!</h2>
          <button className={styles.boton} onClick={() => reset()}>Intente de nuevo</button>
          <div className={styles.imagen}>
              <Image src='/error.png' alt="no encontrado" width={"500"} height={500} priority className={styles.img} />
          </div>

        </div>

      </body>
    </html>
  )
}