import { ComponentMeta, ComponentStory } from '@storybook/react';

import Button from './Button';
import React from 'react';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Web App/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Contained = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Contained.args = {
  variant: 'contained',
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Contained.args,
  color: 'secondary',
};

export const Large = Template.bind({});
Large.args = {
  ...Contained.args,
  size: 'large',
};
