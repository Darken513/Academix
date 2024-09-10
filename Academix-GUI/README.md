# AcademixGUI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Architecture example

src/
├── app/
│   ├── auth/
│   │   ├── auth.service.ts        # Authentication service
│   │   ├── login/
│   │   │   ├── login.component.ts
│   │   │   └── login.component.html
│   │   └── auth.guard.ts          # Route guard for authentication
│   ├── core/
│   │   ├── services/
│   │   │   └── api.service.ts     # Service for API calls
│   │   └── models/                # Interfaces and models
│   │       └── user.model.ts
│   ├── shared/
│   │   ├── components/
│   │   │   └── side-menu/
│   │   │       ├── side-menu.component.ts
│   │   │       ├── side-menu.component.html
│   │   │       └── side-menu.component.css
│   │   └── directives/
│   │       └── example.directive.ts
│   ├── features/
│   │   ├── dashboard/
│   │   │   ├── dashboard.component.ts
│   │   │   └── dashboard.component.html
│   │   └── user-management/
│   │       ├── user-list/
│   │       │   ├── user-list.component.ts
│   │       │   └── user-list.component.html
│   │       └── user-details/
│   │           ├── user-details.component.ts
│   │           └── user-details.component.html
│   ├── app-routing.module.ts
│   ├── app.component.ts
│   └── app.module.ts
├── assets/
├── environments/
├── index.html
└── styles.css