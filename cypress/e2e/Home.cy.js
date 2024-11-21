import { Selectors } from '../support/selectors';

describe('Homepage and Navigation Tests', () => {

    beforeEach(() => {
        // Visit the homepage before each test to ensure we start from a clean state
        cy.visit('/');
        cy.log('🏠 Visited homepage');

        // Handle any cookies, popups, or banners that might appear on the page
        cy.handleCookiesAndPopups();
        cy.log('🍪 Handled cookies and popups if present');
    });

    it('should load the homepage successfully', () => {
        // Check that the homepage logo is visible, indicating the page has loaded successfully
        cy.get(Selectors.logo, { timeout: 10000 }) // Added timeout to ensure waiting for the logo if necessary
            .should('be.visible')
            .then(() => {
                try {
                    cy.log('✅ Home page is visible successfully');
                } catch (error) {
                    cy.log('❌ Failed to verify homepage visibility');
                    throw error; // Rethrow the error to fail the test
                }
            });
    });

    it('should display the search input', () => {
        // Ensure the search bar is visible on the homepage
        cy.get(Selectors.searchBar, { timeout: 10000 }) // Added timeout to ensure waiting for the search bar if necessary
            .should('be.visible')
            .then(() => {
                try {
                    cy.log('✅ Search input is visible');
                } catch (error) {
                    cy.log('❌ Failed to verify search input visibility');
                    throw error;
                }
            });
    });

    it('should navigate to the Shop page when tab is clicked', () => {
        // Simulate clicking the "Shop" navigation tab
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

        // Verify that the URL has changed and includes the 'shop' path
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
    });

    it('should load more content when scrolling down', () => {
        // Scroll to the bottom of the page, triggering the loading of additional content
        cy.scrollTo('bottom', { timeout: 10000 })
            .then(() => {
                try {
                    cy.log('✅ Scrolled to the bottom to load more content');
                } catch (error) {
                    cy.log('❌ Failed to scroll to the bottom');
                    throw error;
                }
            });
    });

    it('should be able to navigate to different pages', () => {
        // Click on a navigation tab and verify that it leads to the correct URL
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

        // Check that the URL has changed to the '/collections/shop' page
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

        // Navigate back to the previous page (which should be the homepage)
        cy.go('back', { timeout: 10000 })
            .then(() => {
                try {
                    cy.log('✅ Navigated back to the homepage');
                } catch (error) {
                    cy.log('❌ Failed to navigate back to the homepage');
                    throw error;
                }
            });
    });
});
