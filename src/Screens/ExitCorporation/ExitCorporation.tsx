import {
  Box,
  Checkbox,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  styled,
} from '@mui/material';

import { Button } from '../../Components/Button';
import { DatePicker } from 'jalali-react-datepicker';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const Form1 = styled('form', { name: 'form1' })(({ theme }) => ({
  flexBasis: '100%',
  maxWidth: '1100px',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',

  padding: theme.spacing(2),
}));

// هر کدوم رو که خواستیم حتما یک ردیف کامل برا خودش بگیره
const Row1 = styled('div', { name: 'Row1' })(() => ({
  flex: ' 0 0 100%',
  flexWrap: 'wrap',
  display: 'flex',
  marginBottom: '0.6em',
  alignItems: 'center',
}));

// دربرگیرنده لیبل و تکست فیلد
const Input1 = styled('div', { name: 'Input1' })(() => ({
  flex: '1 0 155px',
  display: 'flex',
  flexDirection: 'column',
  margin: '1em 1em 0em 1em',
  flexWrap: 'nowrap',
}));

// لیبل بالای تکست فیلد
const Label1 = styled('label', { name: 'Label1' })(() => ({
  marginBottom: '0.3em',
  fontSize: '.95em',
  fontWeight: '5000',
  color: '#777;',
  whiteSpace: 'nowrap',
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const S1 = styled('div', { name: 'S1' })(() => ({
  display: 'flex',
  margin: 1,
  '& .MuiOutlinedInput-root': { flex: '1 0 155px' },
}));

const columns = [
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
];

export default function EnterExitCorporation({
  loading,
  sending,
  workflowNumber,
  corporationRepresentative,
  existingEnterWorkflow,
}: {
  loading: boolean;
  sending: boolean;
  workflowNumber: number;
  corporationRepresentative: { id: string; label: string };
  existingEnterWorkflow: any;
}) {
  // react-form-hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedColumns, setSelectedColumns] = useState([
    'اکسیژن',
    'گاز بیهوشی',
  ]);
  const [date, setDate] = useState(Date.now());
  // handlers
  const submitHandler = (data: any) => {
    console.log({ ...data, date, corporationRepresentativeId: corporationRepresentative?.id });
  };

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setSelectedColumns(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  function ExitCorporationForm() {
    return (
      <>
        <Row1>
          {/* <Input1>
            <Label1>شماره ثبت فرم</Label1>
            <TextField size='small' disabled />
          </Input1> */}
          <Input1>
            <Label1>شماره گردش کار</Label1>
            <TextField
              size='small'
              disabled
              id='workflowNumber'
              inputProps={{
                ...register('workflowNumber', {
                  required: true,
                  value: workflowNumber,
                }),
              }}
            />
          </Input1>
          <Input1>
            <Label1>نماینده شرکت</Label1>
            <TextField
              size='small'
              disabled
              id='corporationRepresentative'
              inputProps={{
                ...register('corporationRepresentative', {
                  required: true,
                  value: corporationRepresentative?.label,
                }),
              }}
            />
          </Input1>
          <Input1>
            <Label1>تاریخ ثبت حواله</Label1>
            {/* <TextField
              size='small'
              disabled
              value={new Intl.DateTimeFormat('fa-IR', {
                dateStyle: 'medium',
                timeStyle: 'full',
              }).format(Date.now())}
            /> */}
            <Box
              sx={{
                '& input': { blockSize: 35, inlineSize: '100%', m: 0, p: 0 },
                p: 0,
                m: 0,
              }}
            >
              <DatePicker
                value={date}
                onClickSubmitButton={({ value }) => {
                  setDate(new Date(value).getTime());
                }}
              />
            </Box>
          </Input1>
        </Row1>
        <Row1>
          <Input1>
            <Label1>شماره حواله</Label1>
            <TextField
              size='small'
              id='havalehId'
              inputProps={{
                ...register('havalehId', {
                  required: true,
                  value: existingEnterWorkflow?.havalehId,
                }),
              }}
            />
          </Input1>
          <Input1>
            <Label1>تحویل دهنده</Label1>
            <TextField
              size='small'
              id='deliverer'
              inputProps={{
                ...register('deliverer', {
                  value: existingEnterWorkflow?.deliverer,
                }),
              }}
            />
          </Input1>
          <Input1>
            <Label1>توضیحات ارسال</Label1>
            <TextField
              size='small'
              id='description'
              inputProps={{
                ...register('description', {
                  value: existingEnterWorkflow?.description,
                }),
              }}
            />
          </Input1>
        </Row1>
        <Row1>
          <Input1>
            <Label1>نام ترابری</Label1>
            <TextField
              size='small'
              id='transportationName'
              inputProps={{
                ...register('transportationName', {
                  value: existingEnterWorkflow?.transportationName,
                }),
              }}
            />
          </Input1>
          <Input1>
            <Label1>شماره 1 ترابری</Label1>
            <TextField
              size='small'
              id='transportationTelephone'
              inputProps={{
                ...register('transportationTelephone', {
                  value: existingEnterWorkflow?.transportationTelephone,
                }),
              }}
            />
          </Input1>
          <Input1>
            <Label1>شماره 2 ترابری</Label1>
            <TextField
              size='small'
              id='transportationTelephone2'
              inputProps={{
                ...register('transportationTelephone2', {
                  value: existingEnterWorkflow?.transportationTelephone2,
                }),
              }}
            />
          </Input1>
        </Row1>
      </>
    );
  }

  function EditableHtmlTable() {
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
                    selectedColumns.indexOf('آرگون') > -1
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

          <tbody>
            <tr>
              {/* نوع سیلندر */}
              <td rowSpan={2} style={{ textAlign: 'center' }}>
                50لیتری
              </td>
              {/* ک-م */}
              <td>ک</td>
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
                                    type="number"
sx={{ width: '100%' }}
                  id='oxygen_50l_factory'
                  inputProps={{
                    ...register('oxygen_50l_factory', {
                      value: existingEnterWorkflow?.oxygen_50l_factory,
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
                                    type="number"
sx={{ width: '100%' }}
                  id='bihoshi_50l_factory'
                  inputProps={{
                    ...register('bihoshi_50l_factory', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='shaft_50l_factory'
                  inputProps={{
                    ...register('shaft_50l_factory', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='controlValve_50l_factory'
                  inputProps={{
                    ...register('controlValve_50l_factory', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='co2_50l_factory'
                  inputProps={{
                    ...register('co2_50l_factory', {
                      value: existingEnterWorkflow?.co2_50l_factory,
                    }),
                  }}
                />
              </td>
              {/* آرگون */}
              <td
                style={{
                  display:
                    selectedColumns.indexOf('آرگون') > -1
                      ? 'table-cell'
                      : 'none',
                }}
              >
                <TextField
                  size='small'
                                    type="number"
sx={{ width: '100%' }}
                  id='argon_50l_factory'
                  inputProps={{
                    ...register('argon_50l_factory', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='azete_50l_factory'
                  inputProps={{
                    ...register('azete_50l_factory', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='dryAir_50l_factory'
                  inputProps={{
                    ...register('dryAir_50l_factory', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='entonox_50l_factory'
                  inputProps={{
                    ...register('entonox_50l_factory', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='acetylene_50l_factory'
                  inputProps={{
                    ...register('acetylene_50l_factory', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='lpg_50l_factory'
                  inputProps={{
                    ...register('lpg_50l_factory', {
                      value: existingEnterWorkflow?.lpg_50l_factory,
                    }),
                  }}
                />
              </td>
            </tr>

            <tr>
              {/* ک-م */}
              <td>م</td>
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
                                    type="number"
sx={{ width: '100%' }}
                  id='oxygen_50l_customer'
                  inputProps={{
                    ...register('oxygen_50l_customer', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='bihoshi_50l_customer'
                  inputProps={{
                    ...register('bihoshi_50l_customer', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='shaft_50l_customer'
                  inputProps={{
                    ...register('shaft_50l_customer', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='controlValve_50l_customer'
                  inputProps={{
                    ...register('controlValve_50l_customer', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='co2_50l_customer'
                  inputProps={{
                    ...register('co2_50l_customer', {
                      value: existingEnterWorkflow?.co2_50l_customer,
                    }),
                  }}
                />
              </td>
              {/* آرگون */}
              <td
                style={{
                  display:
                    selectedColumns.indexOf('آرگون') > -1
                      ? 'table-cell'
                      : 'none',
                }}
              >
                <TextField
                  size='small'
                                    type="number"
sx={{ width: '100%' }}
                  id='argon_50l_customer'
                  inputProps={{
                    ...register('argon_50l_customer', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='azete_50l_customer'
                  inputProps={{
                    ...register('azete_50l_customer', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='dryAir_50l_customer'
                  inputProps={{
                    ...register('dryAir_50l_customer', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='entonox_50l_customer'
                  inputProps={{
                    ...register('entonox_50l_customer', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='acetylene_50l_customer'
                  inputProps={{
                    ...register('acetylene_50l_customer', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='lpg_50l_customer'
                  inputProps={{
                    ...register('lpg_50l_customer', {
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
              <td>ک</td>
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
                                    type="number"
sx={{ width: '100%' }}
                  id='oxygen_40l_factory'
                  inputProps={{
                    ...register('oxygen_40l_factory', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='bihoshi_40l_factory'
                  inputProps={{
                    ...register('bihoshi_40l_factory', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='shaft_40l_factory'
                  inputProps={{
                    ...register('shaft_40l_factory', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='controlValve_40l_factory'
                  inputProps={{
                    ...register('controlValve_40l_factory', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='co2_40l_factory'
                  inputProps={{
                    ...register('co2_40l_factory', {
                      value: existingEnterWorkflow?.co2_40l_factory,
                    }),
                  }}
                />
              </td>
              {/* آرگون */}
              <td
                style={{
                  display:
                    selectedColumns.indexOf('آرگون') > -1
                      ? 'table-cell'
                      : 'none',
                }}
              >
                <TextField
                  size='small'
                                    type="number"
sx={{ width: '100%' }}
                  id='argon_40l_factory'
                  inputProps={{
                    ...register('argon_40l_factory', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='azete_40l_factory'
                  inputProps={{
                    ...register('azete_40l_factory', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='dryAir_40l_factory'
                  inputProps={{
                    ...register('dryAir_40l_factory', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='entonox_40l_factory'
                  inputProps={{
                    ...register('entonox_40l_factory', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='acetylene_40l_factory'
                  inputProps={{
                    ...register('acetylene_40l_factory', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='lpg_40l_factory'
                  inputProps={{
                    ...register('lpg_40l_factory', {
                      value: existingEnterWorkflow?.lpg_40l_factory,
                    }),
                  }}
                />
              </td>
            </tr>

            <tr>
              {/* ک-م */}
              <td>م</td>
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
                                    type="number"
sx={{ width: '100%' }}
                  id='oxygen_40l_customer'
                  inputProps={{
                    ...register('oxygen_40l_customer', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='bihoshi_40l_customer'
                  inputProps={{
                    ...register('bihoshi_40l_customer', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='shaft_40l_customer'
                  inputProps={{
                    ...register('shaft_40l_customer', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='controlValve_40l_customer'
                  inputProps={{
                    ...register('controlValve_40l_customer', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='co2_40l_customer'
                  inputProps={{
                    ...register('co2_40l_customer', {
                      value: existingEnterWorkflow?.co2_40l_customer,
                    }),
                  }}
                />
              </td>
              {/* آرگون */}
              <td
                style={{
                  display:
                    selectedColumns.indexOf('آرگون') > -1
                      ? 'table-cell'
                      : 'none',
                }}
              >
                <TextField
                  size='small'
                                    type="number"
sx={{ width: '100%' }}
                  id='argon_40l_customer'
                  inputProps={{
                    ...register('argon_40l_customer', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='azete_40l_customer'
                  inputProps={{
                    ...register('azete_40l_customer', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='dryAir_40l_customer'
                  inputProps={{
                    ...register('dryAir_40l_customer', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='entonox_40l_customer'
                  inputProps={{
                    ...register('entonox_40l_customer', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='acetylene_40l_customer'
                  inputProps={{
                    ...register('acetylene_40l_customer', {
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
                                    type="number"
sx={{ width: '100%' }}
                  id='lpg_40l_customer'
                  inputProps={{
                    ...register('lpg_40l_customer', {
                      value: existingEnterWorkflow?.lpg_40l_customer,
                    }),
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }

  return (
    <Form1 onSubmit={handleSubmit(submitHandler)}>
      <ExitCorporationForm />
      <Input1>
        <Label1>مشاهده ستون های جدول</Label1>
        <S1>
          <Select
            id='SelectColumns1'
            size='small'
            multiple
            value={selectedColumns}
            onChange={handleChange}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {columns.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={selectedColumns.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </S1>
      </Input1>
      <Input1 sx={{ marginBottom: 3 }}>
        <Label1>جمع ثبت شده</Label1>
        <TextField size='small' />
      </Input1>
      <Row1 sx={{ justifyContent: 'center' }}>
        <EditableHtmlTable />
      </Row1>
      <Box>
        <Button
          id='submitButton'
          label='ارسال'
          size='large'
          color='success'
          variant='contained'
        />
      </Box>
    </Form1>
  );
}
