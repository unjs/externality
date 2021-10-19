# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.1.0](https://github.com/unjs/externality/compare/v0.0.5...v0.1.0) (2021-10-19)


### ⚠ BREAKING CHANGES

* External `inline` and `external` options will now be converted from strings -> RE. For previous string behaviour (positive for any string included in an id), just pass an unbounded RE, such as `/\?/`

* also fix incorrect type in ResolvedId

* convert all strings to RE (in `inline` and `external` opts) ([0166d70](https://github.com/unjs/externality/commit/0166d7033410bb7c47503fec7ac4c9e5ce2dd869))

### [0.0.5](https://github.com/unjs/externality/compare/v0.0.4...v0.0.5) (2021-10-19)


### Features

* expose `toPathRegExp` utility ([f2bf6c2](https://github.com/unjs/externality/commit/f2bf6c2a59934319f3f92f205e8adc08ee738cca))

### [0.0.4](https://github.com/unjs/externality/compare/v0.0.3...v0.0.4) (2021-10-15)


### Bug Fixes

* import default export from `enhanced-resolve` ([838e691](https://github.com/unjs/externality/commit/838e691b05877014da6b89cd896146d3e4a87a56))

### [0.0.3](https://github.com/unjs/externality/compare/v0.0.2...v0.0.3) (2021-10-15)


### Bug Fixes

* fallback to root if base is invalid id ([c92311f](https://github.com/unjs/externality/commit/c92311f2eed1dbe3e22d81a853416c7544dd4754))
* pass `opts.resolve` to resolveId function ([b345ea1](https://github.com/unjs/externality/commit/b345ea1ea060d591f21f20ccc1a2db389f46e551))

### [0.0.2](https://github.com/unjs/externality/compare/v0.0.1...v0.0.2) (2021-06-18)

### 0.0.1 (2021-06-18)
