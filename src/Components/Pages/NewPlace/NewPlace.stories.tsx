import { ComponentMeta, ComponentStory } from '@storybook/react';

import NewPlace from './NewPlace';
import StoriesDecorator from '../../../StoriesDecorator';

export default {
  title: 'Pages/NewPlace',
  component: NewPlace,
  decorators: [
    (Story) => (
      <StoriesDecorator>
        <Story />
      </StoriesDecorator>
    ),
  ],
} as ComponentMeta<typeof NewPlace>;

const Template: ComponentStory<typeof NewPlace> = (args) => (
  <NewPlace {...args} />
);
export const Main = Template.bind({});

Main.args = {
  places: [
    {
      id: 'e0baa2f2-054b-4b28-a9cf-37f884da041b',
      label: 'بیمارستان',
      superPlace: null,
      isCategory: true,

      subset: [
        {
          id: 'e78e6f2b-e039-4c5a-a5ed-c5b00c4861a4',
          name: 'انبار',
          subset: [],
          isCategory: false,
        },
        {
          id: '0414cf4e-7cfa-4e79-ad10-bf1b62705a49',
          name: 'اداری',
          subset: [],
          isCategory: false,
        },
      ],
    },
    {
      id: 'e78e6f2b-e039-4c5a-a5ed-c5b00c4861a4',
      label: 'انبار',
      isCategory: false,
      superPlace: {
        id: 'e0baa2f2-054b-4b28-a9cf-37f884da041b',
        name: 'بیمارستان',
      },
      subset: [],
    },
    {
      id: '0414cf4e-7cfa-4e79-ad10-bf1b62705a49',
      label: 'اداری',
      isCategory: false,
      superPlace: {
        id: 'e0baa2f2-054b-4b28-a9cf-37f884da041b',
        name: 'بیمارستان',
      },
      subset: [],
    },
  ],
  persons: [
    { label: 'مهدی عبدی', id: '1', role: { name: 'مدیریت' } },
    { label: 'سعید عبدی', id: '2', role: { name: 'انباردار' } },
  ],
};
