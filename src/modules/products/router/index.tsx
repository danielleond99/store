import { FC, ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import { Products } from "../pages";
import { Navigate } from "react-router";

export const ProductsRouter: FC = (): ReactElement => {
  return (
    <Routes>
      <Route path={""} element={<Products />} />
      <Route path={"create"} element={<Products />} />
      <Route path={":productId/edit"} element={<Products />} />
      <Route path={"*"} element={<Navigate to={"/dashboard"} replace />} />
    </Routes>
  );
};

export default ProductsRouter;
