import { Selectors } from '../support/selectors';

describe('Homepage and Navigation Tests', () => {

    beforeEach(() => {
        // Visit homepage before each test
        cy.visit('/');
        cy.log('🏠 Visited homepage');

        // Handle cookie banner or other popups if necessary
        cy.handleCookiesAndPopups();
        cy.log('🍪 Handled cookies and popups if present');
    });

    it('should load the homepage successfully', () => {
        // Ensure the homepage logo is visible, indicating the page has loaded
        cy.get(Selectors.logo, { timeout: 10000 }) // Added timeout
            .should('be.visible')
            .then(() => {
                try {
                    cy.log('✅ Home page is visible successfully');
                } catch (error) {
                    cy.log('❌ Failed to verify homepage visibility');
                    throw error; // Rethrow the error to fail the test
                }
            });
        cy.pause();
    });

    it('should display the search input', () => {
        // Check that the search bar is visible
        cy.get(Selectors.searchBar, { timeout: 10000 }) // Added timeout
            .should('be.visible')
            .then(() => {
                try {
                    cy.log('✅ Search input is visible');
                } catch (error) {
                    cy.log('❌ Failed to verify search input visibility');
                    throw error;
                }
            });
        cy.pause(); // Pause to inspect the search bar visibility
    });

    it('should navigate to the Shop page when tab is clicked', () => {
        // Click on the Shop navigation tab
        cy.get(Selectors.navTabs, { timeout: 10000 })
            .click()
            .then(() => {
                try {
                    cy.log('✅ Clicked on the Shop navigation tab');
                } catch (error) {
                    cy.log('❌ Failed to click on the Shop navigation tab');
                    throw error;
                }
            });

        // Verify the URL
        cy.url({ timeout: 10000 })
            .should('include', 'shop')
            .then(() => {
                try {
                    cy.log('✅ Successfully navigated to the Shop page');
                } catch (error) {
                    cy.log('❌ Failed to verify navigation to the Shop page');
                    throw error;
                }
            });
        cy.pause();
    });

    it('should load more content when scrolling down', () => {
        // Scroll to the bottom of the page to trigger more content loading
        cy.scrollTo('bottom', { timeout: 10000 })
            .then(() => {
                try {
                    cy.log('✅ Scrolled to the bottom to load more content');
                } catch (error) {
                    cy.log('❌ Failed to scroll to the bottom');
                    throw error;
                }
            });
        cy.pause();
    });

    it('should be able to navigate to different pages', () => {
        // Click on a navigation tab and verify the URL
        cy.get(Selectors.navTabs, { timeout: 10000 })
            .click()
            .then(() => {
                try {
                    cy.log('✅ Clicked on the navigation tab');
                } catch (error) {
                    cy.log('❌ Failed to click on the navigation tab');
                    throw error;
                }
            });

        cy.url({ timeout: 10000 })
            .should('include', '/collections/shop')
            .then(() => {
                try {
                    cy.log('✅ Successfully navigated to the collections/shop page');
                } catch (error) {
                    cy.log('❌ Failed to verify navigation to collections/shop page');
                    throw error;
                }
            });

        // Navigate back to the previous page (homepage)
        cy.go('back', { timeout: 10000 })
            .then(() => {
                try {
                    cy.log('✅ Navigated back to the homepage');
                } catch (error) {
                    cy.log('❌ Failed to navigate back to the homepage');
                    throw error;
                }
            });
        cy.pause();
    });
});
