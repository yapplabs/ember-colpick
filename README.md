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
ember-colpick 2.0.0 requires ember-cli >= 3.24.0. It is not yet compatible with ember 4.0+

## Upgrading from 0.x to 1.0.0

In 1.0.0, we dropped bower and are getting jquery-colpick from npm instead. You can remove colpick from your bower.json file.

## Upgrading from 1.x.0 to 2.0.0

## Development

* `git clone` this repository
* `npm install`
* `bower install`

## Previewing

* `ember server`
* Visit your app at http://localhost:4200.

Installation
------------------------------------------------------------------------------

```
ember install ember-colpick
```


Usage
------------------------------------------------------------------------------

[Longer description of how to use the addon in apps.]


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
