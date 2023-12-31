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

import { Button } from '../../Atomic/Button';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ContradictionTable from '../../Atomic/ContradictionTable/ContradictionTable';
import DeleteButton from '../../Atomic/DeleteButton';
import DeleteDialog from '../../Atomic/DeleteRolesDialog';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { Satellite } from '@mui/icons-material';
import { Session } from 'next-auth';
import Styles from "../../../TableStyles"
import { Workflow } from '../../../../lib/resolvers-types';
import WorkflowStageModal from '../../Atomic/WorkflowStagesModal';
import { flushSync } from 'react-dom';
import matchSorter from 'match-sorter';
/* eslint-disable react/jsx-filename-extension */
import { memo } from 'react';
import persianCalender from 'react-date-object/calendars/persian';
import persianLocale from 'react-date-object/locales/persian_fa';
import styled from 'styled-components';
import toNestedObject from '../../../Logic/toNestedObject';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

interface Props {
  indeterminate?: boolean;
  name?: string;
}


var delayTimer: any;
export default function Workflows({
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
  deleteHandler,
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
  deleteHandler: (ids: string[]) => Promise<void>;
}) {
  //  states
  const [rowOptionsAnchorElement, setRowOptionsAnchorElement] =
    useState<null | HTMLElement>(null);
  const [choosedRow, setChoosedRow] = useState<any>('');
  const [rawFilters, setRawFilters] = useState({});
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
        Header: 'شماره گردش کار',
        accessor: 'workflowNumber',
        width: 200,
      },

      {
        Header: 'شماره فرایند',
        accessor: 'instanceOfProcess.processNumber',
      },

      {
        Header: 'نام فرایند',
        accessor: 'instanceOfProcess.processName',
      },

      {
        Header: 'مرحله فعلی',
        accessor: (d: any) => {
          return d?.passedStages?.[d?.passedStages.length - 1]?.stageName;
        },
      },

      {
        Header: 'مرحله بعدی',
        accessor: 'nextStageName', // accessor is the "key" in the data
      },
      {
        Header: 'جزئیات',
        disableSortBy: true,
        disableFilters: true,
        id: 'details',
        accessor: (d: any) => {
          return (
            <Button
              label='مشاهده'
              color='info'
              onClick={(e) => {
                flushSync(() => {
                  setChoosedRow(d);
                });
                setDetailsDialog(true);
              }}
            />
          );
        },
        width: 110,
      },
      {
        Header: 'تاریخ شروع گردش کار',
        accessor: (d: any) => {
          return new Date(parseInt(d?.dateCreated)).toLocaleString('fa-IR');
        },
        width: 270,
      },

      {
        Header: 'پایان',
        id: 'ended',
        disableSortBy: true,
        disableFilters: true,
        accessor: (d: any) => {
          if (!d?.nextStageName) {
            return <CheckRoundedIcon sx={{ color: 'green' }} />;
          } else {
            return <CloseRoundedIcon sx={{ color: 'yellow' }} />;
          }
        },
        width: 100,
      },
      {
        Header: 'تاریخ پایان گردش کار',
        accessor: (d: any) => {
          if (!d?.nextStageName) {
            return new Date(parseInt(d?.dateModified)).toLocaleString('fa-IR');
          }
          return '';
        },
        width: 270,
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
      {/* <DeleteButton
        selectedFlatRows={selectedFlatRows}
        session={session}
        setDeleteDialog={setDeleteDialog}
      /> */}
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
                          {![
                            'selectAll',
                            'options',
                            'details',
                            'ended',
                          ].includes(column?.id) && column.isSorted ? (
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
                              'details',
                              'ended',
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
                          'details',

                          'ended',
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
                              const newRawFilters = {
                                [column.id
                                  .replace('[0]', '')
                                  .replace('[1]', '')
                                  .replace(
                                    'passedStages.',
                                    'passedStages.some.'
                                  )
                                  .replace('havaleh.', 'havaleh.is.')
                                  .replace(
                                    'submittedByUser.',
                                    'submittedByUser.is.'
                                  )
                                  .replace('corporation.', 'corporation.is.')
                                  .replace('assets.', 'assets.is.')]: {
                                  contains: e.target.value,
                                },
                              };

                              setRawFilters({
                                ...rawFilters,
                                ...newRawFilters,
                              });
                              clearTimeout(delayTimer);
                              delayTimer = setTimeout(function () {
                                setFilters({
                                  ...toNestedObject({
                                    ...rawFilters,
                                    ...newRawFilters,
                                  }),
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

            {loading || deleting ? (
              <Stack spacing={0.5}>
                {[...Array(itemsPerPage)].map((i) => (
                  <Stack direction={'row'} alignItems='center' spacing={0.13}>
                    <Skeleton width={34} height={42} variant='rectangular' />
                    <Skeleton width={34} height={42} variant='rectangular' />
                    <Skeleton width={34} height={42} variant='rectangular' />
                    <Skeleton width={198} height={42} variant='rectangular' />
                    <Skeleton width={149} height={42} variant='rectangular' />
                    <Skeleton width={148} height={42} variant='rectangular' />
                    <Skeleton width={148} height={42} variant='rectangular' />
                    <Skeleton width={148} height={42} variant='rectangular' />
                    <Skeleton width={100} height={42} variant='rectangular' />
                    <Skeleton width={270} height={42} variant='rectangular' />
                    <Skeleton width={100} height={42} variant='rectangular' />
                    <Skeleton width={270} height={42} variant='rectangular' />
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
          onPageChange={(e, p) => {

            fetchMoreRows(e, p);
          }}
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
      </Styles>
      {/* <DeleteDialog
        text='با این کار تمامی گردش کارهای انتخاب شده و اطلاعات مربوط به آنها پاک خواهند شد!'
        open={deleteDialog}
        closeDialog={() => setDeleteDialog(false)}
        confirmDelete={async () => {
          await deleteHandler(
            selectedFlatRows.map((p) => p?.original?.workflowNumber) as string[]
          );
          setDeleteDialog(false);
        }}
      /> */}
      <Dialog
        sx={{ zIndex: 7000 }}
        open={detailsDialog}
        maxWidth='lg'
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
              جزئیات
            </Typography>
            <span style={{ inlineSize: '10%' }}></span>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ position: 'relative', p: 5 }}>
          <WorkflowStageModal data={choosedRow} />
        </DialogContent>
      </Dialog>
      {/* {session?.user?.role?.editPerson ? (
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
      ) : null} */}
    </Box>
  );
}
