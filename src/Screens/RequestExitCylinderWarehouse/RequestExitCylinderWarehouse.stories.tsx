import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';
import RequestExitCylinderWarehouse from './RequestExitCylinderWarehouse';
import StoriesDecorator from '../../StoriesDecorator';

export default {
  title: 'Pages/NewRequestExitCylinderWarehouse',
  component: RequestExitCylinderWarehouse,
  decorators: [
    (Story) => (
      <StoriesDecorator>
        <Story />
      </StoriesDecorator>
    ),
  ],
} as ComponentMeta<typeof RequestExitCylinderWarehouse>;

const Template: ComponentStory<typeof RequestExitCylinderWarehouse> = (args) => <RequestExitCylinderWarehouse {...args} />;
let itemsPerPage = 10;
export const Main = Template.bind({});
Main.args = {
  workflowNumber :234234,
  corporationRepresentative: {id: "2123", label: "مهدی عبدی"}
};

// export const Loading = Template.bind({});
// Loading.args = {
//   ...Main.args,
//   loading: true,
// };
