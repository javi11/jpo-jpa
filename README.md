# jpo-jpa

A simple library to convert a [JSON pointer](https://datatracker.ietf.org/doc/html/rfc6901) path to [JSON path](https://goessner.net/articles/JsonPath/).

## Install

```
$ npm install jpo-jpa
```

## Usage

```js
const jpoToJpa = require('jpo-jpa');

const jsonPointerPath = '/prop/1/inLove';

jpoToJpa(jsonPointerPath);
//=> $.prop.1.inLove
```

## API

### jpoToJpa(jsonPointerPath)

Returns the json path value.
