import { Autocomplete, TextField, Typography, styled } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from 'src/Components/Button';
import CallIcon from '@mui/icons-material/Call';
import ChatIcon from '@mui/icons-material/Chat';
import HomeIcon from '@mui/icons-material/Home';
import Loader from 'src/Components/Loader';
import { useForm } from 'react-hook-form';

const pageName = 'شخص جدید';
const Form1 = styled('form', { name: 'form1' })(({ theme }) => ({
  flexBasis: '100%',
  maxWidth: '900px',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  '& label, input': {
    fontFamily: 'Vazir',
  },
  padding: theme.spacing(2),
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

// هر کدوم رو که خواستیم حتما یک ردیف کامل برا خودش بگیره
const Row1 = styled('div', { name: 'row' })(({ theme }) => ({
  flex: ' 0 0 100%',
  flexWrap: 'wrap',
  display: 'flex',
  marginBottom: '0.6em',
}));

const Input1 = styled('div', { name: 'Input1' })(({ theme }) => ({
  flex: '1 0 80px',
  display: 'flex',
  flexDirection: 'column',
  margin: '0.2em 1em',
}));

const Label1 = styled('label', { name: 'Label1' })(({ theme }) => ({
  marginBottom: '0.3em',
  fontSize: '.95em',
  fontWeight: '5000',
  color: '#777;',
}));

interface OptionsType {
  label: string;
  id: string;
}

export default function newPerson({
  loading,
  sending,
  roles,
  places,
  createNewPersonHandler,
}: {
  loading: boolean;
  sending: boolean;
  roles: OptionsType[];
  places: OptionsType[];
  createNewPersonHandler: (
    id: string,
    firstNameAndLastName: string,
    placeId: string,
    roleId: string,
    state: string,
    city: string,
    postalCode: string,
    address: string,
    telephone: string,
    mobileNumber: string,
    website: string
  ) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // states
  const [role, setRole] = useState(roles[0]);
  const [place, setPlace] = useState(places[0]);
  const [roleError, setRoleError] = useState(false);
  const [placeError, setPlaceError] = useState(false);

  if (sending) {
    return <Loader center />;
  }

  const collectInputsData = async (data: any) => {
    //   check autocomplete fields
    if (!role) {
      setRoleError(true);
      return false;
    } else if (!place) {
      setPlaceError(true);
      return false;
    }
    const allFieldsData: { [key: string]: string } = {
      ...data,
      placeId: place.id,
      roleId: role.id,
    };
    await createNewPersonHandler(
      allFieldsData?.id,
      allFieldsData?.firstNameAndLastName,
      allFieldsData?.placeId,
      allFieldsData?.roleId,
      allFieldsData?.state,
      allFieldsData?.city,
      allFieldsData?.postalCode,
      allFieldsData?.address,
      allFieldsData?.telephone,
      allFieldsData?.mobileNumber,
      allFieldsData?.website
    );
  };
  return (
    <Form1 onSubmit={handleSubmit(collectInputsData)}>
      {/* عنوان و مکان و نقش */}
      <Section>
        <Titr>
          <ChatIcon />
          <Typography sx={{ paddingBottom: '5px', paddingRight: '5px' }}>
            عمومی
          </Typography>
        </Titr>
        <Row1>
          <Input1>
            <Label1>عنوان</Label1>
            <TextField
              size='small'
              id='firstNameAndLastNameInput'
              inputProps={{
                ...register('firstNameAndLastName', { required: true }),
              }}
              error={errors.firstNameAndLastName?.type === 'required'}
              helperText={
                errors.firstNameAndLastName?.type === 'required' &&
                'لطفا این فیلد را پر کنید'
              }
            />
          </Input1>
          <Input1>
            <Label1 sx={{ marginLeft: '0px !important' }}>مسولیت</Label1>
            <Autocomplete
              disablePortal
              id='roleInput'
              options={roles}
              value={role}
              onChange={(event, newValue) => {
                setRole(newValue as any);
                setRoleError(false);
              }}
              onInputChange={(event, newInput) => {
                if (roles.some((r) => r.label === newInput)) {
                  setRole(roles.find((r) => r.label === newInput) as any);
                  setRoleError(false);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size='small'
                  error={roleError}
                  helperText={roleError && 'لطفا این فیلد را پر کنید'}
                />
              )}
            />
          </Input1>
        </Row1>
        <Row1>
          <Input1>
            <Label1>مکان فعالیت</Label1>
            <Autocomplete
              disablePortal
              id='placeInput'
              options={places}
              value={place}
              onChange={(event, newValue) => {
                setPlace(newValue as any);
                setPlaceError(false);
              }}
              onInputChange={(event, newInput) => {
                if (places.some((r) => r.label === newInput)) {
                  setPlace(places.find((r) => r.label === newInput) as any);
                  setPlaceError(false);
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
          </Input1>
        </Row1>
      </Section>
      {/* آدرس  */}
      <Section>
        <Titr>
          <HomeIcon />
          <Typography sx={{ paddingRight: '5px' }}> اطلاعات آدرس</Typography>
        </Titr>
        <Row1>
          <Input1>
            <Label1>استان</Label1>
            <TextField
              id='stateInput'
              name='state'
              size='small'
              inputProps={{ ...register('state') }}
            />
          </Input1>
          <Input1>
            <Label1>شهر</Label1>
            <TextField
              id='cityInput'
              size='small'
              inputProps={{ ...register('city') }}
            />
          </Input1>
          <Input1>
            <Label1>کد پستی</Label1>
            <TextField
              id='postalCodeInput'
              size='small'
              inputProps={{ ...register('postalCode') }}
            />
          </Input1>
        </Row1>
        <Row1>
          <Input1>
            <Label1>آدرس</Label1>
            <TextField
              id='addressInput'
              size='small'
              inputProps={{ ...register('address') }}
            />
          </Input1>
        </Row1>
      </Section>
      {/* اطلاعات تماس */}
      <Section>
        <Titr>
          <CallIcon />
          <Typography sx={{ paddingRight: '5px' }}>تماس</Typography>
        </Titr>
        <Row1>
          <Input1>
            <Label1>تلفن</Label1>
            <TextField
              id='telephoneInput'
              size='small'
              inputProps={{ ...register('telephone') }}
            />
          </Input1>
          <Input1>
            <Label1>موبایل</Label1>
            <TextField
              id='mobileNumberInput'
              size='small'
              inputProps={{ ...register('mobileNumber') }}
            />
          </Input1>
          <Input1>
            <Label1>وبسایت</Label1>
            <TextField
              id='websiteInput'
              size='small'
              inputProps={{ ...register('website') }}
            />
          </Input1>
        </Row1>
      </Section>
      {/*  بیشتر */}
      <Section>
        <Titr>
          <AddCircleIcon />
          <Typography sx={{ paddingRight: '5px' }}>بیشتر</Typography>
        </Titr>
        <Row1>
          <Input1>
            <Label1>شناسه ملی</Label1>
            <TextField
              id='id'
              size='small'
              inputProps={{ ...register('id', { required: true }) }}
              error={errors.id?.type === 'required'}
              helperText={
                errors.id?.type === 'required' && 'لطفا این فیلد را پر کنید'
              }
            />
          </Input1>
          <Input1>
            <Label1>کد اقتصادی</Label1>
            <TextField size='small' />
          </Input1>
          <Input1>
            <Label1>شماره ثبت</Label1>
            <TextField size='small' />
          </Input1>
        </Row1>
        <Row1>
          <Input1>
            <Label1>توضیحات</Label1>
            <TextField size='small' />
          </Input1>
        </Row1>
      </Section>
      <Button
        id='submitButton'
        label='ارسال'
        color='success'
        variant='contained'
        size='medium'
        //   onClick={async () =>
        //     await createNewPersonHandler(
        //       firstName,
        //       lastName,
        //       place?.id,
        //       role?.id,
        //       state,
        //       city,
        //       postalCode,
        //       address,
        //       telephone,
        //       mobileNumber,
        //       website
        //     )
        //   }
      />
    </Form1>
  );
}
