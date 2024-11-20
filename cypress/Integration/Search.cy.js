import { Selectors } from '../support/selectors';

describe('Tranquilo Matcha Search Functionality', () => {
    // Set implicit timeout for all Cypress commands
    Cypress.config('defaultCommandTimeout', 10000);

    let searchTerms = []; // Declare searchTerms at the suite level

    beforeEach(() => {
        // Load fixture data before each test
        cy.fixture('testData').then((data) => {
            searchTerms = data.searchTerms; // Assign searchTerms inside the fixture callback
            cy.log('Search terms loaded:', JSON.stringify(searchTerms));
        });

        // Visit homepage before each test
        cy.visit('/');
        cy.log('Visited homepage');

        // Check for and interact with the cookie banner if present
        cy.handleCookiesAndPopups();
        cy.log('Handled cookies and popups if present');
    });

    it('should display the search bar', () => {
        cy.get(Selectors.searchBar, { timeout: 10000 })
            .should('be.visible')
            .then(() => {
                cy.log('✅ Search bar is visible');
            })
            .catch((error) => {
                cy.log('❌ Search bar is not visible:', error.message);
                throw error;
            });
    });

    it('should allow users to search for a product', () => {
        searchTerms.forEach((term) => {
            cy.get(Selectors.searchBar, { timeout: 15000 })
                .should('be.visible')
                .then(() => {
                    cy.log(`✅ Search bar is visible for search term "${term}"`);
                })
                .type(`${term}{enter}`, { delay: 200 })
                .then(() => {
                    cy.log(`✅ Search for "${term}" initiated`);
                })
                .catch((error) => {
                    cy.log(`❌ Failed to search for "${term}":`, error.message);
                    throw error;
                });
        });
    });

    it('should display the list of search results', () => {
        searchTerms.forEach((term) => {
            cy.get(Selectors.searchBar, { timeout: 15000 })
                .should('be.visible')
                .type(`${term}{enter}`, { delay: 200 });

            cy.get(Selectors.searchResultsList, { timeout: 20000 })
                .should('have.length.greaterThan', 0)
                .then((results) => {
                    cy.log(`✅ Search results for "${term}" displayed, count: ${results.length}`);
                })
                .catch((error) => {
                    cy.log(`❌ No search results displayed for "${term}":`, error.message);
                    throw error;
                });
        });
    });

    it('should navigate to the product page', () => {
        searchTerms.forEach((term) => {
            cy.get(Selectors.searchBar, { timeout: 15000 })
                .should('be.visible')
                .type(`${term}{enter}`, { delay: 200 });

            cy.get(Selectors.firstSearchResult, { timeout: 10000 })
                .should('be.visible')
                .click()
                .then(() => {
                    cy.log(`✅ Clicked first search result for "${term}"`);
                })
                .catch((error) => {
                    cy.log(`❌ Failed to click first search result for "${term}":`, error.message);
                    throw error;
                });

            cy.url()
                .should('include', '/products/')
                .then(() => {
                    cy.log(`✅ Successfully navigated to product page for "${term}"`);
                })
                .catch((error) => {
                    cy.log(`❌ Failed to navigate to product page for "${term}":`, error.message);
                    throw error;
                });
        });
    });
});
