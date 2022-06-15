import './index.css';

import * as React from 'react';

import {
  createTable,
  getCoreRowModel,
  useTableInstance,
} from '@tanstack/react-table';

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const table = createTable()

const defaultData: Person[] = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
];

const defaultColumns = [
  table.createGroup({
    header: 'Name',
    footer: (props: any) => props.column.id,
    columns: [
      table.createDataColumn('firstName', {
        cell: (info: any) => info.getValue(),
        footer: (props: any) => props.column.id,
      }),
      table.createDataColumn((row: any) => row.lastName, {
        id: 'lastName',
        cell: (info: any) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props: any) => props.column.id,
      }),
    ],
  }),
  table.createGroup({
    header: 'Info',
    footer: (props: any) => props.column.id,
    columns: [
      table.createDataColumn('age', {
        header: () => 'Age',
        footer: (props: any) => props.column.id,
      }),
      table.createGroup({
        header: 'More Info',
        columns: [
          table.createDataColumn('visits', {
            header: () => <span>Visits</span>,
            footer: (props: any) => props.column.id,
          }),
          table.createDataColumn('status', {
            header: 'Status',
            footer: (props: any) => props.column.id,
          }),
          table.createDataColumn('progress', {
            header: 'Profile Progress',
            footer: (props: any) => props.column.id,
          }),
        ],
      }),
    ],
  }),
];

export default function RoleTable() {
  const [data, setData] = React.useState(() => [...defaultData]);
  const [columns] = React.useState<typeof defaultColumns>(() => [
    ...defaultColumns,
  ]);

  const rerender = React.useReducer(() => ({}), {})[1];

  const instance = useTableInstance(table, {
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='p-2'>
      <table>
        <thead>
          {instance.getHeaderGroups().map((headerGroup: any) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : header.renderHeader()}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {instance.getRowModel().rows.map((row: any) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell: any) => (
                <td key={cell.id}>{cell.renderCell()}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {instance.getFooterGroups().map((footerGroup: any) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header: any) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : header.renderFooter()}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className='h-4' />
      <button onClick={() => rerender()} className='border p-2'>
        Rerender
      </button>
    </div>
  );
}


