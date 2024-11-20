import { Selectors } from '../support/selectors';

describe('Tranquilo Matcha Checkout Functionality', () => {
  // Set implicit timeout for all Cypress commands
  Cypress.config('defaultCommandTimeout', 10000);

  let searchTerms = []; // Declare searchTerms at the suite level

  beforeEach(() => {
    // Load fixture data before each test
    cy.fixture('testData').then((data) => {
      searchTerms = data.searchTerms;
    });

    // Visit homepage before each test
    cy.visit('/');
    // Check for and interact with the cookie banner if present
    cy.handleCookiesAndPopups();
  });


    it(`should allow users to proceed to checkout`, () => {

     // Search for the product using the search term from the fixture
      searchTerms.forEach((searchTerm) => {
        cy.get(Selectors.popupModal, { timeout: 10000 })
            .type(`${searchTerm}{enter}`);

      // Wait for search results to load and verify that results are present
      cy.get(Selectors.searchResultsList, { timeout: 20000 }) // Timeout for search results
          .should('have.length.greaterThan', 0); // Assert that results are shown

      // Select and click the first product from the search results
      cy.get(Selectors.searchResultsList)
          .first() // Get the first result
          .click(); // Click on the product link

      // Add the selected product to the cart
      cy.get(Selectors.productAddToCartButton, { timeout: 12000 }) // Timeout for the 'Add to Cart' button
          .scrollIntoView() // Smooth scroll into view for visibility
          .should('be.visible') // Ensure the button is visible
          .click(); // Click the 'Add to Cart' button

      // Verify that the "Added to Cart Notification" modal appears
      cy.get(Selectors.addedToCartModal, { timeout: 10000 }) // Timeout for the modal visibility
          .should('be.visible'); // Ensure the modal is visible

      // Close the "Added to Cart Notification" modal
      cy.get(Selectors.closeAddedToCartModal, { timeout: 10000 }) // Timeout for closing modal
          .should('be.visible') // Ensure the close button is visible
          .click(); // Close the modal

      // Navigate to the cart
      cy.get(Selectors.cartIconBubble, { timeout: 10000 }) // Timeout for the cart icon visibility
          .click(); // Click on the cart icon

      // Verify that the cart summary is visible
      cy.get(Selectors.cartSummary, { timeout: 10000 }) // Timeout for cart summary visibility
          .should('be.visible'); // Ensure cart summary is visible

      // Scroll down to the cart footer for a smoother user experience
      cy.get(Selectors.cartFooter, { timeout: 10000 }) // Timeout for cart footer visibility
          .scrollIntoView();

      // Proceed to checkout
      cy.get(Selectors.checkoutButton, { timeout: 10000 }) // Timeout for checkout button visibility
          .should('be.visible') // Ensure the checkout button is visible
          .click(); // Click the checkout button

      // Assert that the checkout page is loaded
      cy.url().should('include', '/checkout'); // Check if the checkout page URL is loaded

        // Assert that the checkout page is loaded
        cy.url().should('include', '/checkouts'); // Check if the checkout page URL is loaded

        // Verify that the checkout page elements are visible
        cy.get(Selectors.checkoutMain, { timeout: 10000 }).should('be.visible');
        cy.get(Selectors.payButton, { timeout: 10000 }) // Timeout for payment button visibility
            .scrollIntoView()
            .should('be.visible'); // Ensure the payment button is visible
    });
    });

 });


