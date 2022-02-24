# MyAwesomeBusiness

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.2.

## Development server Front-End

Run `npm install` to install the project dependencies.

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Development server Back-End

Navigate to folder `back-end` in terminal

Run `npm install` to install the project dependencies.

Create the file `config.ts` in the config folder and copy the content from `config-backup.ts` to `config.ts`.

Make sure syncDb in config file is set to true to create the database for sqlite.

Run `npm start`, it will create the database and run the api on `http://localhost:3000`

Set syncDb to false after creating the database, and if you want to clear the database, set it to true and run `npm start`

## Change to Production

Change `base_url` to production in environment for production on Front-End

Change `Application Id` and `Application Secret` in config file on Back-End.

Login to Square, enter the Redirect Url for production and get those keys.

Note: You can not redirect to localhost on production.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npx cypress open` to luanch the testing window
Click one of the available test, it will start end-to-end testing for that scenerio.
Please make sure that front-end and backend is already running.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
