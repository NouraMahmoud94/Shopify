// Custom Command to handle pop-up if it appears
Cypress.Commands.add('handlePopup', () => {
    cy.get('body').then(($body) => {
        if ($body.find('shopify-pc__banner').length > 0) {
            cy.log('Pop-up found. Closing the pop-up.');
            cy.get('shopify-pc__banner__btn-accept', { timeout: 10000 }).click();
        } else {
            cy.log('No pop-up found. Continuing with the test.');
        }
    });
});
//Custom Command to handle Sign-up if it appears
Cypress.Commands.add('modalSignup', () => {
    cy.get('body').then(($body) => {
        if ($body.find('.modal-signup').length > 0) { // Adjust with the actual class for pop-up
            //  cy.log('Pop-up found. Closing the pop-up.');
            cy.get('.modal-signup.close-btn', { timeout: 6000 }).click(); // Adjust the close button's selector
        } else {
            cy.log('No Sign-up found. Continuing with the test.');
        }
    });
});
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })