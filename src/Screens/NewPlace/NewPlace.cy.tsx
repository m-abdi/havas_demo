import { Main } from './NewPlace.stories';
import NewPlace from './NewPlace';
export const testNewPlaceData = {
  name: 'یک مکان جدید',
  typeOfWork: 'مگس پراکنی',
  state: 'مرکزی',
  city: 'اراک',
  postalCode: '۷۸۹',
  address: 'اراک اراک',
  telephone: '۰۹۳۷۱۲۴۶۶۸۵',
  mobileNumber: '۰۹۳۷۱۲۴۶۶۸۵',
  website: 'mehdiabdi.info',
  nationalId: '789456',
  economicalCode: '123456',
  registeredNumber: '456963',
  description: 'توضیحات مکان',
  edit: '',
};
describe('interaction test for NewPerson page', () => {
  it('calls the submite handler function with correct values', () => {
    const onSubmitSpy = cy.spy().as('onSubmitSpy');
    cy.mount(
      <NewPlace
        sending={false}
        persons={Main.args?.persons as any}
        places={Main.args?.places as any}
        createNewPlaceHandler={onSubmitSpy}
      />,
      { props: { createNewPeronHandler: onSubmitSpy } }
    );
    cy.get('#name').type(testNewPlaceData.name);

    cy.get('#representative').type(Main?.args?.persons?.[0]?.label as string);
    cy.get('#representativeRole')
      .invoke('val')
      .should('eq', Main?.args?.persons?.[0]?.role?.name as string);
    cy.get('#typeOfWork').type(testNewPlaceData?.typeOfWork, { force: true });
    const placeCategoryId = Main.args?.places?.find(
      (p) => p.subset.length === 0
    )?.id;
    cy.get(`#${placeCategoryId}`).click();
    cy.get('#state').type(testNewPlaceData?.state);
    cy.get('#city').type(testNewPlaceData?.city);
    cy.get('#postalCode').type(testNewPlaceData?.postalCode);
    cy.get('#address').type(testNewPlaceData?.address);
    cy.get('#telephone').type(testNewPlaceData?.telephone);
    cy.get('#mobileNumber').type(testNewPlaceData.mobileNumber);
    cy.get('#website').type(testNewPlaceData.website);
    cy.get('#nationalId').type(testNewPlaceData.nationalId);
    cy.get('#economicalCode').type(testNewPlaceData.economicalCode);
    cy.get('#registeredNumber').type(testNewPlaceData.registeredNumber);
    cy.get('#description').type(testNewPlaceData.description);
    cy.get('#submitButton').click({ force: true });
    cy.get('@onSubmitSpy').should('have.been.called');
    cy.get('@onSubmitSpy').should(
      'have.been.calledWith',
      testNewPlaceData.name,
      placeCategoryId,
      Main?.args?.persons?.[0]?.id,
      testNewPlaceData.typeOfWork,
      testNewPlaceData.state,
      testNewPlaceData.city,
      testNewPlaceData.postalCode,
      testNewPlaceData.address,
      testNewPlaceData.telephone,
      testNewPlaceData.mobileNumber,
      testNewPlaceData.website,
      testNewPlaceData.nationalId,
      testNewPlaceData.economicalCode,
      testNewPlaceData.registeredNumber,
      testNewPlaceData.description,
      testNewPlaceData.edit
    );
  });
});
