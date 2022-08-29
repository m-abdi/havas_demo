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
import React, { memo, useEffect, useState } from 'react';

import { Button as MyButton } from '../../Atomic/Button';
import PrimaryButton from '../../Atomic/PrimaryButton';
import { styled } from '@mui/material/styles';

const Button = styled(MyButton)({});
export default memo(function NewRole({
  existingRoleData,
  onSubmit,
}: {
  existingRoleData?: RoleType;
  onSubmit: (name: string, permissions: any, edit: string) => Promise<void>;
}) {
  // states
  const [name, setName] = useState('');
  const [viewPerson, setViewPerson] = useState(false);
  const [createPerson, setCreatePerson] = useState(false);
  const [editPerson, setEditPerson] = useState(false);
  const [deletePerson, setDeletePerson] = useState(false);
  const [viewPlace, setViewPlace] = useState(false);
  const [createPlace, setCreatePlace] = useState(false);
  const [editPlace, setEditPlace] = useState(false);
  const [deletePlace, setDeletePlace] = useState(false);
  const [viewLicense, setViewLicense] = useState(false);
  const [createLicense, setCreateLicense] = useState(false);
  const [editLicense, setEditLicense] = useState(false);
  const [deleteLicense, setDeleteLicense] = useState(false);
  const [viewEquipmentAndAsset, setViewEquipmentAndAsset] = useState(false);
  const [createEquipmentAndAsset, setCreateEquipmentAndAsset] = useState(false);
  const [editEquipmentAndAsset, setEditEquipmentAndAsset] = useState(false);
  const [deleteEquipmentAndAsset, setDeleteEquipmentAndAsset] = useState(false);
  const [viewTag, setViewTag] = useState(false);
  const [createTag, setCreateTag] = useState(false);
  const [editTag, setEditTag] = useState(false);
  const [deleteTag, setDeleteTag] = useState(false);
  const [viewRole, setViewRole] = useState(false);
  const [createRole, setCreateRole] = useState(false);
  const [editRole, setEditRole] = useState(false);
  const [deleteRole, setDeleteRole] = useState(false);
  const [editId, setEditId] = useState('');
  const [createEnterDeliverExit, setCreateEnterDeliverExit] = useState(false);
  // fill input field with existing role data
  useEffect(() => {
    if (existingRoleData) {
      setEditId(existingRoleData.id);
      setName(existingRoleData.name);
      setViewPerson(existingRoleData.viewPerson as boolean);
      setViewPlace(existingRoleData.viewPlace as boolean);
      setViewEquipmentAndAsset(existingRoleData.viewEquipment as boolean);
      setViewLicense(existingRoleData.viewLicense as boolean);
      setViewTag(existingRoleData.viewTag as boolean);
      setViewRole(existingRoleData.viewRole as boolean);
      setCreatePerson(existingRoleData.createPerson as boolean);
      setCreatePlace(existingRoleData.createPlace as boolean);
      setCreateEquipmentAndAsset(existingRoleData.createEquipment as boolean);
      setCreateLicense(existingRoleData.createLicense as boolean);
      setCreateTag(existingRoleData.createTag as boolean);
      setCreateRole(existingRoleData.createRole as boolean);
      setEditPerson(existingRoleData.editPerson as boolean);
      setEditPlace(existingRoleData.editPlace as boolean);
      setEditEquipmentAndAsset(existingRoleData.editEquipment as boolean);
      setEditLicense(existingRoleData.editLicense as boolean);
      setEditTag(existingRoleData.editTag as boolean);
      setEditRole(existingRoleData.editRole as boolean);
      setDeletePerson(existingRoleData.deletePerson as boolean);
      setDeletePlace(existingRoleData.deletePlace as boolean);
      setDeleteEquipmentAndAsset(existingRoleData.deleteEquipment as boolean);
      setDeleteLicense(existingRoleData.deleteLicense as boolean);
      setDeleteTag(existingRoleData.deleteTag as boolean);
      setDeleteRole(existingRoleData.deleteRole as boolean);
      setCreateEnterDeliverExit(
        existingRoleData.createEnterDeliverExit as boolean
      );
    }
  }, [existingRoleData]);

  //
  return (
    <Stack
      spacing={2}
      divider={<Divider flexItem />}
      alignItems='center'
      sx={{ p: 2, maxInlineSize: '100%', position: "relative" }}
    >
      <TextField
        name='name'
        label='نام نقش مورد نظر را وارد کنید'
        type='text'
        size='small'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {/* Permissions دسترسی ها */}
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
            transform: { md: 'rotate(-90deg)' },
          }}
        >
          دسترسی ها
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={3}
          alignItems='center !important'
          justifyContent={{ xs: 'center', sm: 'center' }}
          flexWrap={'wrap'}
        >
          {/* اماکن */}
          <FormControl sx={{ my: 2 }}>
            <FormLabel>اماکن</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    color='secondary'
                    checked={viewPlace}
                    onChange={() => setViewPlace(!viewPlace)}
                  />
                }
                label='مشاهده اماکن'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color='success'
                    checked={createPlace && editPlace}
                    onChange={() => {
                      setCreatePlace(!createPlace);
                      setEditPlace(!editPlace);
                    }}
                  />
                }
                label='ایجاد/ویرایش اماکن'
              />
              {/* <FormControlLabel
                control={
                  <Checkbox
                    color='info'
                    checked={editPlace}
                    onChange={() => setEditPlace(!editPlace)}
                  />
                }
                label='ویرایش اماکن'
              /> */}
              <FormControlLabel
                control={
                  <Checkbox
                    color='error'
                    checked={deletePlace}
                    onChange={() => setDeletePlace(!deletePlace)}
                  />
                }
                label='حذف اماکن'
              />
            </FormGroup>
          </FormControl>
          <Divider flexItem variant='middle' orientation='horizontal' />

          {/* اشخاص */}
          <FormControl sx={{ my: 2 }}>
            <FormLabel>اشخاص</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    color='secondary'
                    checked={viewPerson}
                    onChange={() => setViewPerson(!viewPerson)}
                  />
                }
                label='مشاهده اشخاص'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color='success'
                    checked={createPerson && editPerson}
                    onChange={() => {
                      setCreatePerson(!createPerson);
                      setEditPerson(!editPerson);
                    }}
                  />
                }
                label='ایجاد/ویرایش اشخاص'
              />
              {/* <FormControlLabel
                control={
                  <Checkbox
                    color='info'
                    checked={editPerson}
                    onChange={() => setEditPerson(!editPerson)}
                  />
                }
                label='ویرایش اشخاص'
              /> */}
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
          <Divider flexItem variant='middle' orientation='horizontal' />

          {/* تجهیزات و موجودی */}
          <FormControl sx={{ my: 2 }}>
            <FormLabel>تجهیزات و موجودی</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    color='secondary'
                    checked={viewEquipmentAndAsset}
                    onChange={() =>
                      setViewEquipmentAndAsset(!viewEquipmentAndAsset)
                    }
                  />
                }
                label='مشاهده تجهیزات و موجودی'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color='success'
                    checked={createEquipmentAndAsset && editEquipmentAndAsset}
                    onChange={() => {
                      setCreateEquipmentAndAsset(!createEquipmentAndAsset);
                      setEditEquipmentAndAsset(!editEquipmentAndAsset);
                    }}
                  />
                }
                label='ایجاد/ویرایش تجهیزات و موجودی'
              />

              {/* <FormControlLabel
                control={
                  <Checkbox
                    color='info'
                    checked={editEquipmentAndAsset}
                    onChange={() =>
                      setEditEquipmentAndAsset(!editEquipmentAndAsset)
                    }
                  />
                }
                label='ویرایش تجهیزات و موجودی'
              /> */}
              <FormControlLabel
                control={
                  <Checkbox
                    color='error'
                    checked={deleteEquipmentAndAsset}
                    onChange={() =>
                      setDeleteEquipmentAndAsset(!deleteEquipmentAndAsset)
                    }
                  />
                }
                label='حذف تجهیزات و موجودی'
              />
            </FormGroup>
          </FormControl>
          <Divider flexItem variant='middle' orientation='horizontal' />

          {/* تگ ها */}
          <FormControl sx={{ my: 2 }}>
            <FormLabel>تگ ها</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    color='secondary'
                    checked={viewTag}
                    onChange={() => setViewTag(!viewTag)}
                  />
                }
                label='مشاهده تگ'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color='success'
                    checked={createTag && editTag}
                    onChange={() => {
                      setCreateTag(!createTag);
                      setEditTag(!editTag);
                    }}
                  />
                }
                label='ایجاد/ویرایش تگ'
              />
              {/* <FormControlLabel
                control={
                  <Checkbox
                    color='info'
                    checked={editTag}
                    onChange={() => setEditTag(!editTag)}
                  />
                }
                label='ویرایش تگ'
              /> */}
              <FormControlLabel
                control={
                  <Checkbox
                    color='error'
                    checked={deleteTag}
                    onChange={() => setDeleteTag(!deleteTag)}
                  />
                }
                label='حذف تگ'
              />
            </FormGroup>
          </FormControl>
          <Divider flexItem variant='middle' orientation='horizontal' />

          {/*  مجوزها */}
          <FormControl sx={{ my: 2 }}>
            <FormLabel>مجوزها</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    color='success'
                    checked={createEnterDeliverExit}
                    onChange={() =>
                      setCreateEnterDeliverExit(!createEnterDeliverExit)
                    }
                  />
                }
                label='نماینده شرکت گاز های طبی'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color='secondary'
                    checked={viewLicense}
                    onChange={() => setViewLicense(!viewLicense)}
                  />
                }
                label='مشاهده مجوزها'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color='success'
                    checked={createLicense && editLicense}
                    onChange={() => {
                      setCreateLicense(!createLicense);
                      setEditLicense(!editLicense);
                    }}
                  />
                }
                label='درخواست مجوز'
              />
              {/* <FormControlLabel
                control={
                  <Checkbox
                    color='info'
                    checked={editLicense}
                    onChange={() => setEditLicense(!editLicense)}
                  />
                }
                label='ویرایش مجوز'
              /> */}
              <FormControlLabel
                control={
                  <Checkbox
                    color='error'
                    checked={deleteLicense}
                    onChange={() => setDeleteLicense(!deleteLicense)}
                  />
                }
                label='حذف مجوز'
              />
            </FormGroup>
          </FormControl>
          <Divider flexItem variant='middle' orientation='horizontal' />

          {/*  نقش ها */}
          <FormControl sx={{ my: 2 }}>
            <FormLabel>نقش ها</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    color='secondary'
                    checked={viewRole}
                    onChange={() => setViewRole(!viewRole)}
                  />
                }
                label='مشاهده نقش ها'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color='success'
                    checked={createRole && editRole}
                    onChange={() => {
                      setCreateRole(!createRole);
                      setEditRole(!editRole);
                    }}
                  />
                }
                label='ایجاد/ویرایش نقش ها'
              />
              {/* <FormControlLabel
                control={
                  <Checkbox
                    color='info'
                    checked={editLicense}
                    onChange={() => setEditLicense(!editLicense)}
                  />
                }
                label='ویرایش مجوز'
              /> */}
              <FormControlLabel
                control={
                  <Checkbox
                    color='error'
                    checked={deleteRole}
                    onChange={() => setDeleteRole(!deleteRole)}
                  />
                }
                label='حذف نقش ها'
              />
            </FormGroup>
          </FormControl>
        </Stack>
      </Box>
      

      <PrimaryButton
        id='submit'
        size='large'
        color='success'
        right={40}
        top={-84}
        variant='contained'
        icon='SEND'
        ariaLabel='ارسال'
        label='ارسال'
        fabVariant='extended'
        onClick={() =>
          onSubmit(
            name,
            {
              viewPerson,
              createPerson,
              editPerson,
              deletePerson,
              viewPlace,
              createPlace,
              editPlace,
              deletePlace,
              viewEquipment: viewEquipmentAndAsset,
              createEquipment: createEquipmentAndAsset,
              editEquipment: editEquipmentAndAsset,
              deleteEquipment: deleteEquipmentAndAsset,
              viewAsset: viewEquipmentAndAsset,
              createAsset: createEquipmentAndAsset,
              editAsset: editEquipmentAndAsset,
              deleteAsset: deleteEquipmentAndAsset,
              viewLicense,
              createLicense,
              editLicense,
              deleteLicense,
              viewTag,
              createTag,
              editTag,
              deleteTag,
              viewRole,
              createRole,
              editRole,
              deleteRole,
              createEnterDeliverExit,
            },
            editId
          )
        }
      />
    </Stack>
  );
});
