- [ ] Inject custom script instead of `html-webpack-plugin` default injection.
- [ ] Set staging environment (or any other arbitrary environment). See: https://github.com/facebook/create-react-app/issues/790.
- [ ] Handle package build script.
- [x] Handle deprecated `@babel-polyfill`.
- [ ] Figure out whether we actually need to set `library` for Webpack. See: https://github.com/kenshoo/react-build/blob/master/README.md#buildpackage. Suggest using package name instead (via package.json), which absolves us of inconsistent boilerplate issues (developers forgetting to set `name` argument in their script, typos, etc').
- [x] Impl `init` argument:
  - npm/yarn init.
  - Add `craco.config.js`.
  - Add `bin` key to `package.json`.
  - Generate `index.js` with starter template.
- [ ] Impl `update-scripts` argument.

\* Public path example: `https://grid.kenshoo.com/incrementality-frontend/latest/<STATIC_ASSET_FILENAME>`.
