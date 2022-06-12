import { ComponentMeta, ComponentStory } from '@storybook/react';

import NewRole from './NewRole';
import React from 'react';
import StoriesDecorator from '../StoriesDecorator';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Web App/NewRole',
  component: NewRole,
  decorators: [
    (Story) => (
      <StoriesDecorator>
        <Story />
      </StoriesDecorator>
    ),
  ],
} as ComponentMeta<typeof NewRole>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof NewRole> = (args:any) => (
  <NewRole {...args} />
);

export const Contained = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args


