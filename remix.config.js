import { flatRoutes } from 'remix-flat-routes'
/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ['**/*'],
  serverModuleFormat: 'esm',
  serverDependenciesToBundle: [ "@tldraw/tldraw" ],
  routes: async defineRoutes => {
    return flatRoutes('routes', defineRoutes, {
      ignoredRouteFiles: ['**/*.test.{js,jsx,ts,tsx}', '**/__*.*'],
    })
  },
}
