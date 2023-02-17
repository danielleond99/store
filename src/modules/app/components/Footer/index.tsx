import { FC, ReactElement } from 'react';
import { Menubar } from 'primereact/menubar';

export const Footer: FC = (): ReactElement => {
  const model = [
    {
      template: () => {
        return (
          <span className={'text-color font-bold'}>
            {`© ${new Date().getFullYear()} Alsea Todos los derechos reservados`}
          </span>
        );
      },
    },
  ];
  return (
    <Menubar
      className={
        'hidden lg:flex shadow-3 w-full h-3rem fixed bottom-0 justify-content-center '
      }
      style={{
        background: `linear-gradient(to right, var(--primary-100), var(--primary-50), var(--primary-50), var(--primary-100))`,
      }}
      model={model}
    />
  );
};
