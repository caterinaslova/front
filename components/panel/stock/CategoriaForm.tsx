'use client';

import {
  categoriaActionAgregar,
  categoriaActionModificar,
} from '@/app/actions/categoria-action';

import {  CategoriaSchemaAgregar, CategoriaSchemaModificar } from '@/utils/schemasZod';
import { CategoriaSchemaType } from '@/utils/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { Switch } from '@headlessui/react';
import Form from 'next/form'
import Image from 'next/image';

type CategoriaFormProps = {
  tarea: string;
  categoria?: CategoriaSchemaType;
};



export default function CategoriaForm({ tarea, categoria }: CategoriaFormProps) {


  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [enabled, setEnabled] = useState(categoria?.validaActualmente==="on"?true:false);

 

  const [state, dispatch] = useActionState(
    tarea === 'agregar'
      ? categoriaActionAgregar
      : categoriaActionModificar.bind(null, categoria!._id),
    {
      success: '',
      errors: [],
    }
  );
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors: rhfErrors, isSubmitSuccessful },
  } = useForm<z.output<typeof CategoriaSchemaModificar>>({
    resolver: zodResolver(tarea === "agregar" ? CategoriaSchemaAgregar: CategoriaSchemaModificar),
    defaultValues: {
  
      nombreCategoria: categoria?.nombreCategoria
        ? categoria.nombreCategoria
        : '',
      descripcionCategoria: categoria?.descripcionCategoria
        ? categoria.descripcionCategoria
        : '',
      tipoCategoria: categoria?.tipoCategoria ? categoria.tipoCategoria : "Mercadería Reventa",
      ordenEnMenu: categoria?.ordenEnMenu ? categoria.ordenEnMenu : 0,
      validaActualmente: categoria?.validaActualmente ? categoria.validaActualmente :"off", 
      imagenCategoria: categoria?.imagenCategoria ? categoria.imagenCategoria : "imagenvacia.jpg",

    },
    mode: 'onTouched',
  });

  const hayFoto = categoria?.imagenCategoria && categoria.imagenCategoria !== 'imagenvacia.jpg'  ? true : false

  useEffect(() => {
    if (state.errors.length) {
     
      setIsSubmitting(false);
      state.errors.map((renglon) => toast.error(renglon));
    }
    if (state.success) {
      toast.success(state.success);
      if (isSubmitSuccessful && state.success) {
        reset();
      }
      router.push('/panel/stock/categorias');
    }
  }, [state,isSubmitSuccessful]);
  useEffect(() => {
    if (isSubmitSuccessful && state.success) {
      reset();
    }
  }, [reset, isSubmitSuccessful, state.success]);
  const carpetaPropuesta:string = watch('nombreCategoria') 
  return (
    <Form
      action={dispatch}
 
      className='my-3 w-full'
      ref={formRef}
      onSubmit={(evt) => {
        evt.preventDefault();
        
        handleSubmit(() => {
          setIsSubmitting(true);
          startTransition(() => dispatch(new FormData(formRef.current!)));
        })(evt);
      }}
    >
      <div className=' grid grid-cols-1 md:grid md:grid-cols-2 items-center justify-between gap-3 w-full mb-3'>
        <div className='flex flex-col gap-2 mb-3'>
          <label htmlFor=''>Nombre:</label>
          <input
            type='text'
            {...register('nombreCategoria')}
            className='p-3 border border-primary rounded-md '
          />

          {rhfErrors.nombreCategoria?.message && (
            <p className='text-red-500'>{rhfErrors.nombreCategoria?.message}</p>
          )}
        </div>

        <div className='flex flex-col gap-2 mb-3'>
          <label htmlFor=''>Descripción:</label>
          <input
            type='text'
            {...register('descripcionCategoria')}
            className='p-3 border border-primary rounded-md '
          />
          {rhfErrors.descripcionCategoria?.message && (
            <p className='text-red-500'>
              {rhfErrors.descripcionCategoria.message}
            </p>
          )}
        </div>

        <div className='flex flex-col gap-2 mb-3'>
          <label htmlFor=''>Tipo de Categoría:</label>
          <select
            {...register('tipoCategoria')}
            className='p-3 border border-primary rounded-md'
          >
            <option value='Mercadería Reventa'>Mercadería Reventa</option>
            <option value='Ingreso Contable'>Ingreso Contable</option>
            <option value='Egreso Contable'>Egreso Contable</option>
          </select>
          {rhfErrors.tipoCategoria?.message && (
            <p className='text-red-500'>{rhfErrors.tipoCategoria.message}</p>
          )}
        </div>

        <div className='flex flex-col gap-2 mb-3'>
          <label htmlFor=''>Orden en Menú:</label>
          <input
            type='number'
            {...register('ordenEnMenu')}
            className='p-3 border border-primary rounded-md'
          />
          {rhfErrors.ordenEnMenu?.message && (
            <p className='text-red-500'>{rhfErrors.ordenEnMenu.message}</p>
          )}
        </div>


        <div className='flex flex-col gap-2 mb-3'>
          <label htmlFor=''>Carpeta de las fotos:</label>
          <input
            type='text'
            defaultValue={carpetaPropuesta.split(' ').join('-').toLowerCase()}
         
            {...register('carpetaFotos')}
            className={`p-3 border border-primary rounded-md ${tarea==="modificar" ?"bg-zinc-200 border-none dark:bg-zinc-800" : ""}`}
            readOnly={tarea==="modificar"}
          />
          {rhfErrors.carpetaFotos?.message && (
            <p className='text-red-500'>{rhfErrors.carpetaFotos.message}</p>
          )}
        </div>
        <div className=" flex gap-1 items-center justify-center">
          <label className='text-xl'>Válida actualmente:</label>
          <Switch
            checked={enabled}
            onChange={setEnabled}
          
            name="validaActualmente"
            className='group inline-flex h-7 w-14 items-center rounded-full bg-gray-400 data-[checked]:bg-blue-600 dark:data-[checked]:bg-black data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50'
          >
            <span className='size-5 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-8' />
          </Switch>
        </div>
        {
          tarea ==="modificar" ?(
            
            <div className='flex flex-col gap-2 mb-3 items-center'>
            {
              hayFoto && (
                <>
                <div className="w-[150] h-[150] flex items-center justify-self-center">
                <Image src={`${process.env.NEXT_PUBLIC_API_URL}/imagenes/${categoria?.carpetaFotos}/${categoria?.imagenCategoria}`} alt="nombre" width={150} height={150} priority className='object-cover w-auto h-auto rounded-md'/>

                </div>
                </>
              )
            }
            
            {
              !hayFoto && (
                <>
                <div className="w-[150] h-[150] flex items-center justify-self-center">
                <Image src={`${process.env.NEXT_PUBLIC_API_URL}/imagenes/${categoria?.imagenCategoria}`} alt="nombre" width={150} height={150} priority className='object-cover w-auto h-auto rounded-md'/>

                </div>
                </>
              )

            }
            <label htmlFor=''>Imagen de la categoría:</label>
            <input
              type='file'
              {...register('imagenCategoria')}
              className='p-3 border border-primary rounded-md'
            />
            {rhfErrors.imagenCategoria?.message && (
              // <p className='text-red-500'>'{rhfErrors.imagenCategoria.message}'</p>
              <p></p>
            )}
          </div>
          ):null
        }



      </div>

      <button
        type='submit'
        className='py-3 px-7 bg-zinc-800 text-white rounded tracking-widest  w-full hover:bg-zinc-950 cursor-pointer disabled:opacity-20'
        disabled={isSubmitting}
      >
        {isSubmitting
          ? 'Procesando'
          : tarea === 'agregar'
          ? 'Agregar'
          : 'Modificar'}
      </button>
    </Form>
  );
}
