import { Selectors } from '../support/selectors';

describe('Tranquilo Matcha Checkout Functionality', () => {
    let searchTerms = [];

    beforeEach(() => {
        // Load fixture data before each test
        cy.fixture('testData').then((data) => {
            searchTerms = data.searchTerms; // Assign searchTerms inside the fixture callback
            cy.log('📂 Search terms loaded:', JSON.stringify(searchTerms));
        });

        // Visit homepage before each test
        cy.visit('/');
        cy.log('🏠 Visited homepage');

        // Handle cookie banner or other popups if necessary
        cy.handleCookiesAndPopups();
        cy.log('🍪 Handled cookies and popups if present');
    });

    it('should allow users to proceed to checkout', () => {
        searchTerms.forEach((term) => {
            cy.log(`🔍 Searching for term: ${term}`);

            // Search for the product using the search term
            cy.get(Selectors.popupModal, { timeout: 10000 })
                .type(`${term}{enter}`)
                .then(() => {
                    try {
                        cy.log('✅ Search term entered successfully');
                    } catch (error) {
                        cy.log('❌ Error occurred while entering the search term');
                        throw error; // Re-throw the error to fail the test
                    }
                });

            // Wait for search results and verify
            cy.get(Selectors.searchResultsList, { timeout: 20000 })
                .should('have.length.greaterThan', 0)
                .then(() => {
                    try {
                        cy.log('✅ Search results loaded successfully');
                    } catch (error) {
                        cy.log('❌ Failed to load search results');
                        throw error;
                    }
                });

            // Select the first product
            cy.get(Selectors.searchResultsList)
                .first()
                .click()
                .then(() => {
                    try {
                        cy.log('✅ Product clicked successfully');
                    } catch (error) {
                        cy.log('❌ Failed to click the product');
                        throw error;
                    }
                });

            // Add product to cart
            cy.get(Selectors.productAddToCartButton, { timeout: 12000 })
                .scrollIntoView()
                .should('be.visible')
                .click()
                .then(() => {
                    try {
                        cy.log('✅ Product added to the cart');
                    } catch (error) {
                        cy.log('❌ Error while adding product to the cart');
                        throw error;
                    }
                });

            // Verify that the "Added to Cart Notification" modal appears
            cy.get(Selectors.addedToCartModal, { timeout: 10000 })
                .should('be.visible')
                .then(() => {
                    try {
                        cy.log('✅ Added to Cart modal is visible');
                    } catch (error) {
                        cy.log('❌ Added to Cart modal did not appear');
                        throw error;
                    }
                });

            // Close the "Added to Cart Notification" modal
            cy.get(Selectors.closeAddedToCartModal, { timeout: 10000 })
                .should('be.visible')
                .click()
                .then(() => {
                    try {
                        cy.log('✅ Closed Added to Cart modal');
                    } catch (error) {
                        cy.log('❌ Failed to close Added to Cart modal');
                        throw error;
                    }
                });

            // Navigate to the cart
            cy.get(Selectors.cartIconBubble, { timeout: 10000 })
                .click()
                .then(() => {
                    try {
                        cy.log('✅ Navigated to the cart');
                    } catch (error) {
                        cy.log('❌ Failed to navigate to the cart');
                        throw error;
                    }
                });

            // Verify that the cart summary is visible
            cy.get(Selectors.cartSummary, { timeout: 10000 })
                .should('be.visible')
                .then(() => {
                    try {
                        cy.log('✅ Cart summary is visible');
                    } catch (error) {
                        cy.log('❌ Cart summary is not visible');
                        throw error;
                    }
                });

            // Scroll down to the cart footer
            cy.get(Selectors.cartFooter, { timeout: 10000 })
                .scrollIntoView()
                .then(() => {
                    try {
                        cy.log('✅ Scrolled to cart footer');
                    } catch (error) {
                        cy.log('❌ Failed to scroll to cart footer');
                        throw error;
                    }
                });

            // Proceed to checkout
            cy.get(Selectors.checkoutButton, { timeout: 10000 })
                .should('be.visible')
                .click()
                .then(() => {
                    try {
                        cy.log('✅ Proceeded to checkout');
                    } catch (error) {
                        cy.log('❌ Failed to proceed to checkout');
                        throw error;
                    }
                });

            // Assert that the checkout page is loaded
            cy.url()
                .should('include', '/checkout')
                .then(() => {
                    try {
                        cy.log('✅ Checkout page loaded successfully');
                    } catch (error) {
                        cy.log('❌ Checkout page did not load');
                        throw error;
                    }
                });

            // Verify that the checkout page elements are visible
            cy.get(Selectors.checkoutMain, { timeout: 10000 })
                .should('be.visible')
                .then(() => {
                    try {
                        cy.log('✅ Checkout main section is visible');
                    } catch (error) {
                        cy.log('❌ Checkout main section is not visible');
                        throw error;
                    }
                });

            cy.get(Selectors.payButton, { timeout: 10000 })
                .scrollIntoView()
                .should('be.visible')
                .then(() => {
                    try {
                        cy.log('✅ Payment button is visible');
                    } catch (error) {
                        cy.log('❌ Payment button is not visible');
                        throw error;
                    }
                });
        });

        cy.log('✅ Test completed successfully');
    });
});
