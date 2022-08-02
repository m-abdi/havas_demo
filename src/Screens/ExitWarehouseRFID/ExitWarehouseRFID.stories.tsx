import { ComponentMeta, ComponentStory } from '@storybook/react';

import ExitWarehouseRFID from './ExitWarehouseRFID';
import React from 'react';
import StoriesDecorator from '../../StoriesDecorator';

export default {
  title: 'Pages/ExitWarehouseRFID',
  component: ExitWarehouseRFID,
  decorators: [
    (Story) => (
      <StoriesDecorator>
        <Story />
      </StoriesDecorator>
    ),
  ],
} as ComponentMeta<typeof ExitWarehouseRFID>;

const Template: ComponentStory<typeof ExitWarehouseRFID> = (args) => (
  <ExitWarehouseRFID {...args} />
);
export const Main = Template.bind({});
Main.args = {
  mqttStatus: "CONNECTED",
  assets: {
    oxygen_50l: 55,
    co2_40l: 9,
  },
};

export const Loading = Template.bind({});
Loading.args = {
  ...Main.args,
  loading: true,
};
