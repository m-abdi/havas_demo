import {
  Autocomplete,
  Box,
  Container,
  FilledInput,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Input,
  InputBase,
  InputLabel,
  Stack,
  Tab,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import React, { useEffect, useMemo } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Button } from '../../Components/Button';
import CallIcon from '@mui/icons-material/Call';
import ChatIcon from '@mui/icons-material/Chat';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import { toEnglishDigit } from '../../Logic/toEnglishDigit';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Form1 = styled('form', { name: 'form1' })(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const Section = styled('div', { name: 'Section1' })(({ theme }) => ({
  flex: '0 0 100%',
  maxWidth: '100%',
  flexWrap: 'wrap',
  display: 'flex',
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

export default function NewPlace({
  sending,
  places = [],
  persons = [],
  readOnlyRepresentative = '',
  createNewPlaceHandler,
  placeCreationHandler,
  modalMode,
}: {
  sending?: boolean;
  places: {
    id: string;
    name: string;
    superPlace: null | { id: string; name: string };
    subset: { id: string; name: string; subset: any[] }[] | [];
  }[];
  persons: any[];
  modalMode?: boolean;
  readOnlyRepresentative?: string;
  createNewPlaceHandler: (
    name: string,
    superPlaceId: string,
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
  ) => Promise<{ [key: string]: any } | false>;
  placeCreationHandler?: (newPlace?: { id: string; label: string }) => void;
}) {
  // states
  const [category, setCategory] = useState('');
  const [representative, setRepresentative] = useState(
    readOnlyRepresentative ? persons[0] : null
  );
  const [representativeError, setRepresentativeError] = useState(false);
  //

  // hooks
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // // if editing => extract existing user data from query param
  // const existingPlace = useMemo(
  //   () =>
  //     JSON.parse(router.query?.place ? (router?.query?.place as string) : '{}'),
  //   [router.isReady]
  // );

  // handlers
  const onSubmit = async (data: any) => {
    //   check autocomplete fields
    if (!representative) {
      setRepresentativeError(true);
      return false;
    }
    if (!category) {
      alert('یک دسته بندی را انتخاب کنید');
    }
    placeCreationHandler?.();
    const newPlaceCreationResp = await createNewPlaceHandler(
      data.name,
      category,
      data.typeOfWork,
      data.state,
      data.city,
      data.postalCode,
      data.address,
      data.telephone,
      data.mobileNumber,
      data.website,
      data.nationalId,
      data.economicalCode,
      data.registeredNumber,
      data.description,
      ''
    );
    if (newPlaceCreationResp) {
      placeCreationHandler?.(newPlaceCreationResp as any);
    } else {
      alert('problem');
    }
  };

  //
  function Person() {
    return (
      <>
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
              <TextField size='small' />
            </Input1>
            <Input1>
              <Label1 sx={{ marginLeft: '0px !important' }}>مسولیت</Label1>

              <TextField size='small' />
            </Input1>
          </Row1>
          <Row1>
            <Input1>
              <Label1>مکان فعالیت</Label1>
              <TextField size='small' />
            </Input1>
          </Row1>
        </Section>
        <Address />
        <Call />
      </>
    );
  }

  function Address() {
    return (
      <Section>
        <Titr>
          <HomeIcon />
          <Typography sx={{ paddingRight: '5px' }}> اطلاعات آدرس</Typography>
        </Titr>
        <Row1>
          <Input1>
            <Label1>استان</Label1>
            <TextField
              id='state'
              size='small'
              inputProps={{
                ...register('state'),
              }}
            />
          </Input1>
          <Input1>
            <Label1>شهر</Label1>
            <TextField
              id='city'
              size='small'
              inputProps={{
                ...register('city'),
              }}
            />
          </Input1>
          <Input1>
            <Label1>کد پستی</Label1>
            <TextField
              id='postalCode'
              size='small'
              inputProps={{
                ...register('postalCode'),
              }}
            />
          </Input1>
        </Row1>
        <Row1>
          <Input1>
            <Label1>آدرس</Label1>
            <TextField
              id='address'
              size='small'
              inputProps={{
                ...register('address'),
              }}
            />
          </Input1>
        </Row1>
      </Section>
    );
  }

  function Call() {
    return (
      <Section>
        <Titr>
          <CallIcon />
          <Typography sx={{ paddingRight: '5px' }}>تماس</Typography>
        </Titr>
        <Row1>
          <Input1>
            <Label1>تلفن</Label1>
            <TextField
              id='telephone'
              size='small'
              inputProps={{
                ...register('telephone', {
                  setValueAs: (v) => toEnglishDigit(v),
                }),
              }}
            />
          </Input1>
          <Input1>
            <Label1>موبایل</Label1>
            <TextField
              id='mobileNumber'
              size='small'
              inputProps={{
                ...register('mobileNumber', {
                  setValueAs: (v) => toEnglishDigit(v),
                }),
              }}
            />
          </Input1>
          <Input1>
            <Label1>وبسایت</Label1>
            <TextField
              id='website'
              size='small'
              inputProps={{
                ...register('website'),
              }}
            />
          </Input1>
        </Row1>
      </Section>
    );
  }

  function More() {
    return (
      <Section>
        <Titr>
          <AddCircleIcon />
          <Typography sx={{ paddingRight: '5px' }}>بیشتر</Typography>
        </Titr>
        <Row1>
          <Input1>
            <Label1>شناسه ملی</Label1>
            <TextField
              id='nationalId'
              size='small'
              inputProps={{
                ...register('nationalId'),
              }}
            />
          </Input1>
          <Input1>
            <Label1>کد اقتصادی</Label1>
            <TextField
              id='economicalCode'
              size='small'
              inputProps={{
                ...register('economicalCode'),
              }}
            />
          </Input1>
          <Input1>
            <Label1>شماره ثبت</Label1>
            <TextField
              id='registeredNumber'
              size='small'
              inputProps={{
                ...register('registeredNumber'),
              }}
            />
          </Input1>
        </Row1>
        <Row1>
          <Input1>
            <Label1>توضیحات</Label1>
            <TextField
              id='description'
              size='small'
              inputProps={{
                ...register('description'),
              }}
            />
          </Input1>
        </Row1>
      </Section>
    );
  }

  return (
    <Container maxWidth='md' sx={{ position: 'relative' }}>
      <Form1 onSubmit={handleSubmit(onSubmit)}>
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
                id='name'
                inputProps={{ ...register('name', { required: true }) }}
                error={errors?.name}
                helperText={
                  errors?.name?.type === 'required' &&
                  'لطفا این فیلد را پر کنید'
                }
              />
            </Input1>
            <Input1>
              <Label1>نماینده</Label1>

              <Autocomplete
                disablePortal
                id='representative'
                options={persons}
                disabled={Boolean(readOnlyRepresentative)}
                value={representative}
                onChange={(event, newValue) => {
                  setRepresentative(newValue as any);
                  setRepresentativeError(false);
                }}
                onInputChange={(event, newInput) => {
                  if (
                    persons.length > 0 &&
                    persons.some((r) => r.label === newInput)
                  ) {
                    setRepresentative(
                      persons.find((r) => r.label === newInput) as any
                    );
                    setRepresentativeError(false);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size='small'
                    error={representativeError}
                    helperText={
                      representativeError && 'لطفا این فیلد را پر کنید'
                    }
                  />
                )}
              />
            </Input1>
            <Input1>
              <Label1>سمت نماینده</Label1>
              <TextField
                size='small'
                id='representativeRole'
                value={representative?.role?.name}
                disabled
              />
            </Input1>
          </Row1>
          <Row1>
            <Input1>
              <Label1>زمینه فعالیت</Label1>
              <TextField
                size='small'
                id='typeOfWork'
                inputProps={{
                  ...register('typeOfWork'),
                }}
              />
            </Input1>
          </Row1>
          <Row1>
            <Input1>
              <Label1>دسته بندی</Label1>
              {/* <TextField
                size='small'
                id='category'
                inputProps={{
                  ...register('category'),
                }}
              /> */}
              <TreeView
                aria-label='category navigator'
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                defaultExpanded={places
                  ?.filter((p) => !p.superPlace)
                  .map((p) => p.id)}
                sx={{
                  height: 150,
                  flexGrow: 1,
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  fontFamily: 'Vazir',
                }}
              >
                {places
                  ?.filter((p) => !p.superPlace)
                  .map((superplace) => (
                    <Stack key={superplace.id} direction='row'>
                      {category === superplace.id ? (
                        <CheckCircleOutlineRoundedIcon
                          sx={{
                            color: 'green',
                          }}
                        />
                      ) : (
                        <RadioButtonUncheckedRoundedIcon
                          id={superplace.id}
                          onClick={() => setCategory(superplace.id)}
                        />
                      )}
                      <TreeItem nodeId={superplace.id} label={superplace.name}>
                        {superplace.subset.map((subPlace) => (
                          <TreeItem
                            key={subPlace.id}
                            nodeId={subPlace.id}
                            label={subPlace.name}
                            icon={
                              category === subPlace.id ? (
                                <CheckCircleOutlineRoundedIcon
                                  sx={{
                                    color: 'green',
                                  }}
                                />
                              ) : (
                                <RadioButtonUncheckedRoundedIcon
                                  id={subPlace.id}
                                  onClick={() => setCategory(subPlace.id)}
                                />
                              )
                            }
                          />
                        ))}
                      </TreeItem>
                    </Stack>
                  ))}
              </TreeView>
            </Input1>
          </Row1>
        </Section>
        <Address />
        <Call />
        <More />
        <Box
          sx={{
            position: modalMode ? 'sticky' : 'absolute',
            top: modalMode ? 'auto' : -68,
            bottom: modalMode ? 0 : 'auto',
            right: modalMode ? 'auto' : '35px',
            backgroundColor: modalMode ? 'white' : 'auto',
            inlineSize: '100%',
            p: modalMode ? 2 : 0,
          }}
        >
          <Button
            id='newPlaceSubmitButton'
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
