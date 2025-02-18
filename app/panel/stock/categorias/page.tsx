import Buscar from '@/components/ui/Buscar';
import Pagination from '@/components/ui/Pagination';
import Titulo from '@/components/ui/Titulo';

import { CategoriasSchema, MetaDatos } from '@/utils/schemasZod';
import { SearchParams } from '@/utils/types';
import Link from 'next/link';
import { MdLibraryAdd, MdModeEdit } from 'react-icons/md';
import CategoriaFormDelete from '@/components/panel/stock/CategoriaFormDelete';
import OrdenarRegistro from '@/components/ui/OrdenarRegistros';

const archivo = 'categorias';
const archivoCompleto = 'stock/categorias';

const getCategorias = async (
  page: number,
  buscar: string | string[],
  ordenar: string | string[]
) => {
  const url = `${process.env.API_URL}/${archivo}?page=${page}&search=${buscar}&sort=${ordenar}`;

  try {
    const req = await fetch(url);
    const json = await req.json();

    const datos = CategoriasSchema.parse(json.datos);
    const metadatos = MetaDatos.parse(json.metadatos);

    const { paginas, total, actual } = metadatos;

    return { datos, paginas, total, actual };
  } catch (error) {
    console.log(error)
    return { datos: [], paginas: 1, total: 0, actual: 1 };
  }
};
export default async function CategoriasPage({
  searchParams
}: {
  searchParams: SearchParams;
}) {
  const { page, search, sort } = await searchParams;

  const paginaActual = page ? +page : 1;
  const buscar = search ? search : '';
  const ordenar = sort ? sort : 'ordenEnMenu';

  const { datos, paginas, total, actual } = await getCategorias(
    paginaActual,
    buscar,
    ordenar
  );

  return (
    <>
      <div className=''>
        <Titulo nombreTitulo={'Listado de categorías'} />
        <div className='flex justify-between'>
          <Buscar placeholder={'nombre categoria'} />
          <Link href={`/panel/${archivoCompleto}/agregar`}>
            <MdLibraryAdd size={38} />
          </Link>
        </div>

        <div className='mt-2 flex flex-col justify-center items-center md:flex-row md:justify-between md:items-center'>
          <p className=''>
            <span>Total de registros encontrados: </span>
            {total}
          </p>
          {datos.length ? (
            <Pagination currentPage={actual} totalPages={paginas} />
          ) : null}
        </div>
        {!datos.length ? (
          <div className=' flex flex-col justify-center items-center pt-5 '>
            <Titulo nombreTitulo={'Listado de categorías'} />
            <p className='text-destructive pt-5 text-xl font-bold text-center'>
              No hay registros con esas condiciones. Reintente,por favor.
            </p>
          </div>
        ) : (
          <div className='flex flex-col items-center mt-3'>
            <table className='mt-4'>
              <thead className='pb-5'>
                <tr className='text-center text-gray-500  border-b-2 border-b-gray-500 '>
                  <th className='  w-[80] md:w-[100]'><OrdenarRegistro nombreColumna={'Orden'} campoColumna={'ordenEnMenu'}/></th>
                  <th className=' md:min-w-[150] '><OrdenarRegistro nombreColumna={'Nombre'} campoColumna={'nombreCategoria'}/></th>
                  <th className='hidden md:table-cell  w-[150] md:w-[150]'>
                    <OrdenarRegistro nombreColumna={'Tipo Categoria'} campoColumna={'tipoCategoria'}/>
                  
                  </th>

                  <th className='w-[150]'>Acciones</th>
                </tr>
              </thead>
              <tbody className='mt-6'>
                {datos.map((dato) => (
                  <tr
                    key={dato._id}
                    className=' text-center border-b border-zinc-400 h-[50]'
                  >
                    <td className='  w-[80] md:w-[100]'>{dato.ordenEnMenu}</td>
                    <td className=' text-left capitalize  md:min-w-[150] '>
                      {dato.nombreCategoria}
                    </td>
                    <td className='hidden  md:table-cell w-[150] md:w-[250] capitalize '>
                      {dato.tipoCategoria}
                    </td>
                    <td className='w-[150] md:w-[250]'>
                      <div className='flex gap-2 justify-center'>
                        <Link href={`/panel/stock/categorias/${dato._id}`}>
                          <MdModeEdit size={24} className='' />
                        </Link>
                        <CategoriaFormDelete campoId={dato._id} />
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
