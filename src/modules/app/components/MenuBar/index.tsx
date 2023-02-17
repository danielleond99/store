import { Menubar } from "primereact/menubar";
import { FC, ReactElement, useRef } from "react";
import { MenuItem } from "primereact/menuitem";
import { TieredMenu } from "primereact/tieredmenu";
import { Button } from "primereact/button";
import { logout, authSelector } from "../../../auth/redux";
import { useAppDispatch } from "../../store";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavLink } from "../NavLink";

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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const menu = useRef<any>(null);
  const menuItems: MenuItem[] = [
    {
      visible: !!user,
      label: "Mi perfil",
      icon: "pi pi-fw pi-user",
      command() {
        navigate("/dashboard/profile");
      },
    },
    {},
    {
      label: "Mi cuponera",
      icon: "pi pi-fw pi-ticket",
      command() {
        navigate("/clients/my-coupons");
      },
    },
    {},
    {
      label: "Promociones",
      icon: "pi i-pw pi-tags",

      command() {
        navigate("/dashboard/familiar/promotions");
      },
    },
    {},
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
        background: `linear-gradient(to right, var(--primary-100), var(--primary-50), var(--primary-50), var(--primary-100))`,
      }}
      className={`shadow-3 max-w-screen w-screen fixed top-0 z-5 ${style}`}
      model={model}
      start={
        start ?? (
          <Link to={"/dashboard/familiar/promotions"}>
            <img
              alt="logo"
              src={`${require("../../../../assets/main-logo.png")}`}
              height="40"
              className="mr-2"
            />
          </Link>
        )
      }
      end={
        end ?? (
          <div>
            <TieredMenu model={menuItems} popup ref={menu} id="overlay_tmenu" />
            {!user && !logged && (
              <>
                <NavLink
                  labelStyle={"hover:text-primary"}
                  to={"/auth/login"}
                  label={"Entrar"}
                />
              </>
            )}
            {user && logged && (
              <Button
                // icon="pi pi-user"
                label={`${user.nombres.slice(0, 2).toUpperCase()}`}
                className="p-button-rounded transition-duration-400 hover:shadow-4"
                aria-label="User"
                onClick={(event) => menu.current?.toggle(event)}
                aria-haspopup
                aria-controls="overlay_tmenu"
              />
            )}
          </div>
        )
      }
    />
  );
};
