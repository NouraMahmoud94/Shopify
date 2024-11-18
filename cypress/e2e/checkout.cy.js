describe('Tranquilo Matcha Checkout Functionality', () => {
  beforeEach(() => {
    cy.visit('https://tranquilomatcha.com');  // Store homepage

    // Handle pop-up if it appears
    cy.handlePopup();
  });

  it('should allow users to add a product to the cart', () => {
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

    // Assert that the product detail page has loaded
    cy.url().should('include', '/products/');

    // Wait for the "Add to Cart" button to be visible and click it
    cy.get('#ProductSubmitButton-template--20911156134232__main').scrollIntoView();
    cy.get('#ProductSubmitButton-template--20911156134232__main', { timeout: 10000 })  // Locator for Add to Cart button
        .should('be.visible')
        .click();

    // Wait for the cart count to update and assert it has increased
    cy.get('#cart-icon-bubble', { timeout: 10000 })  // Locator for cart count icon
        .should('be.visible')
        .should('not.have.text', '0');  // Ensure the cart count is updated

    // Go to the cart
    cy.get('#cart-icon-bubble', { timeout: 10000 }).click();

    // Wait for the cart page to load and ensure the cart summary is visible
    cy.get('#shopify-section-template--20638600823128__cart-items > cart-items', { timeout: 10000 })  // Locator for cart summary
        .should('be.visible');

    // Proceed to checkout
    cy.get('#checkout').scrollIntoView();
    cy.get('#checkout').click();

    // Assert that the checkout page is loaded
    cy.url().should('include', '/checkout');

    // Verify checkout elements are visible (e.g., shipping address, payment method)
    cy.get('˜#checkout-main', { timeout: 10000 }).should('be.visible');

  });
});
