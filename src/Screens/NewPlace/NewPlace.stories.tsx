import { ComponentMeta, ComponentStory } from '@storybook/react';

import NewPlace from './NewPlace';
import StoriesDecorator from '../../StoriesDecorator';

export default {
  title: 'Pages/NewPerson',
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

