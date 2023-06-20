import { Table, TableBody, TableContainer, TextField } from '@mui/material';
import { memo, useEffect, useState } from 'react';

import React from 'react';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';

const MyTable = styled.table`
  margin-inline: 16px;
  & td,
  th {
    border: 1px solid black;
    border-collapse: collapse;
    border-radius: 5px;
    min-inline-size: 90px;
    max-inline-size: 150px;
  }
`;

//forceUpdate hook
function useForceUpdate() {
  const [value, setValue] = useState<number>(0); // integer state
  return () => setValue((value: number) => value + 1); // update state to force render
}
export default function AggregatedTable({
  editable = false,
  selectedColumns = [
    'اکسیژن',
    'گاز بیهوشی',
    'شفت-فلکه',
    'شیر کنترل',
    'Co2',
    'آرگون',
    'ازت',
    'هوای خشک',
    'آنتونکس',
    'استیلن',
    'گاز مایع',
  ],
  register,
  setValue,
  assets,
  reset,
  ignoreColumnCheck = false,
}: {
  editable: boolean;
  register?: any;
  setValue?: any;
  reset?: any;
  ignoreColumnCheck?: boolean;
  selectedColumns?: string[];
  assets: {
    oxygen_50l?: number;
    bihoshi_50l?: number;
    shaft_50l?: number;
    controlValve_50l?: number;
    co2_50l?: number;
    argon_50l?: number;
    azete_50l?: number;
    dryAir_50l?: number;
    entonox_50l?: number;
    acetylene_50l?: number;
    lpg_50l?: number;
    oxygen_40l?: number;
    bihoshi_40l?: number;
    shaft_40l?: number;
    controlValve_40l?: number;
    co2_40l?: number;
    argon_40l?: number;
    azete_40l?: number;
    dryAir_40l?: number;
    entonox_40l?: number;
    acetylene_40l?: number;
    lpg_40l?: number;
  };
}) {
  const m: any = {
    oxygen: 'اکسیژن',
    bihoshi: 'گاز بیهوشی',
    shaft: 'شفت-فلکه',
    controlVale: 'شیر کنترل',
    co2: 'Co2',
    argon: 'آرگون',
    azete: 'ازت',
    dryAir: 'هوای خشک',
    entonox: 'آنتونکس',
    acetylene: 'استیلن',
    lpg: 'گاز مایع',
  };
  if (assets && !ignoreColumnCheck) {
    const ik = Object.entries(assets)
      .filter(([k, v]) => v)
      .map(([k, v]) =>
        k
          .replace('_50l_factory', '')
          .replace('_40l_factory', '')
          .replace('_50l_customer', '')
          .replace('_40l_customer', '')
      );

    selectedColumns = ik.filter((a: keyof typeof m) => m[a]).map((a) => m[a]);
  }
  const [selectedColumnCutomized, setSelectedColumnCutomized] =
    useState(selectedColumns);

  useEffect(() => {
    if (assets && !ignoreColumnCheck) {
      const ik = Object.entries(assets)
        .filter(([k, v]) => v)
        .map(([k, v]) =>
          k
            .replace('_50l_factory', '')
            .replace('_40l_factory', '')
            .replace('_50l_customer', '')
            .replace('_40l_customer', '')
        );

      setSelectedColumnCutomized(
        ik.filter((a: keyof typeof m) => m[a]).map((a) => m[a])
      );
    }
  }, [assets]);

  // update react-hook-form state after rfid operation
  useEffect(() => {
    reset?.();
    setValue?.('oxygen_50l', assets?.oxygen_50l);
    setValue?.('bihoshi_50l', assets?.bihoshi_50l);
    setValue?.('shaft_50l', assets?.shaft_50l);
    setValue?.('controlValve_50l', assets?.controlValve_50l);
    setValue?.('co2_50l', assets?.co2_50l);
    setValue?.('argon_50l', assets?.argon_50l);
    setValue?.('azete_50l', assets?.azete_50l);
    setValue?.('dryAir_50l', assets?.dryAir_50l);
    setValue?.('entonox_50l', assets?.entonox_50l);
    setValue?.('acetylene_50l', assets?.acetylene_50l);
    setValue?.('lpg_50l', assets?.lpg_50l);
    setValue?.('oxygen_40l', assets?.oxygen_40l);
    setValue?.('bihoshi_40l', assets?.bihoshi_40l);
    setValue?.('shaft_40l', assets?.shaft_40l);
    setValue?.('controlValve_40l', assets?.controlValve_40l);
    setValue?.('co2_40l', assets?.co2_40l);
    setValue?.('argon_40l', assets?.argon_40l);
    setValue?.('azete_40l', assets?.azete_40l);
    setValue?.('dryAir_40l', assets?.dryAir_40l);
    setValue?.('entonox_40l', assets?.entonox_40l);
    setValue?.('acetylene_40l', assets?.acetylene_40l);
    setValue?.('lpg_40l', assets?.lpg_40l);
  }, [assets]);

  return (
    <TableContainer>
      <MyTable>
        <thead>
          <tr>
            <th>نوع سیلندر</th>

            {/* اکسیژن */}
            <th
              style={{
                display:
                  selectedColumnCutomized.indexOf('اکسیژن') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              اکسیژن
            </th>
            {/* گاز بیهوشی */}
            <th
              style={{
                display:
                  selectedColumnCutomized.indexOf('گاز بیهوشی') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              گاز بیهوشی
            </th>
            {/* شفت-فلکه */}
            <th
              style={{
                display:
                  selectedColumnCutomized.indexOf('شفت-فلکه') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              شفت-فلکه
            </th>
            {/* شیر کنترل */}
            <th
              style={{
                display:
                  selectedColumnCutomized.indexOf('شیر کنترل') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              شیر کنترل
            </th>
            {/* Co2 */}
            <th
              style={{
                display:
                  selectedColumnCutomized.indexOf('Co2') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              Co2
            </th>
            {/* آرگون */}
            <th
              style={{
                display:
                  selectedColumnCutomized.indexOf('آرگون') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              آرگون
            </th>
            {/* ازت */}
            <th
              style={{
                display:
                  selectedColumnCutomized.indexOf('ازت') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              ازت
            </th>
            {/* هوای خشک */}
            <th
              style={{
                display:
                  selectedColumnCutomized.indexOf('هوای خشک') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              هوای خشک
            </th>
            {/* آنتونکس */}
            <th
              style={{
                display:
                  selectedColumnCutomized.indexOf('آنتونکس') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              آنتونکس
            </th>
            {/* استیلن */}
            <th
              style={{
                display:
                  selectedColumnCutomized.indexOf('استیلن') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              استیلن
            </th>
            {/* گاز مایع */}
            <th
              style={{
                display:
                  selectedColumnCutomized.indexOf('گاز مایع') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              گاز مایع
            </th>
          </tr>
        </thead>

        <TableBody sx={{ '& input': { textAlign: 'center' } }}>
          <tr>
            {/* نوع سیلندر */}
            <td style={{ textAlign: 'center' }}>۵۰ لیتری</td>

            {/* اکسیژن */}
            <td
              style={{
                display:
                  selectedColumnCutomized.indexOf('اکسیژن') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                size='small'
                fullWidth
                variant='standard'
                type='number'
                id='oxygen_50l'
                disabled={!editable}
                defaultValue={assets?.oxygen_50l}
                onInput={(e: any) => {
                  if (parseInt(e.target.value) < 0) {
                    alert('مقادیر منفی مجاز نیست!');
                    setValue(e.target.id, null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('oxygen_50l', {
                    value: assets?.oxygen_50l,
                  }),
                }}
              />
            </td>
            {/* گاز بیهوشی */}
            <td
              style={{
                display:
                  selectedColumnCutomized.indexOf('گاز بیهوشی') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                fullWidth
                variant='standard'
                size='small'
                type='number'
                disabled={!editable}
                sx={{ width: '100%', textAlign: 'center' }}
                id='bihoshi_50l'
                onInput={(e: any) => {
                  if (parseInt(e.target.value) < 0) {
                    alert('مقادیر منفی مجاز نیست!');
                    setValue(e.target.id, null);
                  }
                }}
                defaultValue={assets?.bihoshi_50l}
                inputProps={{
                  min: '1',
                  ...register?.('bihoshi_50l', {
                    value: assets?.bihoshi_50l,
                  }),
                }}
              />
            </td>
            {/* شفت-فلکه */}
            <td
              style={{
                display:
                  selectedColumnCutomized.indexOf('شفت-فلکه') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                fullWidth
                variant='standard'
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='shaft_50l'
                disabled={!editable}
                onInput={(e: any) => {
                  if (parseInt(e.target.value) < 0) {
                    alert('مقادیر منفی مجاز نیست!');
                    setValue(e.target.id, null);
                  }
                }}
                defaultValue={assets?.shaft_50l}
                inputProps={{
                  min: '1',
                  ...register?.('shaft_50l', {
                    value: assets?.shaft_50l,
                  }),
                }}
              />
            </td>
            {/* شیر کنترل */}
            <td
              style={{
                display:
                  selectedColumnCutomized.indexOf('شیر کنترل') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                fullWidth
                variant='standard'
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='controlValve_50l'
                disabled={!editable}
                onInput={(e: any) => {
                  if (parseInt(e.target.value) < 0) {
                    alert('مقادیر منفی مجاز نیست!');
                    setValue(e.target.id, null);
                  }
                }}
                defaultValue={assets?.controlValve_50l}
                inputProps={{
                  min: '1',
                  ...register?.('controlValve_50l', {
                    value: assets?.controlValve_50l,
                  }),
                }}
              />
            </td>
            {/* Co2 */}
            <td
              style={{
                display:
                  selectedColumnCutomized.indexOf('Co2') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                fullWidth
                variant='standard'
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='co2_50l'
                disabled={!editable}
                onInput={(e: any) => {
                  if (parseInt(e.target.value) < 0) {
                    alert('مقادیر منفی مجاز نیست!');
                    setValue(e.target.id, null);
                  }
                }}
                defaultValue={assets?.co2_50l}
                inputProps={{
                  min: '1',
                  ...register?.('co2_50l', {
                    value: assets?.co2_50l,
                  }),
                }}
              />
            </td>
            {/* آرگون */}
            <td
              style={{
                display:
                  selectedColumnCutomized.indexOf('آرگون') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                fullWidth
                variant='standard'
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='argon_50l'
                disabled={!editable}
                onInput={(e: any) => {
                  if (parseInt(e.target.value) < 0) {
                    alert('مقادیر منفی مجاز نیست!');
                    setValue(e.target.id, null);
                  }
                }}
                defaultValue={assets?.argon_50l}
                inputProps={{
                  min: '1',
                  ...register?.('argon_50l', {
                    value: assets?.argon_50l,
                  }),
                }}
              />
            </td>
            {/* ازت */}
            <td
              style={{
                display:
                  selectedColumnCutomized.indexOf('ازت') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                fullWidth
                variant='standard'
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='azete_50l'
                disabled={!editable}
                onInput={(e: any) => {
                  if (parseInt(e.target.value) < 0) {
                    alert('مقادیر منفی مجاز نیست!');
                    setValue(e.target.id, null);
                  }
                }}
                defaultValue={assets?.azete_50l}
                inputProps={{
                  min: '1',
                  ...register?.('azete_50l', {
                    value: assets?.azete_50l,
                  }),
                }}
              />
            </td>
            {/* هوای خشک */}
            <td
              style={{
                display:
                  selectedColumnCutomized.indexOf('هوای خشک') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                fullWidth
                variant='standard'
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='dryAir_50l'
                disabled={!editable}
                onInput={(e: any) => {
                  if (parseInt(e.target.value) < 0) {
                    alert('مقادیر منفی مجاز نیست!');
                    setValue(e.target.id, null);
                  }
                }}
                defaultValue={assets?.dryAir_50l}
                inputProps={{
                  min: '1',
                  ...register?.('dryAir_50l', {
                    value: assets?.dryAir_50l,
                  }),
                }}
              />
            </td>
            {/* آنتونکس */}
            <td
              style={{
                display:
                  selectedColumnCutomized.indexOf('آنتونکس') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                fullWidth
                variant='standard'
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='entonox_50l'
                disabled={!editable}
                onInput={(e: any) => {
                  if (parseInt(e.target.value) < 0) {
                    alert('مقادیر منفی مجاز نیست!');
                    setValue(e.target.id, null);
                  }
                }}
                defaultValue={assets?.entonox_50l}
                inputProps={{
                  min: '1',
                  ...register?.('entonox_50l', {
                    value: assets?.entonox_50l,
                  }),
                }}
              />
            </td>
            {/* استیلن */}
            <td
              style={{
                display:
                  selectedColumnCutomized.indexOf('استیلن') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                fullWidth
                variant='standard'
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='acetylene_50l'
                disabled={!editable}
                onInput={(e: any) => {
                  if (parseInt(e.target.value) < 0) {
                    alert('مقادیر منفی مجاز نیست!');
                    setValue(e.target.id, null);
                  }
                }}
                defaultValue={assets?.acetylene_50l}
                inputProps={{
                  min: '1',
                  ...register?.('acetylene_50l', {
                    value: assets?.acetylene_50l,
                  }),
                }}
              />
            </td>
            {/* گاز مایع */}
            <td
              style={{
                display:
                  selectedColumnCutomized.indexOf('گاز مایع') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                fullWidth
                variant='standard'
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='lpg_50l'
                disabled={!editable}
                onInput={(e: any) => {
                  if (parseInt(e.target.value) < 0) {
                    alert('مقادیر منفی مجاز نیست!');
                    setValue(e.target.id, null);
                  }
                }}
                defaultValue={assets?.lpg_50l}
                inputProps={{
                  min: '1',
                  ...register?.('lpg_50l', {
                    value: assets?.lpg_50l,
                  }),
                }}
              />
            </td>
          </tr>

          <tr>
            {/* نوع سیلندر */}
            <td style={{ textAlign: 'center' }}>۱۰ لیتری</td>
            {/* اکسیژن */}
            <td
              style={{
                display:
                  selectedColumnCutomized.indexOf('اکسیژن') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                fullWidth
                variant='standard'
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='oxygen_40l'
                disabled={!editable}
                onInput={(e: any) => {
                  if (parseInt(e.target.value) < 0) {
                    alert('مقادیر منفی مجاز نیست!');
                    setValue(e.target.id, null);
                  }
                }}
                defaultValue={assets?.oxygen_40l}
                inputProps={{
                  min: '1',
                  ...register?.('oxygen_40l', {
                    value: assets?.oxygen_40l,
                  }),
                }}
              />
            </td>
            {/* گاز بیهوشی */}
            <td
              style={{
                display:
                  selectedColumnCutomized.indexOf('گاز بیهوشی') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                fullWidth
                variant='standard'
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='bihoshi_40l'
                disabled={!editable}
                onInput={(e: any) => {
                  if (parseInt(e.target.value) < 0) {
                    alert('مقادیر منفی مجاز نیست!');
                    setValue(e.target.id, null);
                  }
                }}
                defaultValue={assets?.bihoshi_40l}
                inputProps={{
                  min: '1',
                  ...register?.('bihoshi_40l', {
                    value: assets?.bihoshi_40l,
                  }),
                }}
              />
            </td>
            {/* شفت-فلکه */}
            <td
              style={{
                display:
                  selectedColumnCutomized.indexOf('شفت-فلکه') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                fullWidth
                variant='standard'
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='shaft_40l'
                disabled={!editable}
                onInput={(e: any) => {
                  if (parseInt(e.target.value) < 0) {
                    alert('مقادیر منفی مجاز نیست!');
                    setValue(e.target.id, null);
                  }
                }}
                defaultValue={assets?.shaft_40l}
                inputProps={{
                  min: '1',
                  ...register?.('shaft_40l', {
                    value: assets?.shaft_40l,
                  }),
                }}
              />
            </td>
            {/* شیر کنترل */}
            <td
              style={{
                display:
                  selectedColumnCutomized.indexOf('شیر کنترل') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                fullWidth
                variant='standard'
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='controlValve_40l'
                disabled={!editable}
                onInput={(e: any) => {
                  if (parseInt(e.target.value) < 0) {
                    alert('مقادیر منفی مجاز نیست!');
                    setValue(e.target.id, null);
                  }
                }}
                defaultValue={assets?.controlValve_40l}
                inputProps={{
                  min: '1',
                  ...register?.('controlValve_40l', {
                    value: assets?.controlValve_40l,
                  }),
                }}
              />
            </td>
            {/* Co2 */}
            <td
              style={{
                display:
                  selectedColumnCutomized.indexOf('Co2') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                fullWidth
                variant='standard'
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='co2_40l'
                disabled={!editable}
                onInput={(e: any) => {
                  if (parseInt(e.target.value) < 0) {
                    alert('مقادیر منفی مجاز نیست!');
                    setValue(e.target.id, null);
                  }
                }}
                defaultValue={assets?.co2_40l}
                inputProps={{
                  min: '1',
                  ...register?.('co2_40l', {
                    value: assets?.co2_40l,
                  }),
                }}
              />
            </td>
            {/* آرگون */}
            <td
              style={{
                display:
                  selectedColumnCutomized.indexOf('آرگون') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                fullWidth
                variant='standard'
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='argon_40l'
                disabled={!editable}
                onInput={(e: any) => {
                  if (parseInt(e.target.value) < 0) {
                    alert('مقادیر منفی مجاز نیست!');
                    setValue(e.target.id, null);
                  }
                }}
                defaultValue={assets?.argon_40l}
                inputProps={{
                  min: '1',
                  ...register?.('argon_40l', {
                    value: assets?.argon_40l,
                  }),
                }}
              />
            </td>
            {/* ازت */}
            <td
              style={{
                display:
                  selectedColumnCutomized.indexOf('ازت') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                fullWidth
                variant='standard'
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='azete_40l'
                disabled={!editable}
                onInput={(e: any) => {
                  if (parseInt(e.target.value) < 0) {
                    alert('مقادیر منفی مجاز نیست!');
                    setValue(e.target.id, null);
                  }
                }}
                defaultValue={assets?.azete_40l}
                inputProps={{
                  min: '1',
                  ...register?.('azete_40l', {
                    value: assets?.azete_40l,
                  }),
                }}
              />
            </td>
            {/* هوای خشک */}
            <td
              style={{
                display:
                  selectedColumnCutomized.indexOf('هوای خشک') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                fullWidth
                variant='standard'
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='dryAir_40l'
                disabled={!editable}
                onInput={(e: any) => {
                  if (parseInt(e.target.value) < 0) {
                    alert('مقادیر منفی مجاز نیست!');
                    setValue(e.target.id, null);
                  }
                }}
                defaultValue={assets?.dryAir_40l}
                inputProps={{
                  min: '1',
                  ...register?.('dryAir_40l', {
                    value: assets?.dryAir_40l,
                  }),
                }}
              />
            </td>
            {/* آنتونکس */}
            <td
              style={{
                display:
                  selectedColumnCutomized.indexOf('آنتونکس') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                fullWidth
                variant='standard'
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='entonox_40l'
                disabled={!editable}
                onInput={(e: any) => {
                  if (parseInt(e.target.value) < 0) {
                    alert('مقادیر منفی مجاز نیست!');
                    setValue(e.target.id, null);
                  }
                }}
                defaultValue={assets?.entonox_40l}
                inputProps={{
                  min: '1',
                  ...register?.('entonox_40l', {
                    value: assets?.entonox_40l,
                  }),
                }}
              />
            </td>
            {/* استیلن */}
            <td
              style={{
                display:
                  selectedColumnCutomized.indexOf('استیلن') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                fullWidth
                variant='standard'
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='acetylene_40l'
                disabled={!editable}
                onInput={(e: any) => {
                  if (parseInt(e.target.value) < 0) {
                    alert('مقادیر منفی مجاز نیست!');
                    setValue(e.target.id, null);
                  }
                }}
                defaultValue={assets?.acetylene_40l}
                inputProps={{
                  min: '1',
                  ...register?.('acetylene_40l', {
                    value: assets?.acetylene_40l,
                  }),
                }}
              />
            </td>
            {/* گاز مایع */}
            <td
              style={{
                display:
                  selectedColumnCutomized.indexOf('گاز مایع') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                fullWidth
                variant='standard'
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='lpg_40l'
                disabled={!editable}
                onInput={(e: any) => {
                  if (parseInt(e.target.value) < 0) {
                    alert('مقادیر منفی مجاز نیست!');
                    setValue(e.target.id, null);
                  }
                }}
                defaultValue={assets?.lpg_40l}
                inputProps={{
                  min: '1',
                  ...register?.('lpg_40l', {
                    value: assets?.lpg_40l,
                  }),
                }}
              />
            </td>
          </tr>
        </TableBody>
      </MyTable>
    </TableContainer>
  );
}
