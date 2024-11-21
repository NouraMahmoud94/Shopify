import { Selectors } from '../support/selectors';

describe('Tranquilo Matcha Search Functionality', () => {

    let searchTerms = [];

    beforeEach(() => {
        // Load fixture data before each test, which contains search terms for testing
        cy.fixture('testData').then((data) => {
            searchTerms = data.searchTerms; // Assign searchTerms inside the fixture callback
            cy.log('Search terms loaded:', JSON.stringify(searchTerms));
        });

        // Visit homepage before each test to start from a clean state
        cy.visit('/');
        cy.log('🏠 Visited homepage');

        // Handle any cookies, popups, or banners that might appear on the page
        cy.handleCookiesAndPopups();
        cy.log('🍪 Handled cookies and popups if present');
    });

    it('should display the search bar', () => {
        // Ensure that the search bar is visible on the homepage
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
    });

    it('should allow users to search for a product', () => {
        // For each search term, check if the search bar is visible and perform the search
        searchTerms.forEach((term) => {
            // Ensure that the search bar is visible for the current search term
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

            // Type the search term in the popup modal and simulate pressing Enter
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
        });
    });

    it('should display the list of search results', () => {
        // For each search term, ensure that search results are displayed after typing the term
        searchTerms.forEach((term) => {
            // Ensure the search bar is visible before starting the search
            cy.get(Selectors.searchBar, { timeout: 10000 })
                .should('be.visible');

            // Type the search term in the popup modal and trigger the search
            cy.get(Selectors.popupModal, { timeout: 50000 })
                .type(`${term}{enter}`);

            // Verify that search results are displayed and the results list is not empty
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
        });
    });

    it('should navigate to the product page', () => {
        // For each search term, click the first search result and navigate to the product page
        searchTerms.forEach((term) => {
            // Ensure the search bar is visible before starting the search
            cy.get(Selectors.searchBar, { timeout: 10000 })
                .should('be.visible');

            // Type the search term in the popup modal and trigger the search
            cy.get(Selectors.popupModal, { timeout: 50000 })
                .type(`${term}{enter}`);

            // Click on the first search result from the list
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

            // Verify that the URL has changed to the product page
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
        });
    });
});
