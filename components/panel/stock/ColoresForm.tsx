'use client';

import { colorActionAgregar, colorActionModificar } from '@/app/actions/color-action';

import { ColorSchemaAgregar } from '@/utils/schemasZod';
import { ColorSchemaType } from '@/utils/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { startTransition, useActionState, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

type ColoresFormProps={
  tarea:string;
  color?:ColorSchemaType
}

export default function ColoresForm({tarea,color}:ColoresFormProps) {
  const router = useRouter();
  const[isSubmitting, setIsSubmitting] = useState<boolean>(false)




  const [state, dispatch] = useActionState(tarea==="agregar" ? colorActionAgregar : colorActionModificar.bind(null,color!._id), {
    success: '',
    errors: [],
  });
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors: rhfErrors, isSubmitSuccessful },
  } = useForm<z.output<typeof ColorSchemaAgregar>>({
    resolver: zodResolver(ColorSchemaAgregar),
    defaultValues: {
      codigoColor: color?.codigoColor ? color.codigoColor : '',
      nombreColor: color?.nombreColor ? color.nombreColor : '',
    },
    mode: 'onTouched',
  });



  useEffect(() => {
    if (state.errors.length) {
      setIsSubmitting(false)
      state.errors.map((renglon) => toast.error(renglon));
    }
    if (state.success) {
      toast.success(state.success);
      if (isSubmitSuccessful && state.success) {
        reset();
      }
      router.push('/panel/stock/colores');
    }
  }, [state]);
  useEffect(() => {

    if (isSubmitSuccessful && state.success) {
      reset();
    }
   
  }, [reset, isSubmitSuccessful, state.success]);

  return (
    <form
      action={dispatch}
      className='space-y-5'
      ref={formRef}
      onSubmit={(evt) => {
        evt.preventDefault();
        handleSubmit(() => {
          setIsSubmitting(true)
          startTransition(() => dispatch(new FormData(formRef.current!)));
        })(evt);
      }}
    >
      <div className='flex flex-col gap-2'>
        <label htmlFor=''>Código:</label>
        <input type='text' {...register('codigoColor')} className='w-[300] p-3 border border-primary rounded-md'/>

        {rhfErrors.codigoColor?.message && (
          <p className='text-red-600'>{rhfErrors.codigoColor?.message}</p>
        )}
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor=''>Nombre:</label>
        <input type='text' {...register('nombreColor')}  className='p-3 border border-primary rounded-md'/>
        {rhfErrors.nombreColor?.message && (
          <p className='text-red-500'>{rhfErrors.nombreColor?.message}</p>
        )}
      </div>
      <button
        type='submit'
        className='py-3 px-7 bg-zinc-800 text-white rounded tracking-widest  w-full hover:bg-zinc-950 cursor-pointer disabled:opacity-20'
        disabled={isSubmitting}
    
      >{isSubmitting ? 'Procesando': tarea==="agregar" ? 'Agregar' : 'Modificar'}</button>
    

    </form>
  );
}
