import { ComponentMeta, ComponentStory } from '@storybook/react';

import Layout from './Layout';
import React from 'react';
import StoriesDecorator from '../../StoriesDecorator';

export default {
  title: 'Layout/Navbar',
  component: Layout,
  decorators: [
    (Story) => (
      <StoriesDecorator>
        <Story />
      </StoriesDecorator>
    ),
  ],
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = (args) => <Layout {...args} ><div>Mehdi Abdi</div></Layout>;
export const Main = Template.bind({});
