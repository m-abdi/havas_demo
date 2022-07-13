import { ComponentMeta, ComponentStory } from '@storybook/react';

import EnterCorporation from './EnterCorporation';
import StoriesDecorator from '../../StoriesDecorator';

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
  itemsPerPage,
  data: [
    {
      name: 'اسم تجهیز',
      model: 'مدل',
      factory: 'کارخانه',
      serialNumber: '۴۲۳۴۲۳۴۴۵۸۵',
      productionYear: '۱۳۹۷',
      installationYear: '۱۳۹۸',
      terminologyCode: 'تنسی۳۲۴۲۳۴',
      hasInstructions: true,
      supportCompany: { name: 'شرکت پشتیبان' },
      supportTelephone1: '۰۹۳۷۱۲۴۶۶۸۵',
      supportTelephone2: '۰۸۶۳۵۶۹۶۵۶۲۵۶',
      createdAt: '2021-08-06',
      editedAt: '2021-08-06',
    },
    {
      name: 'اسم تجهیز',
      model: 'مدل',
      factory: 'کارخانه',
      serialNumber: '۴۲۳۴۲۳۴۴۵۸۵',
      productionYear: '۱۳۹۷',
      installationYear: '۱۳۹۸',
      terminologyCode: 'تنسی۳۲۴۲۳۴',
      hasInstructions: false,
      supportCompany: { name: 'شرکت پشتیبان' },
      supportTelephone1: '۰۹۳۷۱۲۴۶۶۸۵',
      supportTelephone2: '۰۸۶۳۵۶۹۶۵۶۲۵۶',
      createdAt: '2021-08-06',
      editedAt: '2021-08-06',
    },
  ],
  setItemsPerPage: (i: any) => {
    itemsPerPage = i;
  },
  pageNumber: 0,
  fetchMoreRows: (e, p) => {},
};

// export const Loading = Template.bind({});
// Loading.args = {
//   ...Main.args,
//   loading: true,
// };
