import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';
import StoriesDecorator from '../../../StoriesDecorator';
import Workflows from './Workflows';

export default {
  title: 'Pages/Workflows',
  component: Workflows,
  decorators: [
    (Story) => (
      <StoriesDecorator>
        <Story />
      </StoriesDecorator>
    ),
  ],
} as ComponentMeta<typeof Workflows>;

const Template: ComponentStory<typeof Workflows> = (args) => (
  <Workflows {...args} />
);
let itemsPerPage = 10;
export const Main = Template.bind({});
Main.args = {
  itemsPerPage,

  data: [
    {
      id: '234',
      passedStages: [
        {
          submittedByUser: {
            id: '05209264d58',
            firstNameAndLastName: 'مهدی عبدی',
          },
          havaleh: {
            id: 'شماره حواله77',
            deliverer: 'مهدی',
            date: '1658733661592',
            assets: {
              oxygen_50l: 17,
              bihoshi_50l: null,
              shaft_50l: null,
              controlValve_50l: null,
              co2_50l: null,
              argon_50l: null,
              azete_50l: null,
              dryAir_50l: null,
              entonox_50l: null,
              acetylene_50l: null,
              lpg_50l: null,
              oxygen_40l: 1,
              bihoshi_40l: null,
              shaft_40l: null,
              controlValve_40l: null,
              co2_40l: null,
              argon_40l: null,
              azete_40l: null,
              dryAir_40l: null,
              entonox_40l: null,
              acetylene_40l: null,
              lpg_40l: null,
              oxygen_50l_factory: 17,
              bihoshi_50l_factory: null,
              shaft_50l_factory: null,
              controlValve_50l_factory: null,
              co2_50l_factory: null,
              argon_50l_factory: null,
              azete_50l_factory: null,
              dryAir_50l_factory: null,
              entonox_50l_factory: null,
              acetylene_50l_factory: null,
              lpg_50l_factory: null,
              oxygen_50l_customer: null,
              bihoshi_50l_customer: null,
              shaft_50l_customer: null,
              controlValve_50l_customer: null,
              co2_50l_customer: null,
              argon_50l_customer: null,
              azete_50l_customer: null,
              dryAir_50l_customer: null,
              entonox_50l_customer: null,
              acetylene_50l_customer: null,
              lpg_50l_customer: null,
              oxygen_40l_factory: null,
              bihoshi_40l_factory: null,
              shaft_40l_factory: null,
              controlValve_40l_factory: null,
              co2_40l_factory: null,
              argon_40l_factory: null,
              azete_40l_factory: null,
              dryAir_40l_factory: null,
              entonox_40l_factory: null,
              acetylene_40l_factory: null,
              lpg_40l_factory: null,
              oxygen_40l_customer: 1,
              bihoshi_40l_customer: null,
              shaft_40l_customer: null,
              controlValve_40l_customer: null,
              co2_40l_customer: null,
              argon_40l_customer: null,
              azete_40l_customer: null,
              dryAir_40l_customer: null,
              entonox_40l_customer: null,
              acetylene_40l_customer: null,
              lpg_40l_customer: null,
            },
            corporation: {
              id: 'dff7b479-f3a5-45db-a022-cb567108666d',
              name: 'اداری',
            },
            transportationName: 'بیتا',
            transportationTelephone: '8897454',
            transportationTelephone2: '6657842',
            description: 'توضیحات',
            receivingDescription: null,
          },
        },
        {
          submittedByUser: {
            id: '0520926458',
            firstNameAndLastName: 'مهدی عبدی',
          },
          havaleh: null,
        },
      ],
    },
    {
      id: '234sdf',

      passedStages: [
        {
          submittedByUser: {
            id: '0520926458',
            firstNameAndLastName: 'مهدی عبدی',
          },
          havaleh: {
            id: 'شماره حواله',
            deliverer: 'مهدی',
            date: '1658733307029',
            assets: {
              oxygen_50l: 2,
              bihoshi_50l: 4,
              shaft_50l: null,
              controlValve_50l: null,
              co2_50l: null,
              argon_50l: null,
              azete_50l: null,
              dryAir_50l: null,
              entonox_50l: null,
              acetylene_50l: null,
              lpg_50l: null,
              oxygen_40l: 9,
              bihoshi_40l: 3,
              shaft_40l: null,
              controlValve_40l: null,
              co2_40l: null,
              argon_40l: null,
              azete_40l: null,
              dryAir_40l: null,
              entonox_40l: null,
              acetylene_40l: null,
              lpg_40l: null,
              oxygen_50l_factory: 2,
              bihoshi_50l_factory: null,
              shaft_50l_factory: null,
              controlValve_50l_factory: null,
              co2_50l_factory: null,
              argon_50l_factory: null,
              azete_50l_factory: null,
              dryAir_50l_factory: null,
              entonox_50l_factory: null,
              acetylene_50l_factory: null,
              lpg_50l_factory: null,
              oxygen_50l_customer: null,
              bihoshi_50l_customer: 4,
              shaft_50l_customer: null,
              controlValve_50l_customer: null,
              co2_50l_customer: null,
              argon_50l_customer: null,
              azete_50l_customer: null,
              dryAir_50l_customer: null,
              entonox_50l_customer: null,
              acetylene_50l_customer: null,
              lpg_50l_customer: null,
              oxygen_40l_factory: 9,
              bihoshi_40l_factory: 2,
              shaft_40l_factory: null,
              controlValve_40l_factory: null,
              co2_40l_factory: null,
              argon_40l_factory: null,
              azete_40l_factory: null,
              dryAir_40l_factory: null,
              entonox_40l_factory: null,
              acetylene_40l_factory: null,
              lpg_40l_factory: null,
              oxygen_40l_customer: null,
              bihoshi_40l_customer: 1,
              shaft_40l_customer: null,
              controlValve_40l_customer: null,
              co2_40l_customer: null,
              argon_40l_customer: null,
              azete_40l_customer: null,
              dryAir_40l_customer: null,
              entonox_40l_customer: null,
              acetylene_40l_customer: null,
              lpg_40l_customer: null,
            },
            corporation: {
              id: 'dff7b479-f3a5-45db-a022-cb567108666d',
              name: 'اداری',
            },
            transportationName: 'نام ترابری',
            transportationTelephone: 'شماره ترابری',
            transportationTelephone2: 'شماره ترابری۲',
            description: '',
            receivingDescription: null,
          },
        },
        {
          submittedByUser: {
            id: '0520926458',
            firstNameAndLastName: 'مهدی عبدی',
          },
          havaleh: {
            id: 'شماره حواله',
            deliverer: 'مهدی',
            date: '1658733307029',
            assets: {
              oxygen_50l: 2,
              bihoshi_50l: 8,
              shaft_50l: null,
              controlValve_50l: null,
              co2_50l: null,
              argon_50l: null,
              azete_50l: null,
              dryAir_50l: 3,
              entonox_50l: null,
              acetylene_50l: null,
              lpg_50l: null,
              oxygen_40l: 8,
              bihoshi_40l: 3,
              shaft_40l: null,
              controlValve_40l: 1,
              co2_40l: null,
              argon_40l: null,
              azete_40l: null,
              dryAir_40l: null,
              entonox_40l: null,
              acetylene_40l: null,
              lpg_40l: null,
              oxygen_50l_factory: null,
              bihoshi_50l_factory: null,
              shaft_50l_factory: null,
              controlValve_50l_factory: null,
              co2_50l_factory: null,
              argon_50l_factory: null,
              azete_50l_factory: null,
              dryAir_50l_factory: null,
              entonox_50l_factory: null,
              acetylene_50l_factory: null,
              lpg_50l_factory: null,
              oxygen_50l_customer: null,
              bihoshi_50l_customer: null,
              shaft_50l_customer: null,
              controlValve_50l_customer: null,
              co2_50l_customer: null,
              argon_50l_customer: null,
              azete_50l_customer: null,
              dryAir_50l_customer: null,
              entonox_50l_customer: null,
              acetylene_50l_customer: null,
              lpg_50l_customer: null,
              oxygen_40l_factory: null,
              bihoshi_40l_factory: null,
              shaft_40l_factory: null,
              controlValve_40l_factory: null,
              co2_40l_factory: null,
              argon_40l_factory: null,
              azete_40l_factory: null,
              dryAir_40l_factory: null,
              entonox_40l_factory: null,
              acetylene_40l_factory: null,
              lpg_40l_factory: null,
              oxygen_40l_customer: null,
              bihoshi_40l_customer: null,
              shaft_40l_customer: null,
              controlValve_40l_customer: null,
              co2_40l_customer: null,
              argon_40l_customer: null,
              azete_40l_customer: null,
              dryAir_40l_customer: null,
              entonox_40l_customer: null,
              acetylene_40l_customer: null,
              lpg_40l_customer: null,
            },
            corporation: null,
            transportationName: 'نام ترابری',
            transportationTelephone: 'شماره ترابری',
            transportationTelephone2: 'شماره ترابری۲',
            description: '',
            receivingDescription: null,
          },
        },
      ],
    },
  ],
  setItemsPerPage: (i: any) => {
    itemsPerPage = i;
  },
  pageNumber: 0,
  offset: 0,
  fetchMoreRows: (e, p) => {},
};

export const Loading = Template.bind({});
Loading.args = {
  ...Main.args,
  loading: true,
};