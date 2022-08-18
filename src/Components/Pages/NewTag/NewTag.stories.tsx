import { ComponentMeta, ComponentStory } from '@storybook/react';

import NewTag from './NewTag';
import React from 'react';
import StoriesDecorator from '../../../StoriesDecorator';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Pages/NewTag',
  component: NewTag,
  decorators: [
    (Story) => (
      <StoriesDecorator>
        <Story />
      </StoriesDecorator>
    ),
  ],
} as ComponentMeta<typeof NewTag>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof NewTag> = (args: any) => (
  <NewTag {...args} />
);

export const Disconnected = Template.bind({});
Disconnected.args = {
  mqttStatus: 'DISCONNECTED',
  
};
export const Connecting = Template.bind({});
Connecting.args = {
  mqttStatus: 'CONNECTING',
};
export const Connected = Template.bind({});
Connected.args = {
  mqttStatus: 'CONNECTED',
  mqttMessage: '',
};
export const NewAsset = Template.bind({});
NewAsset.args = {
  mqttStatus: 'CONNECTED',
  mqttMessage: '',
  places: [{id: "23423", label: "انبار"}],
  equipments: [{id: "435", label: "تجهیز"}],
  createTagHandler:async(tags:any)=>{console.log(tags);
  }
  
};
// More on args: https://storybook.js.org/docs/react/writing-stories/args
