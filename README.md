# ethereumjs-icap

[![NPM Package](https://img.shields.io/npm/v/ethereumjs-icap.svg?style=flat-square)](https://www.npmjs.org/package/ethereumjs-icap)
[![Build Status](https://img.shields.io/travis/ethereumjs/ethereumjs-icap.svg?branch=master&style=flat-square)](https://travis-ci.org/ethereumjs/ethereumjs-icap)
[![Coverage Status](https://img.shields.io/coveralls/ethereumjs/ethereumjs-icap.svg?style=flat-square)](https://coveralls.io/r/ethereumjs/ethereumjs-icap)
[![Gitter](https://img.shields.io/gitter/room/ethereum/ethereumjs-lib.svg?style=flat-square)](https://gitter.im/ethereum/ethereumjs-lib) or #ethereumjs on freenode

Utilities for handling [ICAP](https://github.com/ethereum/wiki/wiki/ICAP:-Inter-exchange-Client-Address-Protocol) addresses.

It works in Node.js as well as in the browser via `browserify`. When minified for a browser, it should be less than 4K in size.

## API

* `fromAddress(address, print, nonstd)` - try encoding an address into an IBAN
* `fromAsset(asset, print)` - try encoding an asset description into an IBAN
* `toAddress(iban)` - try decoding an IBAN into an address
* `toAsset(iban)` - try decoding an IBAN into an asset description
* `encode(address/asset)` - encode an address or asset description into an IBAN
* `decode(iban)` - decode an IBAN into an address or asset description
* `encodeBBAN(address/asset)` - encode an address or asset description into a BBAN
* `decodeBBAN(bban)` - decode a BBAN into an address or asset description
* `isICAP(iban)` - return true if input is a valid ICAP, otherwise false
* `isAddress(iban)` - return true if the input is a valid ICAP with an address, otherwise false
* `isAsset(iban)` - return true if the input is a valid ICAP with an asset description, otherwise false

All of the above methods will throw exceptions on invalid inputs. The `to*` and `from*` method will also check for the expected inputs and outputs.

The `print` parameter above, when set to true, will create an IBAN in the *print format*, which is space delimited groups of four characters: `XE73 38O0 73KY GTWW ZN0F 2WZ0 R8PX 5ZPP ZS`

The `address` parameter only supports `0x` prefixed input and will include that in the output.

The `nonstd` parameter of `fromAddress`, when set to true, will turn on support for the *basic ICAP format* generating an invalid IBAN, but encoding the entire 160 bits of an Ethereum address.

## Examples

```js
ICAP.fromAsset({
  asset: 'ETH',
  institution: 'XREG',
  client: 'GAVOFYORK'
})
// returns 'XE81ETHXREGGAVOFYORK'

ICAP.fromAddress('0x00c5496aee77c1ba1f0854206a26dda82a81d6d8')
// returns 'XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS'

ICAP.toAsset('XE81ETHXREGGAVOFYORK')
// returns {
//   asset: 'ETH',
//   institution: 'XREG',
//   client: 'GAVOFYORK'
// }

ICAP.toAddress('XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS')
// returns '0x00c5496aee77c1ba1f0854206a26dda82a81d6d8'
```

## *Direct* address generation

A *direct address ICAP* is an address less than 155 bits of length and therefore it safely fits into the length restrictions of IBAN (and the checksum method used).
That upper limit is `0x03ffffffffffffffffffffffffffffffffffffff` or `XE91GTJRJEU5043IEF993XWE21DBF0BVGF`.

The following simple bruteforce code can be used to generate such addresses:

```js
const ethUtil = require('ethereumjs-util')
function generateDirectAddress () {
  while(true) {
    var privateKey = crypto.randomBytes(32) // or your favourite other random method
    if (ethUtil.privateToAddress(privateKey)[0] <= 3) {
      return privateKey
    }
  }
}
```

Alternatively [`ethereumjs-wallet`](http://npmjs.com/packages/ethereumjs-wallet) can be used to generate compatible addresses.
