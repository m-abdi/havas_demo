import { Main } from './NewEquipment.stories';
import NewEquipment from './NewEquipment';
export const testNewEquipmentData = {
  name: 'نام تجهیز',
  model: 'مدل تجهیز',
  factory: 'نام کارخانه سازنده',
  serialNumber: 'شماره سریال',
  productionYear: 'سال تولید',
  installationYear: 'سال نصب و راه اندازی',
  terminologyCode: '123123123',
  hasInstructions: true,
  supportCompany: "پارس گستر",
  supportTelephone1: 'تلفن پشتیبانی',
  supportTelephone2: 'تلفن پشتیبانی ۲',
  edit: '',
};
export const testEditedEquipmentData = {
  name: 'نام تجهیز',
  model: 'مدل تجهیز',
  factory: 'نام کارخانه سازنده',
  supportCompany: { id: '123', label: 'نام کارخانه' },
  serialNumber: 'شماره سریال',
  productionYear: 'سال تولید',
  installationYear: 'سال نصب و راه اندازی',
  terminologyCode: '123123123',
  hasInstructions: false,
  supportTelephone1: 'تلفن پشتیبانی',
  supportTelephone2: 'تلفن پشتیبانی ۲',
  edit: '123123123',
};
describe('interaction test for NewEquipment page', () => {
  it('calls the submite handler function with correct values', () => {
    const onSubmitSpy = cy.spy().as('onSubmitSpy');
    cy.mount(
      <NewEquipment
        loading={false}
        sending={false}
        factories={Main.args?.factories as any}
        createHandler={onSubmitSpy}
      />,
      { props: { createHandler: onSubmitSpy } }
    );
    cy.get('#name').type(testNewEquipmentData?.name);

    cy.get('#model').type(testNewEquipmentData?.model);
    cy.get('#factory').type(testNewEquipmentData.factory);
    cy.get('#serialNumber').type(testNewEquipmentData?.serialNumber);
    cy.get('#productionYear').type(testNewEquipmentData?.productionYear);
    cy.get('#installationYear').type(testNewEquipmentData?.installationYear);
    cy.get('#terminologyCode').type(testNewEquipmentData?.terminologyCode);
    if (testNewEquipmentData.hasInstructions) {
      cy.get('#hasInstructions').click();
    }
    cy.get('#supportCompany').type(Main.args?.factories?.[0].label as string);
    cy.get('#supportTelephone1').type(testNewEquipmentData.supportTelephone1);
    cy.get('#supportTelephone2').type(testNewEquipmentData.supportTelephone2);
    cy.get('#submitButton').click({ force: true });
    cy.get('@onSubmitSpy').should('have.been.called');
    cy.get('@onSubmitSpy').should(
      'have.been.calledWith',
      testNewEquipmentData.name,
      testNewEquipmentData.model,
      testNewEquipmentData.factory,
      testNewEquipmentData.serialNumber,
      testNewEquipmentData.productionYear,
      testNewEquipmentData.installationYear,
      testNewEquipmentData.terminologyCode,
      testNewEquipmentData.hasInstructions,
      Main.args?.factories?.[0]?.id,
      testNewEquipmentData.supportTelephone1,
      testNewEquipmentData.supportTelephone2,
      testNewEquipmentData.edit
    );
  });
  it('calls the submite handler function with correct values with existing equipment', () => {
    const onSubmitSpy = cy.spy().as('onSubmitSpy');
    cy.mount(
      <NewEquipment
        loading={false}
        sending={false}
        factories={Main.args?.factories as any}
        createHandler={onSubmitSpy}
        existingEquipment={testNewEquipmentData}
      />,
      { props: { createHandler: onSubmitSpy } }
    );
    cy.get('#name').clear().type(testNewEquipmentData?.name);

    cy.get('#model').clear().type(testNewEquipmentData?.model);
    cy.get('#factory').clear().type(testNewEquipmentData.factory);
    cy.get('#serialNumber').clear().type(testNewEquipmentData?.serialNumber);
    cy.get('#productionYear')
      .clear()
      .type(testNewEquipmentData?.productionYear);
    cy.get('#installationYear')
      .clear()
      .type(testNewEquipmentData?.installationYear);
    cy.get('#terminologyCode')
      .clear()
      .type(testNewEquipmentData?.terminologyCode);
    if (testNewEquipmentData.hasInstructions) {
      cy.get('#hasInstructions').click();
    }
    cy.get('#supportCompany')
      .clear()
      .type(Main.args?.factories?.[0].label as string);
    cy.get('#supportTelephone1')
      .clear()
      .type(testNewEquipmentData.supportTelephone1);
    cy.get('#supportTelephone2')
      .clear()
      .type(testNewEquipmentData.supportTelephone2);
    cy.get('#submitButton').click({ force: true });
    cy.get('@onSubmitSpy').should('have.been.called');
    cy.get('@onSubmitSpy').should(
      'have.been.calledWith',
      testEditedEquipmentData.name,
      testEditedEquipmentData.model,
      testEditedEquipmentData.factory,
      testEditedEquipmentData.serialNumber,
      testEditedEquipmentData.productionYear,
      testEditedEquipmentData.installationYear,
      testEditedEquipmentData.terminologyCode,
      testEditedEquipmentData.hasInstructions,
      Main.args?.factories?.[0]?.id,
      testEditedEquipmentData.supportTelephone1,
      testEditedEquipmentData.supportTelephone2,
      testEditedEquipmentData.edit
    );
  });
});
