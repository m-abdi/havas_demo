import { Box, Stack, Table, TableContainer } from '@mui/material';
import {
  useAsyncDebounce,
  useFilters,
  useGlobalFilter,
  useSortBy,
  useTable,
} from 'react-table';
import { useId, useMemo } from 'react';

import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';

interface rowType {
  id: string;
  firstNameAndLastName: string;
  state: string;
  city: string;
  postalCode: string;
  address: string;
  telephone: string;
  mobileNumber: string;
  website: string;
}
export default function Persons({ data }: { data: any }) {
  // const data = useMemo(
  //   () => [
  //     {
  //       id: '0520649875',
  //       firstNameAndLastName: 'مهدی عبدی',
  //       place: { name: 'دفتر مدیریت' },
  //       role: { name: 'مدیریت' },
  //       state: 'مرکزی',
  //       city: 'اراک',
  //       postalCode: '۹۸۹۹۸۷',
  //       address: 'اراک خیابان ملک',
  //       telephone: '984965665',
  //       mobileNumber: '09371246685',
  //       website: 'mehdiabdi.info',
  //     },
  //     {
  //       id: '052064۵۶۵۱75',
  //       firstNameAndLastName: 'حسین آرمان پور',
  //       place: { name: 'دفتر مدیریت' },
  //       role: { name: 'مدیریت' },
  //       state: 'هرمزگان',
  //       city: 'بندرعباس',
  //       postalCode: '78989',
  //       address: 'بندرعباس',
  //       telephone: '۸۹۴۹۸۸۹',
  //       mobileNumber: '656898',
  //       website: '',
  //     },
  //   ],
  //   []
  // );

  const columns = useMemo(
    () => [
      {
        Header: '.',
        // accessor: 'id', // accessor is the "key" in the data
      },
      {
        Header: '#',
        accessor: 'index', // accessor is the "key" in the data
      },
      {
        Header: 'کد ملی',
        accessor: 'id', // accessor is the "key" in the data
      },
      {
        Header: 'عنوان',
        accessor: 'firstNameAndLastName', // accessor is the "key" in the data
      },
      {
        Header: 'نقش',
        accessor: 'role.name', // accessor is the "key" in the data
      },
      {
        Header: 'مکان',
        accessor: 'place.name', // accessor is the "key" in the data
      },

      {
        Header: 'استان',
        accessor: 'state',
      },
      {
        Header: 'شهر',
        accessor: 'city', // accessor is the "key" in the data
      },
      {
        Header: 'کد پستی',
        accessor: 'postalCode', // accessor is the "key" in the data
      },
      {
        Header: 'آدرس',
        accessor: 'address', // accessor is the "key" in the data
      },
      {
        Header: 'تلفن',
        accessor: 'telephone', // accessor is the "key" in the data
      },
      {
        Header: 'تلفن همراه',
        accessor: 'mobileNumber', // accessor is the "key" in the data
      },
      {
        Header: 'سایت',
        accessor: 'website', // accessor is the "key" in the data
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },

      useSortBy
    );

  return (
    <TableContainer
      sx={{
        '& talbe,th,td': {
          border: '1px solid gray',
          borderCollapse: 'collapse',
        },
      }}
    >
      <table {...getTableProps()} style={{ borderCollapse: 'collapse' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={useId()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(
                    // column.getSortByToggleProps()
                  )}
                  key={useId()}
                  style={{
                    fontWeight: 'bold',
                    fontFamily: 'Vazir',
                    textAlign: 'center',
                  }}
                >
                  <Stack
                    direction={'row'}
                    alignItems='center'
                    justifyContent={'center'}
                    spacing={1}
                  >
                    {column.render('Header')}

                    {/* {column.isSorted ? (
                      column.isSortedDesc ? (
                        <KeyboardArrowDownRoundedIcon />
                      ) : (
                        <KeyboardArrowUpRoundedIcon />
                      )
                    ) : (
                      ''
                    )} */}
                  </Stack>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={useId()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      key={useId()}
                      style={{
                        padding: '10px',
                        fontFamily: 'Vazir',
                        textAlign: 'center',
                      }}
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
    </TableContainer>
  );
}
