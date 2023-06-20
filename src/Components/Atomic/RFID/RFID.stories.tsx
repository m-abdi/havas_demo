import { ComponentMeta, ComponentStory } from '@storybook/react';

import RFID from './RFID';
import React from 'react';
import StoriesDecorator from '../../../StoriesDecorator';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atomic/RFID',
  component: RFID,
  decorators: [
    (Story) => (
      <StoriesDecorator>
        <Story />
      </StoriesDecorator>
    ),
  ],
} as ComponentMeta<typeof RFID>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RFID> = (args) => <RFID {...args} />;

export const Connecting = Template.bind({});
Connecting.args = {
  status: "CONNECTING"
}
export const Connected = Template.bind({});
Connected.args = {
  status: "CONNECTED"
}
export const Disconnected = Template.bind({});
Disconnected.args = {
  status: 'DISCONNECTED',
};

