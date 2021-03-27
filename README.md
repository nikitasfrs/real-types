# real-types

_Converts strings to the corresponding types._ 

[![travis build](https://img.shields.io/travis/nikitasfrs/real-types.svg)](https://travis-ci.org/nikitasfrs/real-types)

Originally written as a quick way to convert form input values to corresponding types.

## Install
Install using npm

```
npm install real-types
```

## Usage
```js
import convert from 'real-types'

const example = {
    foo: 'false',
    bar: ['1', '5', '9'],
    next: {
        label: 'foo',
        value: '10'
    }
};

console.log(convert(example));
```

Above code will print:
```
{
    foo: false,
    bar: [1,5,9],
    next: {
        label: 'foo',
        value: 10
    }
};
```

## License

MIT
