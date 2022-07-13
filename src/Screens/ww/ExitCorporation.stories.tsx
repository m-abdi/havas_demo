import { ComponentMeta, ComponentStory } from '@storybook/react';

import ExitCorporation from './ExitCorporation';
import StoriesDecorator from '../../StoriesDecorator';

export default {
  title: 'Pages/ExitCorporation',
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
Main.args = {};

// export const Loading = Template.bind({});
// Loading.args = {
//   ...Main.args,
//   loading: true,
// };
