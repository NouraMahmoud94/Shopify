Cypress.Commands.add('handleCookiesAndPopups', () => {
    // Handle cookie notification
    cy.get('#shopify-pc__banner__btn-accept', { timeout: 100000 })
        .should('be.visible')
        .click();
    cy.pause();
    // Check for Free Matcha Popup and remove it if it exists
    cy.get('body').then(($body) => {
        if ($body.find('#one-click-popup-13553372974531').length > 0) {
            cy.get('#one-click-popup-13553372974531',{ timeout: 100000 }).invoke('remove');
        } else {
            cy.log('No popup detected, proceeding...');
        }
        cy.pause();
    });
});
