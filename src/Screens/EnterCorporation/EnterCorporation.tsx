import {
  Autocomplete,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Switch,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import React, { useState } from 'react';

import { DatePicker } from 'jalali-react-datepicker';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';

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

export default function EnterExitCorporation({
  loading,
  sending,
  places = [],
  persons = [],
  existingLicense,
}: {
  loading: boolean;
  sending: boolean;
  existingLicense: any;
  places: { id: string; label: string }[];
  persons: { id: string; label: string }[];
}) {
  // states
  const [requestNumberAuto, setRequestNumberAuto] = useState(true);
  const [fromPlace, setFromPlace] = useState<{ id: string; label: string }>();
  const [toPlace, setToPlace] = useState<{ id: string; label: string }>();
  const [fromPerson, setFromPerson] = useState<{ id: string; label: string }>();
  const [toPerson, setToPerson] = useState<{ id: string; label: string }>();
  const [placeError, setPlaceError] = useState(false);
  const [personError, setPersonError] = useState(false);
  function Licence() {
    return (
      <>
        <Row1>
          <Input1 sx={{ maxWidth: '170px' }}>
            <Label1>شماره درخواست</Label1>
            <TextField
              size='small'
              disabled={requestNumberAuto}
              defaultValue={existingLicense?.id ? existingLicense?.id : Math.random().toFixed(0)+1}
            />
          </Input1>

          <Input1>
            <Label1></Label1>

            <Stack
              direction='row'
              alignItems={'center'}
              justifyContent='center'
              spacing={1}
            >
              <Typography>اتوماتیک</Typography>
              <Switch onClick={()=>setRequestNumberAuto(!requestNumberAuto)} />
              <Typography>دستی</Typography>
            </Stack>
          </Input1>
          <Input1>
            <Label1>تحویل دهنده مبدا</Label1>
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
                id='fromPerson'
                options={persons}
                noOptionsText={'شخصی وجود ندارد'}
                defaultValue={
                  existingLicense?.fromPerson
                    ? persons.find(
                        (p) => p?.id === existingLicense?.fromPerson?.id
                      )
                    : null
                }
                value={fromPerson}
                onChange={(event, newValue) => {
                  setFromPerson(newValue as any);
                  // setFactoryError(false);
                }}
                onInputChange={(event, newInput) => {
                  if (
                    places.length > 0 &&
                    places.some((r) => r.label === newInput)
                  ) {
                    setFromPerson(
                      places.find((r) => r.label === newInput) as any
                    );
                    // setFactory(false);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size='small'
                    error={personError}
                    helperText={personError && 'لطفا این فیلد را پر کنید'}
                  />
                )}
              />
            )}
          </Input1>
          <Input1>
            <Label1>تاریخ درخواست مجوز</Label1>
            <DatePicker
              onClickSubmitButton={(args) => {
                console.log(args.value);
              }}
            />
          </Input1>
        </Row1>
        <Row1>
          <Input1 sx={{ maxWidth: '170px' }}>
            <Label1>تعداد</Label1>
            <TextField size='small' type={'number'} />
          </Input1>
          <Input1 sx={{ maxWidth: 'max-content' }}>
            <Label1>نوع</Label1>
            <Stack
              direction='row'
              alignItems={'center'}
              justifyContent='center'
              spacing={1}
            >
              <Typography>ورود</Typography>
              <Switch
                checkedIcon={
                  <IconButton
                    sx={{
                      borderRadius: '50%',
                      p: 0,
                      m: 0,
                      backgroundColor: 'error.main',
                    }}
                  >
                    <KeyboardArrowUpRoundedIcon sx={{ color: 'white' }} />
                  </IconButton>
                }
                icon={
                  <IconButton
                    sx={{
                      borderRadius: '50%',
                      p: 0,
                      m: 0,
                      backgroundColor: 'success.main',
                    }}
                  >
                    <KeyboardArrowDownRoundedIcon sx={{ color: 'white' }} />
                  </IconButton>
                }
              />
              <Typography>خروج</Typography>
            </Stack>
          </Input1>
          <Input1>
            <Label1>تحویل گیرنده مقصد</Label1>
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
                id='toPerson'
                options={persons}
                noOptionsText={'شخصی وجود ندارد'}
                defaultValue={
                  existingLicense?.toPerson
                    ? persons.find(
                        (p) => p?.id === existingLicense?.toPerson?.id
                      )
                    : null
                }
                value={toPerson}
                onChange={(event, newValue) => {
                  setToPerson(newValue as any);
                  // setFactoryError(false);
                }}
                onInputChange={(event, newInput) => {
                  if (
                    places.length > 0 &&
                    places.some((r) => r.label === newInput)
                  ) {
                    setToPerson(
                      places.find((r) => r.label === newInput) as any
                    );
                    // setFactory(false);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size='small'
                    error={personError}
                    helperText={personError && 'لطفا این فیلد را پر کنید'}
                  />
                )}
              />
            )}
          </Input1>
          <Input1>
            <Label1>تاریخ ورود/خروج</Label1>
            <DatePicker
              onClickSubmitButton={(args) => {
                console.log(args.value);
              }}
            />
          </Input1>
        </Row1>
        <Row1>
          <Input1>
            <Label1>ترابری</Label1>
            <TextField size='small' />
          </Input1>
          <Input1>
            <Label1>مبدا</Label1>
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
                id='fromPlace'
                options={places}
                noOptionsText={'مکانی وجود ندارد'}
                defaultValue={
                  existingLicense?.fromPlace
                    ? places.find(
                        (p) => p?.id === existingLicense?.fromPlace?.id
                      )
                    : null
                }
                value={fromPlace}
                onChange={(event, newValue) => {
                  setFromPlace(newValue as any);
                  // setFactoryError(false);
                }}
                onInputChange={(event, newInput) => {
                  if (
                    places.length > 0 &&
                    places.some((r) => r.label === newInput)
                  ) {
                    setFromPlace(
                      places.find((r) => r.label === newInput) as any
                    );
                    // setFactory(false);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size='small'
                    error={placeError}
                    helperText={placeError && 'لطفا این فیلد را پر کنید'}
                  />
                )}
              />
            )}
          </Input1>
          <Input1>
            <Label1>مقصد</Label1>
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
                id='toPlace'
                options={places}
                noOptionsText={'مکانی وجود ندارد'}
                defaultValue={
                  existingLicense?.toPlace
                    ? places.find((p) => p?.id === existingLicense?.toPlace?.id)
                    : null
                }
                value={toPlace}
                onChange={(event, newValue) => {
                  setToPlace(newValue as any);
                  // setFactoryError(false);
                }}
                onInputChange={(event, newInput) => {
                  if (
                    places.length > 0 &&
                    places.some((r) => r.label === newInput)
                  ) {
                    setToPlace(places.find((r) => r.label === newInput) as any);
                    // setFactory(false);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size='small'
                    error={placeError}
                    helperText={placeError && 'لطفا این فیلد را پر کنید'}
                  />
                )}
              />
            )}
          </Input1>
        </Row1>
        <Row1>
          <Input1>
            <Label1>توضیحات</Label1>
            <TextField multiline minRows={3} size='small' />
          </Input1>
        </Row1>
      </>
    );
  }

  return (
    <Form1 action=''>
      <Licence />
    </Form1>
  );
}
