# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.1.6](https://github.com/unjs/externality/compare/v0.1.5...v0.1.6) (2022-01-18)


### Bug Fixes

* exclude nested `node_modules` from inline matcher ([#5](https://github.com/unjs/externality/issues/5)) ([2676ef4](https://github.com/unjs/externality/commit/2676ef4547508cd04c82d61797795e8f23c479c5))

### [0.1.5](https://github.com/unjs/externality/compare/v0.1.4...v0.1.5) (2021-11-02)


### Bug Fixes

* exclude windows drive letters from protocols ([8ea3fa9](https://github.com/unjs/externality/commit/8ea3fa947cfa0bdd9d503c9bf35f56841a9b68e0))

### [0.1.4](https://github.com/unjs/externality/compare/v0.1.3...v0.1.4) (2021-10-28)


### Features

* detect invalid node imports ([#4](https://github.com/unjs/externality/issues/4)) ([114f1d6](https://github.com/unjs/externality/commit/114f1d6ad947fe0da2c472c65e73592ec983c6a2))

### [0.1.3](https://github.com/unjs/externality/compare/v0.1.2...v0.1.3) (2021-10-21)


### Bug Fixes

* do external check after inline checks ([067c657](https://github.com/unjs/externality/commit/067c6577ccbc52cd7cc6b50bddfff26c39fa7d34))

### [0.1.2](https://github.com/unjs/externality/compare/v0.1.1...v0.1.2) (2021-10-21)


### Features

* `externalExtensions` ([#3](https://github.com/unjs/externality/issues/3)) ([06fe7e4](https://github.com/unjs/externality/commit/06fe7e4da57146dccfd1672c9389760cfe4399fd))

### [0.1.1](https://github.com/unjs/externality/compare/v0.1.0...v0.1.1) (2021-10-20)


### Features

* support `externalProtocols` ([#2](https://github.com/unjs/externality/issues/2)) ([47f47c2](https://github.com/unjs/externality/commit/47f47c2456690652c07b0a26d7fbfee0bd92750b))

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
