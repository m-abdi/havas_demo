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
import Loader from '../../Components/Loader';
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

export default function NewAsset({
  loading,
  sending,
  places = [],
  equipments = [],
  existingAsset = '',
  createHandler,
  submitOnChange = false,
}: {
  loading: boolean;
  sending: boolean;
  places: { id: string; label: string }[];
  equipments: { id: string; label: string }[];
  existingAsset?: any;
  submitOnChange?: boolean;
  createHandler: (
    equipmentId: string,
    placeId: string,
    edit: string
  ) => Promise<void>;
}) {
  // states
  const [equipment, setEquipment] = useState<{ id: string; label: string }>();
  const [place, setPlace] = useState<{ id: string; label: string }>();
  // react-form-hooks
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  //
  useEffect(() => {
    if (existingAsset) {
      setEquipment(
        equipments.find((e) => e.id === existingAsset?.equipment?.id)
      );
      setPlace(places.find((p) => p.id === existingAsset?.place?.id));
    }
  }, [existingAsset, places, equipments]);
  useEffect(() => {
    if (submitOnChange) {
      submitHandler();
    }
  }, [equipment, place]);

  // handlers
  const submitHandler = async () => {
    console.log([
      equipment?.id as string,
      place?.id as string,
      existingAsset?.id ?? '',
    ]);
    
    await createHandler(
      equipment?.id as string,
      place?.id as string,
      existingAsset?.id ?? ''
    );
  };
  if (sending) {
    return <Loader center />;
  }

  return (
    <Container maxWidth='sm' sx={{ position: 'relative', p: '8px' }}>
      <Form1 onSubmit={handleSubmit(submitHandler)}>
        <Row1>
          <Input1>
            <Label1>نام تجهیز</Label1>
            {loading ? (
              <Skeleton
                variant='rectangular'
                width={270}
                height={41}
                sx={{ borderRadius: '5px' }}
              />
            ) : (
              <Autocomplete
                disablePortal
                id='equipment'
                options={equipments}
                defaultValue={
                  existingAsset?.equipment
                    ? equipments.find(
                        (p) => p?.id === existingAsset?.equipment?.id
                      )
                    : null
                }
                value={equipment}
                onChange={(event, newValue) => {
                  setEquipment(newValue as any);
                }}
                onInputChange={(event, newInput) => {
                  if (
                    equipments.length > 0 &&
                    equipments.some((r) => r.label === newInput)
                  ) {
                    setEquipment(
                      equipments.find((r) => r.label === newInput) as any
                    );
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
          {/* <Input1>
            <Label1>کد بیت المال</Label1>
            <TextField
              size='small'
              id='publicPropertyCode'
              inputProps={{
                ...register('publicPropertyCode', {
                  required: true,
                  value: existingAsset?.publicPropertyCode,
                }),
              }}
              error={errors.model?.type === 'required'}
              helperText={
                errors.model?.type === 'required' && 'لطفا این فیلد را پر کنید'
              }
            />
          </Input1> */}
        </Row1>
        <Row1>
          <Input1>
            <Label1>محل استقرار</Label1>
            {loading ? (
              <Skeleton
                variant='rectangular'
                width={270}
                height={41}
                sx={{ borderRadius: '5px' }}
              />
            ) : (
              <Autocomplete
                disablePortal
                id='place'
                options={places}
                defaultValue={
                  existingAsset?.place
                    ? places.find((p) => p?.id === existingAsset?.place?.id)
                    : null
                }
                value={place}
                onChange={(event, newValue) => {
                  setPlace(newValue as any);
                }}
                onInputChange={(event, newInput) => {
                  if (
                    places.length > 0 &&
                    places.some((r) => r.label === newInput)
                  ) {
                    setPlace(places.find((r) => r.label === newInput) as any);
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
        </Row1>
        {!submitOnChange && (
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
        )}
      </Form1>
    </Container>
  );
}
