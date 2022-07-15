import {
  Box,
  Checkbox,
  Container,
  ListItemText,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  styled,
} from '@mui/material';
import { memo, useCallback, useMemo, useState } from 'react';

import { Button } from '../../Components/Button';
import { DatePicker } from 'jalali-react-datepicker';
import EditableHtmlTable from './EditableHtmlTable';
import { useForm } from 'react-hook-form';

const Form1 = styled('form', { name: 'form1' })(({ theme }) => ({
  flexBasis: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
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

export default function ExitCorporation({
  loading,
  sending,
  workflowNumber,
  corporationRepresentative,
  existingWorkflow,
  createNewHandler,
  dateT,
}: {
  loading: boolean;
  sending: boolean;
  workflowNumber?: string;
  corporationRepresentative?: { id: string; label: string };
  existingWorkflow?: any;
  dateT?: any;
  createNewHandler: (
    workflowNumber: string,
    havalehId: string,
    date: string,
    corporationRepresentativeId: string,
    deliverer: string,
    description: string,
    transportationName: string,
    transportationTelephone: string,
    transportationTelephone2: string,
    edit: string,
    assets: {
      oxygen_50l_factory: number;
      bihoshi_50l_factory: number;
      shaft_50l_factory: number;
      controlValve_50l_factory: number;
      co2_50l_factory: number;
      argon_50l_factory: number;
      azete_50l_factory: number;
      dryAir_50l_factory: number;
      entonox_50l_factory: number;
      acetylene_50l_factory: number;
      lpg_50l_factory: number;
      oxygen_50l_customer: number;
      bihoshi_50l_customer: number;
      shaft_50l_customer: number;
      controlValve_50l_customer: number;
      co2_50l_customer: number;
      argon_50l_customer: number;
      azete_50l_customer: number;
      dryAir_50l_customer: number;
      entonox_50l_customer: number;
      acetylene_50l_customer: number;
      lpg_50l_customer: number;
      oxygen_40l_factory: number;
      bihoshi_40l_factory: number;
      shaft_40l_factory: number;
      controlValve_40l_factory: number;
      co2_40l_factory: number;
      argon_40l_factory: number;
      azete_40l_factory: number;
      dryAir_40l_factory: number;
      entonox_40l_factory: number;
      acetylene_40l_factory: number;
      lpg_40l_factory: number;
      oxygen_40l_customer: number;
      bihoshi_40l_customer: number;
      shaft_40l_customer: number;
      controlValve_40l_customer: number;
      co2_40l_customer: number;
      argon_40l_customer: number;
      azete_40l_customer: number;
      dryAir_40l_customer: number;
      entonox_40l_customer: number;
      acetylene_40l_customer: number;
      lpg_40l_customer: number;
    }
  ) => Promise<void>;
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
  const [date, setDate] = useState(
    existingWorkflow
      ? parseInt(existingWorkflow?.passedStages?.[0]?.havaleh?.date)
      : Date.now()
  );
  // handlers
  const submitHandler = (data: any) => {
    createNewHandler(
      workflowNumber as string,
      data?.havalehId,
      dateT || date.toString(),
      corporationRepresentative?.id as string,
      data?.deliverer,
      data?.description,
      data?.transportationName,
      data?.transportationTelephone,
      data?.transportationTelephone2,
      existingWorkflow ? existingWorkflow?.id : '',
      {
        oxygen_50l_factory: parseInt(data?.oxygen_50l_factory),
        bihoshi_50l_factory: parseInt(data?.bihoshi_50l_factory),
        shaft_50l_factory: parseInt(data?.shaft_50l_factory),
        controlValve_50l_factory: parseInt(data?.controlValve_50l_factory),
        co2_50l_factory: parseInt(data?.co2_50l_factory),
        argon_50l_factory: parseInt(data?.argon_50l_factory),
        azete_50l_factory: parseInt(data?.azete_50l_factory),
        dryAir_50l_factory: parseInt(data?.dryAir_50l_factory),
        entonox_50l_factory: parseInt(data?.entonox_50l_factory),
        acetylene_50l_factory: parseInt(data?.acetylene_50l_factory),
        lpg_50l_factory: parseInt(data?.lpg_50l_factory),
        oxygen_50l_customer: parseInt(data?.oxygen_50l_customer),
        bihoshi_50l_customer: parseInt(data?.bihoshi_50l_customer),
        shaft_50l_customer: parseInt(data?.shaft_50l_customer),
        controlValve_50l_customer: parseInt(data?.controlValve_50l_customer),
        co2_50l_customer: parseInt(data?.co2_50l_customer),
        argon_50l_customer: parseInt(data?.argon_50l_customer),
        azete_50l_customer: parseInt(data?.azete_50l_customer),
        dryAir_50l_customer: parseInt(data?.dryAir_50l_customer),
        entonox_50l_customer: parseInt(data?.entonox_50l_customer),
        acetylene_50l_customer: parseInt(data?.acetylene_50l_customer),
        lpg_50l_customer: parseInt(data?.lpg_50l_customer),
        oxygen_40l_factory: parseInt(data?.oxygen_40l_factory),
        bihoshi_40l_factory: parseInt(data?.bihoshi_40l_factory),
        shaft_40l_factory: parseInt(data?.shaft_40l_factory),
        controlValve_40l_factory: parseInt(data?.controlValve_40l_factory),
        co2_40l_factory: parseInt(data?.co2_40l_factory),
        argon_40l_factory: parseInt(data?.argon_40l_factory),
        azete_40l_factory: parseInt(data?.azete_40l_factory),
        dryAir_40l_factory: parseInt(data?.dryAir_40l_factory),
        entonox_40l_factory: parseInt(data?.entonox_40l_factory),
        acetylene_40l_factory: parseInt(data?.acetylene_40l_factory),
        lpg_40l_factory: parseInt(data?.lpg_40l_factory),
        oxygen_40l_customer: parseInt(data?.oxygen_40l_customer),
        bihoshi_40l_customer: parseInt(data?.bihoshi_40l_customer),
        shaft_40l_customer: parseInt(data?.shaft_40l_customer),
        controlValve_40l_customer: parseInt(data?.controlValve_40l_customer),
        co2_40l_customer: parseInt(data?.co2_40l_customer),
        argon_40l_customer: parseInt(data?.argon_40l_customer),
        azete_40l_customer: parseInt(data?.azete_40l_customer),
        dryAir_40l_customer: parseInt(data?.dryAir_40l_customer),
        entonox_40l_customer: parseInt(data?.entonox_40l_customer),
        acetylene_40l_customer: parseInt(data?.acetylene_40l_customer),
        lpg_40l_customer: parseInt(data?.lpg_40l_customer),
      }
    );
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
            {loading ? (
              <Skeleton
                variant='rectangular'
                width={300}
                height={40}
                sx={{ borderRadius: '5px' }}
              />
            ) : (
              <TextField
                size='small'
                disabled
                id='workflowNumber'
                inputProps={{
                  ...register('workflowNumber', {
                    required: true,
                    value: workflowNumber || existingWorkflow?.workflowNumber,
                  }),
                }}
                error={errors.workflowNumber?.type === 'required'}
                helperText={
                  errors.workflowNumber?.type === 'required' &&
                  'لطفا این فیلد را پر کنید'
                }
              />
            )}
          </Input1>
          <Input1>
            <Label1>نماینده شرکت</Label1>
            {loading ? (
              <Skeleton
                variant='rectangular'
                width={300}
                height={40}
                sx={{ borderRadius: '5px' }}
              />
            ) : (
              <TextField
                size='small'
                disabled
                id='corporationRepresentative'
                inputProps={{
                  ...register('corporationRepresentative', {
                    required: true,
                    value:
                      corporationRepresentative?.label ||
                      existingWorkflow?.passedStages?.[0]?.submittedByUser
                        ?.firstNameAndLastName,
                  }),
                }}
                error={errors.corporationRepresentative?.type === 'required'}
                helperText={
                  errors.corporationRepresentative?.type === 'required' &&
                  'لطفا این فیلد را پر کنید'
                }
              />
            )}
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
                  value: existingWorkflow?.passedStages?.[0]?.havaleh?.id,
                }),
              }}
              error={errors.havalehId?.type === 'required'}
              helperText={
                errors.havalehId?.type === 'required' &&
                'لطفا این فیلد را پر کنید'
              }
            />
          </Input1>
          <Input1>
            <Label1>تحویل دهنده</Label1>
            <TextField
              size='small'
              id='deliverer'
              inputProps={{
                ...register('deliverer', {
                  value:
                    existingWorkflow?.passedStages?.[0]?.havaleh?.deliverer,
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
                  value:
                    existingWorkflow?.passedStages?.[0]?.havaleh?.description,
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
                  required: true,
                  value:
                    existingWorkflow?.passedStages?.[0]?.havaleh
                      ?.transportationName,
                }),
              }}
              error={errors.transportationName?.type === 'required'}
              helperText={
                errors.transportationName?.type === 'required' &&
                'لطفا این فیلد را پر کنید'
              }
            />
          </Input1>
          <Input1>
            <Label1>شماره 1 ترابری</Label1>
            <TextField
              size='small'
              id='transportationTelephone'
              inputProps={{
                ...register('transportationTelephone', {
                  required: true,
                  value:
                    existingWorkflow?.passedStages?.[0]?.havaleh
                      ?.transportationTelephone,
                }),
              }}
              error={errors.transportationTelephone?.type === 'required'}
              helperText={
                errors.transportationTelephone?.type === 'required' &&
                'لطفا این فیلد را پر کنید'
              }
            />
          </Input1>
          <Input1>
            <Label1>شماره 2 ترابری</Label1>
            <TextField
              size='small'
              id='transportationTelephone2'
              inputProps={{
                ...register('transportationTelephone2', {
                  value:
                    existingWorkflow?.passedStages?.[0]?.havaleh
                      ?.transportationTelephone2,
                }),
              }}
            />
          </Input1>
        </Row1>
      </>
    );
  }

  return (
    <Container maxWidth='lg' sx={{ position: 'relative' }}>
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
          <EditableHtmlTable
            selectedColumns={selectedColumns}
            register={register}
            existingEnterWorkflow={existingWorkflow}
          />
        </Row1>
        <Box
          sx={{
            position: 'absolute',
            top: existingWorkflow ?  -109 : -68 ,
            right: '35px',
          }}
        >
          <Button
            id='submitButton'
            label='ارسال'
            size='large'
            color='success'
            variant='contained'
          />
        </Box>
      </Form1>
    </Container>
  );
}
