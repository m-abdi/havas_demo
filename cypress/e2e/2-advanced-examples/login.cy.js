/// <reference types="cypress" />

describe("login", ()=>{
  it("login as a manager", ()=>{
    cy.visit("/")
    cy.get("#id").type("0520924682")
    cy.get("#password").type("123456")
    cy.get("button[type='submit']").click()
    cy.get('h1', { timeout: 20000 }).contains('داشبورد');
  })

  it('log out as a manager', () => {
    cy.get('#accountOptionsButton').click();
    cy.get('#logoutButton').click();
    cy.location('pathname').should('contain', '/users/login');
  });
})