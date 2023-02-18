import { FC, ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router";
import { Sales } from "../pages/index";

export const SalesRouter: FC = (): ReactElement => {
  return (
    <Routes>
      <Route path={""} element={<Sales />} />
      <Route path={"create"} element={<Sales />} />
      <Route path={":saleId/edit"} element={<Sales />} />
      <Route path={"*"} element={<Navigate to={"/dashboard"} replace />} />
    </Routes>
  );
};

export default SalesRouter;
