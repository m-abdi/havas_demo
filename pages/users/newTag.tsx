import {
  Autocomplete,
  IconButton,
  Select,
  Stack,
  TextField,
} from '@mui/material';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from 'react';

import AuthenticationRequired from 'src/AuthenticationRequired';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Head from 'next/head';
import HeartBeat from 'src/Components/HeartBeat/HeartBeat';
import { InfoContext } from 'pages/_app';
import Layout from '../../src/Components/Layout/Layout';
import type { NextPage } from 'next';
import { PahoClient } from 'src/PahoClient';
import Typography from '@mui/material/Typography';
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
      label='مقدار تگ'
      size='small'
      value={tag.content}
      color={index === tags.length - 1 ? 'success' : 'info'}
    />
  );
}
const NewTag: NextPage = () => {
  // states
  const [message, setMessage] = useState('');
  const [assetId, setAssetId] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [tags, setTags] = useState([{ content: '', assetId: '' }]);
  // page info context

  const infoContext: any = useContext(InfoContext);
  useEffect(() => {
    infoContext.changePageName(pageName);
  }, []);
  //
  useEffect(() => {
    if (connectionStatus === 'Disconnected') {
      PahoClient(setMessage, setConnectionStatus);
    }
  }, [connectionStatus]);

  useEffect(() => {
    
    if (message && ( tags.length === 0 || tags?.[0].content.length === 0)) {
      setTags([{ content: message, assetId: '' }]);
    } else if (message && tags[0].content.length > 0) {
      setTags([...tags, { content: message, assetId: '' }]);
    }
  }, [message]);

  return (
    <AuthenticationRequired>
      <Head>
        <title>{`${pageName}`} | حواس</title>
      </Head>
      <Layout>
        <Container maxWidth='lg'>
          <Box
            sx={{
              my: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              variant='h4'
              component='h1'
              gutterBottom
              sx={{ color: connectionStatus === 'Connected' ? 'green' : 'red' }}
            >
              Status : {connectionStatus}
            </Typography>
            <Stack spacing={3}>
              {tags.map((tag, index) => (
                <Stack
                  key={index}
                  direction={'row'}
                  alignItems='center'
                  spacing={3}
                >
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
          </Box>
        </Container>
      </Layout>
    </AuthenticationRequired>
  );
};

export default NewTag;
