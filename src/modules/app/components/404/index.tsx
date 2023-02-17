import { NavLink } from 'react-router-dom';
export const PageNotFound = () => {
  return (
    <div className="card">
      <div
        className="flex align-content-center flex-column justify-content-center flex-wrap card-container yellow-container"
        style={{ height: '100vh' }}
      >
        <p className="text-green-500 font-bold text-5xl">
          Página no encontrada
        </p>
        <NavLink to={'/dashboard'} className={'text-primary font-semibold no-underline'}>
          Regresar al inicio
        </NavLink>
      </div>
    </div>
  );
};
