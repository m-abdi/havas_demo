// import { testNewEquipmentData } from '../../src/Screens/NewEquipment/NewEquipment.cy';
/// <reference types="cypress" />
const newAssetData = {
  tag: "23434234",
  equipmentName: 'استیلن ۴۰ لیتری',
  placeName: "پارس گستر",
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

describe('New tag creation', () => {
  before(() => {
    cy.task('deleteAsset', newAssetData?.tag);
    cy.task('createPlace', newAssetData?.placeName);
    cy.visit('/');
    cy.get('#id').type('0520926458');
    cy.get('#password').type('123456');
    cy.get("button[type='submit']").click();
    cy.get('h1', { timeout: 20000 }).contains('داشبورد', { timeout: 20000 });
  });
  it('creates a new asset', () => {
    cy.get('#tag').click();
    cy.get('#newTag').click();
    cy.get('#equipment', { timeout: 10000 }).type(newAssetData?.equipmentName);
    cy.task('sendToMQTTBroker', newAssetData?.tag);
    cy.get('#place').type(newAssetData?.placeName);
    cy.get('#submitButton').click();
    cy.get('#notification').should('be.visible');
    cy.location('pathname', { timeout: 20000 }).should(
      'contain',
      '/users/tags'
    );
    cy.task('checkAsset', { ...newAssetData });
  });
});



