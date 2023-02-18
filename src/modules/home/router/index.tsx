import { FC, lazy, ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

import { HomePage } from "../pages/HomePage";
import { MainLayout } from "../../app/layout/MainLayout";
import { useSelector } from "react-redux";
import { authSelector } from "../../auth/redux";
import { PrivateRoute } from "../../app/router/PrivateRoute";

const ProductsRouter = lazy(() => import("../../products/router"));
const SalesRouter = lazy(() => import("../../sales/router"));

export const HomeRouter: FC = (): ReactElement => {
  const { user, logged } = useSelector(authSelector);
  return (
    <Routes>
      <Route path={""} element={<MainLayout />}>
        <Route element={<PrivateRoute isAllowed={!!user && logged} />}>
          <Route index element={<HomePage />} />
          <Route path={"sales/*"} element={<SalesRouter />} />
          <Route path={"products/*"} element={<ProductsRouter />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default HomeRouter;
