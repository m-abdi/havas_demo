import { Checkbox, Typography } from '@mui/material';
import React, { useEffect, useId, useMemo, useRef } from 'react';
import { useRowSelect, useTable } from 'react-table';

/* eslint-disable react/display-name */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import styles from './styles.module.css';

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef();
    // resolved ref برای حالت وسط چک باکس هدر استفاده میشه
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input
          type='checkbox'
          ref={defaultRef}
          style={{ background: 'red' }}
          {...rest}
        />
      </>
    );
  }
);
function createData(
  onvan,
  namayande,
  semateNamayande,
  zamineFaaliat,
  dasteBandy
) {
  return {
    onvan,
    namayande,
    semateNamayande,
    zamineFaaliat,
    dasteBandy,
  };
}

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: [
          {
            Header: 'عنوان',
            accessor: 'title',
            // style: {
            //   minWidth: 100,
            //   //textAlign: 'center'
            // },
            rotate: false,
          },
          {
            Header: 'مشاهده اماکن',
            accessor: 'viewPlace',
          },
          {
            Header: 'ایجاد/ویرایش اماکن',
            accessor: 'createPlace',
            rotate: true,
          },
          {
            Header: 'حذف اماکن',
            accessor: 'deletePlace',
            rotate: true,
          },
          {
            Header: 'مشاهده اشخاص',
            accessor: 'viewPerson',
            rotate: true,
          },
          {
            Header: 'ایجاد/ویرایش اشخاص',
            accessor: 'createPerson',
            rotate: true,
          },
          {
            Header: 'حذف اشخاص',
            accessor: 'deletePerson',
            rotate: true,
          },
          {
            Header: 'مشاهده تجهیزات/موجودی',
            accessor: 'viewEquipment',
            rotate: true,
          },
          {
            Header: 'ایجاد/ویرایش تجهیزات/موجودی',
            accessor: 'createEquipment',
            rotate: true,
          },
          {
            Header: 'حذف تجهیزات/موجودی',
            accessor: 'deleteEquipment',
            rotate: true,
          },
          {
            Header: 'مشاهده تگ ها',
            accessor: 'viewTag',
            rotate: true,
          },
          {
            Header: 'ایجاد/ویرایش تگ ها',
            accessor: 'createTag',
            rotate: true,
          },
          {
            Header: 'حذف تگ ها',
            accessor: 'deleteTag',
            rotate: true,
          },
        ],
        data: [
          {
            onvan: 'شرکت اکسیژن هرمزگان',
            namayande: 'قنبر',
            semateNamayande: 'مدیر فروش',
            zamineFaaliat: 'تامین کننده گازهای طبی',
            dasteBandy: 'شرکت ها',
          },
          {
            onvan: 'شرکت اکسیژن هرمزگان',
            namayande: 'قنبر',
            semateNamayande: 'مدیر فروش',
            zamineFaaliat: 'تامین کننده گازهای طبی',
            dasteBandy: 'شرکت ها',
          },
        ],
      },
      useRowSelect,
      (hooks) => {
        hooks.visibleColumns.push((columns) => [
          // Let's make a column for selection
          {
            id: 'selection',
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div style={{ textAlign: 'center' }}>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <div style={{ textAlign: 'center' }}>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
      }
    );

  // Render the UI for your table
  return (
    <table {...getTableProps()} className={styles.table}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr key={useId()} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                key={useId()}
                {...column.getHeaderProps({
                  style: column.style,
                })}
              >
                <Typography
                  variant='body1'
                  sx={{ transform: 'rotate(-90deg)' }}
                >
                  {column.Header}
                </Typography>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr
              key={useId()}
              {...row.getRowProps()}
              onClick={() => {
                console.log(' row click ', row);
              }}
            >
              {row.cells.map((cell) => {
                return (
                  <td
                    key={useId()}
                    {...cell.getCellProps({
                      style: cell.column.style,
                    })}
                  >
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
