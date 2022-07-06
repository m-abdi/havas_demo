import { ComponentMeta, ComponentStory } from '@storybook/react';

import NewAsset from './NewAsset';
import StoriesDecorator from '../../StoriesDecorator';

export default {
  title: 'Pages/NewAsset',
  component: NewAsset,
  decorators: [
    (Story) => (
      <StoriesDecorator>
        <Story />
      </StoriesDecorator>
    ),
  ],
} as ComponentMeta<typeof NewAsset>;

const Template: ComponentStory<typeof NewAsset> = (args) => (
  <NewAsset {...args} />
);
export const Main = Template.bind({});
Main.args = {
  equipments: [
    { id: '123', label: 'نام تجهیز' },
    { id: '654', label: '2نام تجهیز' },
  ],
  places: [
    { id: '333', label: 'نام مکان' },
    { id: '78', label: '2نام مکان' },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  ...Main.args,
  loading: true,
};
export const Sending = Template.bind({});
Sending.args = {
  sending: true,
};
