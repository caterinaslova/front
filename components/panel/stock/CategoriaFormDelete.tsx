'use client';

import { CategoriaSchemaType} from '@/utils/types';
import { useRouter,useSearchParams } from 'next/navigation';
import { useActionState, useEffect, useState, startTransition } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { MdEventBusy} from 'react-icons/md';
import { categoriaActionDelete } from '@/app/actions/categoria-action';


const archivo = "stock/categorias"


export default function ColorFormDelete({
  campoId,
}: {
  campoId: CategoriaSchemaType['_id'];
}) {
  const router = useRouter();
  const searchParams = useSearchParams()
 
  const { handleSubmit } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const campoActionDeleteWithId = categoriaActionDelete.bind(null, campoId);
  const [state, dispatch] = useActionState(campoActionDeleteWithId, {
    success: '',
    errors: [],
  });


  useEffect(() => {
    if (state.errors.length) {
      state.errors.map((renglon) => toast.error(renglon));
    }
    if (state.success) {
      const actualPage = searchParams.get('page') || 1
      // debo poner todos los params posibles- limit-sort-search
      toast.success(state.success);
      router.push(`/panel/${archivo}?page=${actualPage}`);
    }
  }, [state]);

 

  return (
    <form
      action={dispatch}
      onSubmit={(evento) => {
        evento.preventDefault();
        handleSubmit(() => {
          setIsSubmitting(true);
          startTransition(()=>dispatch())
        })(evento);
      }}
    >
      <button type='submit' disabled={isSubmitting} className='disabled:opacity-20'> <MdEventBusy size={24} className="text-destructive" /></button>
    </form>
  );
}
