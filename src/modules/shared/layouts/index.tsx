import { FC, useEffect } from "react";

import { TablesEnums } from "../enums";
import { ColumnProps } from "primereact/column";
import { useLocation } from "react-router-dom";
import { myLocations } from "../types";
import { Loading } from "../../app/components/Loading";
import { Card } from "../../app/components/Card";
import { GenericTable } from "../../app/components/Table/GenericTable";
import { HeaderTable } from "../../app/components/HeaderTable";

export interface ICrudLayoutProps {
  list: {
    filtersComponents?: JSX.Element;
    typeHeaderTabe: TablesEnums;
    titleHeaderTable: string;
    loading: boolean;
    value: any[] | undefined;
    columsTable: ColumnProps[];
  };
  create: {
    createFormTitle: string;
    createForm: JSX.Element;
  };
  update: {
    updateFormTitle: string;
    updateForm: JSX.Element;
  };
  showloading?: boolean;
}

export const CrudLayout: FC<ICrudLayoutProps> = ({
  list,
  create,
  update,
  showloading = false,
}) => {
  const location = useLocation();
  const {
    columsTable,
    filtersComponents,
    loading,
    titleHeaderTable,
    typeHeaderTabe,
    value,
  } = list;
  const { createForm } = create;
  const { updateForm } = update;
  useEffect(() => {}, []);
  return (
    <>
      {location.pathname.split("/")[2] ===
        myLocations.filter(
          (resp) => resp.name === location.pathname.split("/")[2]
        )[0]?.name && location.pathname.split("/").at(-1) === "edit" ? (
        <> {updateForm}</>
      ) : location.pathname.split("/")[2] ===
          myLocations.filter(
            (resp) => resp.name === location.pathname.split("/")[2]
          )[0].name && location.pathname.split("/").at(-1) === "create" ? (
        <> {createForm}</>
      ) : location.pathname.split("/")[2] ===
        myLocations.filter(
          (resp) => resp.name === location.pathname.split("/")[2]
        )[0]?.name ? (
        <>
          <Loading show={showloading} />
          {filtersComponents && (
            <Card
              style={"mx-3 shadow-3"}
              header={<h2 className="px-3 pt-1 m-0 font-semibold">Filtros</h2>}
            >
              <div className={"grid flex-row -mt-3"}>{filtersComponents}</div>
            </Card>
          )}
          <Card
            header={
              <HeaderTable
                disabled={loading}
                type={typeHeaderTabe}
                title={titleHeaderTable}
              />
            }
            style={"mx-3 my-3 shadow-3"}
          >
            <GenericTable
              value={value}
              dataTable={{ value }}
              colums={columsTable}
              loading={loading}
            />
          </Card>
        </>
      ) : null}
    </>
  );
};
