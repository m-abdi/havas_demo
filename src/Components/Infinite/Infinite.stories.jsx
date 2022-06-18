import { ComponentMeta, ComponentStory } from '@storybook/react';

import Infinite from './Infinite';
import React from 'react';
import StoriesDecorator from '../StoriesDecorator';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Web App/Loader',
  component: Infinite,
  decorators: [
    (Story) => (
      <StoriesDecorator>
        <Story />
      </StoriesDecorator>
    ),
  ],
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Infinite />;

export const Main = Template.bind({});



