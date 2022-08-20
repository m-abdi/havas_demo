/// <reference types="cypress" />
const newExitWorkflowData = {
  havalehId: 'شماره حواله تست',
  date: Date.now(),
  corporation: 'نام کارخانه',
  corporationRepresentativeId: 'آی دی نماینده شرکت',
  corporationRepresentativeName: 'نام نماینده شرکت',
  deliverer: 'مهدی عبدی',
  description: 'توضیحات',
  transportationName: 'نام ترابری',
  transportationTelephone: '123456',
  transportationTelephone2: '123456',
  assets: {
    oxygen_50l_factory: 1,
    oxygen_50l: 1,
  },
};
const newExitWorkflowData2 = {
  havalehId: '2شماره حواله تست',
  date: Date.now(),
  corporation: 'نام کارخانه',
  corporationRepresentativeId: 'آی دی نماینده شرکت',
  corporationRepresentativeName: 'نام نماینده شرکت',
  deliverer: 'مهدی عبدی',
  description: 'توضیحات',
  transportationName: 'نام ترابری',
  transportationTelephone: '123456',
  transportationTelephone2: '123456',
  assets: {
    oxygen_50l_factory: 1,
    oxygen_50l: 1,
  },
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
  telephone: '987989165',
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

describe('New Exit Asset Workflow', () => {
  beforeEach(() => {
    cy.task('createPlace', newExitWorkflowData?.corporation);
    cy.visit('/');
    cy.get('#id').type('0520926458');
    cy.get('#password').type('123456');
    cy.get("button[type='submit']").click();
    cy.get('h1', { timeout: 20000 }).contains('داشبورد', { timeout: 20000 });
  });

  it('creates a new exit workflow without automatic manager approval', () => {
    cy.task('changeConfig', false);
    cy.visit('/users/newExitHospital');
    cy.get('#warehouseKeeper', { timeout: 20000 });
    cy.get('#corporation', { timeout: 20000 });
    cy.wait(4000);
    cy.get('#havalehId', { timeout: 20000 }).type(
      newExitWorkflowData?.havalehId
    );
    cy.get('#corporation').type(newExitWorkflowData?.corporation);
    cy.get('#description', { timeout: 4000 }).type(
      newExitWorkflowData?.description
    );
    cy.get('#transportationName').type(newExitWorkflowData?.transportationName);
    cy.get('#transportationTelephone').type(
      newExitWorkflowData?.transportationTelephone
    );
    cy.get('#transportationTelephone2').type(
      newExitWorkflowData?.transportationTelephone2
    );
    cy.get('#oxygen_50l_factory').type(
      newExitWorkflowData?.assets?.oxygen_50l_factory
    );

    cy.get('#submitButton').click();
    cy.get('#notification').should('be.visible');
    cy.wait(4000);

    cy.location('pathname', { timeout: 20000 }).should(
      'include',
      '/users/assetExitWorkflowsTables'
    );
    cy.task('checkWorkflow', {
      ...newExitWorkflowData,
      instanceOfProcessId: 2,
      nextStageName: 'قبول درخواست توسط مدیریت',
    });
  });
  it('creates a new exit workflow with automatic manager approval', () => {
    cy.task('changeConfig', true);
    cy.visit('/users/newExitHospital');
    cy.get('#warehouseKeeper', { timeout: 20000 });
    cy.get('#corporation', { timeout: 20000 });
    cy.wait(4000);
    cy.get('#havalehId', { timeout: 20000 }).type(
      newExitWorkflowData2?.havalehId
    );
    cy.get('#corporation').type(newExitWorkflowData2?.corporation);
    cy.get('#description', { timeout: 4000 }).type(
      newExitWorkflowData2?.description
    );
    cy.get('#transportationName').type(
      newExitWorkflowData2?.transportationName
    );
    cy.get('#transportationTelephone').type(
      newExitWorkflowData2?.transportationTelephone
    );
    cy.get('#transportationTelephone2').type(
      newExitWorkflowData2?.transportationTelephone2
    );
    cy.get('#oxygen_50l_factory').type(
      newExitWorkflowData2?.assets?.oxygen_50l_factory
    );
    cy.get('#submitButton').click();
    cy.get('#notification').should('be.visible');
    cy.wait(4000);

    cy.location('pathname', { timeout: 20000 }).should(
      'include',
      '/users/exitWarehouseRFID'
    );
    cy.task('checkWorkflow', {
      ...newExitWorkflowData2,
      instanceOfProcessId: 2,
      nextStageName: 'RFID ثبت خروج کپسول از انبار توسط',
    });
  });
});

describe('Exit Workflows table', () => {
  beforeEach(() => {
    cy.task('createPlace', newExitWorkflowData?.corporation);
    cy.visit('/');
    cy.get('#id').type('0520926458');
    cy.get('#password').type('123456');
    cy.get("button[type='submit']").click();
    cy.get('h1', { timeout: 20000 }).contains('داشبورد', { timeout: 20000 });
  });

  it('approve exit workflow', () => {
    cy.task('checkWorkflow', {
      ...newExitWorkflowData,
      instanceOfProcessId: 2,
      nextStageName: 'قبول درخواست توسط مدیریت',
    }).then((w) => {
      cy.get('#licences').click();
      cy.get('#exitWorkflows').click();
      cy.get(`#${w?.workflowNumber}-options`, { timeout: 20000 }).click();
      cy.get('#approveWorkflow').click();
      cy.get('#yes').click();
      cy.task('checkWorkflow', {
        ...newExitWorkflowData,
        instanceOfProcessId: 2,
        nextStageName: 'RFID ثبت خروج کپسول از انبار توسط',
      });
    });
  });
  it('confirm exit workflow with RFID', () => {
    cy.task('checkWorkflow', {
      ...newExitWorkflowData2,
      instanceOfProcessId: 2,
      nextStageName: 'RFID ثبت خروج کپسول از انبار توسط',
    }).then((w) => {
      cy.get('#licences').click();
      cy.get('#exitWorkflows').click();
      cy.get('#منتظر ثبت توسط RFID', { timeout: 20000 }).click();
      cy.get(`#${w?.workflowNumber}-options`, { timeout: 20000 }).click();
      cy.wait(4000);
      cy.location('pathname', { timeout: 20000 }).should(
        'include',
        '/users/exitWarehouseRFID'
      );
    });
  });
});

after(() => {
  cy.task('checkWorkflow', {
    ...newExitWorkflowData,
    instanceOfProcessId: 2,
  }).then((w) => {
    console.log(w);
    cy.task('deleteWorkflow', w?.workflowNumber);
  });
  cy.task('checkWorkflow', {
    ...newExitWorkflowData2,
    instanceOfProcessId: 2,
  }).then((w) => {
    console.log(w);
    cy.task('deleteWorkflow', w?.workflowNumber);
  });
});
