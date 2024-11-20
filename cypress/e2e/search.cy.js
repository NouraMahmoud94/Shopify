import { Selectors } from '../support/selectors';

describe('Tranquilo Matcha Search Functionality', () => {
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

  it('should display the search bar', () => {
    cy.get(Selectors.searchBar, { timeout: 10000 }) // Reduced timeout as search bar is critical
        .should('be.visible');
  });

  it('should allow users to search for a product', () => {
    // Iterate through search terms from the fixture data
    searchTerms.forEach((term) => {
      // Search for each term
      cy.get(Selectors.searchBar, { timeout: 15000 })
          .should('be.visible')
          .type(`${term}{enter}`, { delay: 200 }); // Simulate user typing with delay
    });
  });

  it('should display the list of search results', () => {
    // Iterate through search terms from the fixture data
    searchTerms.forEach((term) => {
      cy.get(Selectors.searchBar, { timeout: 15000 })
          .should('be.visible')
          .type(`${term}{enter}`, { delay: 200 });

      // Wait for search results to load and verify results are displayed
      cy.get(Selectors.searchResultsList, { timeout: 20000 })
          .should('have.length.greaterThan', 0); // Assert results exist
    });
  });

  it('should navigate to the product page', () => {
    // Iterate through search terms from the fixture data
    searchTerms.forEach((term) => {
      cy.get(Selectors.searchBar, { timeout: 15000 })
          .should('be.visible')
          .type(`${term}{enter}`, { delay: 200 });

      // Click the first search result
      cy.get(Selectors.firstSearchResult, { timeout: 10000 })
          .should('be.visible') // Ensure the first result is visible
          .click();

      // Verify navigation to the product page
      cy.url().should('include', '/products/');
    });
  });
});
