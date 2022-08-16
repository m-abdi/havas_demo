import React, { useEffect } from 'react';
import { Table, TableBody, TableContainer, TextField } from '@mui/material';

import { memo } from 'react';
import { toEnglishDigit } from '@/src/Logic/toEnglishDigit';

export default memo(function EditableHtmlTable({
  selectedColumns,
  register,
  existingEnterWorkflow: assets,
  editable = true,
  reset,
  setValue,
}: {
  selectedColumns: any;
  register?: any;
  existingEnterWorkflow: any;
  editable?: boolean;
  reset?: any;
  setValue?: any;
}) {
  // update react-hook-form state after rfid operation
  useEffect(() => {
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
    <TableContainer sx={{ maxInlineSize: '90vw' }}>
      <Table border={2} sx={{"& td": {minInlineSize: 80}}} >
      <caption>کیبورد را در حالت انگلیسی قرار دهید</caption>
        <thead>
          <tr>
            <th>نوع سیلندر</th>
            {/* ک-م */}
            <th></th>
            {/* اکسیژن */}
            <th
              style={{
                display:
                  selectedColumns.indexOf('اکسیژن') > -1
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
                  selectedColumns.indexOf('گاز بیهوشی') > -1
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
                  selectedColumns.indexOf('شفت-فلکه') > -1
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
                  selectedColumns.indexOf('شیر کنترل') > -1
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
                  selectedColumns.indexOf('Co2') > -1 ? 'table-cell' : 'none',
              }}
            >
              Co2
            </th>
            {/* آرگون */}
            <th
              style={{
                display:
                  selectedColumns.indexOf('آرگون') > -1 ? 'table-cell' : 'none',
              }}
            >
              آرگون
            </th>
            {/* ازت */}
            <th
              style={{
                display:
                  selectedColumns.indexOf('ازت') > -1 ? 'table-cell' : 'none',
              }}
            >
              ازت
            </th>
            {/* هوای خشک */}
            <th
              style={{
                display:
                  selectedColumns.indexOf('هوای خشک') > -1
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
                  selectedColumns.indexOf('آنتونکس') > -1
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
                  selectedColumns.indexOf('استیلن') > -1
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
                  selectedColumns.indexOf('گاز مایع') > -1
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
            <td rowSpan={2} style={{ textAlign: 'center' }}>
              50لیتری
            </td>
            {/* ک-م */}
            <td>کارخانه</td>
            {/* اکسیژن */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('اکسیژن') > -1
                    ? 'table-cell'
                    : 'none',
                textAlign: 'center',
              }}
            >
              <TextField
                size='small'
                type='number'
                id='oxygen_50l_factory'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('oxygen_50l_factory', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('oxygen_50l_factory', {
                    value: assets?.oxygen_50l_factory,
                  }),
                }}
                sx={{ width: '100%', textAlign: 'center !important' }}
              />
            </td>
            {/* گاز بیهوشی */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('گاز بیهوشی') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='bihoshi_50l_factory'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('bihoshi_50l_factory', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('bihoshi_50l_factory', {
                    value: assets?.bihoshi_50l_factory,
                  }),
                }}
              />
            </td>
            {/* شفت-فلکه */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('شفت-فلکه') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='shaft_50l_factory'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('shaft_50l_factory', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('shaft_50l_factory', {
                    value: assets?.shaft_50l_factory,
                  }),
                }}
              />
            </td>
            {/* شیر کنترل */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('شیر کنترل') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='controlValve_50l_factory'
                disabled={editable ? false : true}

                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('controlValve_50l_factory', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('controlValve_50l_factory', {
                    value: assets?.controlValve_50l_factory,
                  }),
                }}
              />
            </td>
            {/* Co2 */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('Co2') > -1 ? 'table-cell' : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='co2_50l_factory'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('co2_50l_factory', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('co2_50l_factory', {
                    value: assets?.co2_50l_factory,
                  }),
                }}
              />
            </td>
            {/* آرگون */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('آرگون') > -1 ? 'table-cell' : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='argon_50l_factory'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('argon_50l_factory', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('argon_50l_factory', {
                    value: assets?.argon_50l_factory,
                  }),
                }}
              />
            </td>
            {/* ازت */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('ازت') > -1 ? 'table-cell' : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='azete_50l_factory'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('azete_50l_factory', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('azete_50l_factory', {
                    value: assets?.azete_50l_factory,
                  }),
                }}
              />
            </td>
            {/* هوای خشک */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('هوای خشک') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='dryAir_50l_factory'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('dryAir_50l_factory', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('dryAir_50l_factory', {
                    value: assets?.dryAir_50l_factory,
                  }),
                }}
              />
            </td>
            {/* آنتونکس */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('آنتونکس') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='entonox_50l_factory'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('entonox_50l_factory', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('entonox_50l_factory', {
                    value: assets?.entonox_50l_factory,
                  }),
                }}
              />
            </td>
            {/* استیلن */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('استیلن') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='acetylene_50l_factory'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('acetylene_50l_factory', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('acetylene_50l_factory', {
                    value: assets?.acetylene_50l_factory,
                  }),
                }}
              />
            </td>
            {/* گاز مایع */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('گاز مایع') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='lpg_50l_factory'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('lpg_50l_factory', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('lpg_50l_factory', {
                    value: assets?.lpg_50l_factory,
                  }),
                }}
              />
            </td>
          </tr>

          <tr>
            {/* ک-م */}
            <td>بیمارستان</td>
            {/* اکسیژن */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('اکسیژن') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='oxygen_50l_customer'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('oxygen_50l_customer', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('oxygen_50l_customer', {
                    value: assets?.oxygen_50l_customer,
                  }),
                }}
              />
            </td>
            {/* گاز بیهوشی */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('گاز بیهوشی') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='bihoshi_50l_customer'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('bihoshi_50l_customer', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('bihoshi_50l_customer', {
                    value: assets?.bihoshi_50l_customer,
                  }),
                }}
              />
            </td>
            {/* شفت-فلکه */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('شفت-فلکه') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='shaft_50l_customer'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('shaft_50l_customer', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('shaft_50l_customer', {
                    value: assets?.shaft_50l_customer,
                  }),
                }}
              />
            </td>
            {/* شیر کنترل */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('شیر کنترل') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='controlValve_50l_customer'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('controlValve_50l_customer', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('controlValve_50l_customer', {
                    value: assets?.controlValve_50l_customer,
                  }),
                }}
              />
            </td>
            {/* Co2 */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('Co2') > -1 ? 'table-cell' : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='co2_50l_customer'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('co2_50l_customer', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('co2_50l_customer', {
                    value: assets?.co2_50l_customer,
                  }),
                }}
              />
            </td>
            {/* آرگون */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('آرگون') > -1 ? 'table-cell' : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='argon_50l_customer'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('argon_50l_customer', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('argon_50l_customer', {
                    value: assets?.argon_50l_customer,
                  }),
                }}
              />
            </td>
            {/* ازت */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('ازت') > -1 ? 'table-cell' : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='azete_50l_customer'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('azete_50l_customer', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('azete_50l_customer', {
                    value: assets?.azete_50l_customer,
                  }),
                }}
              />
            </td>
            {/* هوای خشک */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('هوای خشک') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='dryAir_50l_customer'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('dryAir_50l_customer', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('dryAir_50l_customer', {
                    value: assets?.dryAir_50l_customer,
                  }),
                }}
              />
            </td>
            {/* آنتونکس */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('آنتونکس') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='entonox_50l_customer'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('entonox_50l_customer', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('entonox_50l_customer', {
                    value: assets?.entonox_50l_customer,
                  }),
                }}
              />
            </td>
            {/* استیلن */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('استیلن') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='acetylene_50l_customer'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('acetylene_50l_customer', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('acetylene_50l_customer', {
                    value: assets?.acetylene_50l_customer,
                  }),
                }}
              />
            </td>
            {/* گاز مایع */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('گاز مایع') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='lpg_50l_customer'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('lpg_50l_customer', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('lpg_50l_customer', {
                    value: assets?.lpg_50l_customer,
                  }),
                }}
              />
            </td>
          </tr>

          <tr>
            {/* نوع سیلندر */}
            <td rowSpan={2} style={{ textAlign: 'center' }}>
              40لیتری
            </td>
            {/* ک-م */}
            <td>کارخانه</td>
            {/* اکسیژن */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('اکسیژن') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='oxygen_40l_factory'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('oxygen_40l_factory', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('oxygen_40l_factory', {
                    value: assets?.oxygen_40l_factory,
                  }),
                }}
              />
            </td>
            {/* گاز بیهوشی */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('گاز بیهوشی') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='bihoshi_40l_factory'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('bihoshi_40l_factory', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('bihoshi_40l_factory', {
                    value: assets?.bihoshi_40l_factory,
                  }),
                }}
              />
            </td>
            {/* شفت-فلکه */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('شفت-فلکه') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='shaft_40l_factory'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('shaft_40l_factory', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('shaft_40l_factory', {
                    value: assets?.shaft_40l_factory,
                  }),
                }}
              />
            </td>
            {/* شیر کنترل */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('شیر کنترل') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='controlValve_40l_factory'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('controlValve_40l_factory', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('controlValve_40l_factory', {
                    value: assets?.controlValve_40l_factory,
                  }),
                }}
              />
            </td>
            {/* Co2 */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('Co2') > -1 ? 'table-cell' : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='co2_40l_factory'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('co2_40l_factory', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('co2_40l_factory', {
                    value: assets?.co2_40l_factory,
                  }),
                }}
              />
            </td>
            {/* آرگون */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('آرگون') > -1 ? 'table-cell' : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='argon_40l_factory'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('argon_40l_factory', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('argon_40l_factory', {
                    value: assets?.argon_40l_factory,
                  }),
                }}
              />
            </td>
            {/* ازت */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('ازت') > -1 ? 'table-cell' : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='azete_40l_factory'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('azete_40l_factory', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('azete_40l_factory', {
                    value: assets?.azete_40l_factory,
                  }),
                }}
              />
            </td>
            {/* هوای خشک */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('هوای خشک') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='dryAir_40l_factory'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('dryAir_40l_factory', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('dryAir_40l_factory', {
                    value: assets?.dryAir_40l_factory,
                  }),
                }}
              />
            </td>
            {/* آنتونکس */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('آنتونکس') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='entonox_40l_factory'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('entonox_40l_factory', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('entonox_40l_factory', {
                    value: assets?.entonox_40l_factory,
                  }),
                }}
              />
            </td>
            {/* استیلن */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('استیلن') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='acetylene_40l_factory'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('acetylene_40l_factory', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('acetylene_40l_factory', {
                    value: assets?.acetylene_40l_factory,
                  }),
                }}
              />
            </td>
            {/* گاز مایع */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('گاز مایع') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='lpg_40l_factory'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('lpg_40l_factory', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('lpg_40l_factory', {
                    value: assets?.lpg_40l_factory,
                  }),
                }}
              />
            </td>
          </tr>

          <tr>
            {/* ک-م */}
            <td>بیمارستان</td>
            {/* اکسیژن */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('اکسیژن') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='oxygen_40l_customer'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('oxygen_40l_customer', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('oxygen_40l_customer', {
                    value: assets?.oxygen_40l_customer,
                  }),
                }}
              />
            </td>
            {/* گاز بیهوشی */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('گاز بیهوشی') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='bihoshi_40l_customer'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('bihoshi_40l_customer', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('bihoshi_40l_customer', {
                    value: assets?.bihoshi_40l_customer,
                  }),
                }}
              />
            </td>
            {/* شفت-فلکه */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('شفت-فلکه') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='shaft_40l_customer'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('shaft_40l_customer', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('shaft_40l_customer', {
                    value: assets?.shaft_40l_customer,
                  }),
                }}
              />
            </td>
            {/* شیر کنترل */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('شیر کنترل') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='controlValve_40l_customer'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('controlValve_40l_customer', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('controlValve_40l_customer', {
                    value: assets?.controlValve_40l_customer,
                  }),
                }}
              />
            </td>
            {/* Co2 */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('Co2') > -1 ? 'table-cell' : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='co2_40l_customer'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('co2_40l_customer', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('co2_40l_customer', {
                    value: assets?.co2_40l_customer,
                  }),
                }}
              />
            </td>
            {/* آرگون */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('آرگون') > -1 ? 'table-cell' : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='argon_40l_customer'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('argon_40l_customer', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('argon_40l_customer', {
                    value: assets?.argon_40l_customer,
                  }),
                }}
              />
            </td>
            {/* ازت */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('ازت') > -1 ? 'table-cell' : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='azete_40l_customer'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('azete_40l_customer', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('azete_40l_customer', {
                    value: assets?.azete_40l_customer,
                  }),
                }}
              />
            </td>
            {/* هوای خشک */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('هوای خشک') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='dryAir_40l_customer'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('dryAir_40l_customer', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('dryAir_40l_customer', {
                    value: assets?.dryAir_40l_customer,
                  }),
                }}
              />
            </td>
            {/* آنتونکس */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('آنتونکس') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='entonox_40l_customer'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('entonox_40l_customer', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('entonox_40l_customer', {
                    value: assets?.entonox_40l_customer,
                  }),
                }}
              />
            </td>
            {/* استیلن */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('استیلن') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='acetylene_40l_customer'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('acetylene_40l_customer', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('acetylene_40l_customer', {
                    value: assets?.acetylene_40l_customer,
                  }),
                }}
              />
            </td>
            {/* گاز مایع */}
            <td
              style={{
                display:
                  selectedColumns.indexOf('گاز مایع') > -1
                    ? 'table-cell'
                    : 'none',
              }}
            >
              <TextField
                size='small'
                type='number'
                sx={{ width: '100%', textAlign: 'center' }}
                id='lpg_40l_customer'
                disabled={editable ? false : true}
                onChange={(e) => {
                  if (parseInt(e.target.value) < 1) {
                    setValue?.('lpg_40l_customer', null);
                  }
                }}
                inputProps={{
                  min: '1',
                  ...register?.('lpg_40l_customer', {
                    value: assets?.lpg_40l_customer,
                  }),
                }}
              />
            </td>
          </tr>
        </TableBody>
      </Table>
    </TableContainer>
  );
});
