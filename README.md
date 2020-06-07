# `compare-stylesheet`

[![npm version](https://img.shields.io/npm/v/compare-stylesheet.svg?style=flat-square)](https://www.npmjs.com/package/compare-stylesheet)
[![npm downloads](https://img.shields.io/npm/dm/compare-stylesheet.svg?style=flat-square)](https://www.npmjs.com/package/compare-stylesheet)
![coverage](/scripts/jest/shield.svg)

JavaScript methods (and TypeScript bindings) to normalize a stylesheet by the
rules, properties and values it contains.

This allows for comparison by contents (equality, superset).

It uses `csso` to minify the stylesheet, and remove redundant code.

After this, it parses the rest, looking for @rules, selectors, properties and
values and checks them for equivalence.

It (intentionally) ignores the order of the rules, so a more loose comparison
can be made.

## Basic Usage

## Installation

## [`Docs`](docs)

## [`API`](docs/api)

## License

MIT
