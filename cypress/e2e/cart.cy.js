import { Selectors } from '../support/selectors';

describe('Tranquilo Matcha Cart Functionality', () => {
    let searchTerms = []; // Declare searchTerms at the suite level

    beforeEach(() => {
        // Load fixture data before each test
        cy.fixture('testData').then((data) => {
            searchTerms = data.searchTerms;
            cy.log('Search terms loaded:', JSON.stringify(searchTerms));
        });

        // Visit homepage before each test
        cy.visit('/');
        cy.log('🏠 Visited homepage');

        // Handle cookie banner or other popups if necessary
        cy.handleCookiesAndPopups();
        cy.log('🍪 Handled cookies and popups if present');
    });

    it('should allow users to navigate to the cart', () => {
        cy.visit('/cart');
        cy.get(Selectors.cartItem, { timeout: 10000 })
            .should('have.length', 0)
            .then(() => {
                try {
                    cy.log('✅ Cart is empty on the first visit');
                } catch (error) {
                    cy.log('❌ Failed to check if cart is empty');
                    throw error; // Rethrow error to fail the test
                }
            });
        cy.pause();
    });

    it('should allow users to add a product to the cart', () => {
        cy.get(Selectors.searchBar, { timeout: 10000 })
            .should('be.visible');

        // Iterate over each search term from fixture data
        searchTerms.forEach((searchTerms) => {
            cy.get(Selectors.popupModal, { timeout: 10000 })
                .type(`${searchTerms}{enter}`);
            cy.log(`Searched for product: ${searchTerms}`);

            cy.get(Selectors.searchResultsList, { timeout: 10000 })
                .first()
                .click()
                .then(() => {
                    try {
                        cy.log('✅ Selected the first product from search results');
                    } catch (error) {
                        cy.log('❌ Failed to select product');
                        throw error;
                    }
                });

            cy.get(Selectors.productAddToCartButton, { timeout: 10000 })
                .should('be.visible')
                .click()
                .then(() => {
                    try {
                        cy.log('✅ Product added to cart');
                    } catch (error) {
                        cy.log('❌ Failed to add product to cart');
                        throw error;
                    }
                });
        });
        cy.pause();
    });

    it('should display the Added to Cart notification', () => {
        cy.get(Selectors.searchBar, { timeout: 10000 })
            .should('be.visible');

        // Iterate over each search term from fixture data
        searchTerms.forEach((searchTerms) => {
            cy.get(Selectors.popupModal, { timeout: 10000 })
                .type(`${searchTerms}{enter}`);
            cy.log(`Searched for product: ${searchTerms}`);

            cy.get(Selectors.searchResultsList, { timeout: 10000 })
                .first()
                .click()
                .then(() => {
                    try {
                        cy.log('✅ Selected the first product from search results');
                    } catch (error) {
                        cy.log('❌ Failed to select product');
                        throw error;
                    }
                });

            cy.get(Selectors.productAddToCartButton, { timeout: 10000 })
                .should('be.visible')
                .click()
                .then(() => {
                    try {
                        cy.log('✅ Product added to cart');
                    } catch (error) {
                        cy.log('❌ Failed to add product to cart');
                        throw error;
                    }
                });

            // Verify the "Added to Cart Notification" detail Popup
            cy.get(Selectors.addedToCartModal, { timeout: 15000 })
                .should('be.visible')
                .then(() => {
                    try {
                        cy.log('✅ "Added to Cart" notification displayed');
                    } catch (error) {
                        cy.log('❌ Failed to display "Added to Cart" notification');
                        throw error;
                    }
                });
        });
        cy.pause();
    });

    it('should display the cart icon with added products', () => {
        cy.get(Selectors.searchBar, { timeout: 10000 })
            .should('be.visible');

        // Iterate over each search term from fixture data
        searchTerms.forEach((searchTerms) => {
            cy.get(Selectors.popupModal, { timeout: 10000 })
                .type(`${searchTerms}{enter}`);
            cy.log(`Searched for product: ${searchTerms}`);

            cy.get(Selectors.searchResultsList, { timeout: 10000 })
                .first()
                .click()
                .then(() => {
                    try {
                        cy.log('✅ Selected the first product from search results');
                    } catch (error) {
                        cy.log('❌ Failed to select product');
                        throw error;
                    }
                });

            cy.get(Selectors.productAddToCartButton, { timeout: 10000 })
                .scrollIntoView()
                .should('be.visible')
                .click()
                .then(() => {
                    try {
                        cy.log('✅ Product added to cart');
                    } catch (error) {
                        cy.log('❌ Failed to add product to cart');
                        throw error;
                    }
                });

            // Wait for the cart count to update and assert it has increased
            cy.get(Selectors.cartIconBubble, { timeout: 10000 })
                .should('be.visible')  // Ensure the cart icon is visible
                .should('not.have.text', '0')
                .then(() => {
                    try {
                        cy.log('✅ Cart icon updated with added product count');
                    } catch (error) {
                        cy.log('❌ Failed to update cart icon with product count');
                        throw error;
                    }
                });
        });
        cy.pause(); // Pause to inspect the cart icon update
    });

    it('should display the cart with added products', () => {
        cy.get(Selectors.searchBar, { timeout: 10000 })
            .should('be.visible');

        // Iterate over each search term from fixture data
        searchTerms.forEach((searchTerms) => {
            cy.get(Selectors.popupModal, { timeout: 10000 })
                .type(`${searchTerms}{enter}`);
            cy.log(`Searched for product: ${searchTerms}`);

            cy.get(Selectors.searchResultsList, { timeout: 10000 })
                .first()
                .click()
                .then(() => {
                    try {
                        cy.log('✅ Selected the first product from search results');
                    } catch (error) {
                        cy.log('❌ Failed to select product');
                        throw error;
                    }
                });

            cy.get(Selectors.productAddToCartButton, { timeout: 10000 })
                .scrollIntoView()
                .should('be.visible')
                .click()
                .then(() => {
                    try {
                        cy.log('✅ Product added to cart');
                    } catch (error) {
                        cy.log('❌ Failed to add product to cart');
                        throw error;
                    }
                });

            // Wait for the "Add to Cart" button to be visible and then click it again for a second product
            cy.get(Selectors.productAddToCartButton, { timeout: 10000 })
                .scrollIntoView()
                .should('be.visible')
                .click()
                .then(() => {
                    try {
                        cy.log('✅ Product added to cart');
                    } catch (error) {
                        cy.log('❌ Failed to add second product to cart');
                        throw error;
                    }
                });

            // Wait for the cart count to update and assert it has increased
            cy.get(Selectors.cartIconBubble, { timeout: 10000 })
                .should('be.visible')  // Ensure the cart icon is visible
                .should('not.have.text', '0')
                .click()
                .then(() => {
                    try {
                        cy.log('✅ Navigated to cart to view added products');
                    } catch (error) {
                        cy.log('❌ Failed to navigate to cart');
                        throw error;
                    }
                });
        });
        cy.pause();
    });
});
