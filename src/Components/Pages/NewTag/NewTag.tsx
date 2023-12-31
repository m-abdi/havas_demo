import {
  Autocomplete,
  Divider,
  IconButton,
  Select,
  Stack,
  Switch,
  TextField,
} from '@mui/material';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo, useContext, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import { Button } from '../../Atomic/Button';
import Container from '@mui/material/Container';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Head from 'next/head';
import HeartBeat from '../../Atomic/HeartBeat/HeartBeat';
import NewAsset from '../NewAsset';
import { NewTag as NewTagType } from '../../../../lib/resolvers-types';
import PrimaryButton from '../../Atomic/PrimaryButton';
import RFID from '../../Atomic/RFID';
import React from 'react';
import Typography from '@mui/material/Typography';

function giveMeStatus(mqttStatus: any) {
  switch (mqttStatus) {
    case 'CONNECTED':
      return 'متصل';
    case 'CONNECTING':
      return 'در حال اتصال';
    case 'DISCONNECTED':
      return 'عدم اتصال';
    default:
      return 'عدم اتصال';
  }
}
export default memo(function NewTag({
  mqttMessage,
  mqttStatus,
  equipmentsLoading,
  places,
  equipments,
  assetIds = [],
  existingTag,
  createTagHandler,
  modal = false,
}: {
  mqttMessage: string;
  mqttStatus: 'CONNECTING' | 'CONNECTED' | 'DISCONNECTED';
  equipmentsLoading?: boolean;
  placesLoading?: boolean;
  sending: boolean;
  places?: { id: string; label: string }[];
  equipments?: { id: string; label: string }[];
  assetIds?: { id: string; label: string }[];
  existingTag?: any;
  modal?: boolean;
  createTagHandler: (tags: NewTagType[]) => Promise<void>;
}) {
  // states
  const [assetId, setAssetId] = useState<{ id: string; label: string }>();
  const [assetIdError, setAssetIdError] = useState(false);
  const [newAsset, setNewAsset] = useState(true);
  const [tags, setTags] = useState<NewTagType[]>(
    newAsset
      ? [{ tagId: '', newAsset: { equipmentId: '', placeId: '' } }]
      : [{ tagId: '', assetId: '' }]
  );
  const [tagError, setTagError] = useState(false);
  // useEffect(() => {
  //   if (newAsset) {
  //     setTags([{ tagId: '', newAsset: { equipmentId: '', placeId: '' } }]);
  //   } else {
  //     setTags([{ tagId: '', assetId: '' }]);
  //   }
  // }, [newAsset]);

  useEffect(() => {
    if (mqttMessage && tags?.length === 0) {
      if (newAsset) {
        setTags([
          { tagId: mqttMessage, newAsset: { equipmentId: '', placeId: '' } },
        ]);
      } else {
        setTags([{ tagId: mqttMessage, assetId: '' }]);
      }
    } else if (mqttMessage && tags?.[tags?.length - 1]?.tagId?.length === 0) {
      const latestElement = tags?.[tags.length - 1];
      const otherTags = tags?.filter((t) => t?.tagId !== latestElement?.tagId);

      console.log(otherTags);
      
      if (newAsset) {
        setTags([
          ...otherTags,
          {
            tagId: mqttMessage,
            newAsset: {
              equipmentId: latestElement?.newAsset?.equipmentId as string,
              placeId: latestElement?.newAsset?.placeId as string,
            },
          },
        ]);
      } else {
        setTags([
          ...otherTags,
          { tagId: mqttMessage, assetId: latestElement?.assetId as string },
        ]);
      }
    } else if (mqttMessage) {
      if (newAsset) {
        setTags([
          ...tags,
          { tagId: mqttMessage, newAsset: { equipmentId: '', placeId: '' } },
        ]);
      } else {
        setTags([...tags, { tagId: mqttMessage, assetId: '' }]);
      }
    }
  }, [mqttMessage]);

  useEffect(() => {
    if (!tags.some((t) => !t.tagId)) {
      setTagError(false);
    }
  }, [tags]);

  // ui
  if (mqttStatus === 'CONNECTING') {
    return <RFID status='CONNECTING' />;
  }
  return (
    <Container maxWidth='sm' sx={{ position: 'relative', p: 1 }}>
      <Stack
        direction={'row'}
        spacing={1}
        justifyContent='center'
        alignItems='center'
      >
        <Typography>موجودی ثبت شده</Typography>
        <Switch
          id='existingAssetMode'
          checked={newAsset}
          color='success'
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={(e) => {
            e.stopPropagation();
            setNewAsset(!newAsset);
          }}
        />
        <Typography>موجودی جدید</Typography>
      </Stack>
      <Typography
        variant='h4'
        component='h1'
        gutterBottom
        textAlign={'center'}
        sx={{
          color: mqttStatus === 'CONNECTED' ? 'green' : 'red',
        }}
      >
        وضعیت : {giveMeStatus(mqttStatus)}
      </Typography>
      {/* <RFID status='CONNECTED' /> */}
      <Divider flexItem />

      {tags.map((tag, index) => (
        <Stack key={index} sx={{ py: 1 }}>
          <Stack
            direction='column'
            alignItems='center'
            justifyContent={'center'}
            spacing={0.5}
            sx={{ flexWrap: 'wrap' }}
          >
            <Typography
              sx={{
                inlineSize: 40,
                blockSize: 40,
                backgroundColor: 'black',
                color: 'white',
                borderRadius: '50%',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 28,
              }}
            >
              {index + 1}
            </Typography>
            {tag?.tagId?.length === 0 ? (
              <HeartBeat borderColor='info.main'>
                <TextField
                  // label='مقدار تگ'
                  placeholder='دستگاه را مقابل تگ بگیرید'
                  size='small'
                  value={tag.tagId}
                  sx={{ minInlineSize: { xs: 250, md: 450 } }}
                  color={index === tags.length - 1 ? 'success' : 'info'}
                  error={tagError}
                  helperText={tagError && 'مقدار این فیلد نمی تواند خالی باشد!'}
                />
              </HeartBeat>
            ) : (
              <TextField
                // label='مقدار تگ'
                placeholder='دستگاه را مقابل تگ بگیرید'
                size='small'
                value={tag.tagId}
                sx={{ minInlineSize: { xs: 260, md: 450 } }}
                color={index === tags.length - 1 ? 'success' : 'info'}
                error={tagError}
                helperText={tagError && 'مقدار این فیلد نمی تواند خالی باشد!'}
              />
            )}
            {/* {tag.assetId.length === 0 ? (
                <HeartBeat borderColor='info.main'>
                  <AssetField assetId={assetId} setAssetId={setAssetId} />
                </HeartBeat>
              ) : (
                <AssetField assetId={assetId} setAssetId={setAssetId} />
              )} */}
          </Stack>
          {/* new asset or existing asset */}
          {newAsset ? (
            <NewAsset
              loading={equipmentsLoading as boolean}
              sending={false}
              equipments={equipments as any}
              places={places as any}
              submitOnChange={true}
              newTag={true}
              createHandler={async (equipmentId: string, placeId: string) => {

                setTags([
                  ...tags.filter((t) => t?.tagId !== tag?.tagId),
                  {
                    tagId: tag?.tagId,
                    newAsset: { equipmentId, placeId },
                  },
                ]);
              }}
            />
          ) : (
            <Autocomplete
              disablePortal
              id='assetIdInput'
              options={assetIds as any}
              sx={{ my: 3 }}
              defaultValue={
                existingTag?.asset
                  ? assetIds?.find((p) => p?.id === existingTag?.asset?.id)
                  : null
              }
              value={assetId}
              disabled={!mqttMessage}
              noOptionsText={'هیچ موجودی ثبت نشده است'}
              onChange={(event, newValue) => {
                // setAssetId(newValue as any);
                setAssetIdError(false);
                setTags([
                  ...(tags.filter((t) => t?.tagId !== tag?.tagId) as any),
                  {
                    tagId: tag?.tagId,
                    assetId: newValue?.id,
                  },
                ]);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size='small'
                  label='کد موجودی'
                  error={assetIdError}
                  helperText={assetIdError && 'لطفا این فیلد را پر کنید'}
                />
              )}
            />
          )}
          <IconButton
            sx={{ color: 'error.main', inlineSize: 100, mx: 'auto' }}
            size='large'
            onClick={() => {
              setTags(tags.filter((t, i) => i !== index));
            }}
          >
            <DeleteForeverRoundedIcon />
          </IconButton>
          <Divider flexItem />
        </Stack>
      ))}
      {modal ? (
        <Box
          sx={{
            position: modal ? 'static' : 'fixed',

            top: 72,
            right: 'calc(110px + 20px)',
            zIndex: 40,
          }}
        >
          <Button
            id='submitButton'
            label='ارسال'
            size='large'
            color='success'
            variant='contained'
            onClick={async () => {
              if (tags.some((t) => !t.tagId)) {
                setTagError(true);
                return false;
              }
              await createTagHandler(tags);
            }}
          />
        </Box>
      ) : (
        <PrimaryButton
          id='submitButton'
          size='large'
          color='success'
          right={40}
          top={-68}
          variant='contained'
          icon='SEND'
          ariaLabel='ارسال'
          label='ارسال'
          fabVariant='extended'
          onClick={async () => {
            if (tags.some((t) => !t.tagId)) {
              setTagError(true);
              return false;
            }
            await createTagHandler(tags);
          }}
        />
      )}
    </Container>
  );
});
