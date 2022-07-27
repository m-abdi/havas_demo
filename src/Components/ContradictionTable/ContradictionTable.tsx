import {
  AggregatedTransferedAssets,
  Workflow,
} from '../../../lib/resolvers-types';
import React, { memo, useContext } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { InfoContext } from '../../../pages/_app';
import { toPersianDigit } from '../../Logic/toPersianDigit';

function giveMeContradictionRows(
  corporationRegisteredAssets: AggregatedTransferedAssets,
  warehouseRegisteredAssets: AggregatedTransferedAssets
): any[] {
  const infoContext = useContext(InfoContext);
  const rows: any = [];
  //
  const aggCorporationRegisteredAssets = Object.entries(
    corporationRegisteredAssets
  )?.filter(
    ([key, value]) => !/_factory/.test(key) && !/_customer/.test(key) && value
  );
  //
  const aggWarehouseRegisteredAssets = Object.entries(
    warehouseRegisteredAssets
  )?.filter(
    ([key, value]) => !/_factory/.test(key) && !/_customer/.test(key) && value
  );

  for (const corporationAsset of aggCorporationRegisteredAssets) {
    const warehouseAsset = aggWarehouseRegisteredAssets.find(
      ([key, value]) => key === corporationAsset?.[0]
    );
    if (warehouseAsset && corporationAsset?.[1] !== warehouseAsset?.[1]) {
      rows.push(
        <TableRow key={corporationAsset?.[0]}>
          <TableCell sx={{ textAlign: 'center' }}>
            {infoContext?.equipments?.find(
              (e) => e?.id === corporationAsset?.[0]
            )?.label ?? corporationAsset?.[0]}
          </TableCell>
          <TableCell sx={{ textAlign: 'center' }}>
            {toPersianDigit(corporationAsset?.[1]?.toString() as string)}
          </TableCell>
          <TableCell sx={{ textAlign: 'center' }}>
            {toPersianDigit(warehouseAsset?.[1]?.toString() as string)}
          </TableCell>
        </TableRow>
      );
    }
  }

  return rows;
}

export default memo(function ContradictionTable({ data }: { data: Workflow }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              scope='col'
              sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '1.2rem',
              }}
            >
              #
            </TableCell>
            <TableCell
              scope='col'
              sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '1.2rem',
              }}
            >
              ثبت شده توسط شرکت
            </TableCell>
            <TableCell
              scope='col'
              sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '1.2rem',
              }}
            >
              ثبت شده توسط انباردار
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {giveMeContradictionRows(
            data?.passedStages?.[0]?.havaleh?.assets as any,
            data?.passedStages?.[1]?.havaleh?.assets as any
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
