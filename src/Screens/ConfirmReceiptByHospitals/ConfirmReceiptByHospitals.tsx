/* eslint-disable no-var */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import {
  Box,
  Checkbox,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  Switch,
  Table,
  TableContainer,
  TablePagination,
  TextField,
  Typography,
} from '@mui/material';
import DatePicker, { Calendar } from 'react-multi-date-picker';
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
import ContradictionTable from '../../Components/ContradictionTable/ContradictionTable';
import DeleteDialog from '../../Components/DeleteRolesDialog';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { Satellite } from '@mui/icons-material';
import { Session } from 'next-auth';
import { Workflow } from '../../../lib/resolvers-types';
import matchSorter from 'match-sorter';
/* eslint-disable react/jsx-filename-extension */
import { memo } from 'react';
import persianCalender from 'react-date-object/calendars/persian';
import persianLocale from 'react-date-object/locales/persian_fa';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

interface Props {
  indeterminate?: boolean;
  name?: string;
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
export default function ConfirmReceiptByHospitals({
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
  allWorkflowsCount,
  deleteWorkflowsHandler,
}: {
  loading: boolean;
  deleting: boolean;
  data: Workflow[];
  offset: number;
  pageNumber: number;
  itemsPerPage: number;
  setItemsPerPage: any;
  filters: any;
  setFilters: any;
  allWorkflowsCount: number;
  fetchMoreRows: (e: any, page: number) => void;
  deleteWorkflowsHandler: (workflowIds: string[]) => Promise<void>;
}) {
  //  states
  const [rowOptionsAnchorElement, setRowOptionsAnchorElement] =
    useState<null | HTMLElement>(null);
  const [choosedRow, setChoosedRow] = useState<any>('');
  const [hasInstructions, setHasInstructions] = useState<boolean>();
  const rowOptionsOpen = Boolean(rowOptionsAnchorElement);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [detailsDialog, setDetailsDialog] = useState(false);

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
        Header: 'نوع',
        width: 230,
        accessor: (d: any) => {
          // عدم مغایرت و ثبت توسط شرکت
          if (
            !d?.passedStages?.[1].havaleh &&
            d?.passedStages?.[0].submittedByUser?.id !==
              d?.passedStages?.[1].submittedByUser?.id
          ) {
            return <Button label='ثبت حواله توسط شرکت' color='success' />;
          } else if (d?.passedStages?.[1].havaleh) {
            return (
              <Button label='مغایرت حواله شرکت با دریافتی' color='error' />
            );
          } else if (
            d?.passedStages?.[0].submittedByUser?.id ===
            d?.passedStages?.[1].submittedByUser?.id
          ) {
            return (
              <Button
                label='ثبت حواله توسط انباردار'
                backgroundColor='purple'
              />
            );
          }
        },
      },

      {
        Header: 'تحویل گیرنده',
        accessor: 'passedStages[1].submittedByUser.firstNameAndLastName', // accessor is the "key" in the data
        width: 200,
      },

      {
        Header: 'اسم شرکت',
        accessor: 'passedStages[0].havaleh.corporation.name',
      },

      {
        Header: 'نماینده شرکت',
        accessor: 'passedStages[0].submittedByUser.firstNameAndLastName',
      },

      {
        Header: 'شماره حواله',
        accessor: 'passedStages[0].havaleh.id', // accessor is the "key" in the data
      },
      {
        Header: 'تحویل دهنده',
        accessor: 'passedStages[0].havaleh.deliverer', // accessor is the "key" in the data
      },
      {
        Header: 'نام ترابری',
        accessor: 'passedStages[0].havaleh.transportationName',
        width: 200,
      },
      {
        Header: 'شماره تماس ترابری',
        width: 200,
        accessor: (d: any) => {
          return (
            <>
              <div>{d?.passedStages[0].havaleh.transportationTelephone}</div>
              <div>
                {d?.passedStages[0].havaleh.transportationTelephone2}
              </div>
            </>
          );
        },
      },
      {
        Header: 'جزییات حواله',
        accessor: 'ee', // accessor is the "key" in the data
      },
      {
        Header: 'امانتی',
        accessor: (d: any) => {
          if (
            Object.entries(d?.passedStages?.[0].havaleh?.assets ?? {})?.some(
              ([key, value]) => value && /_factory/.test(key)
            )
          ) {
            return <Button variant='contained' label='دارد' color='error' />;
          } else {
            return <Button variant='contained' label='ندارد' />;
          }
        },
        width: 200,
      },
      {
        Header: 'جزییات مغایرت',
        accessor: (d: any) => {
          if (d?.passedStages?.[1]?.havaleh) {
            return (
              <Button
                label='مشاهده'
                color='info'
                onClick={() => {
                  setChoosedRow(d);
                  console.log(d);
                  
                  setDetailsDialog(true);
                }}
              />
            );
          }
        },
        width: 200,
      },
      {
        Header: 'توضیحات ارسال',
        accessor: 'passedStages[0].havaleh.description',
        width: 300,
      },
      {
        Header: 'توضیحات دریافت',
        accessor: 'passedStages[0].havaleh.receivingDescription',
        width: 300,
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
 
  const defaultColumn = useMemo(
    () => ({
      minWidth: 30,
      width: 148,
      maxWidth: 400,
    }),
    []
  );
  const useCombinedRefs = (...refs: any): React.MutableRefObject<any> => {
    const targetRef = React.useRef();

    useEffect(() => {
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
              id={row?.original?.terminologyCode + '-options'}
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
                            display: [
                              'index',
                              'selectAll',
                              'options',
                              'downloads',
                            ].includes(column?.id)
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
                        {![
                          'selectAll',
                          'options',
                          'index',
                          'hasInstructions',
                          'downloads',
                        ].includes(column?.id) && (
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
                                  [column.id === 'supportCompany.name'
                                    ? 'supportCompany'
                                    : column.id]:
                                    column.id === 'supportCompany.name'
                                      ? { name: { contains: e.target.value } }
                                      : column.id === 'hasInstructions'
                                      ? hasInstructions
                                      : { contains: e.target.value },
                                });
                                fetchMoreRows(e, 0);
                              }, 1000);
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
                        {['hasInstructions'].includes(column.id) && (
                          <FormControl>
                            <Box
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <Stack
                                direction={'row'}
                                spacing={1}
                                alignItems='center'
                              >
                                <Typography>ندارد</Typography>
                                <Switch
                                  id='hasInstructions'
                                  checked={hasInstructions}
                                  color='success'
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    setHasInstructions(!hasInstructions);
                                    clearTimeout(delayTimer);
                                    delayTimer = setTimeout(function () {
                                      setFilters({
                                        ...filters,
                                        [column.id === 'supportCompany.name'
                                          ? 'supportCompany'
                                          : column.id]:
                                          column.id === 'supportCompany.name'
                                            ? {
                                                name: {
                                                  contains: e.target.value,
                                                },
                                              }
                                            : column.id === 'hasInstructions'
                                            ? !hasInstructions
                                            : { contains: e.target.value },
                                      });
                                      fetchMoreRows(e, 0);
                                    }, 1000);
                                  }}
                                />
                                <Typography>دارد</Typography>
                              </Stack>
                            </Box>
                          </FormControl>
                        )}
                      </Stack>
                      {/* Use column.getResizerProps to hook up the events correctly */}
                      <div
                        {...column?.getResizerProps()}
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
                    <Skeleton width={229} height={42} variant='rectangular' />
                    <Skeleton width={199} height={42} variant='rectangular' />
                    <Skeleton width={148} height={42} variant='rectangular' />
                    <Skeleton width={148} height={42} variant='rectangular' />
                    <Skeleton width={148} height={42} variant='rectangular' />
                    <Skeleton width={148} height={42} variant='rectangular' />
                    <Skeleton width={199} height={42} variant='rectangular' />
                    <Skeleton width={198} height={42} variant='rectangular' />
                    <Skeleton width={146} height={42} variant='rectangular' />
                    <Skeleton width={199} height={42} variant='rectangular' />
                    <Skeleton width={199} height={42} variant='rectangular' />
                    <Skeleton width={298} height={42} variant='rectangular' />
                    <Skeleton width={298} height={42} variant='rectangular' />
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

        
        </TableContainer>
        <TablePagination
          component={'div'}
          rowsPerPageOptions={[5, 10, 15, 20, 30, 50]}
          page={pageNumber}
          count={allWorkflowsCount}
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
              selectedFlatRows.length === 0 ||
              !session?.user?.role?.deleteEquipment
                ? true
                : false
            }
            onClick={() => {
              setDeleteDialog(true);
            }}
          />
        </Box>
      </Styles>
      <DeleteDialog
        text='با این کار تمامی تجهیزات انتخاب شده و اطلاعات مربوط به آنها پاک خواهند شد!'
        open={deleteDialog}
        closeDialog={() => setDeleteDialog(false)}
        confirmDelete={async () => {
          await deleteEquipmentsHandler(
            selectedFlatRows.map((p) => p?.original?.terminologyCode)
          );
          setDeleteDialog(false);
        }}
      />
      <Dialog
        sx={{ zIndex: 7000 }}
        open={detailsDialog}
        maxWidth='md'
        onClose={() => setDetailsDialog(false)}
      >
        <DialogTitle sx={{ textAlign: 'center' }}>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent={'space-between'}
          >
            <span style={{ inlineSize: '10%' }}>
              <IconButton onClick={() => setDetailsDialog(false)}>
                <CloseRoundedIcon />
              </IconButton>
            </span>
            <Typography
              variant='h5'
              component='h2'
              sx={{ flexGrow: 1, textAlign: 'center' }}
            >
              جزئیات مغایرت
            </Typography>
            <span style={{ inlineSize: '10%' }}></span>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ position: 'relative', p: 5 }}>
          <ContradictionTable data={choosedRow} />
        </DialogContent>
      </Dialog>
      {session?.user?.role?.editPerson ? (
        <Menu
          anchorEl={rowOptionsAnchorElement}
          open={rowOptionsOpen}
          onClose={handleRowOptionsClose}
        >
          {session?.user?.role?.['editPerson'] ? (
            <MenuItem>
              <Button
                id={choosedRow?.terminologyCode + '-edit'}
                startIcon={<EditRoundedIcon />}
                variant='text'
                onClick={() =>
                  router.push(
                    `/users/newEquipment?edit=1&equipment=${JSON.stringify(
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
};


