import {
  Autocomplete,
  Container,
  FormControlLabel,
  FormGroup,
  Skeleton,
  Stack,
  Switch,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { Box } from '@mui/system';
import { Button } from '../../Components/Button';
import HomeIcon from '@mui/icons-material/Home';
import Loader from 'src/Components/Loader';
import { useForm } from 'react-hook-form';

const Form1 = styled('form', { name: 'form1' })(({ theme }) => ({
  flexBasis: '100%',
  maxWidth: '1100px',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',

  padding: theme.spacing(2),
}));

// هر کدوم رو که خواستیم حتما یک ردیف کامل برا خودش بگیره
const Row1 = styled('div', { name: 'Row1' })(({ theme }) => ({
  flex: ' 0 0 100%',
  flexWrap: 'wrap',
  display: 'flex',
  marginBottom: '0.6em',
  alignItems: 'center',
}));

// دربرگیرنده لیبل و تکست فیلد
const Input1 = styled('div', { name: 'Input1' })(({ theme }) => ({
  flex: '1 0 155px',
  display: 'flex',
  flexDirection: 'column',
  margin: '1em 1em 0em 1em',
  flexWrap: 'nowrap',
}));

// لیبل بالای تکست فیلد
const Label1 = styled('label', { name: 'Label1' })(({ theme }) => ({
  marginBottom: '0.3em',
  fontSize: '.95em',
  fontWeight: '5000',
  color: '#777;',
  whiteSpace: 'nowrap',
}));

// switch that behinds the Input1
const Switch1 = styled('div', { name: 'Switch1' })(({ theme }) => ({
  backgroundColor: 'red',
  margin: '2.8em 0em 0em 1.5em',
  maxWidth: 'max-content',
}));

// switch that under the Input1
const Switch2 = styled('div', { name: 'Switch1' })(({ theme }) => ({
  backgroundColor: 'red',
  maxWidth: 'max-content',
}));

const Section = styled('div', { name: 'Section1' })(({ theme }) => ({
  flex: '0 0 100%',
  maxWidth: '100%',
  flexWrap: 'wrap',
  display: 'flex',
  padding: '1rem',
}));

const Titr = styled('div', { name: 'Titr1' })(({ theme }) => ({
  display: 'flex',
  flex: '0 0 100%',
  alignContent: 'center',
  alignItems: 'center',
  padding: '0em .4em',
  paddingBottom: '0.6em',
  color: '#333',
}));

export default function NewEquipment({
  loading,
  sending,
  factories = [],
  existingEquipment = '',
  createHandler,
}: {
  loading: boolean;
  sending: boolean;
  factories: { id: string; label: string }[];
  existingEquipment?: any;
  createHandler: (
    name: string,
    model: string,
    factoryId: string,
    serialNumber: string,
    productionYear: string,
    installationYear: string,
    terminologyCode: string,
    hasInstructions: boolean,
    supportCompany: string,
    supportTelephone1: string,
    supportTelephone2: string,
    edit: string
  ) => Promise<void>;
}) {
  // states
  const [hasInstructions, setHasInstructions] = useState(false);
  const [supportCompany, setSupportCompany] =
    useState<{ id: string; label: string }>();
  // react-form-hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //
  useEffect(() => {
    if (existingEquipment.name) {
      setSupportCompany(
        factories.find((f) => f.id === existingEquipment.supportCompany.id)
      );
      setHasInstructions(existingEquipment?.hasInstructions);
    }
  }, [existingEquipment, factories]);
  // handlers
  const submitHandler = async (data: any) => {
    await createHandler(
      data?.name,
      data?.model,
      data?.factory,
      data?.serialNumber,
      data?.productionYear,
      data?.installationYear,
      data?.terminologyCode,
      hasInstructions,
      supportCompany?.id as string,
      data?.supportTelephone1,
      data?.supportTelephone2,
      existingEquipment?.terminologyCode ?? ''
    );
  };

  return (
    <Container maxWidth='lg' sx={{ position: 'relative', p: '8px' }}>
      <Form1 onSubmit={handleSubmit(submitHandler)}>
        <Row1>
          <Input1>
            <Label1>نام تجهیز</Label1>
            <TextField
              size='small'
              id='name'
              inputProps={{
                ...register('name', {
                  required: true,
                  value: existingEquipment.name,
                }),
              }}
              error={errors.name?.type === 'required'}
              helperText={
                errors.name?.type === 'required' && 'لطفا این فیلد را پر کنید'
              }
            />
          </Input1>
          <Input1>
            <Label1>مدل دستگاه</Label1>
            <TextField
              size='small'
              id='model'
              inputProps={{
                ...register('model', {
                  required: true,
                  value: existingEquipment?.model,
                }),
              }}
              error={errors.model?.type === 'required'}
              helperText={
                errors.model?.type === 'required' && 'لطفا این فیلد را پر کنید'
              }
            />
          </Input1>
          <Input1>
            <Label1>کارخانه سازنده</Label1>
            <TextField
              size='small'
              id='factory'
              inputProps={{
                ...register('factory', {
                  value: existingEquipment?.factory,
                }),
              }}
              error={errors.factory?.type === 'required'}
              helperText={
                errors.factory?.type === 'required' &&
                'لطفا این فیلد را پر کنید'
              }
            />
          </Input1>
        </Row1>
        <Row1>
          <Input1>
            <Label1>شماره سریال تجهیز</Label1>
            <TextField
              size='small'
              id='serialNumber'
              inputProps={{
                ...register('serialNumber', {
                  required: true,
                  value: existingEquipment?.serialNumber,
                }),
              }}
              error={errors.serialNumber?.type === 'required'}
              helperText={
                errors.serialNumber?.type === 'required' &&
                'لطفا این فیلد را پر کنید'
              }
            />
          </Input1>{' '}
          <Input1>
            <Label1>سال ساخت</Label1>
            <TextField
              size='small'
              id='productionYear'
              inputProps={{
                ...register('productionYear', {
                  value: existingEquipment?.productionYear,
                }),
              }}
            />
          </Input1>
          <Input1>
            <Label1>سال نصب و راه اندازی</Label1>
            <TextField
              size='small'
              id='installationYear'
              inputProps={{
                ...register('installationYear', {
                  value: existingEquipment?.installationYear,
                }),
              }}
            />
          </Input1>
        </Row1>
        <Row1>
          <Input1 sx={{ maxWidth: 'max-content' }}>
            <Label1>کد ترمینولوژی</Label1>
            <TextField
              size='small'
              id='terminologyCode'
              inputProps={{
                ...register('terminologyCode', {
                  required: true,
                  value: existingEquipment?.terminologyCode,
                }),
              }}
              error={errors.terminologyCode?.type === 'required'}
              helperText={
                errors.terminologyCode?.type === 'required' &&
                'لطفا این فیلد را پر کنید'
              }
            />
          </Input1>
          <Input1 sx={{ maxWidth: 'max-content' }}>
            <Label1>آموزش کاربردی</Label1>
            <Stack direction={'row'} spacing={1} alignItems='center'>
              <Typography>ندارد</Typography>
              <Switch
                id='hasInstructions'
                checked={hasInstructions}
                onChange={() => setHasInstructions(!hasInstructions)}
              />
              <Typography>دارد</Typography>
            </Stack>
          </Input1>
          <Input1>
            <Label1>دسته بندی</Label1>
            <TextField
              size='small'
              id='category'
              disabled
              inputProps={{
                ...register('category', {
                  value: existingEquipment?.category,
                }),
              }}
            />
          </Input1>
        </Row1>
        <Section sx={{ padding: '1rem 0 ' }}>
          <Titr sx={{ padding: '0 1.5rem ' }}>
            <HomeIcon />
            <Typography sx={{ paddingRight: '5px' }}>شرکت پشتیبان</Typography>
          </Titr>
          <Row1>
            <Input1>
              <Label1> انتخاب شرکت</Label1>
              {loading ? (
                <Skeleton
                  variant='rectangular'
                  width={241}
                  height={40}
                  sx={{ borderRadius: '5px' }}
                />
              ) : (
                <Autocomplete
                  disablePortal
                  id='supportCompany'
                  options={factories}
                  // defaultValue={
                  //   existingPerson?.role
                  //     ? roles.find((p) => p?.id === existingPerson?.role?.id)
                  //     : null
                  // }
                  value={supportCompany}
                  onChange={(event, newValue) => {
                    setSupportCompany(newValue as any);
                    // setFactoryError(false);
                  }}
                  onInputChange={(event, newInput) => {
                    if (
                      factories.length > 0 &&
                      factories.some((r) => r.label === newInput)
                    ) {
                      setSupportCompany(
                        factories.find((r) => r.label === newInput) as any
                      );
                      // setFactory(false);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size='small'
                      // error={roleError}
                      // helperText={roleError && 'لطفا این فیلد را پر کنید'}
                    />
                  )}
                />
              )}
            </Input1>
            <Input1>
              <Label1>شماره تماس ۱</Label1>
              <TextField
                size='small'
                id='supportTelephone1'
                inputProps={{
                  ...register('supportTelephone1', {
                    value: existingEquipment?.supportTelephone1,
                  }),
                }}
              />
            </Input1>
            <Input1>
              <Label1>شماره تماس ۲</Label1>
              <TextField
                size='small'
                id='supportTelephone2'
                inputProps={{
                  ...register('supportTelephone2', {
                    value: existingEquipment?.supportTelephone2,
                  }),
                }}
              />
            </Input1>
          </Row1>
        </Section>
        <Box
          sx={{
            position: 'absolute',
            top: -68,
            right: 'min(10%, 105px)',
          }}
        >
          <Button
            id='submitButton'
            label='ارسال'
            size='large'
            color='success'
            variant='contained'
            disabled={sending}
          />
        </Box>
      </Form1>
    </Container>
  );
}
