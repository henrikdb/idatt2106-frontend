# SpareSti

## Description
The frontend of sparesti.app. SpareSti is designed to make saving fun. The app is suitable for all saving goals and offers motivation and tips tailored to your desires. 

Since we know that saving money can be difficult, SpareSti automatically transfers money into your savings account when you complete a challenge. 

We provide a set purchasable tires, either Ad-Free or Premium. By purchasing Ad-Free you remove all ads present ont the site. Premium lets you create saving goals with groups and gives you access to budgeting tools

## Links

- **Website**: [https://sparesti.org/](https://sparesti.org/login)
- **Backend**: [https://gitlab.stud.idi.ntnu.no/idatt2106-2024-07/backend](https://gitlab.stud.idi.ntnu.no/idatt2106-2024-07/backend)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Getting Started

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Test users
For easy use of the web application we have provided a set of test users that can be used.

#### Regular user
- **Email**
    ```sh
    user@example.com
    ```
- **Password**
    ```sh
    John1
    ```
#### Admin user
- **Email**
    ```sh
    admin@example.com
    ```
- **Password**
    ```sh
    John1
    ```
#### BankID user
The BankID service uses a set of pre-generated test users provided by Signicat. Make sure you have the updated test-users [here](https://developer.signicat.com/identity-methods/nbid/test.html#test-norwegian-bankid).
- **Social Security Number**
    ```sh
    29090816894
    ```
- **One time password**
    ```sh
    otp
    ```
- **Password**
    ```sh
    qwer1234
    ```
## Test bank accounts
The current application uses mocked bank data to transfer money between savings and checking accounts. We provide a set of Basic Bank Account Numbers (bban) that can be used:

- **Account 1**
    ```sh
    12073650567
    ```
    Account 1 balance: ``100 kr``
- **Account 2**
    ```sh
    12097256355
    ```
    Account 2 balance: ``500000 kr``

- **Account 3**
    ```sh
    12032202452
    ```
    Account 3 balance: ``13000 kr``
- **Account 4**
    ```sh
    12041281683
    ```
    Account 4 balance: ``19372 kr``

## Notes
#### Website limitations

The [sparesti.org](https://sparesti.org/login) website has certain limitations.

 We use the free plan provided by [News API](https://newsapi.org/) for accessing the current finacial news that are displayed on our news page. This plan cannot be used on published websites, only localhost. The result of this is an empty news page at [sparesti.org](https://sparesti.org/login).

---

## Contributors
The individuals who contributed to the project:
- Anders Høvik
- Andreas Kluge Svendsrud 
- Henrik Dybdahl Berg
- Henrik Teksle Sandok 
- Jens Christian Aanestad 
- Victor Kaste 
- Viktor Grevskott
