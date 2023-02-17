import { ChangeEvent, FC, ReactElement, ReactNode, useState } from "react";
import { DataTable, DataTableRowExpansionTemplate } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { PaginatorTemplate } from "primereact/paginator";
import { InputText } from "primereact/inputtext";

interface TableProps {
  data: any[];
  columns: ReactNode[];
  header?: any;
  footer?: any;
  responsiveLayout?: any;
  size?: any;
  style?: string;
  loading?: boolean;
  expandedRows?: any;
  onRowToggle?: (e: any) => void;
  onRowExpand?: (e: any) => void;
  onRowCollapse?: (e: any) => void;
  rowExpansionTemplate?: (
    data: any,
    options: DataTableRowExpansionTemplate
  ) => ReactNode;
}

export const Table: FC<TableProps> = ({
  data,
  columns,
  header,
  footer,
  responsiveLayout,
  size,
  style,
  loading = false,
  expandedRows,
  onRowToggle,
  onRowExpand,
  onRowCollapse,
  rowExpansionTemplate,
}): ReactElement => {
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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setCurrentPage(+event.page! + 1);
  };
  const onPageInputKeyDown = (event: any, options: any): void => {
    if (event.key === "Enter") {
      const page = parseInt(String(currentPage));
      if (page < 1 || page > options.totalPages) {
        setPageInputTooltip(
          `El valoe debe estar entre 1 y ${options.totalPages}.`
        );
      } else {
        const first = currentPage !== 0 ? options.rows * (page - 1) : 0;

        setFirst(first);
        setPageInputTooltip("Presione 'Enter' para ir a esta página.");
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
            Elementos por página:{" "}
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
            Ir a{" "}
            <InputText
              type={"number"}
              className="ml-1 w-2 -mr-6 border-primary"
              tooltip={pageInputTooltip}
              //@ts-ignore
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
      value={data}
      header={header}
      footer={footer}
      loading={loading}
      responsiveLayout={responsiveLayout}
      size={size}
      className={`${style}`}
      dataKey="id"
      paginatorClassName="justify-content-end"
      paginatorTemplate={paginatorTemplate}
      first={first}
      rows={rows}
      onPage={onCustomPage}
      paginator
      removableSort
      scrollable
      scrollDirection={"horizontal"}
      resizableColumns
      columnResizeMode="fit"
      expandedRows={expandedRows}
      onRowToggle={onRowToggle}
      onRowExpand={onRowExpand}
      onRowCollapse={onRowCollapse}
      rowExpansionTemplate={rowExpansionTemplate}
    >
      {columns}
    </DataTable>
  );
};
