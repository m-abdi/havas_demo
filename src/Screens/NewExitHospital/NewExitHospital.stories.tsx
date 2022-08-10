import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';
import RequestExitCylinderWarehouse from './NewExitHospital';
import StoriesDecorator from '../../StoriesDecorator';

export default {
  title: 'Pages/NewExitHospital',
  component: RequestExitCylinderWarehouse,
  decorators: [
    (Story) => (
      <StoriesDecorator>
        <Story />
      </StoriesDecorator>
    ),
  ],
} as ComponentMeta<typeof RequestExitCylinderWarehouse>;

const Template: ComponentStory<typeof RequestExitCylinderWarehouse> = (
  args
) => <RequestExitCylinderWarehouse {...args} />;
let itemsPerPage = 10;
export const Main = Template.bind({});
Main.args = {
  warehouseKeeper: { id: '2123', label: 'مهدی عبدی' },
  corporations : [{id: "3489", label: "بیتا"}]
};

// export const Loading = Template.bind({});
// Loading.args = {
//   ...Main.args,
//   loading: true,
// };
