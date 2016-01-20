# ethereumjs-icap

Utilities for handling [ICAP](https://github.com/ethereum/wiki/wiki/ICAP:-Inter-exchange-Client-Address-Protocol) addresses.

It works in Node.js as well as in the browser via `browserify`. When minified for a browser, it should be less than 4K in size.

## API

* `fromAddress(address, print, nonstd)` - try encoding an address into an IBAN
* `fromAsset(asset, print)` - try encoding an asset description into an IBAN
* `toAddress(iban)` - try decoding an IBAN into an address description
* `toAsset(iban)` - try decoding an IBAN into an asset description
* `encode(address/asset)` - encode an address or an asset description into an IBAN
* `decode(iban)` - decode an IBAN into an address or asset description
* `encodeBBAN(address/asset)` - encode an address or an asset description into a BBAN
* `decodeBBAN(bban)` - decode a BBAN into an address or asset description

All of the above methods will throw exceptions on invalid inputs. The `to*` and `from*` method will also check for the expected inputs and outputs.

The `print` parameter above, when set to true, will create an IBAN in the *print format*, which is space delimited groups of four characters: `XE73 38O0 73KY GTWW ZN0F 2WZ0 R8PX 5ZPP ZS`

The `address` parameter doesn't support `0x` prefixed input and will not include that in the output.

The `nonstd` parameter of `fromAddress`, when set to true, will turn on support for the *basic ICAP format* generating an invalid IBAN, but encoding the entire 160 bits of an Ethereum address.

## Examples

```js
ICAP.fromAsset({
  asset: 'ETH',
  institution: 'XREG',
  client: 'GAVOFYORK'
})
// returns 'XE81ETHXREGGAVOFYORK'

ICAP.fromAddress('c5496aee77c1ba1f0854206a26dda82a81d6d8')
// returns 'XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS'

ICAP.toAsset('XE81ETHXREGGAVOFYORK')
// returns {
//   asset: 'ETH',
//   institution: 'XREG',
//   client: 'GAVOFYORK'
// }

ICAP.toAddress('XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS')
// returns 'c5496aee77c1ba1f0854206a26dda82a81d6d8'
```
