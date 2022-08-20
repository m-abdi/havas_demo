import { Box, Tab, TableContainer, Tabs } from '@mui/material';
import React, { useState } from 'react';

import ApprovedExitWorkflows from './approvedExitWorkflows';
import { Button } from '../../src/Components/Atomic/Button';
import ExitHospitals from './exitHospitals';
import Layout from '../../src/Components/Atomic/Layout';
import ReceivedExitWorkflows from './receivedExitWorkflows';
import SentExitWorkflows from "./sentExitWorkflows"
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
          <Tab label='منتظر تایید مدیریت' id='منتظر تایید مدیریت' />
          <Tab label='منتظر ثبت توسط RFID' id='منتظر ثبت توسط RFID' />
          <Tab label='منتظر تایید دریافت' id='منتظر تایید دریافت' />
          <Tab label='تاریخچه' id='تاریخچه' />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <ExitHospitals />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <ApprovedExitWorkflows />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <SentExitWorkflows />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <ReceivedExitWorkflows />
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
