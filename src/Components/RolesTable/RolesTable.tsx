import {
  Paper,
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
export default function RolesTable({ rows }: { rows: RoleType[] }) {
  return rows.length > 0 ? (
      <Table
        size='small'
        sx={{
          '& TableCell, td': {
            fontFamily: 'Vazir',
          },
          border: '1px solid grey',
        }}
      >
        <caption>
          نقش های تعریف شده در اپلیکیشن حواس به همراه سطح دسترسی هر یک از آنها
        </caption>
        <colgroup style={{ borderLeft: '1px solid grey' }}></colgroup>
        <colgroup style={{ borderLeft: '1px solid grey' }}></colgroup>
        <colgroup span={3} style={{ borderLeft: '1px solid grey' }}></colgroup>
        <colgroup span={3} style={{ borderLeft: '1px solid grey' }}></colgroup>
        <colgroup span={3} style={{ borderLeft: '1px solid grey' }}></colgroup>
        <colgroup span={3} style={{ borderLeft: '1px solid grey' }}></colgroup>
        <colgroup span={3} style={{ borderLeft: '1px solid grey' }}></colgroup>
        <colgroup span={3} style={{ borderLeft: '1px solid grey' }}></colgroup>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: 'info.main',
              borderBottom: '2px solid grey',
            }}
          >
            <TableCell colSpan={2}></TableCell>
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
          <TableRow>
            <TableCell sx={{ textAlign: 'center', p: 1 }}>ردیف</TableCell>
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
              <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
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
  ) : null;
}
