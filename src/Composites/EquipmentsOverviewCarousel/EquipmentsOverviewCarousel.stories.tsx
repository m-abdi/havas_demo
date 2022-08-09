import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Box } from '@mui/material';
import EquipmentsOverviewCarousel from './EquipmentsOverviewCarousel';
import React from 'react';
import StoriesDecorator from '../../StoriesDecorator';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Composites/Equipments Overview Carousel',
  component: EquipmentsOverviewCarousel,
  decorators: [
    (Story) => (
      <StoriesDecorator>
        <Box sx={{ mt: 10 }}>
          <Story />
        </Box>
      </StoriesDecorator>
    ),
  ],
} as ComponentMeta<typeof EquipmentsOverviewCarousel>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EquipmentsOverviewCarousel> = (args) => (
  <EquipmentsOverviewCarousel {...args} />
);

export const Main = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Main.args = {
  equipments: [
    {
      terminologyCode: 'oxygen_50l',
      name: 'اکسیژن ۵۰ لیتری',
      outsourced: 4,
      sending: 0,
      receiving: 2152,
      available: 3,
    },
    {
      terminologyCode: 'oxygen_40l',
      name: 'اکسیژن ۴۰ لیتری',
      outsourced: 4,
      sending: 0,
      receiving: 2152,
      available: 3,
    },
  ],
};
