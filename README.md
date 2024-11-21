# **E2E Testing for Tranquilo Matcha Shopify Store**

Welcome to the **End-to-End (E2E) Testing** project for the **Tranquilo Matcha** Shopify store! This repository contains a set of automated tests built using the **Cypress** testing framework, designed to ensure that key functionalities of the website work as expected. Additionally, it includes setup instructions for **CI integration** and **email notifications** in case of test failures.

## **Objective**

This project automates the testing of a Shopify store, **Tranquilo Matcha**, by implementing basic user flow tests of Home, Search, Cart, Checkout Functionality using **Cypress**. The solution also includes integration with a **CI pipeline** to automatically run tests and notify the team of any failures via **email**.

## **Project Structure**

- **`e2e/`**: Contains all the Cypress end-to-end test scripts.
- **`cypress.config.js`**: The Cypress configuration file.
- **`support/commands.js`**: The Cypress commands file.
- **`selectors.js`**: all elements selectors file.
- **`package.json`**: Contains the project dependencies and custom scripts.
- **`/screenshots`**: Contains all the screenshots of failed tests.
- **`/.github`**: This folder contains the configuration for email notifications upon test failures.

## **Framework Explanation**

Cypress is chosen for its ease of use, real-time debugging, and seamless integration with CI pipelines. It is ideal for E2E testing of web applications.

## **Business Documentation**

Ensure Home, search, cart functionality, and checkout processes are functional, reflecting user workflows.


## **Pre-requisites**

Ensure that the following software is installed on your system:

- **Node.js** (version 16 or higher)
- **npm** (Node Package Manager)
- **Cypress** (automated end-to-end testing framework)


## **Installation & Setup**

### 1. **Clone the Repository**

Clone the repository to your local machine using the following command:
https://github.com/NouraMahmoud94/Shopify.git

## **Run**
 1- Clone Shopify repository.
 
 2- Import project to intelliJ IDEA.
 
 3- Open Terminal from intelliJ IDEA.

 4- Run from the Cypress UI : npx cypress open 
 
 OR  Run :  node run-tests.js

**Note on Ongoing Enhancements**

The project is still undergoing enhancements and improvements.
Recently, Tranquilo Matcha website underwent some updates, which have affected a few of the test cases and their reliability. Some test suites might not be working as expected due to these recent changes, and I am actively working on updating and enhancing the test scripts to reflect these changes.
