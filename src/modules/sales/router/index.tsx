import { FC, ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import { SalesPage } from "../pages/SalesPage";

export const SalesRouter: FC = (): ReactElement => {
  return (
    <Routes>
      <Route path={""} element={<SalesPage />} />
    </Routes>
  );
};

export default SalesRouter;
