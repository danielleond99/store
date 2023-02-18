import { FC, ReactElement } from "react";
import { Outlet } from "react-router-dom";

import { MenuItem } from "primereact/menuitem";

import { NavLink } from "../components/NavLink";
import { MenuBar } from "../components/MenuBar";

export const MainLayout: FC = (): ReactElement => {
  const items: MenuItem[] = [
    {
      template: () => (
        <NavLink
          to={"/dashboard"}
          end
          icon={"pi pi-pw pi-home"}
          label={"Home"}
        />
      ),
    },
    {
      template: () => (
        <NavLink
          to={"/dashboard/products"}
          end
          icon={"pi pi-pw pi-gift"}
          label={"Products"}
        />
      ),
    },  
    {
      template: () => (
        <NavLink
          to={"/dashboard/sales"}
          end
          icon={"pi pi-pw pi-shopping-cart"}
          label={"Sales"}
        />
      ),
    },
  ];
  return (
    <div className={"container"}>
      <MenuBar model={items} />
      <div className={"mt-7 pt-2 fadein animation-duration-500 z-0"}>
        <Outlet />
      </div>
    </div>
  );
};
