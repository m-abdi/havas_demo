/* eslint-disable no-var */
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
  Skeleton,
  Stack,
  Table,
  TableContainer,
  TablePagination,
  TextField,
  Typography,
} from '@mui/material';
/* eslint-disable react/jsx-key */
import React, { useEffect, useMemo, useState } from 'react';
import {
  TableInstance,
  useBlockLayout,
  useFilters,
  useGlobalFilter,
  usePagination,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';

import { Button } from '../../Components/Button';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DeleteDialog from '../../Components/DeleteRolesDialog';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { Satellite } from '@mui/icons-material';
import { Session } from 'next-auth';
import matchSorter from 'match-sorter';
/* eslint-disable react/jsx-filename-extension */
import { memo } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

interface Props {
  indeterminate?: boolean;
  name?: string;
}
interface DataType {
  id: string;
  equipment: { id: string; name: string };
  publicPropertyCode: string;
  place: { name: string };
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
      overflow: hidden;
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
var delayTimer: any;
export default memo(function Assets({
  loading,
  deleting,
  data = [],
  pageNumber,
  itemsPerPage,
  setItemsPerPage,
  filters,
  offset,
  setFilters,
  fetchMoreRows,
  allAssetsCount,
  deleteAssetsHandler: deleteAssetsHandler,
}: {
  loading: boolean;
  deleting: boolean;
  data: DataType[];
  offset: number;
  pageNumber: number;
  itemsPerPage: number;
  setItemsPerPage: any;
  filters: any;
  setFilters: any;
  allAssetsCount: number;
  fetchMoreRows: (e: any, page: number) => void;
  deleteAssetsHandler: (placeIds: string[]) => Promise<void>;
}) {
  //  states
  const [rowOptionsAnchorElement, setRowOptionsAnchorElement] =
    useState<null | HTMLElement>(null);
  const [choosedRow, setChoosedRow] = useState<any>('');
  const rowOptionsOpen = Boolean(rowOptionsAnchorElement);
  const [deletePersonDialog, setDeletePersonDialog] = useState(false);

  // const [value, setValue] = React.useState(globalFilter);

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

  const columns: any = useMemo(
    () => [
      {
        Header: 'نام تجهیز',
        accessor: 'equipment.name', // accessor is the "key" in the data
      },
      {
        Header: 'کد بیت المال',
        accessor: 'publicPropertyCode', // accessor is the "key" in the data
      },
      {
        Header: 'محل استقرار',
        accessor: 'place.name', // accessor is the "key" in the data
      },
    ],
    [offset, pageNumber]
  );
  // function fuzzyTextFilterFn(rows, id, filterValue) {
  //   return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
  // }

  // Let the table remove the filter if the string is empty
  // fuzzyTextFilterFn.autoRemove = (val) => !val;
  const filterTypes = React.useMemo(
    () => ({
      // // Add a new fuzzyTextFilterFn filter type.
      // fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows: any, id: any, filterValue: any) => {
        return rows.filter((row: any) => {
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
  // // Define a default UI for filtering
  // function GlobalFilter({
  //   preGlobalFilteredRows,
  //   globalFilter,
  //   setGlobalFilter,
  // }) {
  //   const count = preGlobalFilteredRows.length;
  //   const onChange = useAsyncDebounce((value) => {
  //     setGlobalFilter(value || undefined);
  //   }, 200);

  //   return (
  //     <span>
  //       Search:{' '}
  //       <input
  //         value={value || ''}
  //         onChange={(e) => {
  //           setValue(e.target.value);
  //           onChange(e.target.value);
  //         }}
  //         placeholder={`${count} records...`}
  //         style={{
  //           fontSize: '1.1rem',
  //           border: '0',
  //         }}
  //       />
  //     </span>
  //   );
  // }
  // Define a default UI for filtering
  // function DefaultColumnFilter({
  //   column: { filterValue, preFilteredRows, setFilter, id },
  // }) {
  //   const count = preFilteredRows.length;

  //   return (
  //     <TextField
  //       size='small'
  //       color='secondary'
  //       variant='standard'
  //       // value={filterValue || ''}
  //       value={filters[id]}
  //       onChange={(e) => {
  //         setFilters({ ...filters, [id]: e.target.value });
  //         // setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
  //       }}
  //       onClick={(e) => {
  //         e.preventDefault();
  //         e.stopPropagation();
  //       }}
  //       sx={{
  //         color: 'whitesmoke',
  //         inlineSize: '90%',
  //         backgroundColor: 'whitesmoke',
  //         borderRadius: '20px',
  //         px: 1,
  //       }}
  //       InputProps={{
  //         disableUnderline: true,
  //       }}
  //       placeholder={`جستجو ...`}
  //     />
  //   );
  // }
  const defaultColumn = useMemo(
    () => ({
      minWidth: 30,
      width: 148,
      maxWidth: 400,
      // Filter: DefaultColumnFilter,
    }),
    []
  );
  const useCombinedRefs = (...refs: any): React.MutableRefObject<any> => {
    const targetRef = React.useRef();

    React.useEffect(() => {
      refs.forEach((ref: any) => {
        if (!ref) return;

        if (typeof ref === 'function') {
          ref(targetRef.current);
        } else {
          ref.current = targetRef.current;
        }
      });
    }, [refs]);

    return targetRef;
  };
  const IndeterminateCheckbox = React.forwardRef<HTMLInputElement, Props>(
    ({ indeterminate, ...rest }, ref: React.Ref<HTMLInputElement>) => {
      const defaultRef = React.useRef(null);
      const resolvedRef = ref || defaultRef;
      const combinedRef = useCombinedRefs(ref, defaultRef);

      React.useEffect(() => {
        if (combinedRef?.current) {
          combinedRef.current.indeterminate = indeterminate ?? false;
        }
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
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
    },
    useBlockLayout,
    useResizeColumns,
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
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
          Cell: ({ row }: { row: any }) => (
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          ),
        },
        {
          id: 'index',
          disableResizing: false,
          minWidth: 35,
          width: 35,
          maxWidth: 35,
          disableSortBy: true,
          disableFilters: true,
          Header: () => <>#</>,
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }: { row: any }) => (
            <>{row.index + 1 + offset * pageNumber}</>
          ),
        },
        {
          id: 'options',
          disableResizing: false,
          minWidth: 35,
          width: 35,
          maxWidth: 35,
          Cell: ({ row }: { row: any }) => (
            <IconButton
              id={row?.original?.id + '-options'}
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

  // if (false) {
  //   return (
  //     <Box sx={{ maxInlineSize: '100%', position: 'relative' }}>
  //       <Styles>
  //         <TableContainer>
  //           <Stack spacing={0.3}>
  //             <Stack direction={'row'} alignItems='center' spacing={0.5}>
  //               <Skeleton width={35} height={109} variant='rectangular' />
  //               <Skeleton width={35} height={109} variant='rectangular' />
  //               <Skeleton width={35} height={109} variant='rectangular' />
  //               <Skeleton width={148} height={109} variant='rectangular' />
  //               <Skeleton width={148} height={109} variant='rectangular' />
  //               <Skeleton width={148} height={109} variant='rectangular' />
  //               <Skeleton width={148} height={109} variant='rectangular' />
  //               <Skeleton width={148} height={109} variant='rectangular' />
  //               <Skeleton width={148} height={109} variant='rectangular' />
  //               <Skeleton width={148} height={109} variant='rectangular' />
  //               <Skeleton width={148} height={109} variant='rectangular' />
  //               <Skeleton width={148} height={109} variant='rectangular' />
  //               <Skeleton width={148} height={109} variant='rectangular' />
  //               <Skeleton width={148} height={109} variant='rectangular' />
  //             </Stack>
  //           </Stack>
  //         </TableContainer>
  //       </Styles>
  //     </Box>
  //   );
  // }
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
                        {/* Render the columns filter UI
                        {!['index', 'selectAll', 'options'].includes(
                          column?.id
                        ) && column.canFilter
                          ? column.render('Filter')
                          : null} */}
                        {!['selectAll', 'options', 'index'].includes(
                          column?.id
                        ) && (
                          <TextField
                            size='small'
                            color='secondary'
                            variant='standard'
                            // value={filterValue || ''}
                            // value={
                            //   column.id === 'role.name' ||
                            //   column.id === 'place.name'
                            //     ? filters[column.id.replace('.name', '')].name
                            //         .contains
                            //     : filters[column.id].contains
                            // }
                            onChange={(e) => {
                              clearTimeout(delayTimer);
                              delayTimer = setTimeout(function () {
                                setFilters({
                                  ...filters,
                                  [column.id === 'equipment.name'
                                    ? 'equipment'
                                    : column.id === 'place.name'
                                    ? 'place'
                                    : column.id]:
                                    column.id === 'equipment.name'
                                      ? {
                                          ...filters?.equipment,
                                          name: {
                                            contains: e.target.value,
                                          },
                                        }
                                      : column.id === 'place.name'
                                      ? {
                                          ...filters?.place,
                                          name: {
                                            contains: e.target.value,
                                          },
                                        }
                                      : { contains: e.target.value },
                                });
                                fetchMoreRows(e, 0);
                              }, 1000);
                              // setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
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
                        )}
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

            {loading ? (
              <Stack spacing={0.5}>
                {[...Array(itemsPerPage)].map((i) => (
                  <Stack direction={'row'} alignItems='center' spacing={0.13}>
                    <Skeleton width={34} height={42} variant='rectangular' />
                    <Skeleton width={34} height={42} variant='rectangular' />
                    <Skeleton width={34} height={42} variant='rectangular' />
                    <Skeleton width={148} height={42} variant='rectangular' />
                    <Skeleton width={148} height={42} variant='rectangular' />
                    <Skeleton width={148} height={42} variant='rectangular' />
                   
                  </Stack>
                ))}
              </Stack>
            ) : (
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
            )}
          </div>

          {/* <div>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous Page
            </button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              Next Page
            </button>
            <div>
              Page{' '}
              <em>
                {pageIndex + 1} of {pageOptions.length}
              </em>
            </div>
            <div>Go to page:</div>
            <input
              type='number'
              defaultValue={pageIndex + 1 || 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
            />
          </div> */}
          {/* <select
         value={pageSize}
         onChange={e => {
           setPageSize(Number(e.target.value))
         }}
       >
         {pageSizeOptions.map(pageSize => (
           <option key={pageSize} value={pageSize}>
             Show {pageSize}
           </option>
         ))}
       </select> */}
        </TableContainer>
        <TablePagination
          component={'div'}
          rowsPerPageOptions={[5, 10, 15, 20, 30, 50]}
          page={pageNumber}
          count={allAssetsCount}
          onPageChange={fetchMoreRows}
          onRowsPerPageChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setItemsPerPage(parseInt(event.target.value));
          }}
          rowsPerPage={itemsPerPage}
          labelRowsPerPage='تعداد ردیف در هر صفحه'
          labelDisplayedRows={({ from, to, count }) => {
            return `صفحه ${pageNumber + 1} از ${Math.ceil(
              count / itemsPerPage
            )} ( ${count !== -1 ? count : `بیشتر از ${to}`} آیتم )`;
          }}
          sx={{
            '& .MuiTablePagination-actions	': {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
          }}
        />
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
            disabled={
              selectedFlatRows.length === 0 || !session?.user?.role?.deleteAsset
                ? true
                : false
            }
            onClick={() => {
              setDeletePersonDialog(true);
            }}
          />
        </Box>
      </Styles>
      <DeleteDialog
        text='با این کار تمامی موجودی های انتخاب شده و اطلاعات مربوط به آنها پاک خواهند شد!'
        open={deletePersonDialog}
        closeDialog={() => setDeletePersonDialog(false)}
        confirmDelete={async () => {
          await deleteAssetsHandler(selectedFlatRows.map((p) => p.original.id));
          setDeletePersonDialog(false);
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
                id={choosedRow?.id + '-edit'}
                startIcon={<EditRoundedIcon />}
                variant='text'
                onClick={() =>
                  router.push(
                    `/users/newAsset?edit=1&asset=${JSON.stringify(choosedRow)}`
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
