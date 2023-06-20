import { ComponentMeta, ComponentStory } from '@storybook/react';

import NewEquipment from './NewEquipment';
import StoriesDecorator from '../../../StoriesDecorator';

export default {
  title: 'Pages/NewEquipment',
  component: NewEquipment,
  decorators: [
    (Story) => (
      <StoriesDecorator>
        <Story />
      </StoriesDecorator>
    ),
  ],
} as ComponentMeta<typeof NewEquipment>;

const Template: ComponentStory<typeof NewEquipment> = (args) => (
  <NewEquipment {...args} />
);
export const Main = Template.bind({});
Main.args = {
  factories: [{ id: '123', label: 'نام کارخانه' }],
};

export const Loading = Template.bind({});
Loading.args = {
  ...Main.args,
  loading: true,
};
export const Sending = Template.bind({});
Sending.args = {
  ...Main.args,
  sending: true,
};
