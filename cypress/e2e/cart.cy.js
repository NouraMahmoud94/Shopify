import { Selectors } from '../support/selectors';

describe('Tranquilo Matcha Cart Functionality', () => {
  // Set implicit timeout for all Cypress commands
  Cypress.config('defaultCommandTimeout', 10000);

  let searchTerms = []; // Declare searchTerms at the suite level

  beforeEach(() => {
    // Load fixture data before each test
    cy.fixture('testData').then((data) => {
      searchTerms = data.searchTerms;  // Assign searchTerms inside the fixture callback
    });

    // Visit homepage before each test
    cy.visit('/');
    // Check for and interact with the cookie banner if present
    cy.handleCookiesAndPopups();
  });

  it('should allow users to navigate to the cart', () => {
    cy.visit('/cart');
    cy.get(Selectors.cartItem, { timeout: 10000 })  // Explicit timeout for critical element
        .should('have.length', 0);
  });

  it('should allow users to add a product to the cart', () => {
    // Iterate over each search term from fixture data
    searchTerms.forEach((searchTerm) => {
      // Search for a product using the search modal
      cy.get(Selectors.popupModal, { timeout: 10000 })
          .type(`${searchTerm}{enter}`);

      // Select the first product from the search results dropdown
      cy.get(Selectors.searchResultsList, { timeout: 10000 })
          .first()
          .click();

      // Wait for the "Add to Cart" button to be visible and then click it
      cy.get(Selectors.productAddToCartButton, { timeout: 1000 })
          .scrollIntoView()
          .should('be.visible')
          .click();
    });
  });

  it('should display the Added to Cart notification', () => {
    // Iterate over each search term from fixture data
    searchTerms.forEach((searchTerm) => {
      cy.get(Selectors.popupModal, { timeout: 10000 })
          .type(`${searchTerm}{enter}`);

      cy.get(Selectors.searchResultsList, { timeout: 10000 })
          .first()
          .click();

      cy.get(Selectors.productAddToCartButton, { timeout: 15000 })
          .should('be.visible')
          .click();

      // Verify the "Added to Cart Notification" detail Popup
      cy.get(Selectors.addedToCartModal, { timeout: 15000 })
          .should('be.visible');


    });
  });

  it('should display the cart icon with added products', () => {
    // Iterate over each search term from fixture data
    searchTerms.forEach((searchTerm) => {
      cy.get(Selectors.popupModal, { timeout: 10000 })
          .type(`${searchTerm}{enter}`);

      cy.get(Selectors.searchResultsList, { timeout: 10000 })
          .first()
          .click();

      cy.get(Selectors.productAddToCartButton, { timeout: 10000 })
          .scrollIntoView()
          .should('be.visible')
          .click();

      // Wait for the cart count to update and assert it has increased
      cy.get(Selectors.cartIconBubble, { timeout: 10000 })
          .should('be.visible')  // Ensure the cart icon is visible
          .should('not.have.text', '0');
    });
  });

  it('should display the cart with added products', () => {
    // Iterate over each search term from fixture data
    searchTerms.forEach((searchTerm) => {
      cy.get(Selectors.popupModal, { timeout: 10000 })
          .type(`${searchTerm}{enter}`);

      cy.get(Selectors.searchResultsList, { timeout: 10000 })
          .last()
          .click();

      cy.get(Selectors.productAddToCartButton, { timeout: 10000 })
          .scrollIntoView()
          .should('be.visible')
          .click();

      // Wait for the "Add to Cart" button to be visible and then click it
      cy.get(Selectors.productAddToCartButton, { timeout: 10000 })
          .scrollIntoView()
          .should('be.visible')
          .click();

      // Wait for the cart count to update and assert it has increased
      cy.get(Selectors.cartIconBubble, { timeout: 10000 })
          .should('be.visible')  // Ensure the cart icon is visible
          .should('not.have.text', '0')
          .click();
    });
  });

});
