import { ComponentMeta, ComponentStory } from '@storybook/react';

import Loader from './Loader';
import React from 'react';
import StoriesDecorator from '../StoriesDecorator';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Web App/Loader',
  component: Loader,
  decorators: [
    (Story) => (
      <StoriesDecorator>
        <Story />
      </StoriesDecorator>
    ),
  ],
} as ComponentMeta<typeof Loader>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Loader> = (args) => <Loader {...args} />;

export const PrimaryColor = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
PrimaryColor.args = {
  center: true,
};


