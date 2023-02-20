import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ColumnProps } from "primereact/column";
import { CrudLayout } from "../../shared/layouts";
import { FormProduct } from "../components/FormProduct";
import { TablesEnums } from "../../shared/enums";
import { useSelector } from "react-redux";
import { deleteProduct, productsSelector } from "../redux";
import { useAppDispatch } from "../../app/store";
import { getProducts } from "../redux/index";
import { IProduct } from "../types/index";
import { ActionBodyTemplate } from "../../app/components/ActionBodyTemplate";

export const Products = () => {
  const disptach = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { products, loadingProducts } = useSelector(productsSelector);

  useEffect(() => {
    if (!location.pathname.includes("create")) disptach(getProducts({}));
  }, [disptach, location]);

  const column: ColumnProps[] = [
    {
      field: "code_product",
      header: "Code",
      sortable: true,
    },
    {
      field: "id_store",
      header: "Store",
      sortable: true,
    },
    {
      field: "name_product",
      header: "Name",
      sortable: true,
    },
    {
      field: "price_product",
      header: "Price",
      sortable: true,
    },
    {
      field: "stock_product",
      header: "Stock",
      sortable: true,
    },
    {
      field: "actions",
      header: "Actions",
      body: (data: IProduct) => (
        <ActionBodyTemplate
          onEdit={() =>
            navigate(`/dashboard/products/${data.code_product}/edit`)
          }
          onDelete={() => disptach(deleteProduct(data.code_product))}
        />
      ),
    },
  ];

  return (
    <CrudLayout
      showloading={loadingProducts}
      update={{
        updateForm: <FormProduct />,
        updateFormTitle: "Update product",
      }}
      create={{
        createForm: <FormProduct />,
        createFormTitle: "Create product",
      }}
      list={{
        titleHeaderTable: "Products",
        typeHeaderTabe: TablesEnums.products,

        loading: loadingProducts,
        columsTable: column,
        value: products,
      }}
    />
  );
};
