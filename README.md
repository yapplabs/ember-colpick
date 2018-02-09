# Ember-colpick [![Build Status](https://travis-ci.org/yapplabs/ember-colpick.svg)](https://travis-ci.org/yapplabs/ember-colpick) [![Ember Observer Score](http://emberobserver.com/badges/ember-colpick.svg)](http://emberobserver.com/addons/ember-colpick)

A color picker component for ember using https://github.com/mrgrain/colpick

## Usage

* `npm install --save ember-colpick`
* `ember g ember-colpick`

inline color picker
```hbs
{{col-pick value=color}}
```

popup for input color picker
```hbs
{{col-pick-input value=color}}
```
## Compatibility

ember-colpick 1.0.0 requires ember-cli >= 2.15.0. You can use ember-colpick 0.x for older versions of ember-cli.

## Upgrading from 0.x to 1.0.0

In 1.0.0, we dropped bower and are getting jquery-colpick from npm instead. You can remove colpick from your bower.json file.

## Development

* `git clone` this repository
* `npm install`
* `bower install`

## Previewing

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
