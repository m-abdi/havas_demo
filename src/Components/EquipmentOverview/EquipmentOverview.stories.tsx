import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Box } from '@mui/material';
import EquipmentOverview from './EquipmentOverview';
import React from 'react';
import StoriesDecorator from '../../StoriesDecorator';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Equipment Overview',
  component: EquipmentOverview,
  decorators: [
    (Story) => (
      <StoriesDecorator>
        <Box sx={{ mt: 10 }}>
          <Story />
        </Box>
      </StoriesDecorator>
    ),
  ],
} as ComponentMeta<typeof EquipmentOverview>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EquipmentOverview> = (args) => (
  <EquipmentOverview {...args} />
);

export const Main = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Main.args = {
  equipment: {
    name: 'اکسیژن ۵۰ لیتری',
    outsourced: 4,
    sending: 0,
    receiving: 2152,
    available: 3,
  },
};
