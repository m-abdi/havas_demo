import React, { useEffect } from 'react';
import { TableBody, TextField } from '@mui/material';

import { memo } from 'react';

export default memo(function EditableHtmlTable({
  selectedColumns,
  register,
  existingEnterWorkflow,
  editable = true,
  reset
}) {
  useEffect(() => {
    reset?.()
  }, [existingEnterWorkflow])
  
  return (
    <>
      <table border={2}>
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
                inputProps={{
                  ...register?.('oxygen_50l_factory', {
                    value: existingEnterWorkflow?.oxygen_50l_factory,
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
                inputProps={{
                  ...register?.('bihoshi_50l_factory', {
                    value: existingEnterWorkflow?.bihoshi_50l_factory,
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
                inputProps={{
                  ...register?.('shaft_50l_factory', {
                    value: existingEnterWorkflow?.shaft_50l_factory,
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
                inputProps={{
                  ...register?.('controlValve_50l_factory', {
                    value: existingEnterWorkflow?.controlValve_50l_factory,
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
                inputProps={{
                  ...register?.('co2_50l_factory', {
                    value: existingEnterWorkflow?.co2_50l_factory,
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
                inputProps={{
                  ...register?.('argon_50l_factory', {
                    value: existingEnterWorkflow?.argon_50l_factory,
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
                inputProps={{
                  ...register?.('azete_50l_factory', {
                    value: existingEnterWorkflow?.azete_50l_factory,
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
                inputProps={{
                  ...register?.('dryAir_50l_factory', {
                    value: existingEnterWorkflow?.dryAir_50l_factory,
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
                inputProps={{
                  ...register?.('entonox_50l_factory', {
                    value: existingEnterWorkflow?.entonox_50l_factory,
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
                inputProps={{
                  ...register?.('acetylene_50l_factory', {
                    value: existingEnterWorkflow?.acetylene_50l_factory,
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
                inputProps={{
                  ...register?.('lpg_50l_factory', {
                    value: existingEnterWorkflow?.lpg_50l_factory,
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
                inputProps={{
                  ...register?.('oxygen_50l_customer', {
                    value: existingEnterWorkflow?.oxygen_50l_customer,
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
                inputProps={{
                  ...register?.('bihoshi_50l_customer', {
                    value: existingEnterWorkflow?.bihoshi_50l_customer,
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
                inputProps={{
                  ...register?.('shaft_50l_customer', {
                    value: existingEnterWorkflow?.shaft_50l_customer,
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
                inputProps={{
                  ...register?.('controlValve_50l_customer', {
                    value: existingEnterWorkflow?.controlValve_50l_customer,
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
                inputProps={{
                  ...register?.('co2_50l_customer', {
                    value: existingEnterWorkflow?.co2_50l_customer,
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
                inputProps={{
                  ...register?.('argon_50l_customer', {
                    value: existingEnterWorkflow?.argon_50l_customer,
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
                inputProps={{
                  ...register?.('azete_50l_customer', {
                    value: existingEnterWorkflow?.azete_50l_customer,
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
                inputProps={{
                  ...register?.('dryAir_50l_customer', {
                    value: existingEnterWorkflow?.dryAir_50l_customer,
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
                inputProps={{
                  ...register?.('entonox_50l_customer', {
                    value: existingEnterWorkflow?.entonox_50l_customer,
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
                inputProps={{
                  ...register?.('acetylene_50l_customer', {
                    value: existingEnterWorkflow?.acetylene_50l_customer,
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
                inputProps={{
                  ...register?.('lpg_50l_customer', {
                    value: existingEnterWorkflow?.lpg_50l_customer,
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
                inputProps={{
                  ...register?.('oxygen_40l_factory', {
                    value: existingEnterWorkflow?.oxygen_40l_factory,
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
                inputProps={{
                  ...register?.('bihoshi_40l_factory', {
                    value: existingEnterWorkflow?.bihoshi_40l_factory,
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
                inputProps={{
                  ...register?.('shaft_40l_factory', {
                    value: existingEnterWorkflow?.shaft_40l_factory,
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
                inputProps={{
                  ...register?.('controlValve_40l_factory', {
                    value: existingEnterWorkflow?.controlValve_40l_factory,
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
                inputProps={{
                  ...register?.('co2_40l_factory', {
                    value: existingEnterWorkflow?.co2_40l_factory,
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
                inputProps={{
                  ...register?.('argon_40l_factory', {
                    value: existingEnterWorkflow?.argon_40l_factory,
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
                inputProps={{
                  ...register?.('azete_40l_factory', {
                    value: existingEnterWorkflow?.azete_40l_factory,
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
                inputProps={{
                  ...register?.('dryAir_40l_factory', {
                    value: existingEnterWorkflow?.dryAir_40l_factory,
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
                inputProps={{
                  ...register?.('entonox_40l_factory', {
                    value: existingEnterWorkflow?.entonox_40l_factory,
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
                inputProps={{
                  ...register?.('acetylene_40l_factory', {
                    value: existingEnterWorkflow?.acetylene_40l_factory,
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
                inputProps={{
                  ...register?.('lpg_40l_factory', {
                    value: existingEnterWorkflow?.lpg_40l_factory,
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
                inputProps={{
                  ...register?.('oxygen_40l_customer', {
                    value: existingEnterWorkflow?.oxygen_40l_customer,
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
                inputProps={{
                  ...register?.('bihoshi_40l_customer', {
                    value: existingEnterWorkflow?.bihoshi_40l_customer,
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
                inputProps={{
                  ...register?.('shaft_40l_customer', {
                    value: existingEnterWorkflow?.shaft_40l_customer,
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
                inputProps={{
                  ...register?.('controlValve_40l_customer', {
                    value: existingEnterWorkflow?.controlValve_40l_customer,
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
                inputProps={{
                  ...register?.('co2_40l_customer', {
                    value: existingEnterWorkflow?.co2_40l_customer,
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
                inputProps={{
                  ...register?.('argon_40l_customer', {
                    value: existingEnterWorkflow?.argon_40l_customer,
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
                inputProps={{
                  ...register?.('azete_40l_customer', {
                    value: existingEnterWorkflow?.azete_40l_customer,
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
                inputProps={{
                  ...register?.('dryAir_40l_customer', {
                    value: existingEnterWorkflow?.dryAir_40l_customer,
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
                inputProps={{
                  ...register?.('entonox_40l_customer', {
                    value: existingEnterWorkflow?.entonox_40l_customer,
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
                inputProps={{
                  ...register?.('acetylene_40l_customer', {
                    value: existingEnterWorkflow?.acetylene_40l_customer,
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
                inputProps={{
                  ...register?.('lpg_40l_customer', {
                    value: existingEnterWorkflow?.lpg_40l_customer,
                  }),
                }}
              />
            </td>
          </tr>
        </TableBody>
      </table>
    </>
  );
});
