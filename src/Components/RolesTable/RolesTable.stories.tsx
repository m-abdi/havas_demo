import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';
import RoleTable from './RolesTable';
import StoriesDecorator from '../StoriesDecorator';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Web App/ Role Table',
  component: RoleTable,
  decorators: [
    (Story) => (
      <StoriesDecorator>
        <Story />
      </StoriesDecorator>
    ),
  ],
} as ComponentMeta<typeof RoleTable>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RoleTable> = (args: any) => (
  <RoleTable {...args} />
);

export const Main = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Main.args = {
  rows: [{
    id: "123",
    name: "انباردار",
    viewPlace: true,
    createPlace: true,
    deletePlace: false
  }]
};