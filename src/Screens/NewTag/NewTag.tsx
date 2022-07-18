import {
  Autocomplete,
  Divider,
  IconButton,
  Select,
  Stack,
  TextField,
} from '@mui/material';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo, useContext, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import { Button } from '../../Components/Button';
import Container from '@mui/material/Container';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Head from 'next/head';
import HeartBeat from '../../Components/HeartBeat/HeartBeat';
import NewAsset from '../NewAsset';
import { NewTag } from '../../../lib/resolvers-types';
import RFID from '../../Components/RFID';
import Typography from '@mui/material/Typography';
import useMQTT from '../../Logic/useMQTT';

export default memo(function NewTag({
  mqttMessage,
  mqttStatus,
  newAsset = false,
  equipmentsLoading,
  placesLoading,
  sending,
  places,
  equipments,
  createTagHandler,
}: {
  mqttMessage: string;
  mqttStatus: 'CONNECTING' | 'CONNECTED' | 'DISCONNECTED';
  newAsset: boolean;
  equipmentsLoading?: boolean;
  placesLoading?: boolean;
  sending: boolean;
  places?: { id: string; label: string }[];
  equipments?: { id: string; label: string }[];
  createTagHandler: (tags: NewTag[]) => Promise<void>;
}) {
  // states
  const [assetId, setAssetId] = useState<string>('');
  const [tags, setTags] = useState([
    { tagId: '', newAsset: { equipmentId: '', placeId: '' } },
  ]);
  const [tagError, setTagError] = useState(false);

  useEffect(() => {
    if (mqttMessage && (tags.length === 0 || tags?.[0].tagId.length === 0)) {
      setTags([
        { tagId: mqttMessage, newAsset: { equipmentId: '', placeId: '' } },
      ]);
    } else if (mqttMessage && tags[0].tagId.length > 0) {
      setTags([
        ...tags,
        { tagId: mqttMessage, newAsset: { equipmentId: '', placeId: '' } },
      ]);
    }
  }, [mqttMessage]);

  useEffect(() => {
    if (!tags.some((t) => !t.tagId)) {
      setTagError(false);
    }
  }, [tags]);

  // ui
  if (mqttStatus === 'DISCONNECTED' || mqttStatus === 'CONNECTING') {
    return <RFID status='CONNECTING' />;
  }
  return (
    <Container maxWidth='lg' sx={{ position: 'relative', p: 1 }}>
      <Typography
        variant='h4'
        component='h1'
        gutterBottom
        textAlign={'center'}
        sx={{
          color: mqttStatus === 'CONNECTED' ? 'green' : 'red',
        }}
      >
        وضعیت : {mqttStatus === 'CONNECTED' ? 'متصل': mqttStatus === "CONNECTING" ? "در حال اتصال" : mqttStatus === "DISCONNECTED" && "عدم اتصال"}
      </Typography>
      {/* <RFID status='CONNECTED' /> */}
      <Divider flexItem />

      {tags.map((tag, index) => (
        <Stack key={index} sx={{ py: 1 }}>
          <Stack
            direction='column'
            alignItems='center'
            justifyContent={'center'}
            spacing={.5}
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
            {tag.tagId.length === 0 ? (
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
          {newAsset ? (
            <NewAsset
              loading={equipmentsLoading}
              sending={false}
              equipments={equipments}
              places={places}
              submitOnChange={true}
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
          ) : null}
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
      <Box
        sx={{
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
          onClick={async () => {
            if (tags.some((t) => !t.tagId)) {
              setTagError(true);
              return false;
            }
            await createTagHandler(tags);
         
          }}
        />
      </Box>
    </Container>
  );
});