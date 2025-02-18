'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CgChevronLeft, CgChevronRight } from 'react-icons/cg';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};
type ButtonProps = {
  page: number;
  activeClass: boolean;
};

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // const pageButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page: number) => {
    const defaultParams = {
        search : searchParams.get('search') || '',
        sort:searchParams.get('sort') || '',
        page:String(page)
    }
    const params = new URLSearchParams(defaultParams);
    router.push(`${pathname}?${params.toString()}`)
  };

  const addPageButton = ({page,activeClass}:ButtonProps) => {
    return(
        <button key={page} className={`border border-gray-800 p-1 rounded ${activeClass ? 'bg-zinc-800 text-white' : ''}`} onClick={()=>handlePageChange(page)}>{page}</button>
    )
  };


  const renderPageButtons = () => {
    const pageButtons=[];
    // first button
    pageButtons.push(
        addPageButton({page:1, activeClass: currentPage===1})
    )
    // dots

    if(currentPage > 3){
        pageButtons.push(
            <button key={'dots-1'} className='border border-gray-800 p-1 rounded font-black' >...</button>
        )
    }

    // one before

    if(currentPage!== 1 && currentPage !== 2){
        pageButtons.push(
            addPageButton({page:currentPage-1, activeClass:false})
        )

    }

    // current button
    if(currentPage!== 1 && currentPage !== totalPages){
        pageButtons.push(
            addPageButton({page:currentPage, activeClass:true})
        )
    }

    // one after
    
    if(currentPage!== totalPages && currentPage !== totalPages-1 &&  currentPage !== 1){
        pageButtons.push(
            addPageButton({page:currentPage+1, activeClass:false})
        )

    }



        // dots

        if(currentPage < totalPages-1){
            pageButtons.push(
                <button key={'dots-2'} className='border border-gray-800 p-1 rounded font-black' >...</button>
            )
        }
 

    // last button
    if (totalPages!==1){

      pageButtons.push(
          addPageButton({page:totalPages, activeClass: currentPage===totalPages})
      )
    }

    return pageButtons
    
  };
  return (
    <div className='flex gap-x-2 mt-5'>
      <button
        className='flex items-center gap-x-2 border border-gray-800 p-1 rounded disabled:opacity-20'
        onClick={() => {
            let prevPage = currentPage-1;
            if(prevPage < 1) prevPage = totalPages;
            handlePageChange(prevPage)
        }}
        disabled={currentPage===1}
      >
        <CgChevronLeft />
        anterior
      </button>
        {renderPageButtons()}
      <button
        className='flex items-center gap-x-2 border border-gray-800 p-1 rounded disabled:opacity-20'
        onClick={() => {
            let nextPage = currentPage + 1;
            if(nextPage > totalPages) nextPage = 1;
            handlePageChange(nextPage)
        }}
        disabled={currentPage===totalPages}
      >
        siguiente
        <CgChevronRight />
      </button>
    </div>
  );
}
