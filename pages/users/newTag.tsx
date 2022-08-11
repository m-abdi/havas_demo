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
import React, { useContext, useEffect, useState } from 'react';

import AuthenticationRequired from '../../src/AuthenticationRequired';
import Box from '@mui/material/Box';
import { Button } from '../../src/Components/Button';
import Container from '@mui/material/Container';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Head from 'next/head';
import HeartBeat from '../../src/Components/HeartBeat/HeartBeat';
import { InfoContext } from '../../pages/_app';
import Layout from '../../src/Components/Layout/Layout';
import NewTag from '../../src/Screens/NewTag/NewTag';
import { NewTag as NewTagType } from '../../lib/resolvers-types';
import type { NextPage } from 'next';
import RFID from '../../src/Components/RFID';
import Typography from '@mui/material/Typography';
import useAssets from '../../src/Logic/useAssets';
import useEquipments from '../../src/Logic/useEquipments';
import useMQTT from '../../src/Logic/useMQTT';
import usePlaces from '../../src/Logic/usePlaces';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import useTags from '../../src/Logic/useTags';

const pageName = 'تگ جدید';

const newTag: NextPage = () => {
  // states
  const [existingAsset, setExistingAsset] = useState(true);
  // hooks
  // mqtt hook
  const { mqttMessage, mqttStatus } = useMQTT();
  // data hooks
  const {
    equipmentsList: equipments,
    equipmentsListLoading: equipmentsLoading,
  } = useEquipments(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    true
  );
  const { placesList: places, placesListLoading: placesLoading } = usePlaces(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    false,
    true
  );
  const { assetsList: assets } = useAssets();
  const { sending: newTagSending, createNew: createTagHandler } = useTags();
  //

  return (
    <Layout pageName={pageName}>
      <Head>
        <title>{`${pageName}`} | حواس</title>
      </Head>
      {mqttStatus === 'DISCONNECTED' || mqttStatus === 'CONNECTING' ? (
        <RFID status='CONNECTING' />
      ) : (
        <Container
          maxWidth='md'
          sx={{
            position: 'relative',
            display: 'flex',
            flexFlow: 'column nowrap',
            alignItems: 'center',
          }}
        >
          <Stack
            direction={'row'}
            spacing={1}
            alignItems='center'
            sx={{ mx: 'auto' }}
          >
            <Typography>موجودی ثبت شده</Typography>
            <Switch
              id='existingAssetMode'
              checked={existingAsset}
              color='success'
              onClick={(e) => {
                e.stopPropagation();
              }}
              onChange={(e) => {
                e.stopPropagation();
                setExistingAsset(!existingAsset);
              }}
            />
            <Typography>موجودی جدید</Typography>
          </Stack>
          <NewTag
            equipmentsLoading={equipmentsLoading}
            placesLoading={placesLoading}
            sending={newTagSending}
            equipments={equipments as { id: string; label: string }[]}
            assetIds={assets as { id: string; label: string }[]}
            places={places as any}
            mqttMessage={mqttMessage as any}
            mqttStatus={mqttStatus as any}
            existingTag
            modal={false}
            newAsset={existingAsset}
            createTagHandler={async (tags: NewTagType[]) => {
              const resp = await createTagHandler(tags);
            }}
          />
        </Container>
      )}
    </Layout>
  );
};

export default newTag;
