import React from "react"
import { headerCell, row, table } from "./crudTable"

// const headerCells: headerCell[] = [
//   {
//     id: "id",
//     label: "ID",
//     sortable: true,
//     fieldType: "text",
//   },
//   {
//     id: "username",
//     label: "Username",
//     sortable: true,
//     fieldType: "text",
//   },
//   {
//     id: "passwordHash",
//     label: "Password Hash",
//     sortable: true,
//     fieldType: "text",
//   },
//   {
//     id: "email",
//     label: "Email",
//     sortable: true,
//     fieldType: "text",
//   },
//   // {
//   //   id: "status",
//   //   label: "Status",
//   //   filterable: true,
//   //   fieldType: "status",
//   //   // headerRender: (value) => {
//   //   //   const v = String(value)
//   //   //   return v === "Active" ? (
//   //   //     <span className="chip chip-success">Active</span>
//   //   //   ) : (
//   //   //     <span className="chip chip-muted">Inactive</span>
//   //   //   )
//   //   // },
//   // },
//   // {
//   //   id: "createdAt",
//   //   label: "Created",
//   //   sortable: true,
//   //   fieldType: "date",
//   // },
// ]
const headerCells: headerCell[] = [
  {
    id: 'id',
    label: 'ID',
    minWidth: 150,
    sortable: true,
    filterable: true,
    fieldType: 'text',
  },

  {
    id: 'textValue',
    label: 'Text',
    minWidth: 150,
    sortable: true,
    filterable: true,
    fieldType: 'text',
  },
  {
    id: 'textareaValue',
    label: 'Description',
    minWidth: 250,
    maxWidth: 400,
    sortable: false,
    filterable: true,
    fieldType: 'textarea',
  },
  {
    id: 'emailValue',
    label: 'Email',
    minWidth: 200,
    sortable: true,
    filterable: true,
    fieldType: 'email',
  },
  {
    id: 'numberValue',
    label: 'Number',
    minWidth: 120,
    sortable: true,
    filterable: true,
    fieldType: 'number',
  },
  {
    id: 'currencyValue',
    label: 'Amount',
    minWidth: 140,
    sortable: true,
    filterable: true,
    fieldType: 'currency',
  },
  {
    id: 'percentValue',
    label: 'Percent',
    minWidth: 120,
    sortable: true,
    filterable: true,
    fieldType: 'percent',
  },
  {
    id: 'booleanValue',
    label: 'Enabled',
    minWidth: 110,
    sortable: true,
    filterable: true,
    fieldType: 'boolean',
  },
  {
    id: 'dateValue',
    label: 'Date',
    minWidth: 140,
    sortable: true,
    filterable: true,
    fieldType: 'date',
  },
  {
    id: 'datetimeValue',
    label: 'Date & Time',
    minWidth: 180,
    sortable: true,
    filterable: true,
    fieldType: 'datetime',
  },
  {
    id: 'selectValue',
    label: 'Category',
    minWidth: 160,
    sortable: true,
    filterable: true,
    fieldType: 'select',
  },
  {
    id: 'multiselectValue',
    label: 'Tags',
    minWidth: 220,
    sortable: false,
    filterable: true,
    fieldType: 'multiselect',
  },
  {
    id: 'userValue',
    label: 'Assigned User',
    minWidth: 180,
    sortable: true,
    filterable: true,
    fieldType: 'user',
  },
  {
    id: 'statusValue',
    label: 'Status',
    minWidth: 140,
    sortable: true,
    filterable: true,
    fieldType: 'status',
  },
];

export const tableData: table = {
  tableName: "Users",
  headerCell: headerCells,
  selectableRows: true,
  displayFieldTypes: true,
  pageSize: 25,
}
