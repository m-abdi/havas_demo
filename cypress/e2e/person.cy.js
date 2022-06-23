/// <reference types="cypress" />

const testNewPersonData = {
  id: '123456789123',
  firstNameAndLastName: 'مهدی عبدی',
  roleName: 'انباردار',
  placeName: "انبار",
  state: 'مرکزی',
  city: 'اراک',
  postalCode: '38196',
  address: 'اراک خیابان جنت',
  telephone: '34859666',
  mobileNumber: '09371246685',
  website: 'www.mehdiabdi.info',
};
before(() => {
  cy.task('deletePerson', testNewPersonData.id);
  cy.visit('/');
  cy.get('#id').type('0520926458');
  cy.get('#password').type('123456');
  cy.get("button[type='submit']").click();
  cy.get('h1', { timeout: 20000 }).contains('داشبورد', { timeout: 20000 });
});

describe('New Person page', () => {
  it('creates a new person and receives success notification and redirects to persons page', () => {
      
    cy.get('#persons-places').click();
    cy.get('#newPerson').click();
    cy.get('#id', {timeout: 10000}).type(testNewPersonData.id);
    cy.get('#firstNameAndLastNameInput').type(
      testNewPersonData?.firstNameAndLastName,
      { delay: 100 }
    );
    cy.get('#roleInput').type(testNewPersonData.roleName, {
      delay: 200,
    });
    cy.get('#placeInput').type(testNewPersonData.placeName, { deley: 200 });
    cy.get('#stateInput').type(testNewPersonData?.state);
    cy.get('#cityInput').type(testNewPersonData?.city);
    cy.get('#postalCodeInput').type(testNewPersonData?.postalCode);
    cy.get('#addressInput').type(testNewPersonData?.address);
    cy.get('#telephoneInput').type(testNewPersonData?.telephone);
    cy.get('#mobileNumberInput').type(testNewPersonData.mobileNumber);
    cy.get('#websiteInput').type(testNewPersonData.website);
    cy.get('#submitButton').click();
    cy.get('#notification').should('be.visible');
    cy.location('pathname').should('contain', '/users/persons');
    cy.task("checkPerson", {...testNewPersonData})
  });
});
