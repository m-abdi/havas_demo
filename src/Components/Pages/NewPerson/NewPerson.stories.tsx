import { ComponentMeta, ComponentStory } from '@storybook/react';

import NewPerson from './NewPerson';
import StoriesDecorator from '../../../StoriesDecorator';

export default {
  title: 'Pages/NewPerson',
  component: NewPerson,
  decorators: [
    (Story) => (
      <StoriesDecorator>
        <Story />
      </StoriesDecorator>
    ),
  ],
} as ComponentMeta<typeof NewPerson>;

const Template: ComponentStory<typeof NewPerson> = (args) => (
  <NewPerson {...args} />
);
export const Main = Template.bind({});
Main.args = {
  roles: [
    { label: 'مدیریت', id: '1', isCategory: false },
    { label: 'انباردار', id: '2', isCategory: false },
    { label: 'اداری', id: '3', isCategory: false },
    { label: 'آی تی', id: '4', isCategory: false },
  ],
  places: [
    { label: 'اداری', id: '11', isCategory: false },
    { label: 'انبار', id: '22', isCategory: false },
    { label: 'ساختمان فناوری اطلاعات', id: '33', isCategory: false },
    { label: 'کارگاه', id: '44', isCategory: false },
  ],
  allPlaces: [
    {
      id: 'e0baa2f2-054b-4b28-a9cf-37f884da041b',
      name: 'بیمارستان',
      superPlace: null,
      subset: [
        {
          id: 'e78e6f2b-e039-4c5a-a5ed-c5b00c4861a4',
          name: 'انبار',
          subset: [],
        },
        {
          id: '0414cf4e-7cfa-4e79-ad10-bf1b62705a49',
          name: 'اداری',
          subset: [],
        },
      ],
    },
    {
      id: 'e78e6f2b-e039-4c5a-a5ed-c5b00c4861a4',
      name: 'انبار',
      superPlace: {
        id: 'e0baa2f2-054b-4b28-a9cf-37f884da041b',
        name: 'بیمارستان',
      },
      subset: [],
    },
    {
      id: '0414cf4e-7cfa-4e79-ad10-bf1b62705a49',
      name: 'اداری',
      superPlace: {
        id: 'e0baa2f2-054b-4b28-a9cf-37f884da041b',
        name: 'بیمارستان',
      },
      subset: [],
    },
  ],
};
