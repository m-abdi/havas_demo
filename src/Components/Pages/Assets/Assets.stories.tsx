import { ComponentMeta, ComponentStory } from '@storybook/react';

import Assets from './Assets';
import StoriesDecorator from '../../../StoriesDecorator';

export default {
  title: 'Pages/Assets',
  component: Assets,
  decorators: [
    (Story) => (
      <StoriesDecorator>
        <Story />
      </StoriesDecorator>
    ),
  ],
} as ComponentMeta<typeof Assets>;

const Template: ComponentStory<typeof Assets> = (args) => <Assets {...args} />;
let itemsPerPage = 10;
export const Main = Template.bind({});
Main.args = {
  itemsPerPage,
  data: [
    {
      id: 'string',
      equipment: { id: 'string', name: 'نام تجهیز' },
      publicPropertyCode: 'کد بیت المال',
      place: { name: 'نام مکان' },
    },
    {
      id: '123',
      equipment: { id: 'string', name: 'نام تجهیز' },
      publicPropertyCode: 'کد بیت المال',
      place: { name: 'نام مکان' },
    },
  ],
  setItemsPerPage: (i: any) => {
    itemsPerPage = i;
  },
  pageNumber: 0,
  fetchMoreRows: (e, p) => {},
  allAssetsCount: 10
};

export const Loading = Template.bind({});
Loading.args = {
  ...Main.args,
  loading: true,
};
