import { FC, ReactElement } from "react";
import { CardHome } from "../../app/components/CardHome";

export const HomePage: FC = (): ReactElement => {
  return (
    <div className="grid pt-3">
      <div className="col-4">
        <CardHome
          type={"products"}
          label={"products"}
          color={"blue"}
          icon={"pi-gift"}
        />
      </div>
      <div className="col-4">
        <CardHome
          label={"sales"}
          type={"sales"}
          color={"green"}
          icon={"pi-shopping-cart"}
        />
      </div>
    </div>
  );
};
