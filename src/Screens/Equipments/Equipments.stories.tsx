import { ComponentMeta, ComponentStory } from '@storybook/react';

import Equipments from './Equipments';
import StoriesDecorator from '../../StoriesDecorator';

export default {
  title: 'Pages/Equipments',
  component: Equipments,
  decorators: [
    (Story) => (
      <StoriesDecorator>
        <Story />
      </StoriesDecorator>
    ),
  ],
} as ComponentMeta<typeof Equipments>;

const Template: ComponentStory<typeof Equipments> = (args) => (
  <Equipments {...args} />
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
      supportCompany: 'شرکت پشتیبان',
      supportMobile: '۰۹۳۷۱۲۴۶۶۸۵',
      supportTelephone: '۰۸۶۳۵۶۹۶۵۶۲۵۶',
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
      supportCompany: 'شرکت پشتیبان',
      supportMobile: '۰۹۳۷۱۲۴۶۶۸۵',
      supportTelephone: '۰۸۶۳۵۶۹۶۵۶۲۵۶',
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

export const Loading = Template.bind({});
Loading.args = {
  ...Main.args,
  loading: true,
};
