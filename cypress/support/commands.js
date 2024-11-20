// cypress/support/commands.ts
Cypress.Commands.add('handleCookiesAndPopups', () => {
    // Handle cookie notification
    cy.get('#shopify-pc__banner__btn-accept').should('be.visible').click();

    // Handle  Free Matcha Popup
    cy.get('#one-click-popup-13553372974531')
        .invoke('remove');

});

