import { Box, Tab, TableContainer, Tabs } from '@mui/material';
import React, { useState } from 'react';

import { Button } from '../../src/Components/Atomic/Button';
import ConfirmReceiptByHospitals from './confirmReceiptByHospitals';
import EnteredWarehouseRFID from './enteredWarehouseRFID';
import ExitCorporations from './exitCorporations';
import ExitHospitals from './exitHospitals';
import Layout from '../../src/Components/Atomic/Layout';
import PrimaryButton from '@/src/Components/Atomic/PrimaryButton';
import SentToCorporations from './approvedExitWorkflows';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const pageName = 'حواله های خروجی';
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
          <Tab label='خروج های ثبت شده' />
          <Tab label='تاریخچه' />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <ExitCorporations />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <EnteredWarehouseRFID />
        </TabPanel>
        <PrimaryButton
          id='newWorkflowButton'
          right='calc(120px + 20px)'
          icon='ADD'
          ariaLabel='ایجاد'
          label='ایجاد'
          size='large'
          variant='contained'
          fabVariant='circular'
          color='success'
          disabled={Boolean(!session?.user?.role?.createEnterDeliverExit)}
          onClick={() => {
            router.push('/users/newExitCorporation');
          }}
        />
      </Box>
    </Layout>
  );
}
