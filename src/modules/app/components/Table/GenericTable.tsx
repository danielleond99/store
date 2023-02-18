import { DataTable } from "primereact/datatable";
import { ChangeEvent, FC, useState } from "react";
import { Column, ColumnProps } from "primereact/column";
import { PaginatorTemplate } from "primereact/paginator";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

interface GenericTableProps {
  dataTable?: any;
  colums: ColumnProps[];
  value: any[] | undefined;
  loading: boolean;
}

export const GenericTable: FC<GenericTableProps> = ({
  colums,
  value,
  loading,
  dataTable,
}) => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInputTooltip, setPageInputTooltip] = useState(
    "Presione 'Enter' para ir a esta página."
  );
  const onPageInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setCurrentPage(+event.target.value);
  };
  const onCustomPage = (event: any): void => {
    setFirst(event.first);
    setRows(event.rows);
    setCurrentPage(+event.page! + 1);
  };
  const onPageInputKeyDown = (event: any, options: any): void => {
    if (event.key === "Enter") {
      const page = parseInt(String(currentPage));
      if (page < 1 || page > options.totalPages) {
        setPageInputTooltip(
          `The value must be between 1 and ${options.totalPages}.`
        );
      } else {
        const first = currentPage !== 0 ? options.rows * (page - 1) : 0;

        setFirst(first);
        setPageInputTooltip("Press 'Enter' to go to this page.");
      }
    }
  };
  const paginatorTemplate: PaginatorTemplate = {
    FirstPageLink: undefined,
    JumpToPageInput: undefined,
    LastPageLink: undefined,
    NextPageLink: undefined,
    PageLinks: undefined,
    PrevPageLink: undefined,
    layout: "RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink",
    RowsPerPageDropdown: (options: any) => {
      const dropdownOptions = [
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 50, value: 50 },
      ];

      return (
        <div>
          <span
            className="mx-1"
            style={{ color: "var(--text-color)", userSelect: "none" }}
          >
            Elements per page:{" "}
          </span>
          <Dropdown
            value={options.value}
            options={dropdownOptions}
            onChange={options.onChange}
            className={"mr-3 border-primary"}
          />
        </div>
      );
    },
    CurrentPageReport: (options: any) => {
      return (
        <div className={"-mr-8"}>
          <span
            style={{
              color: "var(--text-color)",
              userSelect: "none",
              width: "120px",
              textAlign: "center",
            }}
          >
            {options.first} - {options.last} de {options.totalRecords}
          </span>
          <span
            className={"ml-2"}
            style={{ color: "var(--text-color)", userSelect: "none" }}
          >
            {" "}
            Go to{" "}
            <InputText
              type={"number"}
              className="ml-1 w-2 -mr-6 border-primary"
              tooltip={pageInputTooltip}
              //@ts-expect-error
              value={currentPage}
              onKeyDown={(e) => onPageInputKeyDown(e, options)}
              onChange={onPageInputChange}
            />
          </span>
        </div>
      );
    },
  };
  return (
    <DataTable
      {...dataTable}
      emptyMessage={"There are no results to show"}
      className={"w-auto"}
      paginatorClassName="justify-content-end"
      paginatorTemplate={paginatorTemplate}
      first={first}
      rows={rows}
      dataKey={"sk"}
      responsiveLayout="stack"
      onPage={onCustomPage}
      paginator
      removableSort
      scrollable
      scrollDirection={"horizontal"}
      resizableColumns
      columnResizeMode="fit"
    >
      {colums.map((resp, i) => (
        <Column {...resp} key={i} />
      ))}
    </DataTable>
  );
};
