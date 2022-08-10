import { ComponentMeta, ComponentStory } from '@storybook/react';

import ExitCorporation from './NewExitCorporation';
import React from 'react';
import StoriesDecorator from '../../StoriesDecorator';

export default {
  title: 'Pages/NewExitCorporation',
  component: ExitCorporation,
  decorators: [
    (Story) => (
      <StoriesDecorator>
        <Story />
      </StoriesDecorator>
    ),
  ],
} as ComponentMeta<typeof ExitCorporation>;

const Template: ComponentStory<typeof ExitCorporation> = (args) => <ExitCorporation {...args} />;
let itemsPerPage = 10;
export const Main = Template.bind({});
Main.args = {
  corporationRepresentative: {id: "2123", label: "مهدی عبدی"}
};

// export const Loading = Template.bind({});
// Loading.args = {
//   ...Main.args,
//   loading: true,
// };
