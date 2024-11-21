import { Selectors } from '../support/selectors';

describe('Tranquilo Matcha Search Functionality', () => {

    let searchTerms = [];

    beforeEach(() => {
        // Load fixture data before each test
        cy.fixture('testData').then((data) => {
            searchTerms = data.searchTerms; // Assign searchTerms inside the fixture callback
            cy.log('Search terms loaded:', JSON.stringify(searchTerms));
        });

        // Visit homepage before each test
        cy.visit('/');
        cy.log('🏠 Visited homepage');

        // Handle cookie banner or other popups if necessary
        cy.handleCookiesAndPopups();
        cy.log('🍪 Handled cookies and popups if present');
    });

    it('should display the search bar', () => {
        cy.get(Selectors.searchBar, { timeout: 10000 })
            .should('be.visible')
            .then(() => {
                try {
                    cy.log('✅ Search bar is visible');
                } catch (error) {
                    cy.log('❌ Failed to verify search bar visibility');
                    throw error;
                }
            });
        cy.pause(); // Pause here to inspect if the test is failing
    });

    it('should allow users to search for a product', () => {
        searchTerms.forEach((term) => {
            cy.get(Selectors.searchBar, { timeout: 10000 })
                .should('be.visible')
                .then(() => {
                    try {
                        cy.log(`✅ Search bar is visible for search term "${term}"`);
                    } catch (error) {
                        cy.log(`❌ Failed to check search bar for term "${term}"`);
                        throw error;
                    }
                });

            cy.get(Selectors.popupModal, { timeout: 50000 })
                .type(`${term}{enter}`, { delay: 200 })
                .then(() => {
                    try {
                        cy.log(`🔎 Searching for "${term}"`);
                    } catch (error) {
                        cy.log(`❌ Failed to log search for "${term}"`);
                        throw error;
                    }
                });

            cy.pause(); // Pause here to inspect the modal
        });
    });

    it('should display the list of search results', () => {
        searchTerms.forEach((term) => {
            cy.get(Selectors.searchBar, { timeout: 10000 })
                .should('be.visible');

            cy.get(Selectors.popupModal, { timeout: 50000 })
                .type(`${term}{enter}`);

            cy.get(Selectors.searchResultsList, { timeout: 20000 })
                .should('have.length.greaterThan', 0)
                .then((results) => {
                    try {
                        cy.log(`✅ Search results for "${term}" displayed, count: ${results.length}`);
                    } catch (error) {
                        cy.log(`❌ Failed to display search results for "${term}"`);
                        throw error;
                    }
                });
            cy.pause(); // Pause here to inspect the results
        });
    });

    it('should navigate to the product page', () => {
        searchTerms.forEach((term) => {
            cy.get(Selectors.searchBar, { timeout: 10000 })
                .should('be.visible');

            cy.get(Selectors.popupModal, { timeout: 50000 })
                .type(`${term}{enter}`);

            cy.get(Selectors.firstSearchResult, { timeout: 50000 })
                .should('be.visible', { timeout: 50000 })
                .click()
                .then(() => {
                    try {
                        cy.log(`✅ Clicked first search result for "${term}"`);
                    } catch (error) {
                        cy.log(`❌ Failed to click first search result for "${term}"`);
                        throw error;
                    }
                });

            cy.url()
                .should('include', '/products/')
                .then(() => {
                    try {
                        cy.log(`✅ Successfully navigated to product page for "${term}"`);
                    } catch (error) {
                        cy.log(`❌ Failed to navigate to product page for "${term}"`);
                        throw error;
                    }
                });
            cy.pause();
        });
    });
});
