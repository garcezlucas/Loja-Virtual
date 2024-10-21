import React, { useEffect } from "react";
import "./_table.scss";
import LeftArrowIcon from "../../assets/icons/left-arrow.svg";
import DoubleLeftArrowIcon from "../../assets/icons/left-arrow-next.svg";
import RightArrowIcon from "../../assets/icons/right-arrow.svg";
import DoubleRightArrowIcon from "../../assets/icons/right-arrow-next.svg";
import { Loading } from "../Loading/Loading";
import { NotFoundData } from "../NotFound/NotFound";

export interface Column {
  label: string;
  format: (value: any, row?: any) => React.ReactNode;
  width: string;
}

interface TableProps {
  tableProps: {
    titleColumns: (
      | string
      | {
          label: string;
          width?: string;
          format?: () => React.ReactNode;
        }
    )[];
    columns: Column[];
    dataTable: any;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    rowsPerPage: number;
    totalPages: number;
    totalItems: number;
    setTotalPages: React.Dispatch<React.SetStateAction<number>>;
    heightTable: string;
    OnClickBody?: (
      event: React.MouseEvent<HTMLTableRowElement>,
      row: any
    ) => void;
    rowIndex?: number;
    setRowIndex?: React.Dispatch<React.SetStateAction<number>>;
    loading?: boolean;
    heightLoading?: string;
  };
}

const TableComponent: React.FC<TableProps> = ({ tableProps }) => {
  const {
    titleColumns,
    columns,
    dataTable,
    page,
    setPage,
    rowsPerPage,
    totalPages,
    setTotalPages,
    totalItems,
    rowIndex,
    setRowIndex,
    OnClickBody,
    loading,
    heightTable,
    heightLoading,
  } = tableProps;

  useEffect(() => {
    const total = Math.ceil(totalItems / rowsPerPage);
    setTotalPages(isNaN(total) ? 0 : total);
  }, [totalItems, rowsPerPage]);

  const handleChangePage = (newPage: number) => {
    setRowIndex && setRowIndex(-1);
    setPage(newPage);
  };

  return (
    <div className="table-container" style={{ height: heightTable }}>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            {titleColumns.map((column, index) => {
              const columnStyle = {
                width:
                  typeof column === "object" && column.width
                    ? column.width
                    : "auto",
              };
              return (
                <th
                  key={index}
                  style={{ ...columnStyle }}
                  className="table-container-header"
                >
                  {typeof column === "object" ? column.label : column}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={titleColumns.length} style={{ textAlign: "center" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: heightLoading
                  }}
                >
                  <Loading />
                </div>
              </td>
            </tr>
          ) : totalItems === 0 ? (
            <tr>
              <td colSpan={titleColumns.length} style={{ textAlign: "center" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: heightLoading
                  }}
                >
                  <NotFoundData message={"Nenhum dao encontrado"} />
                </div>
              </td>
            </tr>
          ) : (
            dataTable
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, indexRow: number) => (
                <tr
                  key={indexRow}
                  onClick={(event) => {
                    if (OnClickBody) {
                      OnClickBody(event, row);
                    }
                    if (setRowIndex) {
                      setRowIndex(indexRow);
                    }
                  }}
                  style={{
                    backgroundColor: indexRow === rowIndex ? "#E6F4F5" : "",
                  }}
                >
                  {columns.map((column, columnIndex) => (
                    <td
                      key={columnIndex}
                      style={{
                        width:
                          typeof column === "object" && column.width
                            ? column.width
                            : "auto",
                        textAlign: "center",
                      }}
                      className="table-container-body"
                    >
                      {typeof column === "object"
                        ? column.format(row[column.label], row)
                        : row[column]}
                    </td>
                  ))}
                </tr>
              ))
          )}
        </tbody>
      </table>
      <div className="table-container-pagination">
        <button disabled={page === 0} onClick={() => handleChangePage(0)}>
          <img src={DoubleLeftArrowIcon} alt="first page" />
        </button>
        <button
          disabled={page === 0}
          onClick={() => handleChangePage(page - 1)}
        >
          <img src={LeftArrowIcon} alt="back" />
        </button>
        <span>{`${page + 1}`}</span>
        <button
          disabled={page >= totalPages - 1}
          onClick={() => handleChangePage(page + 1)}
        >
          <img src={RightArrowIcon} alt="next" />
        </button>
        <button
          disabled={page >= totalPages - 1}
          onClick={() => handleChangePage(totalPages - 1)}
        >
          <img src={DoubleRightArrowIcon} alt="last page" />
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
