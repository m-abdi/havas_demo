import { ComponentMeta, ComponentStory } from '@storybook/react';

import Places from './Places';
import StoriesDecorator from '../../StoriesDecorator';

export default {
  title: 'Pages/Places',
  component: Places,
  decorators: [
    (Story) => (
      <StoriesDecorator>
        <Story />
      </StoriesDecorator>
    ),
  ],
} as ComponentMeta<typeof Places>;

const Template: ComponentStory<typeof Places> = (args) => <Places {...args} />;
let itemsPerPage = 10;
export const Main = Template.bind({});
Main.args = {
  itemsPerPage,
  data: [
    {
      id: '098565665',
      name: 'یک مکان جدید',
      typeOfWork: 'مگس پراکنی',
      representative: {
        firstNameAndLastName: 'مهدی عبدی',
        id: '12123',
        role: { name: 'مدیریت' },
      },
      superPlace: { id: '23123', name: 'نام دسته بندی' },
      isCategory: false,
      state: 'مرکزی',
      city: 'اراک',
      postalCode: '۷۸۹',
      address: 'اراک اراک',
      telephone: '6849898',
      mobileNumber: '85989498',
      website: 'mehdiabdi.info',
      nationalId: '789456',
      economicalCode: '123456',
      registeredNumber: '456963',
      description: 'توضیحات مکان',
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

//  const columns = useMemo(
//    () => [
//      {
//        Header: 'کد ملی',
//        accessor: 'id', // accessor is the "key" in the data
//      },
//      {
//        Header: 'عنوان',
//        accessor: 'firstNameAndLastName', // accessor is the "key" in the data
//      },
//      {
//        Header: 'نقش',
//        accessor: 'role.name', // accessor is the "key" in the data
//      },
//      {
//        Header: 'مکان',
//        accessor: 'place.name', // accessor is the "key" in the data
//      },

//      {
//        Header: 'استان',
//        accessor: 'state',
//      },
//      {
//        Header: 'شهر',
//        accessor: 'city', // accessor is the "key" in the data
//      },
//      {
//        Header: 'کد پستی',
//        accessor: 'postalCode', // accessor is the "key" in the data
//      },
//      {
//        Header: 'آدرس',
//        accessor: 'address', // accessor is the "key" in the data
//      },
//      {
//        Header: 'تلفن',
//        accessor: 'telephone', // accessor is the "key" in the data
//      },
//      {
//        Header: 'تلفن همراه',
//        accessor: 'mobileNumber', // accessor is the "key" in the data
//      },
//      {
//        Header: 'سایت',
//        accessor: 'website', // accessor is the "key" in the data
//      },
//    ],
//    []
//  );

// <th
//                 {...column.getHeaderProps(column.getSortByToggleProps())}
//                 key={useId()}
//                 style={{
//                   borderBottom: 'solid 3px red',
//                   background: 'aliceblue',
//                   color: 'black',
//                   fontWeight: 'bold',
//                   fontFamily: 'Vazir',
//                 }}
//               >
//                 {column.render('Header')}
//                 <span>
//                   {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
//                 </span>
