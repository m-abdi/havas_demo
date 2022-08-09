import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Skeleton,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { Button } from '@/src/Components/Button';
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
  submitHandler: (id: string , ignoreManagerApproval: boolean) => Promise<any>;
}) {
  // states
  const [isChecked, setIsChecked] = useState(false);
  //
  useEffect(() => {
    if (data) {
      setIsChecked(data?.ignoreManagerApproval as boolean);
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
      {session?.user?.role?.deleteLicense && loading ? (
        <Skeleton variant='rectangular' width={300} height={20} />
      ) : (
        data && (
          <FormControlLabel
            control={
              <Checkbox
                checked={isChecked}
                onClick={() => setIsChecked(!isChecked)}
              />
            }
            label='تایید خودکار حواله های خروجی'
          />
        )
      )}
      <Box
        sx={{
          position: 'absolute',
          top: -70,
          right: '35px',
        }}
      >
        <Button
          label='ثبت'
          size='large'
          color='success'
          variant='contained'
          onClick={() => {
            submitHandler(data?.id as string, isChecked);
          }}
        />
      </Box>
    </Container>
  );
}
