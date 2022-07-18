import {
  Autocomplete,
  Divider,
  IconButton,
  Select,
  Stack,
  TextField,
} from '@mui/material';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from 'react';

import AuthenticationRequired from '../../src/AuthenticationRequired';
import Box from '@mui/material/Box';
import { Button } from '../../src/Components/Button';
import Container from '@mui/material/Container';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Head from 'next/head';
import HeartBeat from '../../src/Components/HeartBeat/HeartBeat';
import { InfoContext } from '../../pages/_app';
import Layout from '../../src/Components/Layout/Layout';
import type { NextPage } from 'next';
import RFID from '../../src/Components/RFID';
import Typography from '@mui/material/Typography';
import useMQTT from '../../src/Logic/useMQTT';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const pageName = 'تگ جدید';

function AssetField({
  assetId,
  setAssetId,
}: {
  assetId: string;
  setAssetId: any;
}) {
  return (
    <Autocomplete
      value={assetId}
      fullWidth
      size='small'
      freeSolo
      sx={{ minInlineSize: 250 }}
      options={['wer', '123']}
      renderInput={(params) => <TextField label='کد دارایی' {...params} />}
    />
  );
}

function TagField(
  tag: { content: string; assetId: string },
  index: number,
  tags: { content: string; assetId: string }[]
) {
  return (
    <TextField
      // label='مقدار تگ'
      placeholder='دستگاه را مقابل تگ بگیرید'
      size='small'
      fullWidth
      value={tag.content}
      sx={{ minInlineSize: 300 }}
      color={index === tags.length - 1 ? 'success' : 'info'}
    />
  );
}
const NewTag: NextPage = () => {
  // states

  const [assetId, setAssetId] = useState<string>('');

  const [tags, setTags] = useState([{ content: '', assetId: '' }]);
  const { mqttMessage, mqttStatus } = useMQTT();


  useEffect(() => {
    if (mqttMessage && (tags.length === 0 || tags?.[0].content.length === 0)) {
      setTags([{ content: mqttMessage, assetId: '' }]);
    } else if (mqttMessage && tags[0].content.length > 0) {
      setTags([...tags, { content: mqttMessage, assetId: '' }]);
    }
  }, [mqttMessage]);

  return (
    <Layout pageName={pageName}>
      <Head>
        <title>{`${pageName}`} | حواس</title>
      </Head>
      {mqttStatus === 'DISCONNECTED' || mqttStatus === 'CONNECTING' ? (
        <RFID status='CONNECTING' />
      ) : (
        <Container maxWidth='md' sx={{ position: 'relative' }}>
          <Stack
            spacing={2}
            sx={{
              my: 4,
              flexDirection: 'column',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              inlineSize: '100%',
            }}
          >
            {/* <Typography
                variant='h4'
                component='h1'
                gutterBottom
                sx={{
                  color: connectionStatus === 'Connected' ? 'green' : 'red',
                }}
              >
                Status : {connectionStatus}
              </Typography> */}
            <RFID status='CONNECTED' />
            <Divider flexItem />
            <Stack
              spacing={2}
              flexWrap='wrap'
              sx={{ inlineSize: '100%' }}
              alignItems='center'
            >
              {tags.map((tag, index) => (
                <Stack
                  key={index}
                  direction={{ xs: 'column', md: 'row' }}
                  alignItems='center'
                  justifyContent={'space-between'}
                  spacing={1}
                  sx={{ inlineSize: '100%', flexWrap: 'wrap' }}
                >
                  <Typography>{index + 1}</Typography>
                  {tag.content.length === 0 ? (
                    <HeartBeat borderColor='info.main'>
                      {TagField(tag, index, tags)}
                    </HeartBeat>
                  ) : (
                    TagField(tag, index, tags)
                  )}
                  {tag.assetId.length === 0 ? (
                    <HeartBeat borderColor='info.main'>
                      <AssetField assetId={assetId} setAssetId={setAssetId} />
                    </HeartBeat>
                  ) : (
                    <AssetField assetId={assetId} setAssetId={setAssetId} />
                  )}
                  <IconButton
                    sx={{ color: 'error.main' }}
                    onClick={() => {
                      setTags(tags.filter((t, i) => i !== index));
                    }}
                  >
                    <DeleteForeverRoundedIcon />
                  </IconButton>
                </Stack>
              ))}
            </Stack>
          </Stack>
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
        </Container>
      )}
    </Layout>
  );
};

export default NewTag;
