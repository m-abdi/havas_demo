import { ComponentMeta, ComponentStory } from '@storybook/react';

import NewExitCorporation from './NewExitCorporation';
import React from 'react';
import StoriesDecorator from '../../../StoriesDecorator';

export default {
  title: 'Pages/NewExitCorporation',
  component: NewExitCorporation,
  decorators: [
    (Story) => (
      <StoriesDecorator>
        <Story />
      </StoriesDecorator>
    ),
  ],
} as ComponentMeta<typeof NewExitCorporation>;

const Template: ComponentStory<typeof NewExitCorporation> = (args) => (
  <NewExitCorporation {...args} />
);
let itemsPerPage = 10;
export const Main = Template.bind({});
Main.args = {
  corporationRepresentative: { id: '2123', label: 'مهدی عبدی' },
};

// export const Loading = Template.bind({});
// Loading.args = {
//   ...Main.args,
//   loading: true,
// };
