import ExitCorporation from './ExitCorporation';
import { Main } from './ExitCorporation.stories';
export const testNewEnterWorkflowData = {
  workflowNumber: 'شماره گردش کاری',
  havalehId: 'شماره حواله',
  date: Date.now(),
  corporationRepresentativeId: 'آی دی نماینده شرکت',
  corporationRepresentativeName: 'نام نماینده شرکت',
  deliverer: 'تحویل دهنده شرکت',
  description: 'توضیحات',
  transportationName: 'نام ترابری',
  transportationTelephone: '123456',
  transportationTelephone2: '123456',
  oxygen_50l_factory: 3,
  bihoshi_50l_factory: 9,
  shaft_50l_factory: NaN,
  controlValve_50l_factory: NaN,
  co2_50l_factory: NaN,
  argon_50l_factory: NaN,
  azete_50l_factory: NaN,
  dryAir_50l_factory: NaN,
  entonox_50l_factory: NaN,
  acetylene_50l_factory: NaN,
  lpg_50l_factory: NaN,
  oxygen_50l_customer: 2,
  bihoshi_50l_customer: 3,
  shaft_50l_customer: NaN,
  controlValve_50l_customer: NaN,
  co2_50l_customer: NaN,
  argon_50l_customer: NaN,
  azete_50l_customer: NaN,
  dryAir_50l_customer: NaN,
  entonox_50l_customer: NaN,
  acetylene_50l_customer: NaN,
  lpg_50l_customer: NaN,
  oxygen_40l_factory: 5,
  bihoshi_40l_factory: 3,
  shaft_40l_factory: NaN,
  controlValve_40l_factory: NaN,
  co2_40l_factory: NaN,
  argon_40l_factory: NaN,
  azete_40l_factory: NaN,
  dryAir_40l_factory: NaN,
  entonox_40l_factory: NaN,
  acetylene_40l_factory: NaN,
  lpg_40l_factory: NaN,
  oxygen_40l_customer: 3,
  bihoshi_40l_customer: 3,
  shaft_40l_customer: NaN,
  controlValve_40l_customer: NaN,
  co2_40l_customer: NaN,
  argon_40l_customer: NaN,
  azete_40l_customer: NaN,
  dryAir_40l_customer: NaN,
  entonox_40l_customer: NaN,
  acetylene_40l_customer: NaN,
  lpg_40l_customer: NaN,
};
describe('interaction test for NewPerson page', () => {
  it('calls the submite handler function with correct values', () => {
    const onSubmitSpy = cy.stub().as('onSubmitSpy');

    cy.mount(
      <ExitCorporation
        loading={false}
        sending={false}
        corporationRepresentative={{
          id: testNewEnterWorkflowData?.corporationRepresentativeId,
          label: testNewEnterWorkflowData?.corporationRepresentativeName,
        }}
        workflowNumber={testNewEnterWorkflowData?.workflowNumber}
        createNewHandler={onSubmitSpy}
        dateT={testNewEnterWorkflowData?.date}
      />,
      {
        props: {
          createNewHandler: onSubmitSpy,
        },
      }
    );
    cy.get('#havalehId', { timeout: 20000 }).type(
      testNewEnterWorkflowData?.havalehId
    );
    cy.get('#deliverer').type(testNewEnterWorkflowData?.deliverer);
    cy.get('#description').type(testNewEnterWorkflowData?.description);
    cy.get('#transportationName').type(
      testNewEnterWorkflowData?.transportationName
    );
    cy.get('#transportationTelephone').type(
      testNewEnterWorkflowData?.transportationTelephone
    );
    cy.get('#transportationTelephone2').type(
      testNewEnterWorkflowData?.transportationTelephone2
    );
    cy.get('#oxygen_50l_factory').type(
      testNewEnterWorkflowData?.oxygen_50l_factory.toString()
    );
    cy.get('#oxygen_50l_customer').type(
      testNewEnterWorkflowData?.oxygen_50l_customer.toString()
    );
    cy.get('#oxygen_40l_factory').type(
      testNewEnterWorkflowData?.oxygen_40l_factory.toString()
    );
    cy.get('#oxygen_40l_customer').type(
      testNewEnterWorkflowData?.oxygen_40l_customer.toString()
    );
    cy.get('#bihoshi_50l_factory').type(
      testNewEnterWorkflowData?.bihoshi_50l_factory.toString()
    );
    cy.get('#bihoshi_40l_factory').type(
      testNewEnterWorkflowData?.bihoshi_40l_factory.toString()
    );
    cy.get('#bihoshi_50l_customer').type(
      testNewEnterWorkflowData?.bihoshi_50l_customer.toString()
    );
    cy.get('#bihoshi_40l_customer').type(
      testNewEnterWorkflowData?.bihoshi_40l_customer.toString()
    );
    cy.get('#submitButton').click();

    cy.get('@onSubmitSpy').should('have.been.called');
    cy.get('@onSubmitSpy').should(
      'have.been.calledWith',
      testNewEnterWorkflowData.workflowNumber,
      testNewEnterWorkflowData.havalehId,
      testNewEnterWorkflowData.date,
      testNewEnterWorkflowData.corporationRepresentativeId,
      testNewEnterWorkflowData.deliverer,
      testNewEnterWorkflowData.description,
      testNewEnterWorkflowData.transportationName,
      testNewEnterWorkflowData.transportationTelephone,
      testNewEnterWorkflowData.transportationTelephone2,
      testNewEnterWorkflowData.oxygen_50l_factory,
      testNewEnterWorkflowData?.bihoshi_50l_factory,
      testNewEnterWorkflowData?.shaft_50l_factory,
      testNewEnterWorkflowData.controlValve_50l_factory,
      testNewEnterWorkflowData.co2_50l_factory,
      testNewEnterWorkflowData.argon_50l_factory,
      testNewEnterWorkflowData.azete_50l_factory,
      testNewEnterWorkflowData.dryAir_50l_factory,
      testNewEnterWorkflowData.entonox_50l_factory,
      testNewEnterWorkflowData.acetylene_50l_factory,
      testNewEnterWorkflowData.lpg_50l_factory,
      testNewEnterWorkflowData.oxygen_50l_customer,
      testNewEnterWorkflowData.bihoshi_50l_customer,
      testNewEnterWorkflowData.shaft_50l_customer,
      testNewEnterWorkflowData.controlValve_50l_customer,
      testNewEnterWorkflowData.co2_50l_customer,
      testNewEnterWorkflowData.argon_50l_customer,
      testNewEnterWorkflowData.azete_50l_customer,
      testNewEnterWorkflowData.dryAir_50l_customer,
      testNewEnterWorkflowData.entonox_50l_customer,
      testNewEnterWorkflowData.acetylene_50l_customer,
      testNewEnterWorkflowData.lpg_50l_customer,
      testNewEnterWorkflowData.oxygen_40l_factory,
      testNewEnterWorkflowData.bihoshi_40l_factory,
      testNewEnterWorkflowData.shaft_40l_factory,
      testNewEnterWorkflowData.controlValve_40l_factory,
      testNewEnterWorkflowData.co2_40l_factory,
      testNewEnterWorkflowData.argon_40l_factory,
      testNewEnterWorkflowData.azete_40l_factory,
      testNewEnterWorkflowData.dryAir_40l_factory,
      testNewEnterWorkflowData.entonox_40l_factory,
      testNewEnterWorkflowData.acetylene_40l_factory,
      testNewEnterWorkflowData.lpg_40l_factory,
      testNewEnterWorkflowData.oxygen_40l_customer,
      testNewEnterWorkflowData.bihoshi_40l_customer,
      testNewEnterWorkflowData.shaft_40l_customer,
      testNewEnterWorkflowData.controlValve_40l_customer,
      testNewEnterWorkflowData.co2_40l_customer,
      testNewEnterWorkflowData.argon_40l_customer,
      testNewEnterWorkflowData.azete_40l_customer,
      testNewEnterWorkflowData.dryAir_40l_customer,
      testNewEnterWorkflowData.entonox_40l_customer,
      testNewEnterWorkflowData.acetylene_40l_customer,
      testNewEnterWorkflowData.lpg_40l_customer
    );
  });
});
