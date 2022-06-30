import { ComponentMeta, ComponentStory } from '@storybook/react';

import NewPerson from './NewPerson';
import StoriesDecorator from '../../StoriesDecorator';

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
    { label: 'مدیریت', id: '1' },
    { label: 'انباردار', id: '2' },
    { label: 'اداری', id: '3' },
    { label: 'آی تی', id: '4' },
  ],
  places: [
    { label: 'اداری', id: '11' },
    { label: 'انبار', id: '22' },
    { label: 'ساختمان فناوری اطلاعات', id: '33' },
    { label: 'کارگاه', id: '44' },
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
