- [ ] Inject custom script instead of `html-webpack-plugin` default injection.
- [ ] Set staging environment (or any other arbitrary environment). See: https://github.com/facebook/create-react-app/issues/790.
- [ ] Handle package build script.
- [ ] Handle public path configuration. See: https://github.com/kenshoo/incrementality-frontend/blob/master/src/index.js#L25 and https://github.com/kenshoo/crystal-ball/blob/master/app/views/UI/ui.scala.html.
- [ ] Configure Crystal-Ball web server with rewrite rules that will return the correct html file.
- [x] Handle deprecated `@babel-polyfill`.
- [ ] Figure out whether we actually need to set `library` for Webpack. See: https://github.com/kenshoo/react-build/blob/master/README.md#buildpackage. Suggest using package name instead (via package.json), which absolves us of inconsistent boilerplate issues (developers forgetting to set `name` argument in their script, typos, etc').
- [ ] Remove `react-scripts`?.
- [ ] Impl boilerplate:
  - npm/yarn init.
  - Add `craco.config.js`.
  - Add `bin` key to `package.json`.
  - Generate `index.js` with starter snippet.

\* Public path example: `https://grid.kenshoo.com/incrementality-frontend/latest/<STATIC_ASSET_FILENAME>`.
