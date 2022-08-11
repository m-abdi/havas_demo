import { ComponentMeta, ComponentStory } from '@storybook/react';

import AggregatedTable from './AggregatedTable';
import StoriesDecorator from '../../../StoriesDecorator';

export default {
  title: 'Atomic/AggregatedTable',
  component: AggregatedTable,
  decorators: [
    (Story) => (
      <StoriesDecorator>
          <Story />
      </StoriesDecorator>
    ),
  ],
} as ComponentMeta<typeof AggregatedTable>;

const Template: ComponentStory<typeof AggregatedTable> = (args) => (
  <AggregatedTable {...args} />
);
let itemsPerPage = 10;
export const Main = Template.bind({});
Main.args = {
  editable: false,
  selectedColumns: ['اکسیژن', 'گاز بیهوشی'],
  assets: {
    oxygen_50l: 10,
    oxygen_40l: 5,
  },
};

// export const Loading = Template.bind({});
// Loading.args = {
//   ...Main.args,
//   loading: true,
// };
