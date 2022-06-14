import { ComponentMeta, ComponentStory } from '@storybook/react';

import Layout from './Layout';
import React from 'react';
import StoriesDecorator from '../StoriesDecorator';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Web App/Layout',
  component: Layout,
  decorators: [
    (Story) => (
      <StoriesDecorator>
        <Story />
      </StoriesDecorator>
    ),
  ],
} as ComponentMeta<typeof Layout>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Layout> = (args) => <Layout {...args} />;

export const PrimaryColor = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
PrimaryColor.args = {
  session: true
};


