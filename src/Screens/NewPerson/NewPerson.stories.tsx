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
        {label: "مدیریت", id: "1"},
        {label: "انباردار", id: "2"},
        {label: "اداری", id: "3"},
        {label: "آی تی", id: "4"},
    ],
    places: [
        {label: "اداری", id: "11"},
        {label: "انبار", id: "22"},
        {label: "ساختمان فناوری اطلاعات", id: "33"},
        {label: "کارگاه", id: "44"},
    ]
}