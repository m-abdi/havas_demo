import { Main } from './NewAsset.stories';
import NewAsset from './NewAsset';
export const testNewAsset = {
  publicPropertyCode: 'ppp123',
  count: 3,
};
export const testEditAsset = {
  publicPropertyCode: 'eee123',
  id: '123123123',
};
describe('interaction test for NewEquipment page', () => {
  it('calls the submite handler function with correct values', () => {
    const onSubmitSpy = cy.spy().as('onSubmitSpy');
    cy.mount(
      <NewAsset
        loading={false}
        sending={false}
        places={Main.args?.places as any}
        equipments={Main.args?.equipments as any}
        createHandler={onSubmitSpy}
      />,
      { props: { createHandler: onSubmitSpy } }
    );
    cy.get('#equipment').type(Main.args?.equipments?.[0].label as string);
    // cy.get('#publicPropertyCode').type(testNewAsset?.publicPropertyCode);
    cy.get('#place').type(Main.args?.places?.[0].label as string, {
      force: true,
    });
    cy.get('#count')
      .clear({ force: true })
      .type(testNewAsset?.count.toString(), { force: true });
    cy.get('#submitButton').click({ force: true });
    cy.get('@onSubmitSpy').should('have.been.called');
    cy.get('@onSubmitSpy').should(
      'have.been.calledWith',
      Main.args?.equipments?.[0]?.id,
      Main.args?.places?.[0]?.id,
      testNewAsset?.count,
      ''
    );
  });
  it('calls the submite handler function with correct values with existing equipment', () => {
    const onSubmitSpy = cy.spy().as('onSubmitSpy');
    cy.mount(
      <NewAsset
        loading={false}
        sending={false}
        places={Main.args?.places as any}
        equipments={Main.args?.equipments as any}
        createHandler={onSubmitSpy}
        existingAsset={testEditAsset}
      />,
      { props: { createHandler: onSubmitSpy } }
    );
    cy.get('#equipment')
      .clear()
      .type(Main.args?.equipments?.[1].label as string);
    // cy.get('#publicPropertyCode')
    //   .clear()
    //   .type(testEditAsset?.publicPropertyCode);
    cy.get('#place')
      .clear()
      .type(Main.args?.places?.[1].label as string);
    cy.get('#submitButton').click({ force: true });
    cy.get('@onSubmitSpy').should('have.been.called');
    cy.get('@onSubmitSpy').should(
      'have.been.calledWith',
      Main.args?.equipments?.[1]?.id,
      Main.args?.places?.[1]?.id,
      1,
      testEditAsset.id
    );
  });
});
