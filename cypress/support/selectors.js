export const Selectors = {
    // Page Elements
    body: 'body',


    // selectors Of Home Page
        logo: "#shopify-section-sections--20638601380184__header > sticky-header > header > h1 > a > div > img",

    // Selector for navigation tabs
         navTabs: '#HeaderMenu-shop',

    // selectors Of Search
        // Pop-up Elements
        popUpBanner: 'shopify-pc__banner',
        popUpAcceptButton: 'shopify-pc__banner__btn-accept',

        // Search Elements
        searchBar: '#shopify-section-sections--20638601380184__header > sticky-header > header > details-modal',

        // Search Result Items
        firstSearchResult: '#predictive-search-results-products-list > :first-child',


    // selectors Of Cart
        // Selector for the popup modal on the homepage (appears to be a details modal)
        popupModal: '#shopify-section-sections--20638601380184__header > sticky-header > header > details-modal',

        // Selector for the search results dropdown that appears after searching for a product
        searchResultsList: '#predictive-search-results-products-list',

        // Selector for the "Add to Cart" button on the product detail page
        productAddToCartButton: '#ProductSubmitButton-template--20638601052504__main',

        // Selector for the "Added to Cart Notification" detail Popup
        addedToCartModal: '#cart-notification',

        // Selector for the Close button of Added to Cart Notification
         closeAddedToCartModal: '#cart-notification > div.cart-notification__header > button',

        // Selector for the cart icon bubble that displays the number of items in the cart
        cartIconBubble: '#cart-icon-bubble',


    // selectors Of Checkout
        // Selector for the cart  Items on the cart page
        cartItem:'shopify-section-template--20638600823128__cart-items',

        // Selector for the cart summary section on the cart page
        cartSummary: '#shopify-section-template--20638600823128__cart-items > cart-items',

        // Selector for the cart Footer on the cart page
        cartFooter:'#main-cart-footer',

        // Selector for the "Checkout" button on the cart page
        checkoutButton: '#checkout',

        // Selector for the main checkout page container
        checkoutMain: '#checkout-main',

         // Selector for the main checkout page container
         payButton: '#checkout-pay-button'





};
