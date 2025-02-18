'use client';
import { colorActionDelete } from '@/app/actions/color-action';
import { ColorSchemaType } from '@/utils/types';
import { useRouter,useSearchParams } from 'next/navigation';
import { useActionState, useEffect, useState, startTransition } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { MdEventBusy } from 'react-icons/md';

export default function ColorFormDelete({
  colorId,
}: {
  colorId: ColorSchemaType['_id'];
}) {
  const router = useRouter();
  const searchParams = useSearchParams()
 
  const { handleSubmit } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const colorActionDeleteWithId = colorActionDelete.bind(null, colorId);
  const [state, dispatch] = useActionState(colorActionDeleteWithId, {
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
      router.push(`/panel/stock/colores?page=${actualPage}`);
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
