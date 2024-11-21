import { Selectors } from '../support/selectors';

describe('Tranquilo Matcha Checkout Functionality', () => {
    let searchTerms = [];

    beforeEach(() => {
        // Load fixture data before each test to get the search terms
        cy.fixture('testData').then((data) => {
            searchTerms = data.searchTerms; // Assign searchTerms from the fixture
            cy.log('📂 Search terms loaded:', JSON.stringify(searchTerms));
        });

        // Visit homepage before each test to ensure we start fresh
        cy.visit('/');
        cy.log('🏠 Visited homepage');

        // Handle any cookie banners or popups that might appear on the page
        cy.handleCookiesAndPopups();
        cy.log('🍪 Handled cookies and popups if present');
    });

    it('should allow users to proceed to checkout', () => {
        // For each search term, simulate the user journey to checkout
        searchTerms.forEach((term) => {
            cy.log(`🔍 Searching for term: ${term}`);

            // Step 1: Search for the product using the search term
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

            // Step 2: Wait for search results and verify they are loaded
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

            // Step 3: Click on the first product from the search results
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

            // Step 4: Add the product to the cart
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

            // Step 5: Verify that the "Added to Cart" modal appears
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

            // Step 6: Close the "Added to Cart" modal
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

            // Step 7: Navigate to the cart page
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

            // Step 8: Verify that the cart summary is visible
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

            // Step 9: Scroll down to the cart footer section
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

            // Step 10: Proceed to checkout
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

            // Step 11: Assert that the checkout page is loaded successfully
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

            // Step 12: Verify that checkout page elements are visible
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

        // Final log after all tests are executed
        cy.log('✅ Test completed successfully');
    });
});
