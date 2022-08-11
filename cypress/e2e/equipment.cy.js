// import { testNewEquipmentData } from '../../src/Screens/NewEquipment/NewEquipment.cy';
/// <reference types="cypress" />
const testNewEquipmentData = {
  name: 'نام تجهیز',
  model: 'مدل تجهیز',
  factory: 'نام کارخانه سازنده',
  serialNumber: 'شماره سریال',
  productionYear: 'سال تولید',
  installationYear: 'سال نصب و راه اندازی',
  terminologyCode: '123123123',
  hasInstructions: true,
  supportCompany: 'پارس گستر',
  supportTelephone1: 'تلفن پشتیبانی',
  supportTelephone2: 'تلفن پشتیبانی ۲',
  edit: '',
};
const testEditedEquipmentData = {
  name: 'نام تجهیز ویرایش شده',
  model: 'مدل تجهیز ویرایش شده',
  factory: 'نام کارخانه سازنده ویرایش شده',
  serialNumber: 'شماره سریال ویرایش شده',
  productionYear: 'سال تولید ویرایش شده',
  installationYear: 'سال نصب و راه اندازی ویرایش شده',
  terminologyCode: '123123123',
  hasInstructions: false,
  supportCompany: 'بیتا',
  supportTelephone1: 'تلفن پشتیبانی ویرایش شده',
  supportTelephone2: 'تلفن پشتیبانی ۲ ویرایش شده',
  edit: '000000',
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

describe('New equipment creation', () => {
  before(() => {
    cy.task('deleteEquipment', testNewEquipmentData.terminologyCode);
    cy.task('createPlace', testNewEquipmentData?.supportCompany);
    cy.visit('/');
    cy.get('#id').type('0520926458');
    cy.get('#password').type('123456');
    cy.get("button[type='submit']").click();
    cy.get('h1', { timeout: 20000 }).contains('داشبورد', { timeout: 20000 });
  });
  it('creates a new equipment and redirects to equipments page', () => {
    cy.get('#equipments-assets').click();
    cy.get('#newEquipment').click();
    cy.get('#name', { timeout: 10000 }).type(testNewEquipmentData?.name);
    cy.get('#model').type(testNewEquipmentData?.model);
    cy.get('#factory').type(testNewEquipmentData?.factory);
    cy.get('#serialNumber').type(testNewEquipmentData.serialNumber);
    cy.get('#productionYear').type(testNewEquipmentData?.productionYear);
    cy.get('#installationYear').type(testNewEquipmentData?.installationYear);
    cy.get('#terminologyCode').type(testNewEquipmentData?.terminologyCode);
    if (testNewEquipmentData?.hasInstructions) {
      cy.get('#hasInstructions').click();
    }
    cy.get('#supportCompany').type(testNewEquipmentData?.supportCompany);
    cy.get('#supportTelephone1').type(testNewEquipmentData.supportTelephone1);
    cy.get('#supportTelephone2').type(testNewEquipmentData.supportTelephone2);
    cy.get('#submitButton').click();
    cy.get('#notification').should('be.visible');
    cy.location('pathname', { timeout: 20000 }).should(
      'contain',
      '/users/equipments'
    );
    cy.task('checkEquipment', { ...testNewEquipmentData });
  });
});

describe('equipments table', () => {
  before('check existence of euipment to edit', () => {
    cy.task('checkEquipment', { ...testNewEquipmentData });
    cy.task('createPlace', testEditedEquipmentData?.supportCompany);
    cy.visit('/');
    cy.get('#id').type('0520926458');
    cy.get('#password').type('123456');
    cy.get("button[type='submit']").click();
    cy.get('h1', { timeout: 20000 }).contains('داشبورد', { timeout: 20000 });
  }),
    //     id('shows equipments correctly in the table', () => {
    //       cy.visit('/users/equipments');
    //       const allEquipments = cy.task('getAllEquipments');
    //       const rowsInPage = cy.get("div[role='row']");
    //       rowsInPage.each((e) => {
    //         if (!allEquipments.find(
    //           (ee) => ee === e.get('div:nth-child(3)').textContent
    //         )) {

    //         }
    //       });
    //     });
    it('edits an equipment', () => {
      cy.get('#equipments-assets').click();
      cy.get('#equipments').click();
      cy.get(`#${testNewEquipmentData?.terminologyCode}-options`, {
        timeout: 20000,
      }).click();
      cy.get(`#${testNewEquipmentData?.terminologyCode}-edit`, {
        timeout: 20000,
      }).click();

      cy.get('#name', { timeout: 10000 })
        .clear()
        .type(testEditedEquipmentData.name);
      cy.get('#model').clear().type(testEditedEquipmentData?.model);
      cy.get('#factory').clear().type(testEditedEquipmentData?.factory);
      cy.get('#serialNumber')
        .clear()
        .type(testEditedEquipmentData.serialNumber);
      cy.get('#productionYear')
        .clear()
        .type(testEditedEquipmentData?.productionYear);
      cy.get('#installationYear')
        .clear()
        .type(testEditedEquipmentData?.installationYear);

      if (
        testNewEquipmentData?.hasInstructions !==
        testEditedEquipmentData?.hasInstructions
      ) {
        cy.get('#hasInstructions').click();
      }
      cy.get('#supportCompany')
        .clear()
        .type(testEditedEquipmentData?.supportCompany);
      cy.get('#supportTelephone1')
        .clear()
        .type(testEditedEquipmentData.supportTelephone1);
      cy.get('#supportTelephone2')
        .clear()
        .type(testEditedEquipmentData.supportTelephone2);
      cy.get('#submitButton').click();
      cy.get('#notification').should('be.visible');
      cy.location('pathname', { timeout: 20000 }).should(
        'contain',
        '/users/equipments'
      );
      cy.task('checkEquipment', { ...testEditedEquipmentData });
    });

});

after('clean db', () => {
  cy.task('deleteEquipment', testEditedEquipmentData.terminologyCode);
});
