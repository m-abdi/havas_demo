import { TableBody, TextField } from '@mui/material';

import { memo } from 'react';
import { useFormContext } from 'react-hook-form';

export default memo(function AggregatedTable({
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
  assets,
}: {
  editable: boolean;
  register?: any;
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
  return (
    <table border={2} style={{marginInline: "16px"}}>
      <thead>
        <tr>
          <th>نوع سیلندر</th>

          {/* اکسیژن */}
          <th
            style={{
              display:
                selectedColumns.indexOf('اکسیژن') > -1 ? 'table-cell' : 'none',
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
                selectedColumns.indexOf('آنتونکس') > -1 ? 'table-cell' : 'none',
            }}
          >
            آنتونکس
          </th>
          {/* استیلن */}
          <th
            style={{
              display:
                selectedColumns.indexOf('استیلن') > -1 ? 'table-cell' : 'none',
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
          <td style={{ textAlign: 'center' }}>50لیتری</td>

          {/* اکسیژن */}
          <td
            style={{
              display:
                selectedColumns.indexOf('اکسیژن') > -1 ? 'table-cell' : 'none',
              textAlign: 'center',
            }}
          >
            <TextField
              size='small'
              type='number'
              id='oxygen_50l'
              disabled={!editable}
              inputProps={{
                ...register?.('oxygen_50l', {
                  value:
                    assets?.oxygen_50l 
                    
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
              disabled={!editable}
              sx={{ width: '100%', textAlign: 'center' }}
              id='bihoshi_50l'
              inputProps={{
                ...register?.('bihoshi_50l', {
                  value:
                    assets?.bihoshi_50l  
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
              id='shaft_50l'
              disabled={!editable}
              inputProps={{
                ...register?.('shaft_50l', {
                  value:
                    assets?.shaft_50l 
                    
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
              id='controlValve_50l'
              disabled={!editable}
              inputProps={{
                ...register?.('controlValve_50l', {
                  value:
                    assets?.controlValve_50l  
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
              id='co2_50l'
              disabled={!editable}
              inputProps={{
                ...register?.('co2_50l', {
                  value:
                    assets?.co2_50l  
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
              id='argon_50l'
              disabled={!editable}
              inputProps={{
                ...register?.('argon_50l', {
                  value:
                    assets?.argon_50l 
                    
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
              id='azete_50l'
              disabled={!editable}
              inputProps={{
                ...register?.('azete_50l', {
                  value:
                    assets?.azete_50l 
                    
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
              id='dryAir_50l'
              disabled={!editable}
              inputProps={{
                ...register?.('dryAir_50l', {
                  value:
                    assets?.dryAir_50l 
                    
                }),
              }}
            />
          </td>
          {/* آنتونکس */}
          <td
            style={{
              display:
                selectedColumns.indexOf('آنتونکس') > -1 ? 'table-cell' : 'none',
            }}
          >
            <TextField
              size='small'
              type='number'
              sx={{ width: '100%', textAlign: 'center' }}
              id='entonox_50l'
              disabled={!editable}
              inputProps={{
                ...register?.('entonox_50l', {
                  value:
                    assets?.entonox_50l  
                }),
              }}
            />
          </td>
          {/* استیلن */}
          <td
            style={{
              display:
                selectedColumns.indexOf('استیلن') > -1 ? 'table-cell' : 'none',
            }}
          >
            <TextField
              size='small'
              type='number'
              sx={{ width: '100%', textAlign: 'center' }}
              id='acetylene_50l'
              disabled={!editable}
              inputProps={{
                ...register?.('acetylene_50l', {
                  value:
                    assets?.acetylene_50l  
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
              id='lpg_50l'
              disabled={!editable}
              inputProps={{
                ...register?.('lpg_50l', {
                  value:
                    assets?.lpg_50l  
                }),
              }}
            />
          </td>
        </tr>

        <tr>
          {/* نوع سیلندر */}
          <td style={{ textAlign: 'center' }}>40لیتری</td>
          {/* اکسیژن */}
          <td
            style={{
              display:
                selectedColumns.indexOf('اکسیژن') > -1 ? 'table-cell' : 'none',
            }}
          >
            <TextField
              size='small'
              type='number'
              sx={{ width: '100%', textAlign: 'center' }}
              id='oxygen_40l'
              disabled={!editable}
              inputProps={{
                ...register?.('oxygen_40l', {
                  value:
                    assets?.oxygen_40l 
                    
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
              id='bihoshi_40l'
              disabled={!editable}
              inputProps={{
                ...register?.('bihoshi_40l', {
                  value:
                    assets?.bihoshi_40l  
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
              id='shaft_40l'
              disabled={!editable}
              inputProps={{
                ...register?.('shaft_40l', {
                  value:
                    assets?.shaft_40l 
                    
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
              id='controlValve_40l'
              disabled={!editable}
              inputProps={{
                ...register?.('controlValve_40l', {
                  value:
                    assets?.controlValve_40l  
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
              id='co2_40l'
              disabled={!editable}
              inputProps={{
                ...register?.('co2_40l', {
                  value:
                    assets?.co2_40l  
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
              id='argon_40l'
              disabled={!editable}
              inputProps={{
                ...register?.('argon_40l', {
                  value:
                    assets?.argon_40l 
                    
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
              id='azete_40l'
              disabled={!editable}
              inputProps={{
                ...register?.('azete_40l', {
                  value:
                    assets?.azete_40l 
                    
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
              id='dryAir_40l'
              disabled={!editable}
              inputProps={{
                ...register?.('dryAir_40l', {
                  value:
                    assets?.dryAir_40l 
                    
                }),
              }}
            />
          </td>
          {/* آنتونکس */}
          <td
            style={{
              display:
                selectedColumns.indexOf('آنتونکس') > -1 ? 'table-cell' : 'none',
            }}
          >
            <TextField
              size='small'
              type='number'
              sx={{ width: '100%', textAlign: 'center' }}
              id='entonox_40l'
              disabled={!editable}
              inputProps={{
                ...register?.('entonox_40l', {
                  value:
                    assets?.entonox_40l  
                }),
              }}
            />
          </td>
          {/* استیلن */}
          <td
            style={{
              display:
                selectedColumns.indexOf('استیلن') > -1 ? 'table-cell' : 'none',
            }}
          >
            <TextField
              size='small'
              type='number'
              sx={{ width: '100%', textAlign: 'center' }}
              id='acetylene_40l'
              disabled={!editable}
              inputProps={{
                ...register?.('acetylene_40l', {
                  value:
                    assets?.acetylene_40l  
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
              id='lpg_40l'
              disabled={!editable}
              inputProps={{
                ...register?.('lpg_40l', {
                  value:
                    assets?.lpg_40l  
                }),
              }}
            />
          </td>
        </tr>
      </TableBody>
    </table>
  );
});
