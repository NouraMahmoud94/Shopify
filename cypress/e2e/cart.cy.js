import { Selectors } from '../support/selectors';

describe('Tranquilo Matcha Cart Functionality', () => {
    let searchTerms = []; // Declare searchTerms at the suite level

    beforeEach(() => {
        // Load fixture data before each test to get the search terms
        cy.fixture('testData').then((data) => {
            searchTerms = data.searchTerms; // Assign searchTerms from the fixture
            cy.log('Search terms loaded:', JSON.stringify(searchTerms));
        });

        // Visit homepage before each test to ensure we start fresh
        cy.visit('/');
        cy.log('🏠 Visited homepage');

        // Handle any cookie banners or popups that might appear on the page
        cy.handleCookiesAndPopups();
        cy.log('🍪 Handled cookies and popups if present');
    });

    it('should allow users to navigate to the cart', () => {
        // Step 1: Navigate directly to the cart page
        cy.visit('/cart');

        // Step 2: Check if the cart is empty on the first visit
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
    });

    it('should allow users to add a product to the cart', () => {
        // Step 1: Ensure search bar is visible
        cy.get(Selectors.searchBar, { timeout: 10000 })
            .should('be.visible');

        // Step 2: Iterate over each search term from fixture data
        searchTerms.forEach((searchTerm) => {
            // Step 2.1: Search for a product using the search term
            cy.get(Selectors.popupModal, { timeout: 10000 })
                .type(`${searchTerm}{enter}`);
            cy.log(`Searched for product: ${searchTerm}`);

            // Step 2.2: Click on the first product from search results
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

            // Step 2.3: Add the selected product to the cart
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
    });

    it('should display the Added to Cart notification', () => {
        // Step 1: Ensure search bar is visible
        cy.get(Selectors.searchBar, { timeout: 10000 })
            .should('be.visible');

        // Step 2: Iterate over each search term from fixture data
        searchTerms.forEach((searchTerm) => {
            // Step 2.1: Search for a product using the search term
            cy.get(Selectors.popupModal, { timeout: 10000 })
                .type(`${searchTerm}{enter}`);
            cy.log(`Searched for product: ${searchTerm}`);

            // Step 2.2: Click on the first product from search results
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

            // Step 2.3: Add the selected product to the cart
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

            // Step 2.4: Verify the "Added to Cart" notification is displayed
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
    });

    it('should display the cart icon with added products', () => {
        // Step 1: Ensure search bar is visible
        cy.get(Selectors.searchBar, { timeout: 10000 })
            .should('be.visible');

        // Step 2: Iterate over each search term from fixture data
        searchTerms.forEach((searchTerm) => {
            // Step 2.1: Search for a product using the search term
            cy.get(Selectors.popupModal, { timeout: 10000 })
                .type(`${searchTerm}{enter}`);
            cy.log(`Searched for product: ${searchTerm}`);

            // Step 2.2: Click on the first product from search results
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

            // Step 2.3: Add the selected product to the cart
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

            // Step 2.4: Wait for the cart icon to update and assert that the product count is correct
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
    });

    it('should display the cart with added products', () => {
        // Step 1: Ensure search bar is visible
        cy.get(Selectors.searchBar, { timeout: 10000 })
            .should('be.visible');

        // Step 2: Iterate over each search term from fixture data
        searchTerms.forEach((searchTerm) => {
            // Step 2.1: Search for a product using the search term
            cy.get(Selectors.popupModal, { timeout: 10000 })
                .type(`${searchTerm}{enter}`);
            cy.log(`Searched for product: ${searchTerm}`);

            // Step 2.2: Click on the first product from search results
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

            // Step 2.3: Add the selected product to the cart
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

            // Step 2.4: Add a second product to the cart
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

            // Step 2.5: Wait for the cart count to update and then navigate to the cart
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
    });
});
