import ColorFormDelete from '@/components/panel/stock/ColorFormDelete';
import Buscar from '@/components/ui/Buscar';
import Pagination from '@/components/ui/Pagination';
import Titulo from '@/components/ui/Titulo';

import { ColoresSchema, MetaDatos } from '@/utils/schemasZod';
import { SearchParams } from '@/utils/types';
import Link from 'next/link';
import { MdLibraryAdd, MdModeEdit } from 'react-icons/md';
import ColorOrdenarCodigo from '@/components/panel/stock/ColorOrdenarCodigo';
import ColorOrdenarNombre from '@/components/panel/stock/ColorOrdenarNombre';

const getColores = async (
  page: number,
  buscar: string | string[],
  ordenar: string | string[]
) => {
  const url = `${process.env.API_URL}/colores?page=${page}&search=${buscar}&sort=${ordenar}`;

  try {
    const req = await fetch(url);
    const json = await req.json();

    const colores = ColoresSchema.parse(json.datos);
    const metadatos = MetaDatos.parse(json.metadatos);

    const { paginas, total, actual } = metadatos;

    return { colores, paginas, total, actual };
  } catch (error) {
    console.log(error)
    return { colores: [], paginas: 1, total: 0, actual: 1 };
  }
};
export default async function ColoresPage({
  searchParams
}: {
  searchParams: SearchParams;
}) {
  const { page, search, sort } = await searchParams;

  const paginaActual = page ? +page : 1;
  const buscar = search ? search : '';
  const ordenar = sort ? sort : 'codigoColor';

  const { colores, paginas, total, actual } = await getColores(
    paginaActual,
    buscar,
    ordenar
  );

  return (
    <>
      <div className=''>
        <Titulo nombreTitulo={'Listado de colores'} />
        <div className='flex justify-between'>
          <Buscar placeholder={'nombre color'} />
          <Link href={'/panel/stock/colores/agregar'}>
            <MdLibraryAdd size={38} />
          </Link>
        </div>

        <div className='mt-2 flex flex-col justify-center items-center md:flex-row md:justify-between md:items-center'>
          <p className=''>
            <span>Total de registros encontrados: </span>
            {total}
          </p>
          {colores.length ? <Pagination currentPage={actual} totalPages={paginas}/>:null}
          
        </div>
        {!colores.length ? (
          <div className=' flex flex-col justify-center items-center pt-5 '>
            <Titulo nombreTitulo={'Listado de colores'} />
            <p className='text-destructive pt-5 text-xl font-bold text-center'>
              No hay registros con esas condiciones. Reintente,por favor.
            </p>
          </div>
        ) : (
          <div className='flex flex-col items-center mt-3'>
            <table className='mt-4'>
              <thead className='pb-5'>
                <tr className='text-center text-gray-500  border-b-2 border-b-gray-500 '>
                  {/* <th className='hidden md:table-cell'>Id</th> */}
                  <th className='hidden md:table-cell md:min-w-[150] '>
                    <ColorOrdenarCodigo />
                  </th>
                  <th className='w-[150] md:w-[150]'>
                    <ColorOrdenarNombre />
                  </th>
                  <th className='w-[150]'>Acciones</th>
                </tr>
              </thead>
              <tbody className='mt-6'>
                {colores.map((color) => (
                  <tr
                    key={color._id}
                    className=' text-center border-b border-zinc-400 h-[50]'
                  >
                    {/* <td className='hidden md:table-cell'>{color._id}</td> */}
                    <td className='hidden md:table-cell md:min-w-[150] '>
                      {color.codigoColor}
                    </td>
                    <td className='w-[150] md:w-[250] capitalize '>{color.nombreColor}</td>
                    <td className='w-[150] md:w-[250]'>
                      <div className='flex gap-2 justify-center'>
                        <Link href={`/panel/stock/colores/${color._id}`}>
                          <MdModeEdit size={24} className='' />
                        </Link>
                        <ColorFormDelete colorId={color._id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
