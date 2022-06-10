import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

export default function NewRole() {
  // states
  const [createPerson, setCreatePerson] = useState(false);
  const [editPerson, setEditPerson] = useState(false);
  const [deletePerson, setDeletePerson] = useState(false);
  return (
    <Stack spacing={2} divider={<Divider flexItem />} alignItems='center'>
      <TextField
        name='name'
        label='نام نقش مورد نظر را وارد کنید'
        type='text'
        size='small'
        sx={{ inlineSize: 300 }}
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Typography
          component={'h2'}
          variant='h5'
          sx={{
            my: 2,
            backgroundColor: 'info.main',
            p: 1,
            borderRadius: '10px',
            transform: {md: "rotate(-90deg)"}
          }}
        >
          دسترسی ها
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={5}
          alignItems='center'
          justifyContent={'center'}
          flexWrap={'wrap'}
        >
          {/* اشخاص */}
          <FormControl>
            <FormLabel>اشخاص</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    color='success'
                    checked={createPerson}
                    onChange={() => setCreatePerson(!createPerson)}
                  />
                }
                label='ایجاد اشخاص'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color='info'
                    checked={editPerson}
                    onChange={() => setEditPerson(!editPerson)}
                  />
                }
                label='ویرایش اشخاص'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color='error'
                    checked={deletePerson}
                    onChange={() => setDeletePerson(!deletePerson)}
                  />
                }
                label='حذف اشخاص'
              />
            </FormGroup>
          </FormControl>
          {/* اماکن */}
          <FormControl>
            <FormLabel>اماکن</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    color='success'
                    checked={createPerson}
                    onChange={() => setCreatePerson(!createPerson)}
                  />
                }
                label='ایجاد اماکن'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color='info'
                    checked={editPerson}
                    onChange={() => setEditPerson(!editPerson)}
                  />
                }
                label='ویرایش اماکن'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color='error'
                    checked={deletePerson}
                    onChange={() => setDeletePerson(!deletePerson)}
                  />
                }
                label='حذف اماکن'
              />
            </FormGroup>
          </FormControl>
          {/* تجهیزات و موجودی */}
          <FormControl>
            <FormLabel>اشخاص</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    color='success'
                    checked={createPerson}
                    onChange={() => setCreatePerson(!createPerson)}
                  />
                }
                label='ایجاد تجهیزات و موجودی'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color='info'
                    checked={editPerson}
                    onChange={() => setEditPerson(!editPerson)}
                  />
                }
                label='ویرایش تجهیزات و موجودی'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color='error'
                    checked={deletePerson}
                    onChange={() => setDeletePerson(!deletePerson)}
                  />
                }
                label='حذف تجهیزات و موجودی'
              />
            </FormGroup>
          </FormControl>
          {/* تگ ها */}
          <FormControl>
            <FormLabel>تگ ها</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    color='success'
                    checked={createPerson}
                    onChange={() => setCreatePerson(!createPerson)}
                  />
                }
                label='ایجاد تگ'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color='info'
                    checked={editPerson}
                    onChange={() => setEditPerson(!editPerson)}
                  />
                }
                label='ویرایش تگ'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color='error'
                    checked={deletePerson}
                    onChange={() => setDeletePerson(!deletePerson)}
                  />
                }
                label='حذف تگ'
              />
            </FormGroup>
          </FormControl>
          {/*  مجوزها */}
          <FormControl>
            <FormLabel>مجوزها</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    color='success'
                    checked={createPerson}
                    onChange={() => setCreatePerson(!createPerson)}
                  />
                }
                label='درخواست مجوز'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color='info'
                    checked={editPerson}
                    onChange={() => setEditPerson(!editPerson)}
                  />
                }
                label='ویرایش مجوز'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color='error'
                    aria-label='حذف مجوز'
                    checked={deletePerson}
                    onChange={() => setDeletePerson(!deletePerson)}
                  />
                }
                label='حذف مجوز'
              />
            </FormGroup>
          </FormControl>
        </Stack>
      </Box>
    </Stack>
  );
}
