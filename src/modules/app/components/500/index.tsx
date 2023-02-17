import { NavLink } from 'react-router-dom';
export const PageServerError = () => {
  return (
    <div className="card">
      <div
        className="flex align-content-center flex-column justify-content-center flex-wrap card-container yellow-container"
        style={{ height: '100vh' }}
      >
        <p className="text-green-500 font-bold text-5xl">
          Ha ocurrido un error, intente más tarde
        </p>
        <NavLink to={'/dashboard'} className={'text-primary font-semibold no-underline'}>
          Volver a intentar
        </NavLink>
      </div>
    </div>
  );
};
