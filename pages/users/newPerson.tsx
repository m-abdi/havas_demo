import { Box, Checkbox, FilledInput, FormControl, FormControlLabel, FormLabel, Input, InputBase, InputLabel, styled, Tab, TextField, Typography } from '@mui/material'
import React from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import CallIcon from '@mui/icons-material/Call';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Form1 = styled('form',{name:'form1'})(({ theme }) => ({
  flexBasis:'100%',
  maxWidth:'900px',
  display:'flex',
  flexWrap:'wrap',
  justifyContent:'center',
  
  padding: theme.spacing(2),
}));

const Section = styled('div',{name:'Section1'})(({ theme}) => ({
  flex:'0 0 100%',
  maxWidth:'100%',
  flexWrap:'wrap',
  display:'flex',
  padding:'1rem',
  }));

const Titr = styled('div',{name:'Titr1'})(({ theme }) => ({
display:'flex',
flex:'0 0 100%',
alignContent:'center',
alignItems:'center',
padding:'0em .4em',
paddingBottom:'0.6em',
color:'#333'

}));

// هر کدوم رو که خواستیم حتما یک ردیف کامل برا خودش بگیره
const Row1 = styled('div',{name:'row'})(({theme}) => ({
  flex:' 0 0 100%',
  flexWrap:'wrap',
  display:'flex',
  marginBottom:'0.6em',
  }));

const Input1 = styled('div',{name:'Input1'})(({theme}) => ({
  flex:'1 0 80px',
  display:'flex',
  flexDirection:'column',
  margin:'0.2em 1em'
  }));

const Label1 = styled('label',{name:'Label1'})(({theme}) => ({
  marginBottom:'0.3em',
  fontSize:'.95em',
  fontWeight:'5000',
  color:'#777;'
  }));

export default function newPerson() {

  function Person(){
    return(
      <>
        <Section >
          <Titr>
            <ChatIcon/>
            <Typography sx={{paddingBottom:'5px', paddingRight:'5px'}}>عمومی</Typography>
          </Titr>
          <Row1>
            <Input1>
              <Label1>عنوان</Label1>
              <TextField />
            </Input1>
            <Input1>
              <Label1 sx={{marginLeft:'0px !important'}}>مسولیت</Label1>
              <TextField />
            </Input1>
          </Row1>
          <Row1>
            <Input1>
              <Label1>مکان فعالیت</Label1>
              <TextField />
            </Input1>
          </Row1>
        </Section>
        <Address/>
        <Call/>
      </>
    )
  };

  function Address(){
    return(
      <Section >
      <Titr>
        <HomeIcon/>
        <Typography sx={{paddingRight:'5px'}}> اطلاعات آدرس</Typography>
      </Titr>
      <Row1>
        <Input1>
          <Label1>استان</Label1>
          <TextField />
        </Input1>
        <Input1>
          <Label1>شهر</Label1>
          <TextField />
        </Input1>
        <Input1>
          <Label1>کد پستی</Label1>
          <TextField />
        </Input1>
      </Row1>
      <Row1>
        <Input1>
          <Label1>آدرس</Label1>
          <TextField />
        </Input1>
      </Row1>
      </Section>
    )
  };

  function Call(){
    return(
      <Section >
      <Titr>
        <CallIcon/>
        <Typography sx={{paddingRight:'5px'}}>تماس</Typography>
      </Titr>
      <Row1>
        <Input1>
          <Label1>تلفن</Label1>
          <TextField />
        </Input1>
        <Input1>
          <Label1>موبایل</Label1>
          <TextField />
        </Input1>
        <Input1>
          <Label1>وبسایت</Label1>
          <TextField />
        </Input1>
      </Row1>
    </Section>
    )
  };

  function More(){
    return(
      <Section >
      <Titr>
        <AddCircleIcon/>
        <Typography sx={{paddingRight:'5px'}}>بیشتر</Typography>
      </Titr>
      <Row1>
        <Input1>
          <Label1>شناسه ملی</Label1>
          <TextField />
        </Input1>
        <Input1>
          <Label1>کد اقتصادی</Label1>
          <TextField />
        </Input1>
        <Input1>
          <Label1>شماره ثبت</Label1>
          <TextField />
        </Input1>
      </Row1>
      <Row1>
        <Input1>
          <Label1>توضیحات</Label1>
          <TextField />
        </Input1>
      </Row1>
    </Section>
    )
  }

  return (
    <Form1 action="">
        <Person/>
    </Form1>
  )
}

