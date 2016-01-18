# ethereumjs-icap

Utilities for handling [ICAP](https://github.com/ethereum/wiki/wiki/ICAP:-Inter-exchange-Client-Address-Protocol) addresses.

## API

* `fromAddress` - try encoding an address into an IBAN
* `fromAsset` - try encoding an asset description into an IBAN
* `toAddress` - try decoding an IBAN into an address description
* `toAsset` - try decoding an IBAN into an asset description
* `encode` - encode an address or an asset description into an IBAN
* `decode` - decode an IBAN into an address or asset description
* `encodeBBAN` - encode an address or an asset description into a BBAN
* `decodeBBAN` - decode a BBAN into an address or asset description

All of the above methods will throw exceptions on invalid inputs. The `to*` and `from*` method will also check for the expected inputs and outputs.
