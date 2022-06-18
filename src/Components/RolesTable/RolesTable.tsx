import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { memo, useCallback, useEffect, useState } from 'react';

import { Button } from '../Button';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import InfiniteScroll from 'react-infinite-scroller';
import Loader from '../Loader';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { Session } from 'next-auth';
import { TableContainer } from '@mui/material';
import { TablePagination } from '@mui/material';
import { styled } from '@mui/material/styles';

const PermissionColumnStyle = {
  transform: 'rotate(-90deg)',
  whiteSpace: 'nowrap',
  py: 1,
  px: 1,
  textAlign: 'center',
};
export default memo(function RolesTable({
  rows,
  fetchMoreRows,
  router,
  hasNextRole,
  loading,
  session,
  itemsPerPage,
  setItemsPerPage,
}: {
  rows: RoleType[];
  router: any;
  hasNextRole: boolean;
  fetchMoreRows: any;
  loading: boolean;
  session: Session | null;
  itemsPerPage: number;
  setItemsPerPage: any;
}) {
  // states
  const [rowOptionsAnchorElement, setRowOptionsAnchorElement] =
    useState<null | HTMLElement>(null);
  const [choosedRow, setChoosedRow] = useState('');
  const rowOptionsOpen = Boolean(rowOptionsAnchorElement);

  // handlers for options button (three dots in last column)
  const handleOptionsOpen = (
    e: React.MouseEvent<HTMLButtonElement>,
    row: any
  ) => {
    setRowOptionsAnchorElement(e.currentTarget);
    setChoosedRow(row);
  };
  const handleOptionsClose = () => {
    setRowOptionsAnchorElement(null);
  };

  return rows.length > 0 ? (
    <>
      <Box>
        <TableContainer sx={{ px: 6 }}>
          <Table
            size='small'
            sx={{
              '& TableCell, td': {
                fontFamily: 'Vazir',
              },
              border: '1px solid grey',
              borderCollapse: 'collapse',
              backgroundColor: 'white',
            }}
          >
            <caption>
              نقش های تعریف شده در اپلیکیشن حواس به همراه سطح دسترسی هر یک از
              آنها
            </caption>
            <colgroup
              span={1}
              style={{
                borderLeft: '1px solid grey',
                backgroundColor: 'white',
              }}
            ></colgroup>
            <colgroup
              span={1}
              style={{ borderLeft: '1px solid grey' }}
            ></colgroup>

            <colgroup
              span={1}
              style={{ borderLeft: '1px solid grey' }}
            ></colgroup>
            <colgroup
              span={3}
              style={{ borderLeft: '1px solid grey' }}
            ></colgroup>
            <colgroup
              span={3}
              style={{ borderLeft: '1px solid grey' }}
            ></colgroup>
            <colgroup
              span={3}
              style={{ borderLeft: '1px solid grey' }}
            ></colgroup>
            <colgroup
              span={3}
              style={{ borderLeft: '1px solid grey' }}
            ></colgroup>
            <colgroup
              span={3}
              style={{ borderLeft: '1px solid grey' }}
            ></colgroup>
            <colgroup
              span={3}
              style={{ borderLeft: '1px solid grey' }}
            ></colgroup>

            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: 'info.main',
                  borderBottom: '2px solid grey',
                }}
              >
                <TableCell colSpan={3}></TableCell>
                <TableCell
                  colSpan={3}
                  scope='colgroup'
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                  }}
                >
                  اماکن
                </TableCell>
                <TableCell
                  colSpan={3}
                  scope='colgroup'
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                  }}
                >
                  اشخاص
                </TableCell>
                <TableCell
                  colSpan={3}
                  scope='colgroup'
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                  }}
                >
                  تجهیزات/موجودی
                </TableCell>
                <TableCell
                  colSpan={3}
                  scope='colgroup'
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                  }}
                >
                  تگ ها
                </TableCell>
                <TableCell
                  colSpan={3}
                  scope='colgroup'
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                  }}
                >
                  مجوزها
                </TableCell>
                <TableCell
                  colSpan={3}
                  scope='colgroup'
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                  }}
                >
                  نقش ها
                </TableCell>
              </TableRow>
              <TableRow sx={{ blockSize: 150 }}>
                <TableCell scope='col' sx={{ textAlign: 'center', p: 1 }}>
                  ردیف
                </TableCell>
                <TableCell scope='col'></TableCell>

                <TableCell scope='col' sx={{ textAlign: 'center' }}>
                  عنوان
                </TableCell>
                <TableCell scope='col' sx={PermissionColumnStyle}>
                  مشاهده
                </TableCell>
                <TableCell scope='col' sx={PermissionColumnStyle}>
                  ایجاد/ویرایش
                </TableCell>
                <TableCell scope='col' sx={{ ...PermissionColumnStyle }}>
                  حذف
                </TableCell>
                <TableCell scope='col' sx={PermissionColumnStyle}>
                  مشاهده
                </TableCell>
                <TableCell scope='col' sx={PermissionColumnStyle}>
                  ایجاد/ویرایش
                </TableCell>
                <TableCell scope='col' sx={PermissionColumnStyle}>
                  حذف
                </TableCell>
                <TableCell scope='col' sx={PermissionColumnStyle}>
                  مشاهده
                </TableCell>
                <TableCell scope='col' sx={PermissionColumnStyle}>
                  ایجاد/ویرایش
                </TableCell>
                <TableCell scope='col' sx={PermissionColumnStyle}>
                  حذف
                </TableCell>
                <TableCell scope='col' sx={PermissionColumnStyle}>
                  مشاهده
                </TableCell>
                <TableCell scope='col' sx={PermissionColumnStyle}>
                  ایجاد/ویرایش
                </TableCell>
                <TableCell scope='col' sx={PermissionColumnStyle}>
                  حذف
                </TableCell>
                <TableCell scope='col' sx={PermissionColumnStyle}>
                  مشاهده
                </TableCell>
                <TableCell scope='col' sx={PermissionColumnStyle}>
                  ایجاد/ویرایش
                </TableCell>
                <TableCell scope='col' sx={PermissionColumnStyle}>
                  حذف
                </TableCell>
                <TableCell scope='col' sx={PermissionColumnStyle}>
                  مشاهده
                </TableCell>
                <TableCell scope='col' sx={PermissionColumnStyle}>
                  ایجاد/ویرایش
                </TableCell>
                <TableCell scope='col' sx={PermissionColumnStyle}>
                  حذف
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {index + 1}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', p: 1 }}>
                    <IconButton
                      sx={{ p: 0, m: 0 }}
                      aria-controls={
                        rowOptionsOpen ? 'options-menu' : undefined
                      }
                      aria-haspopup='true'
                      aria-expanded={rowOptionsOpen ? 'true' : undefined}
                      onClick={(e) => {
                        handleOptionsOpen(e, row);
                      }}
                    >
                      <MoreVertRoundedIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {row?.name}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {row.viewPlace ? (
                      <DoneOutlineRoundedIcon sx={{ color: 'success.main' }} />
                    ) : (
                      <CloseRoundedIcon sx={{ color: 'error.main' }} />
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {row.createPlace ? (
                      <DoneOutlineRoundedIcon sx={{ color: 'success.main' }} />
                    ) : (
                      <CloseRoundedIcon sx={{ color: 'error.main' }} />
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {row.deletePlace ? (
                      <DoneOutlineRoundedIcon sx={{ color: 'success.main' }} />
                    ) : (
                      <CloseRoundedIcon sx={{ color: 'error.main' }} />
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {row.viewPerson ? (
                      <DoneOutlineRoundedIcon sx={{ color: 'success.main' }} />
                    ) : (
                      <CloseRoundedIcon sx={{ color: 'error.main' }} />
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {row.createPerson ? (
                      <DoneOutlineRoundedIcon sx={{ color: 'success.main' }} />
                    ) : (
                      <CloseRoundedIcon sx={{ color: 'error.main' }} />
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {row.deletePerson ? (
                      <DoneOutlineRoundedIcon sx={{ color: 'success.main' }} />
                    ) : (
                      <CloseRoundedIcon sx={{ color: 'error.main' }} />
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {row.viewEquipment ? (
                      <DoneOutlineRoundedIcon sx={{ color: 'success.main' }} />
                    ) : (
                      <CloseRoundedIcon sx={{ color: 'error.main' }} />
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {row.createEquipment ? (
                      <DoneOutlineRoundedIcon sx={{ color: 'success.main' }} />
                    ) : (
                      <CloseRoundedIcon sx={{ color: 'error.main' }} />
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {row.deleteEquipment ? (
                      <DoneOutlineRoundedIcon sx={{ color: 'success.main' }} />
                    ) : (
                      <CloseRoundedIcon sx={{ color: 'error.main' }} />
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {row.viewTag ? (
                      <DoneOutlineRoundedIcon sx={{ color: 'success.main' }} />
                    ) : (
                      <CloseRoundedIcon sx={{ color: 'error.main' }} />
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {row.createTag ? (
                      <DoneOutlineRoundedIcon sx={{ color: 'success.main' }} />
                    ) : (
                      <CloseRoundedIcon sx={{ color: 'error.main' }} />
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {row.deleteTag ? (
                      <DoneOutlineRoundedIcon sx={{ color: 'success.main' }} />
                    ) : (
                      <CloseRoundedIcon sx={{ color: 'error.main' }} />
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {row.viewLicense ? (
                      <DoneOutlineRoundedIcon sx={{ color: 'success.main' }} />
                    ) : (
                      <CloseRoundedIcon sx={{ color: 'error.main' }} />
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {row.createLicense ? (
                      <DoneOutlineRoundedIcon sx={{ color: 'success.main' }} />
                    ) : (
                      <CloseRoundedIcon sx={{ color: 'error.main' }} />
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {row.deleteLicense ? (
                      <DoneOutlineRoundedIcon sx={{ color: 'success.main' }} />
                    ) : (
                      <CloseRoundedIcon sx={{ color: 'error.main' }} />
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {row.viewRole ? (
                      <DoneOutlineRoundedIcon sx={{ color: 'success.main' }} />
                    ) : (
                      <CloseRoundedIcon sx={{ color: 'error.main' }} />
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {row.createRole ? (
                      <DoneOutlineRoundedIcon sx={{ color: 'success.main' }} />
                    ) : (
                      <CloseRoundedIcon sx={{ color: 'error.main' }} />
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {row.deleteRole ? (
                      <DoneOutlineRoundedIcon sx={{ color: 'success.main' }} />
                    ) : (
                      <CloseRoundedIcon sx={{ color: 'error.main' }} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component={'div'}
          rowsPerPageOptions={[5, 10, 15, 20, 30, 50]}
          page={0}
          count={18}
          onPageChange={fetchMoreRows}
          onRowsPerPageChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setItemsPerPage(parseInt(event.target.value));
          }}
          rowsPerPage={itemsPerPage}
          labelRowsPerPage='تعداد ردیف در هر صفحه'
          labelDisplayedRows={({ from, to, count }) => {
            return `صفحه ${from} از ${to} ( ${
              count !== -1 ? count : `بیشتر از ${to}`
            } آیتم )`;
          }}
          sx={{
            "& .MuiTablePagination-actions	": {
              inlineSize: 200
            }
          }}
        />
      </Box>
      {session?.user?.role?.['editRole'] && (
        <Menu
          anchorEl={rowOptionsAnchorElement}
          open={rowOptionsOpen}
          onClose={handleOptionsClose}
        >
          {session?.user?.role?.['editRole'] ? (
            <MenuItem>
              <Button
                startIcon={<EditRoundedIcon />}
                variant='text'
                onClick={() =>
                  router.push(
                    `/users/newRole?edit=1&role=${JSON.stringify(choosedRow)}`
                  )
                }
                label='ویرایش'
              />
            </MenuItem>
          ) : null}
        </Menu>
      )}
    </>
  ) : null;
})
