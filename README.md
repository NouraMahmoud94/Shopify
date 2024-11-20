# **E2E Testing for Tranquilo Matcha Shopify Store**

Welcome to the **End-to-End (E2E) Testing** project for the **Tranquilo Matcha** Shopify store! This repository contains a set of automated tests built using the **Cypress** testing framework, designed to ensure that key functionalities of the website work as expected. Additionally, it includes setup instructions for **CI integration** and **email notifications** in case of test failures.

---

## **Objective**

This project automates the testing of a Shopify store, **Tranquilo Matcha**, by implementing basic user flow tests using **Cypress**. The solution also includes integration with a **CI pipeline** to automatically run tests and notify the team of any failures via **email**.

---

## **Project Structure**

- **`e2e/`**: Contains all the Cypress end-to-end test scripts.
- **`cypress.json`**: The Cypress configuration file.
- **`package.json`**: Contains the project dependencies and custom scripts.
- **`notifications/`**: This folder contains the configuration for email notifications upon test failures.
  
---

## **Pre-requisites**

Ensure that the following software is installed on your system:

- **Node.js** (version 16 or higher)
- **npm** (Node Package Manager)
- **Cypress** (automated end-to-end testing framework)

---

## **Installation & Setup**

### 1. **Clone the Repository**

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/your-repository-url.git
cd your-repository-folder
