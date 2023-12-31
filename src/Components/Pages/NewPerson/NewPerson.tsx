import {
  Autocomplete,
  Backdrop,
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import { NewPlace as NewPlaceType, Permissions } from 'lib/resolvers-types';
import React, { useEffect, useMemo, useState } from 'react';

import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Button } from '../../Atomic/Button';
import CallIcon from '@mui/icons-material/Call';
import ChatIcon from '@mui/icons-material/Chat';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import HomeIcon from '@mui/icons-material/Home';
import Loader from '../../Atomic/Loader';
import NewPlace from '../NewPlace';
import { NewRole } from '../NewRole';
import { flushSync } from 'react-dom';
import toEnglishDigit from '../../../Logic/toEnglishDigit';
import { useForm } from 'react-hook-form';
import useRoles from '../../../Logic/useRoles';
import { useRouter } from 'next/router';

const pageName = 'شخص جدید';
const Form1 = styled('form', { name: 'form1' })(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  '& label, input': {
    fontFamily: 'Vazir',
  },
}));

const Section = styled('div', { name: 'Section1' })(({ theme }) => ({
  flex: '0 0 100%',
  maxWidth: '100%',
  flexWrap: 'wrap',
  display: 'flex',
  py: '1rem',
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
  isCategory: boolean;
}

export default function newPerson({
  loading,
  sending,
  roles = [],
  places,
  allPlaces,
  createNewPersonHandler,
  createNewPlaceHandler,
  createNewCategoryHandler,
  deletePlacesHandler,
}: {
  loading: boolean;
  sending: boolean;
  allPlaces: any[];
  roles: any[];
  places: any;

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
    website: string,
    edit: string,
    newPlace: NewPlaceType | null
  ) => Promise<void>;
  createNewPlaceHandler: (
    name: string,
    superPlaceId: string | null,
    representativeId: string | null,
    typeOfWork: string,
    state: string,
    city: string,
    postalCode: string,
    address: string,
    telephone: string,
    mobileNumber: string,
    website: string,
    nationalId: string,
    economicalCode: string,
    registeredNumber: string,
    description: string,
    edit: string
  ) => Promise<false | { [key: string]: any }>;
  createNewCategoryHandler: (
    name: string,
    superPlaceId: string
  ) => Promise<any>;
  deletePlacesHandler: (placeIds: string[]) => Promise<any>;
}) {
  const {
    register,
    handleSubmit,
    getValues: getNewPlaceFormValues,
    formState: { errors },
  } = useForm();
  // states
  const [editRoleCheck, setEditRoleCheck] = useState(false);
  const [role, setRole] = useState<{ id: string; label: string }>();
  const [placesList, setPlacesList] =
    useState<{ id: string; label: string }[]>(places);
  const [place, setPlace] = useState<{ id: string; label: string }>();
  const [rolesList, setRolesList] = useState(roles);
  const [roleError, setRoleError] = useState(false);
  const [placeError, setPlaceError] = useState(false);
  const [newPlaceDialogOpen, setNewPlaceDialogOpen] = useState(false);
  const [newPlaceData, setNewPlaceData] = useState<any>();
  const [newRoleDialogIsOpened, setNewRoleDialogIsOpened] = useState(false);
  // other hooks
  const router = useRouter();
  const { createNew } = useRoles();
  // handers
  const placeCreationHandler = (newPlace?: any) => {
    if (newPlace) {
      flushSync(() => {
        setPlacesList([...placesList, newPlace]);
      });
      setPlace(newPlace);
    } else {
      setNewPlaceDialogOpen(false);
    }
  };
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
      placeId: place?.id,
      roleId: role?.id,
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
      allFieldsData?.website,
      existingPerson?.id ? existingPerson?.id : '',
      places.some((p: any) => p?.id === place?.id) ? null : newPlaceData
    );
  };
  // if editing => extract existing user data from query param
  const existingPerson = useMemo(
    () =>
      JSON.parse(
        router?.query?.person ? (router?.query?.person as string) : '{}'
      ),
    [router?.isReady]
  );
  useEffect(() => {
    setPlacesList(places);
  }, [places]);

  // check for editing mode
  useEffect(() => {
    if (router?.isReady) {
      setEditRoleCheck(true);
    }
  }, [router?.isReady]);
  useEffect(() => {
    setRolesList(roles);
  }, [roles]);

  //
  if (sending) {
    return <Loader center />;
  }
  if (loading) {
    return <Loader center />;
  }
  return (
    <Container maxWidth='md' sx={{ position: 'relative', p: '16px' }}>
      <>
        <Form1 id='123' onSubmit={handleSubmit(collectInputsData)}>
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
                    ...register('firstNameAndLastName', {
                      required: true,
                      value: existingPerson.firstNameAndLastName,
                    }),
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
                <Stack direction='row' alignItems='center' spacing={1}>
                  <Autocomplete
                    disablePortal
                    id='roleInput'
                    options={rolesList}
                    sx={{ flexGrow: 1 }}
                    defaultValue={
                      existingPerson?.role
                        ? roles.find((p) => p?.id === existingPerson?.role?.id)
                        : null
                    }
                    value={role}
                    onChange={(event, newValue) => {
                      setRole(newValue as any);
                      setRoleError(false);
                    }}
                    onInputChange={(event, newInput) => {
                      if (
                        roles.length > 0 &&
                        roles.some((r) => r.label === newInput)
                      ) {
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
                  <IconButton
                    id='createPlaceButton'
                    color='success'
                    size='large'
                    sx={{ p: 0, backgroundColor: 'whitesmoke' }}
                    onClick={() => setNewRoleDialogIsOpened(true)}
                  >
                    <AddCircleOutlineRoundedIcon />
                  </IconButton>
                </Stack>
              </Input1>
            </Row1>

            <Row1>
              <Input1>
                <Label1>کد ملی</Label1>
                <TextField
                  size='small'
                  id='id'
                  inputProps={{
                    ...register('id', {
                      required: true,
                      value: existingPerson?.id,
                      setValueAs: (v) => toEnglishDigit(v),
                    }),
                  }}
                  error={errors.id?.type === 'required'}
                  helperText={
                    errors.id?.type === 'required' && 'لطفا این فیلد را پر کنید'
                  }
                />
              </Input1>
              <Input1>
                <Label1>مکان فعالیت</Label1>
                <Stack direction='row' alignItems='center' spacing={1}>
                  <Autocomplete
                    disablePortal
                    id='placeInput'
                    options={placesList?.filter((p: any) => !p.isCategory)}
                    sx={{ flexGrow: 1 }}
                    defaultValue={
                      existingPerson?.place
                        ? places.find(
                            (p: any) => p?.id === existingPerson?.place?.id
                          )
                        : null
                    }
                    value={place}
                    onChange={(event, newValue) => {
                      setPlace(newValue as any);
                      setPlaceError(false);
                    }}
                    onInputChange={(event, newInput) => {
                      if (
                        places.length > 0 &&
                        places.some((r: any) => r.label === newInput)
                      ) {
                        setPlace(
                          places.find((r: any) => r.label === newInput) as any
                        );
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
                  <IconButton
                    id='createPlaceButton'
                    color='success'
                    size='large'
                    sx={{ p: 0, backgroundColor: 'whitesmoke' }}
                    onClick={() => setNewPlaceDialogOpen(true)}
                  >
                    <AddCircleOutlineRoundedIcon />
                  </IconButton>
                </Stack>
              </Input1>
            </Row1>
          </Section>
          {/* آدرس  */}
          <Section>
            <Titr>
              <HomeIcon />
              <Typography sx={{ paddingRight: '5px' }}>
                {' '}
                اطلاعات آدرس
              </Typography>
            </Titr>
            <Row1>
              <Input1>
                <Label1>استان</Label1>
                <TextField
                  id='stateInput'
                  name='state'
                  size='small'
                  inputProps={{
                    ...register('state', { value: existingPerson?.state }),
                  }}
                />
              </Input1>
              <Input1>
                <Label1>شهر</Label1>
                <TextField
                  id='cityInput'
                  size='small'
                  inputProps={{
                    ...register('city', { value: existingPerson?.city }),
                  }}
                />
              </Input1>
              <Input1>
                <Label1>کد پستی</Label1>
                <TextField
                  id='postalCodeInput'
                  size='small'
                  inputProps={{
                    ...register('postalCode', {
                      value: existingPerson?.postalCode,
                    }),
                  }}
                />
              </Input1>
            </Row1>
            <Row1>
              <Input1>
                <Label1>آدرس</Label1>
                <TextField
                  id='addressInput'
                  size='small'
                  inputProps={{
                    ...register('address', {
                      value: existingPerson?.address,
                    }),
                  }}
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
                <Label1>موبایل</Label1>
                <TextField
                  id='mobileNumberInput'
                  size='small'
                  inputProps={{
                    ...register('mobileNumber', {
                      required: true,
                      setValueAs: (v) => toEnglishDigit(v),
                      value: existingPerson?.mobileNumber,
                    }),
                  }}
                  error={errors.mobileNumber?.type === 'required'}
                  helperText={
                    errors.mobileNumber?.type === 'required' &&
                    'لطفا این فیلد را پر کنید'
                  }
                />
              </Input1>
              <Input1>
                <Label1>تلفن</Label1>
                <TextField
                  id='telephoneInput'
                  size='small'
                  inputProps={{
                    ...register('telephone', {
                      value: existingPerson?.telephone,
                    }),
                  }}
                />
              </Input1>

              <Input1>
                <Label1>وبسایت</Label1>
                <TextField
                  id='websiteInput'
                  size='small'
                  inputProps={{
                    ...register('website', {
                      value: existingPerson?.website,
                    }),
                  }}
                />
              </Input1>
            </Row1>
          </Section>

          <Box
            sx={{
              position: 'fixed',
              top: 75,
              right: { xs: 10, md: 40, lg: 200, xl: 420 },
              zIndex: 40,
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
        <Dialog
          sx={{ zIndex: 7000 }}
          open={newPlaceDialogOpen}
          onClose={() => setNewPlaceDialogOpen(false)}
        >
          <DialogTitle sx={{ textAlign: 'center' }}>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent={'space-between'}
            >
              <span style={{ inlineSize: '10%' }}>
                <IconButton onClick={() => setNewPlaceDialogOpen(false)}>
                  <CloseRoundedIcon />
                </IconButton>
              </span>
              <Typography
                variant='h5'
                component='h2'
                sx={{ flexGrow: 1, textAlign: 'center' }}
              >
                مکان جدید
              </Typography>
              <span style={{ inlineSize: '10%' }}></span>
            </Stack>
          </DialogTitle>
          <DialogContent sx={{ position: 'relative', p: '1px' }}>
            <NewPlace
              modal={true}
              places={allPlaces}
              createNewPlaceHandler={async (
                name: string,
                superPlaceId: string | null,
                reperesentativeId: string,
                typeOfWork: string,
                state: string,
                city: string,
                postalCode: string,
                address: string,
                telephone: string,
                mobileNumber: string,
                website: string,
                nationalId: string,
                economicalCode: string,
                registeredNumber: string,
                description: string,
                edit: string
              ) => {
                setNewPlaceData({
                  name,
                  superPlaceId,
                  reperesentativeId,
                  typeOfWork,
                  state,
                  city,
                  postalCode,
                  address,
                  telephone,
                  mobileNumber,
                  website,
                  nationalId,
                  economicalCode,
                  registeredNumber,
                  description,
                  edit,
                });
                return { id: 'toBeCreated', label: name };
              }}
              placeCreationHandler={placeCreationHandler}
              createNewCategoryHandler={createNewCategoryHandler}
              deletePlacesHandler={deletePlacesHandler}
              persons={[
                {
                  label: getNewPlaceFormValues?.().firstNameAndLastName,
                  id: '123',
                  role: { name: role?.label },
                },
              ]}
              readOnlyRepresentative={
                getNewPlaceFormValues?.().firstNameAndLastName
              }
              loading={loading}
              existingPlace={undefined}
            />
          </DialogContent>
          <DialogActions sx={{ px: 5 }}></DialogActions>
        </Dialog>
        <Dialog
          sx={{ zIndex: 7000 }}
          open={newRoleDialogIsOpened}
          onClose={() => setNewRoleDialogIsOpened(false)}
        >
          <DialogTitle sx={{ textAlign: 'center' }}>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent={'space-between'}
            >
              <span style={{ inlineSize: '10%' }}>
                <IconButton onClick={() => setNewRoleDialogIsOpened(false)}>
                  <CloseRoundedIcon />
                </IconButton>
              </span>
              <Typography
                variant='h5'
                component='h2'
                sx={{ flexGrow: 1, textAlign: 'center' }}
              >
                نقش جدید
              </Typography>
              <span style={{ inlineSize: '10%' }}></span>
            </Stack>
          </DialogTitle>
          <DialogContent sx={{ position: 'relative', p: '1px' }}>
            <NewRole
              modal={true}
              onSubmit={async (
                name: string,
                permissions: Permissions,
                edit: string
              ) => {
                const newRole = await createNew(name, permissions, edit);
                if (newRole) {
                  const r = { id: newRole?.id, label: newRole?.name };

                  setNewRoleDialogIsOpened(false);
                  setRolesList([...rolesList, r]);
                  setRole(r);
                }
              }}
            />
          </DialogContent>
          <DialogActions sx={{ px: 5 }}></DialogActions>
        </Dialog>
      </>
    </Container>
  );
}
