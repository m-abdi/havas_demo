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
import PrimaryButton from '../../src/Components/Atomic/PrimaryButton';
import ReceivedExitWorkflows from './receivedExitWorkflows';
import SentExitWorkflows from './sentExitWorkflows';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const pageName = 'حواله های ورودی';
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
          <Tab label='منتظر تایید دریافت' id='منتظر-تایید-دریافت' />
          <Tab label='تاریخچه' id='تاریخچه' />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <SentExitWorkflows />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <ReceivedExitWorkflows />
        </TabPanel>
      </Box>
      
    </Layout>
  );
}
