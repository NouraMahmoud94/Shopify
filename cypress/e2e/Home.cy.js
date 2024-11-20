import { Selectors } from '../support/selectors';

describe('Homepage and Navigation Tests', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.handleCookiesAndPopups(); // Custom command to handle cookies and popups
    });

    it('should load the homepage successfully', () => {
        cy.get(Selectors.logo, { timeout: 10000 }).should('be.visible');
    });

    it('should display the search input', () => {
        cy.get(Selectors.searchBar, { timeout: 10000 }).should('be.visible');
    });

    it('should navigate to the Shop page when tab is clicked', () => {
        cy.get(Selectors.navTabs).click();
        cy.url().should('include', 'shop');

    });

    it('should load more content when scrolling down', () => {
        cy.scrollTo('bottom');
    });

    it('should be able to navigate to different pages', () => {
        cy.get(Selectors.navTabs).click();
        cy.url().should('include', 'shop');
        // Navigate back to the previous page (homepage)
        cy.go('back');
    });

});
