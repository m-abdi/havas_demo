import { Main } from './NewPerson.stories';
import NewPerson from './NewPerson';
export const testNewPersonData = {
  id: '123456789123',
  firstNameAndLastName: 'مهدی عبدی',
  state: 'مرکزی',
  city: 'اراک',
  postalCode: '38196',
  address: 'اراک خیابان جنت',
  telephone: '34859666',
  mobileNumber: '09371246685',
  website: 'www.mehdiabdi.info',
};
describe('interaction test for NewPerson page', () => {
  it('calls the submite handler function with correct values', () => {
    const onSubmitSpy = cy.stub().as('onSubmitSpy');
    const onNewPlaceSpy = cy.stub().as('onNewPlaceSpy');
    cy.mount(
      <NewPerson
        loading={false}
        sending={false}
        roles={Main.args?.roles as any}
        places={Main.args?.places as any}
        allPlaces={Main.args?.allPlaces as any}
        createNewPersonHandler={onSubmitSpy}
        createNewPlaceHandler={onNewPlaceSpy}
      />,
      {
        props: {
          createNewPeronHandler: onSubmitSpy,
          createNewPlaceHandler: onNewPlaceSpy,
        },
      }
    );
    cy.get('#id', {timeout: 20000}).type(testNewPersonData.id);
    cy.get('#firstNameAndLastNameInput').type(
      testNewPersonData?.firstNameAndLastName
    );
    cy.get('#roleInput').type(Main?.args?.roles?.[2]?.label as string);
    cy.get('#placeInput').type(Main?.args?.places?.[2].label as string);
    cy.get('#stateInput').type(testNewPersonData?.state);
    cy.get('#cityInput').type(testNewPersonData?.city);
    cy.get('#postalCodeInput').type(testNewPersonData?.postalCode);
    cy.get('#addressInput').type(testNewPersonData?.address);
    cy.get('#telephoneInput').type(testNewPersonData?.telephone);
    cy.get('#mobileNumberInput').type(testNewPersonData.mobileNumber);
    cy.get('#websiteInput').type(testNewPersonData.website);
    cy.get('#submitButton').click({ force: true });
    cy.get('@onSubmitSpy').should('have.been.called');
    cy.get('@onSubmitSpy').should(
      'have.been.calledWith',
      testNewPersonData.id,
      testNewPersonData.firstNameAndLastName,
      Main?.args?.places?.[2].id,
      Main?.args?.roles?.[2].id,
      testNewPersonData?.state,
      testNewPersonData?.city,
      testNewPersonData?.postalCode,
      testNewPersonData?.address,
      testNewPersonData?.telephone,
      testNewPersonData?.mobileNumber,
      testNewPersonData?.website
    );
  });
});
