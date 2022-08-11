import { ComponentMeta, ComponentStory } from '@storybook/react';

import EnterWarehouseRFID from './EnterWarehouseRFID';
import StoriesDecorator from '../../../StoriesDecorator';

export default {
  title: 'Pages/EnterWarehouseRFID',
  component: EnterWarehouseRFID,
  decorators: [
    (Story) => (
      <StoriesDecorator>
        <Story />
      </StoriesDecorator>
    ),
  ],
} as ComponentMeta<typeof EnterWarehouseRFID>;

const Template: ComponentStory<typeof EnterWarehouseRFID> = (args) => (
  <EnterWarehouseRFID {...args} />
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
};
