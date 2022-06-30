/// <reference types="cypress" />
const testNewPersonData = {
  id: '123456789123',
  firstNameAndLastName: 'مهدی عبدی تست انباردار ۱',
  roleName: 'انباردار',
  placeName: 'انبار',
  state: 'مرکزی',
  city: 'اراک',
  postalCode: '38196',
  address: 'اراک خیابان جنت',
  telephone: '34859666',
  mobileNumber: '09371246685',
  website: 'www.mehdiabdi.info',
};
const testEditedPersonData = {
  id: '789456123456',
  firstNameAndLastName: 'علی کریمی',
  roleName: 'انباردار',
  placeName: 'بیمارستان',
  state: 'هرمزگان',
  city: 'بندرعباس',
  postalCode: '۴۵۶۱۲۳',
  address: 'اراک خیابان نجت',
  telephone: '۷۸۹۴۵۶۱۴۷',
  mobileNumber: '۰۹۳۷۱۲۴۶۶۸۵',
  website: 'mehdiabdi.info',
};
const testNewPersonData2 = {
  id: '123456789123',
  firstNameAndLastName: 'مهدی عبدی تست رفتگر ۲',
  roleName: 'رفتگر',
  placeName: 'خدمات',
  typeOfWork: 'زمینه فعالیت مکان',
  category: 'بیمارستان',
  state: 'مرکزی',
  city: 'اراک',
  postalCode: '38196',
  address: 'اراک خیابان جنت',
  telephone: '34859666',
  mobileNumber: '09371246685',
  website: 'www.mehdiabdi.info',
  nationalId: 'کد ملی مکان',
  economicalCode: 'کد اقتصادی مکان',
  registeredNumber: 'شماره ثبت مکان',
  description: 'توضیحات مکان',
};

describe('New Person page', () => {
  beforeEach(() => {
    cy.task('deletePersonAndPlace', {
      personId: testNewPersonData.id,
      placeName: testNewPersonData2.placeName,
    });
    cy.visit('/');
    cy.get('#id').type('0520926458');
    cy.get('#password').type('123456');
    cy.get("button[type='submit']").click();
    cy.get('h1', { timeout: 20000 }).contains('داشبورد', { timeout: 20000 });
  });

  it('creates a new person with known place and receives success notification and redirects to persons page', () => {
    cy.get('#persons-places').click();
    cy.get('#newPerson').click();
    cy.get('#id', { timeout: 10000 }).type(testNewPersonData.id);
    cy.get('#firstNameAndLastNameInput').type(
      testNewPersonData?.firstNameAndLastName,

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
    cy.location('pathname', {timeout: 20000}).should('contain', '/users/persons');
    cy.task('checkPerson', { ...testNewPersonData });
  });
  it('creates a new person and place and receives success notification and redirects to persons page', () => {
    cy.get('#persons-places').click();
    cy.get('#newPerson').click();
    cy.get('#id', { timeout: 10000 }).type(testNewPersonData2.id);
    cy.get('#firstNameAndLastNameInput').type(
      testNewPersonData2?.firstNameAndLastName,
    
    );

    cy.get('#roleInput').type(testNewPersonData2.roleName, {
      delay: 200,
    });
    //
    cy.get('#createPlaceButton').click();
    cy.get('#name').type(testNewPersonData2.placeName);
    cy.get('#representative')
      .invoke('val')
      .should('eq', testNewPersonData2.firstNameAndLastName);
    cy.get('#representativeRole')
      .invoke('val')
      .should('eq', testNewPersonData2.roleName);
    cy.get('#typeOfWork').type(testNewPersonData2.typeOfWork);

    cy.get(`#e0baa2f2-054b-4b28-a9cf-37f884da041b`).click();
    cy.get('#state').type(testNewPersonData2?.state);
    cy.get('#city').type(testNewPersonData2?.city);
    cy.get('#postalCode').type(testNewPersonData2?.postalCode);
    cy.get('#address').type(testNewPersonData2?.address);
    cy.get('#telephone').type(testNewPersonData2?.telephone);
    cy.get('#mobileNumber').type(testNewPersonData2.mobileNumber);
    cy.get('#website').type(testNewPersonData2.website);
    cy.get('#nationalId').type(testNewPersonData2.nationalId);
    cy.get('#economicalCode').type(testNewPersonData2.economicalCode);
    cy.get('#registeredNumber').type(testNewPersonData2.registeredNumber);
    cy.get('#description').type(testNewPersonData2.description);
    cy.get('#newPlaceSubmitButton').click();
    //
    cy.get('#stateInput').type(testNewPersonData2?.state);
    cy.get('#cityInput').type(testNewPersonData2?.city);
    cy.get('#postalCodeInput').type(testNewPersonData2?.postalCode);
    cy.get('#addressInput').type(testNewPersonData2?.address);
    cy.get('#telephoneInput').type(testNewPersonData2?.telephone);
    cy.get('#mobileNumberInput').type(testNewPersonData2.mobileNumber);
    cy.get('#websiteInput').type(testNewPersonData2.website);
    cy.get('#submitButton').click();
    cy.get('#notification').should('be.visible');
    cy.location('pathname', { timeout: 20000 }).should(
      'contain',
      '/users/persons',
      { timeout: 20000 }
    );
    cy.task('checkPerson', testNewPersonData2 );
  });
});

describe('persons table', () => {
  before('check existence of person to edit', () => {
    cy.task('checkPerson', { ...testNewPersonData2 });
    cy.visit('/');
    cy.get('#id').type('0520926458');
    cy.get('#password').type('123456');
    cy.get("button[type='submit']").click();
    cy.get('h1', { timeout: 20000 }).contains('داشبورد', { timeout: 20000 });
  }),
    it('edit a person info', () => {
      cy.get('#persons-places').click();
      cy.get('#persons').click();
      cy.get(`#${testNewPersonData2.id + '-options'}`, {
        timeout: 20000,
      }).click();
      cy.get(`#${testNewPersonData2.id + '-edit'}`, {
        timeout: 20000,
      }).click();
      cy.get('#id', { timeout: 10000 }).clear().type(testEditedPersonData.id);
      cy.get('#firstNameAndLastNameInput')
        .clear()
        .type(testEditedPersonData?.firstNameAndLastName);
      cy.get('#roleInput').type(testEditedPersonData.roleName, {
        delay: 400,
      });
      cy.get('#placeInput').type(testEditedPersonData.placeName, {
        deley: 400,
      });
      cy.get('#stateInput')
        .clear({ timeout: 3000 })
        .type(testEditedPersonData?.state);
      cy.get('#cityInput').clear({timeout: 3000}).type(testEditedPersonData?.city);
      cy.get('#postalCodeInput').clear({timeout: 3000}).type(testEditedPersonData?.postalCode);
      cy.get('#addressInput')
        .clear({ timeout: 3000 })
        .type(testEditedPersonData?.address);
      cy.get('#telephoneInput').clear({timeout: 3000}).type(testEditedPersonData?.telephone);
      cy.get('#mobileNumberInput')
        .clear()
        .type(testEditedPersonData.mobileNumber);
      cy.get('#websiteInput').clear().type(testEditedPersonData.website);
      cy.get('#submitButton').click();
      cy.get('#notification').should('be.visible');
      cy.location('pathname', { timeout: 20000 }).should(
        'contain',
        '/users/persons'
      );
      cy.task('checkPerson', { ...testEditedPersonData });
    });
    after("delete edited person", ()=>{
         cy.task('deletePersonAndPlace', {
           personId: testEditedPersonData.id,
           placeName: "testNewPersonData2.placeName",
         });
    })
});
