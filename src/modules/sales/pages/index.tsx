import { useLocation, useNavigate } from 'react-router-dom';
import { ColumnProps } from "primereact/column";
import { CrudLayout } from "../../shared/layouts";
import { TablesEnums } from "../../shared/enums";
import { FormSale } from "../components/FormSale";
import { useAppDispatch } from "../../app/store";
import { getSales, salesSelector } from "../redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { ActionBodyTemplate } from "../../app/components/ActionBodyTemplate";
import { ISale } from '../types/index';

export const Sales = () => {
  const disptach = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { sales, loadingSales } = useSelector(salesSelector);

  useEffect(() => {
    if (!location.pathname.includes("create")) disptach(getSales({}));
  }, [disptach, location]);

  const column: ColumnProps[] = [
    {
      field: "code_product",
      header: "Code",
      sortable: true,
    },
    {
      field: "count_product",
      header: "Count",
      sortable: true,
    },
    {
      field: "type_of_sale",
      header: "Sale type",
      sortable: true,
    },
    {
      field: "actions",
      header: "Actions",
      body: (data: ISale) => (
        <ActionBodyTemplate
          onEdit={() => navigate(`/dashboard/sales/${data.id}/edit`)}
          onDelete={() => {}}
        />
      ),
    },
  ];

  return (
    <CrudLayout
      showloading={loadingSales}
      update={{
        updateForm: <FormSale />,
        updateFormTitle: "Update sale",
      }}
      create={{
        createForm: <FormSale />,
        createFormTitle: "Create sale",
      }}
      list={{
        titleHeaderTable: "Sales",
        typeHeaderTabe: TablesEnums.sales,

        loading: loadingSales,
        columsTable: column,
        value: sales,
      }}
    />
  );
};
