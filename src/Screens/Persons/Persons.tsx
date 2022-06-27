/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import {
  Box,
  Checkbox,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Table,
  TableContainer,
  TextField,
  Typography,
} from '@mui/material';
/* eslint-disable react/jsx-key */
import React, { useEffect, useId, useMemo, useState } from 'react';
import {
  useBlockLayout,
  useFilters,
  useGlobalFilter,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';

import { Button } from '../../Components/Button';
import DeleteDialog from '../../Components/DeleteRolesDialog';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { Session } from 'next-auth';
import matchSorter from 'match-sorter';
/* eslint-disable react/jsx-filename-extension */
import { memo } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

interface DataType {
  id: string;
  firstNameAndLastName: string;
  place: { id: string; name: string };
  role: { id: string; name: string };
  state: string;
  city: string;
  postalCode: string;
  address: string;
  telephone: string;
  mobileNumber: string;
  website: string;
}
const Styles = styled.div`
  padding: 1rem;

  .table {
    display: inline-block;
    border-spacing: 0;
    border: 1px solid black;
    text-align: center;
    font-family: Vazir;

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }
    .thead {
      background-color: #68c5db;
    }
    .th {
      font-weight: bold;
      font-size: calc(14px + (21 - 14) * ((100vw - 300px) / (1600 - 300)));
    }
    .td {
      font-size: calc(14px + (17 - 14) * ((100vw - 300px) / (1600 - 300)));
    }
    .th,
    .td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      ${
        '' /* In this example we use an absolutely position resizer,
       so this is required. */
      }
      position: relative;

      :last-child {
        border-left: 0;
      }

      .resizer {
        display: inline-block;
        background: #fcde67;
        width: 3px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;
        ${'' /* prevents from scrolling while dragging on touch devices */}
        touch-action:none;

        &.isResizing {
          background: red;
        }
      }
    }
  }
`;

export default memo(function Persons({
  loading,
  data,
}: {
  loading: boolean;
  data: DataType[];
}) {
  if (loading) {
    return <div>loading</div>;
  }
  //  states
  const [rowOptionsAnchorElement, setRowOptionsAnchorElement] =
    useState<null | HTMLElement>(null);
  const [choosedRow, setChoosedRow] = useState<any>('');
  const rowOptionsOpen = Boolean(rowOptionsAnchorElement);
  const [deletePersonDialog, setDeletePersonDialog] = useState(false);

  // other hooks
  const { data: session } = useSession();
  const router = useRouter();
  // handlers
  const handleRowOptionsOpen = (
    e: React.MouseEvent<HTMLButtonElement>,
    row: any
  ) => {
    setRowOptionsAnchorElement(e.currentTarget);
    setChoosedRow(row);
  };
  const handleRowOptionsClose = () => {
    setRowOptionsAnchorElement(null);
  };

  const columns = useMemo(
    () => [
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
  function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
  }

  // Let the table remove the filter if the string is empty
  fuzzyTextFilterFn.autoRemove = (val) => !val;
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );
  // Define a default UI for filtering
  function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
      setGlobalFilter(value || undefined);
    }, 200);

    return (
      <span>
        Search:{' '}
        <input
          value={value || ''}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
          style={{
            fontSize: '1.1rem',
            border: '0',
          }}
        />
      </span>
    );
  }
  // Define a default UI for filtering
  function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length;

    return (
      <TextField
        size='small'
        color='secondary'
        variant='standard'
        value={filterValue || ''}
        onChange={(e) => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        sx={{
          color: 'whitesmoke',
          inlineSize: '90%',
          backgroundColor: 'whitesmoke',
          borderRadius: '20px',
          px: 1,
        }}
        InputProps={{
          disableUnderline: true,
        }}
        placeholder={`جستجو ...`}
      />
    );
  }
  const defaultColumn = useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 400,
      Filter: DefaultColumnFilter,
    }),
    []
  );
  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef();
      const resolvedRef = ref || defaultRef;

      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return (
        <>
          <input type='checkbox' ref={resolvedRef} {...rest} />
        </>
      );
    }
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    resetResizing,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data: useMemo(
        () =>
          data?.map?.((row, index) => ({
            ...row,
            // index: index + 1,
            // selectAll: (
            //   <Checkbox
            //     id={row?.id + 'select'}
            //     onClick={(e) => {
            //       e.stopPropagation();
            //     }}
            //   />
            // ),
            // options: (
            //   <IconButton
            //     aria-controls={rowOptionsOpen ? 'options-menu' : undefined}
            //     aria-haspopup='true'
            //     aria-expanded={rowOptionsOpen ? 'true' : undefined}
            //     id={row?.id + 'options'}
            //     onClick={(e) => {
            //       e.stopPropagation();
            //     }}
            //   >
            //     <MoreVertRoundedIcon />
            //   </IconButton>
            // ),
          })),
        []
      ),
      defaultColumn,
      filterTypes,
    },
    useBlockLayout,
    useResizeColumns,
    useFilters,
    useGlobalFilter,
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.allColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: 'selectAll',
          disableResizing: false,
          minWidth: 35,
          width: 35,
          maxWidth: 35,
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          ),
        },
        {
          id: 'index',
          disableResizing: false,
          minWidth: 35,
          width: 35,
          maxWidth: 35,
          Header: () => <>#</>,
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => <>{row.index + 1}</>,
        },
        {
          id: 'options',
          disableResizing: false,
          minWidth: 35,
          width: 35,
          maxWidth: 35,
          Cell: ({ row }) => (
            <IconButton
              id={row?.original?.id + 'options'}
              title='گزینه ها'
              sx={{ p: 0, m: 0, color: 'inherit', backgroundColor: 'inherit' }}
              onClick={(e) => {
                handleRowOptionsOpen(e, row?.original as any);
              }}
            >
              <MoreVertRoundedIcon />
            </IconButton>
          ),
        },
        ...columns,
      ]);
    }
  );

  //
  useEffect(() => {
    const searchBox = document.querySelector('.filterSearchBox > input');
    searchBox?.setAttribute('placeholder', 'جستجو');
  }, []);

  return (
    <Box sx={{ maxInlineSize: '100%', position: 'relative' }}>
      {/* <button onClick={resetResizing}>Reset Resizing</button> */}
      <Styles>
        <TableContainer sx={{ position: 'relative !important' }}>
          <div {...getTableProps()} className='table'>
            <div className='thead'>
              {headerGroups.map((headerGroup) => (
                <div {...headerGroup.getHeaderGroupProps()} className='tr'>
                  {headerGroup.headers.map((column) => (
                    <div className='th' {...column.getHeaderProps()}>
                      {/* column header & sort & filter search box */}
                      <Stack
                        spacing={2}
                        justifyContent='center'
                        alignItems='center'
                        {...column.getSortByToggleProps()}
                      >
                        {/* column header text and sort symbols */}
                        <Stack
                          direction='row'
                          alignItems='center'
                          justifyContent={'center'}
                        >
                          {column.render('Header')}
                          {!['selectAll', 'options'].includes(column?.id) &&
                          column.isSorted ? (
                            column.isSortedDesc ? (
                              <KeyboardArrowDownRoundedIcon />
                            ) : (
                              <KeyboardArrowUpRoundedIcon />
                            )
                          ) : (
                            ''
                          )}
                        </Stack>
                        <Divider
                          flexItem
                          variant='fullWidth'
                          sx={{
                            display: ['index', 'selectAll', 'options'].includes(
                              column?.id
                            )
                              ? 'none'
                              : 'auto',
                          }}
                        />
                        {/* Render the columns filter UI */}
                        {!['index', 'selectAll', 'options'].includes(
                          column?.id
                        ) && column.canFilter
                          ? column.render('Filter')
                          : null}
                      </Stack>
                      {/* Use column.getResizerProps to hook up the events correctly */}
                      <div
                        {...column.getResizerProps()}
                        className={`resizer ${
                          column.isResizing ? 'isResizing' : ''
                        }`}
                        title='تغییر عرض ستون'
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                        }}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <div {...row.getRowProps()} className='tr'>
                    {row.cells.map((cell) => {
                      return (
                        <div {...cell.getCellProps()} className='td'>
                          {cell.render('Cell')}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </TableContainer>
        <Box
          sx={{
            position: 'absolute',
            top: -68,
            right: '35px',
          }}
        >
          <Button
            label='حذف'
            size='large'
            color='error'
            variant='contained'
            disabled={selectedFlatRows.length === 0 ? true : false}
            onClick={() => {
              setDeletePersonDialog(true);
            }}
          />
        </Box>
      </Styles>
      <DeleteDialog
        text='با این کار تمامی اشخاص انتخاب شده و اطلاعات مربوط به آنها پاک خواهند شد!'
        open={deletePersonDialog}
        closeDialog={() => setDeletePersonDialog(false)}
        confirmDelete={async () => {
          return true;
        }}
      />
      {session?.user?.role?.editPerson ? (
        <Menu
          anchorEl={rowOptionsAnchorElement}
          open={rowOptionsOpen}
          onClose={handleRowOptionsClose}
        >
          {session?.user?.role?.['editPerson'] ? (
            <MenuItem>
              <Button
                startIcon={<EditRoundedIcon />}
                variant='text'
                onClick={() =>
                  router.push(
                    `/users/newPerson?edit=1&person=${JSON.stringify(
                      choosedRow
                    )}`
                  )
                }
                label='ویرایش'
              />
            </MenuItem>
          ) : null}
        </Menu>
      ) : null}
    </Box>
  );
});

//  <tr>
//    <th
//      colSpan={visibleColumns.length}
//      style={{
//        textAlign: 'left',
//      }}
//    >
//      <GlobalFilter
//        preGlobalFilteredRows={preGlobalFilteredRows}
//        globalFilter={state.globalFilter}
//        setGlobalFilter={setGlobalFilter}
//      />
//    </th>
//  </tr>;
