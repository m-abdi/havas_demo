import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import React from 'react';
import { Workflow } from '../../../lib/resolvers-types';

export default function WorkflowStageModal({ data }: { data: Workflow }) {
  return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell scope='col' sx={{ fontWeight: 'bold' }}>
                نام مرحله
              </TableCell>
              <TableCell
                scope='col'
                sx={{ textAlign: 'center', fontWeight: 'bold' }}
              >
                شروع
              </TableCell>
              {/* <TableCell>پایان</TableCell> */}
              <TableCell
                scope='col'
                sx={{ textAlign: 'center', fontWeight: 'bold' }}
              >
                اقدام کننده
              </TableCell>
              <TableCell
                scope='col'
                sx={{ textAlign: 'center', fontWeight: 'bold' }}
              >
                {' '}
                سمت
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.passedStages?.map((s, i) => (
              <TableRow>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{s?.stageName}</TableCell>
                <TableCell align='center'>{s?.createdAt}</TableCell>
                <TableCell align='center'>
                  {s?.submittedByUser?.firstNameAndLastName}
                </TableCell>
                <TableCell align='center'>{s?.submittedByUser?.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}
