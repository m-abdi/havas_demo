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
  InputAdornment,
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
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import Loader from 'src/Components/Loader';
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
  loading = false,
  sending,
  places = [],
  persons = [],
  existingPlace = {},
  readOnlyRepresentative = '',
  createNewPlaceHandler,
  createNewCategoryHandler,
  placeCreationHandler,
  deletePlacesHandler,
}: {
  loading: boolean;
  sending?: boolean;
  places: {
    id: string;
    name: string;
    isCategory: boolean;
    superPlace: null | { id: string; name: string };
    subset:
      | { id: string; name: string; subset: any[]; isCategory: boolean }[]
      | [];
  }[];
  persons: any[];
  existingPlace: any;
  readOnlyRepresentative?: string;
  createNewPlaceHandler: (
    name: string,
    superPlaceId: string,
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
  ) => Promise<{ [key: string]: any } | false>;
  placeCreationHandler?: (newPlace?: { id: string; label: string }) => void;
  createNewCategoryHandler: (
    name: string,
    superPlaceId: string
  ) => Promise<any>;
  deletePlacesHandler: (placeIds: string[]) => Promise<any>;
}) {
  // states
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState<{
    [id: string]: { status: boolean; value: string };
  }>({
    layer0: { status: false, value: '' },
  });
  const [representative, setRepresentative] = useState(
    readOnlyRepresentative ? persons[0] : null
  );
  const [representativeError, setRepresentativeError] = useState(false);
  //
  useEffect(() => {
    if (existingPlace.name) {
      setRepresentative({
        ...existingPlace?.representative,
        label: existingPlace?.representative?.firstNameAndLastName,
      });
      setCategory(existingPlace?.superPlace?.id);
    }
  }, [existingPlace]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // handlers
  const onSubmit = async (data: any) => {
    //   check autocomplete fields
    if (!representative) {
      setRepresentativeError(true);
      return false;
    }
    if (!category) {
      alert('یک دسته بندی را انتخاب کنید');
      return false;
    }
    placeCreationHandler?.();
    const newPlaceCreationResp = await createNewPlaceHandler(
      data.name,
      category,
      representative?.id,
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
      existingPlace?.name ? existingPlace.id : ''
    );
    if (newPlaceCreationResp && !existingPlace.id) {
      placeCreationHandler?.(newPlaceCreationResp as any);
    } else {
      alert('problem');
    }
  };

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
                ...register('state', {
                  value: existingPlace.state,
                }),
              }}
            />
          </Input1>
          <Input1>
            <Label1>شهر</Label1>
            <TextField
              id='city'
              size='small'
              inputProps={{
                ...register('city', {
                  value: existingPlace.city,
                }),
              }}
            />
          </Input1>
          <Input1>
            <Label1>کد پستی</Label1>
            <TextField
              id='postalCode'
              size='small'
              inputProps={{
                ...register('postalCode', {
                  value: existingPlace.postalCode,
                }),
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
                ...register('address', {
                  value: existingPlace.address,
                }),
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
                  value: existingPlace.telephone,
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
                  value: existingPlace.mobileNumber,

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
                ...register('website', {
                  value: existingPlace.website,
                }),
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
                ...register('nationalId', {
                  value: existingPlace.nationalId,
                }),
              }}
            />
          </Input1>
          <Input1>
            <Label1>کد اقتصادی</Label1>
            <TextField
              id='economicalCode'
              size='small'
              inputProps={{
                ...register('economicalCode', {
                  value: existingPlace.economicalCode,
                }),
              }}
            />
          </Input1>
          <Input1>
            <Label1>شماره ثبت</Label1>
            <TextField
              id='registeredNumber'
              size='small'
              inputProps={{
                ...register('registeredNumber', {
                  value: existingPlace.registeredNumber,
                }),
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
                ...register('description', {
                  value: existingPlace.description,
                }),
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
                inputProps={{
                  ...register('name', {
                    required: true,
                    value: existingPlace.name,
                  }),
                }}
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
                  ...register('typeOfWork', {
                    value: existingPlace.typeOfWork,
                  }),
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
              {loading || sending ? (
                <Loader center={false} />
              ) : (
                <TreeView
                  aria-label='category navigator'
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}
                  defaultExpanded={places
                    ?.filter((p) => !p.superPlace && p.isCategory)
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
                    ?.filter((p) => !p.superPlace && p.isCategory)
                    .map((superplace) => (
                      <Stack key={superplace.id} direction='row'>
                        {category === superplace.id? (
                          <CheckCircleOutlineRoundedIcon
                            sx={{
                              color: 'green',
                            }}
                          />
                        ) : (
                          <RadioButtonUncheckedRoundedIcon
                            id={superplace.id}
                            sx={{ cursor: 'pointer' }}
                            onClick={() => setCategory(superplace.id)}
                          />
                        )}
                        <Stack direction='row' alignItems={'flex-start'}>
                          <TreeItem
                            nodeId={superplace.id}
                            label={superplace.label}
                          >
                            {superplace?.subset
                              ?.filter((subPlace) => subPlace?.isCategory)
                              .map((subPlace) => (
                                <Stack
                                  direction={'row'}
                                  spacing={1}
                                  alignItems='center'
                                  key={subPlace.id}
                                >
                                  <TreeItem
                                    nodeId={subPlace.id}
                                    label={subPlace.name}
                                    icon={
                                      category === subPlace.id  ? (
                                        <IconButton sx={{ p: 0, mx: 0.5 }}>
                                          <CheckCircleOutlineRoundedIcon
                                            sx={{
                                              color: 'green',
                                            }}
                                          />
                                        </IconButton>
                                      ) : (
                                        <IconButton sx={{ p: 0, mx: 0.5 }}>
                                          <RadioButtonUncheckedRoundedIcon
                                            id={subPlace.id}
                                            onClick={() =>
                                              setCategory(subPlace.id)
                                            }
                                          />
                                        </IconButton>
                                      )
                                    }
                                  />
                                  <IconButton
                                    onClick={async () =>
                                      await deletePlacesHandler([subPlace.id])
                                    }
                                  >
                                    <DeleteRoundedIcon
                                      sx={{ color: 'error.main' }}
                                    />
                                  </IconButton>
                                </Stack>
                              ))}

                            {newCategory?.[superplace.id]?.status ? (
                              <TextField
                                size='small'
                                variant='standard'
                                value={newCategory[superplace.id].value}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position='start'>
                                      <CheckTwoToneIcon
                                        sx={{
                                          color: 'success.main',
                                          cursor: 'pointer',
                                        }}
                                        onClick={async (e) => {
                                          e.stopPropagation();
                                          await createNewCategoryHandler(
                                            newCategory[superplace.id].value,
                                            superplace.id
                                          );
                                        }}
                                      />
                                    </InputAdornment>
                                  ),
                                }}
                                onChange={(e) =>
                                  setNewCategory({
                                    ...newCategory,
                                    [superplace.id]: {
                                      status: true,
                                      value: e.target.value,
                                    },
                                  })
                                }
                              />
                            ) : (
                              <IconButton
                                onClick={() =>
                                  setNewCategory({
                                    ...newCategory,
                                    [superplace.id]: {
                                      status: true,
                                      value: '',
                                    },
                                  })
                                }
                              >
                                <AddCircleIcon sx={{ p: 0, mx: 0.5 }} />
                              </IconButton>
                            )}
                          </TreeItem>
                          <IconButton
                            onClick={async () =>
                              await deletePlacesHandler([superplace.id])
                            }
                          >
                            <DeleteRoundedIcon sx={{ color: 'error.main' }} />
                          </IconButton>
                        </Stack>
                      </Stack>
                    ))}
                  {newCategory.layer0.status ? (
                    <TextField
                      size='small'
                      variant='standard'
                      value={newCategory.layer0.value}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='start'>
                            <CheckTwoToneIcon
                              sx={{ color: 'success.main', cursor: 'pointer' }}
                              onClick={async (e) => {
                                e.stopPropagation();
                                await createNewCategoryHandler(
                                  newCategory.layer0.value,
                                  ''
                                );
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      onChange={(e) =>
                        setNewCategory({
                          ...newCategory,
                          layer0: { status: true, value: e.target.value },
                        })
                      }
                    />
                  ) : (
                    <IconButton
                      onClick={() =>
                        setNewCategory({
                          ...newCategory,
                          layer0: { status: true, value: '' },
                        })
                      }
                    >
                      <AddCircleIcon sx={{ p: 0, mx: 0.5 }} />
                    </IconButton>
                  )}
                </TreeView>
              )}
            </Input1>
          </Row1>
        </Section>
        <Address />
        <Call />
        <More />
        <Box>
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
