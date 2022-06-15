import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';
import React from 'react';
import { styled } from '@mui/material/styles';

const PermissionColumnStyle = {
  transform: 'rotate(-90deg)',
  whiteSpace: 'nowrap',
  blockSize: 150,
  py: 1,
  px: 1,
  inlineSize: 40,
  textAlign: 'center',
};
export default function RolesTable({ rows }: { rows: any[] }) {
  return rows.length > 0 ? (
    <Table
      size='small'
      sx={{
        '& TableCell, td': {
          fontFamily: 'Vazir',
        },
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell colSpan={3} scope='colgroup' sx={{ textAlign: 'center' }}>
            اماکن
          </TableCell>
          <TableCell colSpan={3} scope='colgroup' sx={{ textAlign: 'center' }}>
            اشخاص
          </TableCell>
          <TableCell colSpan={3} scope='colgroup' sx={{ textAlign: 'center' }}>
            تجهیزات/موجودی
          </TableCell>
          <TableCell colSpan={3} scope='colgroup' sx={{ textAlign: 'center' }}>
            تگ ها
          </TableCell>
          <TableCell colSpan={3} scope='colgroup' sx={{ textAlign: 'center' }}>
            مجوزها
          </TableCell>
          <TableCell colSpan={3} scope='colgroup' sx={{ textAlign: 'center' }}>
            نقش ها
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell sx={{ textAlign: 'center' }}>عنوان</TableCell>
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
            <TableCell sx={{ textAlign: 'center' }}>{index}</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>{row?.name}</TableCell>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : null;
}
