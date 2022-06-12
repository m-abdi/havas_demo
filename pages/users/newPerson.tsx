import React from 'react'

export default function newPerson() {
  return (
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
}
