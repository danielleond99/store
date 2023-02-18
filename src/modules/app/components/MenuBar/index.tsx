import { Menubar } from "primereact/menubar";
import { FC, ReactElement, useRef } from "react";
import { MenuItem } from "primereact/menuitem";
import { TieredMenu } from "primereact/tieredmenu";
import { Button } from "primereact/button";
import { logout, authSelector } from "../../../auth/redux";
import { useAppDispatch } from "../../store";
import { useSelector } from "react-redux";

interface MenuProps {
  model?: MenuItem[];
  start?: any;
  end?: any;
  style?: string;
}

export const MenuBar: FC<MenuProps> = ({
  model,
  start,
  end,
  style,
}): ReactElement => {
  const { user, logged } = useSelector(authSelector);
  const dispatch = useAppDispatch();
  const menu = useRef<any>(null);
  const menuItems: MenuItem[] = [
    {
      label: !!user && logged ? "Salir" : "Entrar",
      icon: "pi pi-fw pi-sign-out",
      command() {
        dispatch(logout());
      },
    },
  ];

  return (
    <Menubar
      style={{
        background: `linear-gradient(to right, var(--primary-200), var(--primary-100), var(--primary-100), var(--primary-50))`,
      }}
      className={`shadow-3 max-w-screen w-screen fixed top-0 z-5 border-transparent -mt-1 ${style}`}
      model={model}
      end={
        end ?? (
          <div>
            <TieredMenu model={menuItems} popup ref={menu} id="overlay_tmenu" />
            <Button
              label={`${user!.user_name.slice(0, 2).toUpperCase()}`}
              className="p-button-rounded transition-duration-400 hover:shadow-4"
              aria-label="User"
              onClick={(event) => menu.current?.toggle(event)}
              aria-haspopup
              aria-controls="overlay_tmenu"
            />
          </div>
        )
      }
    />
  );
};
