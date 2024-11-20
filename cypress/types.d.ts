declare namespace Cypress {
    interface Chainable<Subject = any> {
        /**
         * Custom command to dismiss unexpected pop-ups
         * @example cy.dismissPopups()
         */
        handleCookiesAndPopups(): Chainable<Subject>;
    }
}
