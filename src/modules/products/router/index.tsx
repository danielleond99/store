import { FC, ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import { ProductsPage } from "../pages/ProductsPage";

export const Products: FC = (): ReactElement => {
  return (
    <Routes>
      <Route path={""} element={<ProductsPage />} />
    </Routes>
  );
};

export default Products;
