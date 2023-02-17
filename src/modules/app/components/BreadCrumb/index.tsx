import { BreadCrumb as BreadCrumbPrime } from 'primereact/breadcrumb';
import { FC, useEffect, useState } from 'react';
import { MenuItem } from 'primereact/menuitem';
import { useLocation, useNavigate } from 'react-router-dom';

interface BreadCrumbProps {
  model?: MenuItem[];
}

export const BreadCrumb: FC<BreadCrumbProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [history, setHistory] = useState<MenuItem[]>([
    {
      label: 'Home',
      command() {
        navigate('/dahsboard');
      },
    },
  ]);
  const home = {
    icon: 'pi pi-home',
    command() {
      navigate('/dahsboard');
    },
  };

  useEffect(() => {
    const paths = location.pathname.split('/').slice(-1);
    setHistory(
      paths.map((path) => {
        let pathName = '';
        switch (path) {
          case 'edit':
            pathName = 'Editar';
            break;
          case 'fromCampana':
            pathName = 'Promociones';
            break;
          case 'dashboard':
            pathName = 'Administración';
            break;
          case 'create':
            pathName = 'Crear';
            break;
          case 'home':
            pathName = 'Inicio';
            break;
          case 'campaings':
            pathName = 'Campañas';
            break;
          case 'promotions':
            pathName = 'Promociones';
            break;
          case 'restrictions':
            pathName = 'Restricciones';
            break;
          case 'rules':
            pathName = 'Reglas';
            break;
          case 'users':
            pathName = 'Usuarios';
            break;
          case 'store':
            pathName = 'Tiendas';
            break;
          case '0':
            pathName = 'Restricciones';
            break;
          case 'ver':
            pathName = 'Restricciones';
            break;
          default:
            pathName = path;
        }
        return {
          label:
            path === ''
              ? 'Administración'
              : `${pathName[0]?.toUpperCase()}${pathName.substring(1)}`,
          className: 'text-lg',
        };
      })
    );
  }, [location]);
  return (
    <BreadCrumbPrime
      model={history}
      className={'mx-5 mt-8 mb-1 border-none bg-primary-50'}
      home={home}
    />
  );
};
