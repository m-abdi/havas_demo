import { Box, Tab, TableContainer, Tabs } from '@mui/material';
import React, { useState } from 'react';

import { Button } from '../../src/Components/Atomic/Button';
import ConfirmReceiptByCorporations from './confirmReceiptByCorporations';
import ExitHospitals from './exitHospitals';
import Layout from '../../src/Components/Atomic/Layout';
import SentToCorporations from './sentToCorporations';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const pageName = 'جداول حواله های خروجی';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}
export default function AssetExitWorkflowsTables() {
  // states
  const [tabValue, setTabValue] = useState(0);
  //
  const { data: session } = useSession();
  const router = useRouter();
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Layout pageName={pageName}>
      <Box sx={{ inlineSize: '100%', p: 1, position: 'relative' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant='fullWidth'
          scrollButtons='auto'
        >
          <Tab label='حواله های خروجی جدید' />
          <Tab label='حواله های خروجی ارسال شده' />
          <Tab label='حواله های خروجی تحویل داده شده' />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <ExitHospitals />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <SentToCorporations />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <ConfirmReceiptByCorporations />
        </TabPanel>
        <Box
          sx={{
            position: 'fixed',
            top: 72,
            right: 'calc(110px + 20px)',
            zIndex: 40,
          }}
        >
          <Button
            label='ایجاد'
            size='large'
            color='success'
            variant='contained'
            disabled={!session?.user?.role?.createLicense}
            onClick={() => {
              router.push('/users/newExitHospital');
            }}
          />
        </Box>
      </Box>
    </Layout>
  );
}
