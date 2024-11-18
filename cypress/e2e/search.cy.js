describe('Tranquilo Matcha Search Functionality', () => {
  beforeEach(() => {
    cy.visit('https://tranquilomatcha.com');  // Store homepage
    cy.get('body').then(($body) => {
      if ($body.find('shopify-pc__banner').length > 0) {
        cy.log('Pop-up found. Closing the pop-up.');
        cy.get('shopify-pc__banner__btn-accept', { timeout: 10000 }).click();
      } else {
        cy.log('No pop-up found. Continuing with the test.');
      }
    });

  });

  it('should allow users to search for a product', () => {
    const searchTerm = 'matcha';

    // Search for a product
    cy.get('#shopify-section-sections--20638601380184__header > sticky-header > header > details-modal', { timeout: 10000 }).type(`${searchTerm}{enter}`);


    // Wait for the search bar to appear and interact with
    cy.get('#shopify-section-sections--20638601380184__header > sticky-header > header > details-modal', {timeout: 10000})
        .should('be.visible')
        .type(`${searchTerm}{enter}`);

    // Wait for search results and verify they contain the search term
    cy.get('#predictive-search-results-products-list', { timeout: 15000 })
        .should('have.length.greaterThan', 0);  // Verify there are search results


    // Wait for the dropdown to appear and ensure it contains items
    cy.get('#predictive-search-results-products-list')
        .first() // Select the first item
        .click(); // Click the first product in the dropdown

  });
});