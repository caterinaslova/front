import { MdAirportShuttle,MdAssignment,MdAssignmentAdd,MdCalculate,MdCarCrash,MdCoPresent,MdContactEmergency,MdContentPaste,MdFilterListAlt,MdFormatPaint,MdGamepad,MdGppGood } from "react-icons/md";

export const menuItems =  [
    {
      titulo: 'ventas',
      ruta: '/panel/ventas',
      submenues: [
        { subtitulo: 'entregas', subruta: '/panel/ventas/entregas',icon:<MdAirportShuttle /> },
        { subtitulo: 'cobranzas', subruta: '/panel/ventas/cobranzas',icon:<MdAssignment /> },
        { subtitulo: 'comprobantes', subruta: '/panel/ventas/comprobantes', icon:<MdAssignmentAdd /> },
        { subtitulo: 'clientes', subruta: '/panel/ventas/clientes',icon:<MdCoPresent /> },
      ],
    },
    {
      titulo: 'compras',
      ruta: '/panel/compras',
      submenues: [
        { subtitulo: 'pedidos', subruta: '/panel/compras/pedidos',icon:<MdCarCrash />},
        { subtitulo: 'deudas', subruta: '/panel/compras/deudas',icon:<MdCalculate /> },
        { subtitulo: 'comprobantes', subruta: '/panel/compras/comprobantes',icon:<MdContentPaste /> },
        { subtitulo: 'proveedores', subruta: '/panel/compras/proveedores',icon:<MdContactEmergency /> },
      ],
    },
    {
      titulo: 'stock',
      ruta: '/panel/stock',
      submenues: [
        { subtitulo: 'categorias', subruta: '/panel/stock/categorias',icon:<MdFilterListAlt /> },
        { subtitulo: 'colores', subruta: '/panel/stock/colores?page=1',icon:<MdFormatPaint /> },
        { subtitulo: 'productos', subruta: '/panel/stock/productos',icon:<MdGamepad /> },
        { subtitulo: 'items comprobante', subruta: '/panel/stock/itemscomprobante',icon:<MdGppGood />},
      ],
    },
    {
      titulo: 'contabilidad',
      ruta: '/panel/contabilidad',
      submenues: [
        { subtitulo: 'usuarios', subruta: '/panel/contabilidad/movimientos',icon:<MdCoPresent /> },
        { subtitulo: 'movimientos', subruta: '/panel/contabilidad/movimientos',icon:<MdFilterListAlt /> }
  
      ],
    },
  ];