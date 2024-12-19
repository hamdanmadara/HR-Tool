// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseURL: 'http://localhost:7002',
  googleClientId: '346236583216-1ria2eo75ogjs32kagte1v2lq4f3m9c7.apps.googleusercontent.com',
  register: '/api/auth/signup',
  login: '/api/auth/login',
  createOrganization: '/api/organization/createOrganization',
  logout: '/logout',
  getProfile:'/profile/view'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
