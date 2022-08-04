import { Box, Tab, TableContainer, Tabs } from '@mui/material';
import React, { useState } from 'react';

import ExitHospitals from './exitHospitals';
import Layout from '../../src/Components/Layout';
import SentToCorporations from './sentToCorporations';

const pageName = "جداول حواله های خروجی"
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
export default function AssetExitWorkflowsTables({ newExits }) {
  // states
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Layout pageName={pageName}>
      <Box sx={{ inlineSize: '100%', p: 1 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant='fullWidth'
          
          scrollButtons='auto'
        >
          <Tab
            label='حواله های خروجی جدید'
          />
          <Tab
            label='حواله های خروجی ارسال شده'
          />
          <Tab
            label='حواله های خروجی تحویل داده شده'
          />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <ExitHospitals />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <SentToCorporations />
        </TabPanel>
      </Box>
    </Layout>
  );
}
