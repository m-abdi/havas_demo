import {
  Box,
  Container,
  FilledInput,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  InputBase,
  InputLabel,
  Tab,
  TextField,
  Typography,
  styled,
} from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '../../Components/Button';
import CallIcon from '@mui/icons-material/Call';
import ChatIcon from '@mui/icons-material/Chat';
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';
import { useForm } from 'react-hook-form';

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

export default function NewPerson({
  sending,
  submitHandler,
}: {
  sending: boolean;
  submitHandler: (data: any) => Promise<any>;
}) {
  // states

  // hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // handlers
  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };
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
              size='small'
              inputProps={{
                ...register('state'),
              }}
            />
          </Input1>
          <Input1>
            <Label1>شهر</Label1>
            <TextField
              size='small'
              inputProps={{
                ...register('city'),
              }}
            />
          </Input1>
          <Input1>
            <Label1>کد پستی</Label1>
            <TextField
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
              size='small'
              inputProps={{
                ...register('telephone'),
              }}
            />
          </Input1>
          <Input1>
            <Label1>موبایل</Label1>
            <TextField
              size='small'
              inputProps={{
                ...register('mobileNumber'),
              }}
            />
          </Input1>
          <Input1>
            <Label1>وبسایت</Label1>
            <TextField
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
              size='small'
              inputProps={{
                ...register('nationalId'),
              }}
            />
          </Input1>
          <Input1>
            <Label1>کد اقتصادی</Label1>
            <TextField
              size='small'
              inputProps={{
                ...register('economicalCode'),
              }}
            />
          </Input1>
          <Input1>
            <Label1>شماره ثبت</Label1>
            <TextField
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
                id='title'
                inputProps={{ ...register('title', { required: true }) }}
                error={errors?.title}
                helperText={
                  errors?.title?.type === 'required' &&
                  'لطفا این فیلد را پر کنید'
                }
              />
            </Input1>
            <Input1>
              <Label1>نماینده</Label1>
              <TextField
                size='small'
                id='representative'
                inputProps={{
                  ...register('representative', { required: true }),
                }}
                error={errors?.representative}
                helperText={
                  errors?.representative?.type === 'required' &&
                  'لطفا این فیلد را پر کنید'
                }
              />
            </Input1>
            <Input1>
              <Label1>سمت نماینده</Label1>
              <TextField
                size='small'
                id='representativeRole'
                inputProps={{
                  ...register('representativeRole'),
                }}
              />
            </Input1>
          </Row1>
          <Row1>
            <Input1>
              <Label1>زمینه فعالیت</Label1>
              <TextField
                size='small'
                id='contextOfActivity'
                inputProps={{
                  ...register('typeOfWork'),
                }}
              />
            </Input1>
          </Row1>
          <Row1>
            <Input1>
              <Label1>دسته بندی</Label1>
              <TextField
                size='small'
                id='category'
                inputProps={{
                  ...register('category'),
                }}
              />
            </Input1>
          </Row1>
        </Section>
        <Address />
        <Call />
        <More />
        <Box
          sx={{
            position: 'absolute',
            top: -68,
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
