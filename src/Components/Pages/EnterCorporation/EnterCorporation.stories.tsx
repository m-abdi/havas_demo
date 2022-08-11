import { ComponentMeta, ComponentStory } from '@storybook/react';

import EnterCorporation from './EnterCorporation';
import StoriesDecorator from '../../../StoriesDecorator';

export default {
  title: 'Pages/EnterCorporation',
  component: EnterCorporation,
  decorators: [
    (Story) => (
      <StoriesDecorator>
        <Story />
      </StoriesDecorator>
    ),
  ],
} as ComponentMeta<typeof EnterCorporation>;

const Template: ComponentStory<typeof EnterCorporation> = (args) => (
  <EnterCorporation {...args} />
);
let itemsPerPage = 10;
export const Main = Template.bind({});
Main.args = {
  persons: [],
  places: [],

};

// export const Loading = Template.bind({});
// Loading.args = {
//   ...Main.args,
//   loading: true,
// };
