import { ComponentMeta, ComponentStory } from '@storybook/react';

import ExitCorporations from './ExitCorporations';
import React from 'react';
import StoriesDecorator from '../../../StoriesDecorator';

export default {
  title: 'Pages/ExitCorporations',
  component: ExitCorporations,
  decorators: [
    (Story) => (
      <StoriesDecorator>
        <Story />
      </StoriesDecorator>
    ),
  ],
} as ComponentMeta<typeof ExitCorporations>;

const Template: ComponentStory<typeof ExitCorporations> = (args) => (
  <ExitCorporations {...args} />
);
let itemsPerPage = 10;
export const Main = Template.bind({});
Main.args = {
  itemsPerPage,
  data: [
    {
      id: "sofio",
      workflowNumber: '1',
      instanceOfProcessId: 1,
      nextStageName: 'RFID ثبت ورود کپسول به انبار توسط',
      dateCreated: '1657952937261',
      dateModified: '1657967683902',
      passedStages: [
        {
          stageID: "1",
          stageName: 'ثبت خروج کپسول از شرکت',
          submittedByUser: {
            id: '0520926458',
            firstNameAndLastName: 'مهدی عبدی',
          },
          
          havaleh: {
            id: 'شماره حواله',
            date: '1657952804983',
            deliverer: 'مهدی',
            transportationName: 'نام ترابری',
            transportationTelephone: 'شماره ترابری',
            transportationTelephone2: '',
            description: 'صثق',
            corporation: {id: "234", name: "324"},
            receivingDescription: null,
            assets: {
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
              oxygen_50l: null,
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
              oxygen_40l: null,
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
            },
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
