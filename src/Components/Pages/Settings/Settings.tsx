import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Skeleton,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { Button } from '../../Atomic/Button';
import { CheckBox } from '@mui/icons-material';
import { Config } from 'lib/resolvers-types';
import { Session } from 'next-auth';

const pageName = 'تنظیمات';
export default function Settings({
  session,
  data,
  loading,
  submitHandler,
}: {
  session: Session;
  data: Config;
  loading: boolean;
  submitHandler: (id: string, ignoreManagerApproval: boolean, ignoreRFID: boolean) => Promise<any>;
}) {
  // states
  const [isChecked, setIsChecked] = useState(false);
  const [ignoreRFID, setIgnoreRFID] = useState(false);
  //
  useEffect(() => {
    if (data) {
      setIsChecked(data?.ignoreManagerApproval as boolean);
      setIgnoreRFID(data?.ignoreRFID ?? false);
    }
  }, [data]);

  return (
    <Container
      maxWidth='lg'
      sx={{
        border: 1,
        borderRadius: '6%',
        borderColor: 'gray',
        p: 5,
        position: 'relative',
      }}
    >
      {/* automatic confirm exit workflows */}
      {/* manager detection */}
      {session?.user?.role?.name === 'مدیریت' && loading ? (
        <Skeleton variant='rectangular' width={300} height={20} />
      ) : (
        session?.user?.role?.name === 'مدیریت' &&
        data && (
          <>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isChecked}
                  onClick={() => setIsChecked(!isChecked)}
                />
              }
              label='تایید خودکار حواله های خروجی'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={ignoreRFID}
                  onClick={() => setIgnoreRFID(!ignoreRFID)}
                />
              }
              label='حذف موقت RFID'
            />
          </>
        )
      )}
      <Box
        sx={{
          position: 'fixed',
          top: 72,
          right: 40,
          zIndex: 40,
        }}
      >
        <Button
          label='ثبت'
          size='large'
          color='success'
          variant='contained'
          onClick={() => {
            submitHandler(data?.id as string, isChecked, ignoreRFID);
          }}
        />
      </Box>
    </Container>
  );
}
