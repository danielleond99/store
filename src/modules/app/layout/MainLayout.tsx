import { FC, ReactElement } from "react";
import { Outlet } from "react-router-dom";

import { MenuItem } from "primereact/menuitem";

import { useSelector } from "react-redux";
import { authSelector } from "../../auth/redux";
import { NavLink } from "../components/NavLink";
import { MenuBar } from "../components/MenuBar";

export const MainLayout: FC = (): ReactElement => {
  const { user } = useSelector(authSelector);
  const items: MenuItem[] = [
    // {
    //   template: () => (
    //     <NavLink
    //       to={
    //         user?.rol.includes(Roles.Administrador)
    //           ? '/dashboard'
    //           : '/dashboard/familiar/promotions'
    //       }
    //       end
    //       icon={'pi pi-pw pi-home'}
    //       label={'Inicio'}
    //     />
    //   ),
    // },
    {
      template: () => (
        <NavLink
          to={"/dashboard"}
          end
          icon={"pi pi-pw pi-home"}
          label={"Inicio"}
        />
      ),
    },
    {
      template: () => (
        <NavLink
          to={"/dashboard/campaings"}
          end
          icon={"pi pi-pw pi-megaphone"}
          label={"Campañas"}
        />
      ),
    },
    {
      template: () => (
        <NavLink
          to={"/dashboard/promotions"}
          end
          icon={"pi pi-pw pi-tags"}
          label={"Promociones"}
        />
      ),
    },
    // {
    //   template: () => (
    //     <NavLink
    //       to={'/dashboard/rules'}
    //       end
    //       icon={'pi pi-pw pi-delete-left'}
    //       label={'Reglas'}
    //     />
    //   ),
    // },
    // {
    //   template: () => (
    //     <NavLink
    //       to={'/dashboard/restrictions'}
    //       end
    //       icon={'pi pi-pw pi-ban'}
    //       label={'Restricciones'}
    //     />
    //   ),
    // },
    {
      template: () => (
        <NavLink
          to={"/dashboard/store"}
          end
          icon={"pi pi-pw pi-gift"}
          label={"Tiendas"}
        />
      ),
    },
    {
      template: () => (
        <NavLink
          to={"/dashboard/users"}
          end
          icon={"pi pi-pw pi-users"}
          label={"Usuarios"}
        />
      ),
    },
    {
      visible: false,
      template: () => {
        return (
          <a
            className={
              "p-button-text text-color hover:text-primary px-2 no-underline"
            }
            href={
              "https://stage.cupones.alsea.com.mx/WebCupones/alsea/tags/cuponeraAlsea?tm=alsea"
            }
            target={"_blank"}
            rel="noreferrer"
          >
            <i className={"pi pi-pw pi-chart-bar"}></i>
            <span className={"ml-2"}>Estadísticas</span>
          </a>
        );
      },
    },
  ];
  return (
    <div className={"container bg-primary-50"}>
      <MenuBar model={items} />
      <div className={"mx-4 mb-7 fadein animation-duration-500 z-0"}>
        <Outlet />
      </div>
    </div>
  );
};
