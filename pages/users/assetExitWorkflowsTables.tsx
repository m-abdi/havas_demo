import {
  Box,
  Fab,
  Tab,
  TableContainer,
  Tabs,
  useMediaQuery,
} from '@mui/material';
import React, { useState } from 'react';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ApprovedExitWorkflows from './approvedExitWorkflows';
import { Button } from '../../src/Components/Atomic/Button';
import ExitHospitals from './exitHospitals';
import Layout from '../../src/Components/Atomic/Layout';
import PrimaryButton from '@/src/Components/Atomic/PrimaryButton';
import ReceivedExitWorkflows from './receivedExitWorkflows';
import SentExitWorkflows from './sentExitWorkflows';
import { useRouter } from 'next/router';
import useScreenSize from '@/src/Logic/useScreenSize';
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
  const { small } = useScreenSize() 
  
  return (
    <Layout pageName={pageName}>
      <Box sx={{ inlineSize: '100%', pl: 1, position: 'relative' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant='fullWidth'
          scrollButtons='auto'
          orientation={small ? "horizontal" :'vertical'}
        >
          <Tab
            label='منتظر تایید مدیریت'
            id='منتظر-تایید-مدیریت'
            sx={{ p: 0 }}
          />
          <Tab
            label='منتظر ثبت توسط RFID'
            id='منتظر-ثبت-توسط-RFID'
            sx={{ p: 0 }}
          />
          <Tab
            label='منتظر تایید دریافت'
            id='منتظر-تایید-دریافت'
            sx={{ p: 0 }}
          />
          <Tab label='تاریخچه' id='تاریخچه' sx={{ p: 0 }} />
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
        <PrimaryButton
          id='newWorkflowButton'
          right='calc(120px + 20px)'
          top={-68}
          icon='ADD'
          ariaLabel='ایجاد'
          label='ایجاد'
          title='ثبت خروج از بیمارستان'
          size='large'
          variant='contained'
          fabVariant='circular'
          color='success'
          disabled={Boolean(!session?.user?.role?.createLicense)}
          onClick={() => {
            router.push('/users/newExitHospital');
          }}
        />
      </Box>
    </Layout>
  );
}
