'use client'

import styles from './crudTable.module.css'
import { table as TableType, row as Row, sort, pagination, readParams } from '@/app/types/crudTable'
import Checkbox from '../Checkbox/Checkbox'
import { useEffect, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { TableCell } from './TableCell/TableCell'
import { ModelName } from '@/app/lib/prisma'
import Sort from './Sort/Sort'
import TableHeader from './TableHeader/TableHeader'
import Pagination from './Pagination/Pagination'
import Actions from './Actions/Actions'

interface Props {
  table: TableType;
  // rows: Row[];
  crudOptions?: {
    prismaModelName: ModelName;
    create?: (tableName: ModelName) => Promise<any>;
    read?: (readParams: readParams) => Promise<any>;
    update?: (tableName: ModelName) => Promise<any>;
    delete?: (tableName: ModelName) => Promise<any>;
  }
}

export default function CrudTable({ table, crudOptions }: Props) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sort, setSort] = useState<sort>({ columnId: null, order: null });
  const [editMode, setEditMode] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState();
  // const [tableLoading, setTableLoading] = useState(true);

  useEffect(() => {
    if (crudOptions?.read) {
      crudOptions.read({ tableName: crudOptions.prismaModelName, sort, pagination: { page: currentPage, pageSize: table.pageSize } }).then((data) => {
        setRows(data.rows);
        setTotalPages(data.pagination.totalPages);
        setTotalItems(data.pagination.totalItems);
      });
    }
  }, [crudOptions?.read, sort, currentPage]);

  return (
    <div className={styles.container}>
      <TableHeader rows={{ rows, setRows }} tableName={table.tableName} headerCells={table.headerCell} pagination={{ currentPage, setCurrentPage, pageSize: table.pageSize, totalPages, totalItems }} selection={{ selectedRows, setSelectedRows }} edit={{ editMode, setEditMode }} />
      <Actions rows={{ rows, setRows }} />

      <div className={styles.tableContainer}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                {table.selectableRows ? <th className={styles.checkboxCell} style={{ zIndex: 100 }}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Checkbox
                      id="select-all"
                      checked={rows.length > 0 && selectedRows.length === rows.length}
                      onChange={(checked) => {
                        setSelectedRows((prevSelectedRows) => {
                          if (checked) {
                            return rows.map((row) => row.id);
                          }
                          else {
                            return [];
                          }
                        });
                      }}
                    />
                  </div>
                </th> : null}
                {table.headerCell.map((header) => {
                  return (
                    <th style={{ minWidth: header.minWidth, maxWidth: header.maxWidth ? header.maxWidth : 'max-content' }} key={header.id}>
                      <div className={styles.headerCell}>
                        <div className={styles.headerCellContent}>
                          <span className={styles.headerLabel}>{header.label}</span>
                          {table.displayFieldTypes && <span className={styles.headerFieldType}>{header.fieldType}</span>}
                        </div>
                        {
                          header.sortable &&
                          <Sort sort={sort} setSort={setSort} headerId={header.id} />
                        }
                      </div>
                    </th>
                  )
                  // return <th style={{ minWidth: header.minWidth, maxWidth: header.maxWidth }} key={header.id}>{header.headerRender === undefined ? header.label : header.headerRender(header.label)}</th>
                })}
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => {
                return (
                  <tr key={row.id} className={selectedRows.includes(row.id) ? styles.activeRow : ''}>
                    {table.selectableRows ? <td className={styles.checkboxCell}>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Checkbox
                          id={row.id}
                          checked={!!selectedRows.includes(row.id)}
                          onChange={(checked) => {
                            setSelectedRows((prevSelectedRows) => {
                              if (checked) {
                                return [...prevSelectedRows, row.id];
                              } else {
                                return prevSelectedRows.filter((id) => id !== row.id);
                              }
                            });
                          }}
                        />
                      </div>
                    </td> : null}
                    {table.headerCell.map((header) => (
                      // <td key={header.id} className={selectedRows.includes(row.id) ? styles.activeRow : ''} style={{ minWidth: header.minWidth, maxWidth: header.maxWidth ? header.maxWidth : 'max-content' }}>
                      //   {/* {header.cellRender === undefined
                      //   ? rowData[header.id]
                      //   : header.cellRender(rowData[header.id])} */}
                      //   {rowData[header.id]}
                      // </td>
                      <TableCell key={header.id} selectedRows={selectedRows} value={row[header.id]} header={header} isEditMode={editMode} />
                      // <td key={header.id}>{JSON.stringify(row[header.id])}</td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
          {rows.length === 0 &&
            <div className={styles.emptyState}>
              No rows to display.
            </div>
          }
        </div>
      </div>
      <Pagination pagination={{ currentPage, setCurrentPage, pageSize: table.pageSize, totalPages, totalItems }} />
    </div>
  )
}
