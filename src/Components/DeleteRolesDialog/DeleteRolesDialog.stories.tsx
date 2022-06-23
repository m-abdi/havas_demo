import { ComponentMeta, ComponentStory } from '@storybook/react';

import DeleteRolesDialog from './DeleteRolesDialog';
import React from 'react';
import StoriesDecorator from '../../StoriesDecorator';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/DeleteRolesDialog',
  component: DeleteRolesDialog,
  decorators: [
    (Story) => (
      <StoriesDecorator>
        <Story />
      </StoriesDecorator>
    ),
  ],
} as ComponentMeta<typeof DeleteRolesDialog>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DeleteRolesDialog> = (args) => (
  <DeleteRolesDialog {...args} />
);

export const Open = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Open.args = {
  open: true
};