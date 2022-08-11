import { Box, Tab, TableContainer, Tabs } from '@mui/material';
import React, { useState } from 'react';

import { Button } from '../../src/Components/Button';
import ConfirmReceiptByHospitals from './confirmReceiptByHospitals';
import EnteredWarehouseRFID from './enteredWarehouseRFID';
import ExitCorporations from './exitCorporations';
import ExitHospitals from './exitHospitals';
import Layout from '../../src/Components/Layout';
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
          <Tab label='حواله های ورودی جدید' />
          <Tab label='حواله های ورودی تایید شده' />
          <Tab label='حواله های ورودی ثبت در انبار' />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <ExitCorporations />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <ConfirmReceiptByHospitals />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <EnteredWarehouseRFID />
        </TabPanel>
        <Box
          sx={{
            position: 'absolute',
            top: -67,
            right: '150px',
            zIndex: 50000,
          }}
        >
          <Button
            label='ایجاد'
            size='large'
            color='success'
            variant='contained'
            disabled={!session?.user?.role?.createLicense}
            onClick={() => {
              router.push('/users/newExitCorporation');
            }}
          />
        </Box>
      </Box>
    </Layout>
  );
}