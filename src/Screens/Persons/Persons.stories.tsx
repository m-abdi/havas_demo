import { ComponentMeta, ComponentStory } from '@storybook/react';

import Persons from './Persons';
import StoriesDecorator from '../../StoriesDecorator';

export default {
  title: 'Pages/Persons',
  component: Persons,
  decorators: [
    (Story) => (
      <StoriesDecorator>
        <Story />
      </StoriesDecorator>
    ),
  ],
} as ComponentMeta<typeof Persons>;

const Template: ComponentStory<typeof Persons> = (args) => <Persons {...args} />;
export const Main = Template.bind({});
Main.args = {
  data: [
    {
      id: '0520649875',
      firstNameAndLastName: 'مهدی عبدی',
      place: { name: 'دفتر مدیریت' },
      role: { name: 'مدیریت' },
      state: 'مرکزی',
      city: 'اراک',
      postalCode: '۹۸۹۹۸۷',
      address: 'اراک خیابان ملک',
      telephone: '984965665',
      mobileNumber: '09371246685',
      website: 'mehdiabdi.info',
    },
    {
      id: '052064۵۶۵۱75',
      firstNameAndLastName: 'حسین آرمان پور',
      place: { name: 'دفتر مدیریت' },
      role: { name: 'مدیریت' },
      state: 'هرمزگان',
      city: 'بندرعباس',
      postalCode: '78989',
      address: 'بندرعباس',
      telephone: '۸۹۴۹۸۸۹',
      mobileNumber: '656898',
      website: '',
    },
    {
      id: '0522449875',
      firstNameAndLastName: 'علی عبدی',
      place: { name: 'دفتر مدیریت' },
      role: { name: 'مدیریت' },
      state: 'مرکزی',
      city: 'اراک',
      postalCode: '۹۸۹۹۸۷',
      address: 'اراک خیابان ملک',
      telephone: '984965665',
      mobileNumber: '09371246685',
      website: 'mehdiabdi.info',
    },
  ],
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