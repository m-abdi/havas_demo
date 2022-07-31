import { Switch, TextField, styled } from '@mui/material';

import React from 'react';

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

export default function RequestExitCylinderWarehouse() {
  function Licence() {
    return (
      <>
        <Row1>
          <Input1 sx={{ maxWidth: '170px' }}>
            <Label1>شماره درخواست</Label1>
            <TextField />
          </Input1>
          <Switch1>سوییچ 123</Switch1>
          <Input1>
            <Label1>تحویل دهنده مبدا</Label1>
            <TextField />
          </Input1>
          <Input1>
            <Label1>تاریخ درخواست مجوز</Label1>
            <TextField />
          </Input1>
        </Row1>
        <Row1>
          <Input1 sx={{ maxWidth: '170px' }}>
            <Label1>تعداد</Label1>
            <TextField />
          </Input1>
          <Input1 sx={{ maxWidth: 'max-content' }}>
            <Label1>نوع</Label1>
            <Switch2>سوییچ 123</Switch2>
          </Input1>
          <Input1>
            <Label1>تحویل گیرنده مقصد</Label1>
            <TextField />
          </Input1>
          <Input1>
            <Label1>تاریخ ورود/خروج</Label1>
            <TextField />
          </Input1>
        </Row1>
        <Row1>
          <Input1>
            <Label1>ترابری</Label1>
            <TextField />
          </Input1>
          <Input1>
            <Label1>مبدا</Label1>
            <TextField />
          </Input1>
          <Input1>
            <Label1>مقصد</Label1>
            <TextField />
          </Input1>
        </Row1>
        <Row1>
          <Input1>
            <Label1>توضیحات</Label1>
            <TextField />
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
