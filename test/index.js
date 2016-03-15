var assert = require('assert')
var ICAP = require('../')

describe('.decodeBBAN()', function () {
  it('should work for \'direct\'', function () {
    assert.equal(ICAP.decodeBBAN('38O073KYGTWWZN0F2WZ0R8PX5ZPPZS'), '0x00c5496aee77c1ba1f0854206a26dda82a81d6d8')
  })
  it('should work for \'basic\'', function () {
    assert.equal(ICAP.decodeBBAN('038O073KYGTWWZN0F2WZ0R8PX5ZPPZS'), '0x00c5496aee77c1ba1f0854206a26dda82a81d6d8')
    assert.equal(ICAP.decodeBBAN('7SS84LEE90PIULMR3DYBGOVBNJN5N14'), '0x42c5496aee77c1ba1f0854206a26dda82a81d6d8')
  })
  it('should work for \'indirect\'', function () {
    assert.deepEqual(ICAP.decodeBBAN('ETHXREGGAVOFYORK'), {
      asset: 'ETH',
      institution: 'XREG',
      client: 'GAVOFYORK'
    })
  })
  it('should fail for others', function () {
    assert.throws(function () {
      ICAP.decodeBBAN('TOOSHORT')
    })
  })
})

describe('.encodeBBAN()', function () {
  it('should work for \'direct\'', function () {
    assert.equal(ICAP.encodeBBAN('0xc5496aee77c1ba1f0854206a26dda82a81d6d8'), '38O073KYGTWWZN0F2WZ0R8PX5ZPPZS')
  })
  it('should work for \'basic\'', function () {
    assert.equal(ICAP.encodeBBAN('0x00c5496aee77c1ba1f0854206a26dda82a81d6d8'), '038O073KYGTWWZN0F2WZ0R8PX5ZPPZS')
    assert.equal(ICAP.encodeBBAN('0x42c5496aee77c1ba1f0854206a26dda82a81d6d8'), '7SS84LEE90PIULMR3DYBGOVBNJN5N14')
  })
  it('should work for \'indirect\'', function () {
    assert.deepEqual(ICAP.encodeBBAN({
      asset: 'ETH',
      institution: 'XREG',
      client: 'GAVOFYORK'
    }),
    'ETHXREGGAVOFYORK')
  })
})

describe('.decode()', function () {
  it('should work for \'direct\'', function () {
    assert.equal(ICAP.decode('XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS'), '0x00c5496aee77c1ba1f0854206a26dda82a81d6d8')
  })
  it('should work \'basic\'', function () {
    assert.equal(ICAP.decode('XE73038O073KYGTWWZN0F2WZ0R8PX5ZPPZS'), '0x00c5496aee77c1ba1f0854206a26dda82a81d6d8')
    assert.equal(ICAP.decode('XE657SS84LEE90PIULMR3DYBGOVBNJN5N14'), '0x42c5496aee77c1ba1f0854206a26dda82a81d6d8')
  })
  it('should work for \'indirect\'', function () {
    assert.deepEqual(ICAP.decode('XE81ETHXREGGAVOFYORK'), {
      asset: 'ETH',
      institution: 'XREG',
      client: 'GAVOFYORK'
    })
  })
  it('should work for \'direct\' in print format', function () {
    assert.equal(ICAP.decode('XE73 38O0 73KY GTWW ZN0F 2WZ0 R8PX 5ZPP ZS'), '0x00c5496aee77c1ba1f0854206a26dda82a81d6d8')
  })
})

describe('.encode()', function () {
  it('should work for \'direct\'', function () {
    assert.equal(ICAP.encode('0xc5496aee77c1ba1f0854206a26dda82a81d6d8'), 'XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS')
  })
  it('should work for \'basic\'', function () {
    assert.equal(ICAP.encode('0x00c5496aee77c1ba1f0854206a26dda82a81d6d8'), 'XE73038O073KYGTWWZN0F2WZ0R8PX5ZPPZS')
    assert.equal(ICAP.encode('0x42c5496aee77c1ba1f0854206a26dda82a81d6d8'), 'XE657SS84LEE90PIULMR3DYBGOVBNJN5N14')
  })
  it('should work for \'indirect\'', function () {
    assert.deepEqual(ICAP.encode({
      asset: 'ETH',
      institution: 'XREG',
      client: 'GAVOFYORK'
    }),
    'XE81ETHXREGGAVOFYORK')
  })
  it('should work for \'direct\' for print format', function () {
    assert.equal(ICAP.encode('0xc5496aee77c1ba1f0854206a26dda82a81d6d8', true), 'XE73 38O0 73KY GTWW ZN0F 2WZ0 R8PX 5ZPP ZS')
  })
})

describe('.fromAddress()', function () {
  it('should work for short address', function () {
    assert.equal(ICAP.fromAddress('0xc5496aee77c1ba1f0854206a26dda82a81d6d8'), 'XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS')
  })
  it('should work for zero prefixed address', function () {
    assert.equal(ICAP.fromAddress('0x00c5496aee77c1ba1f0854206a26dda82a81d6d8'), 'XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS')
  })
  it('should reject long address in std mode', function () {
    assert.throws(function () {
      ICAP.fromAddress('0x42c5496aee77c1ba1f0854206a26dda82a81d6d8')
    })
  })
  it('should work for long address is non-std mode', function () {
    assert.equal(ICAP.fromAddress('0x42c5496aee77c1ba1f0854206a26dda82a81d6d8', false, true), 'XE657SS84LEE90PIULMR3DYBGOVBNJN5N14')
  })
})

describe('.fromAsset()', function () {
  it('should work for proper input', function () {
    assert.deepEqual(ICAP.fromAsset({
      asset: 'ETH',
      institution: 'XREG',
      client: 'GAVOFYORK'
    }),
    'XE81ETHXREGGAVOFYORK')
  })
})

describe('.toAddress()', function () {
  it('should work with \'direct\'', function () {
    assert.equal(ICAP.toAddress('XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS'), '0x00c5496aee77c1ba1f0854206a26dda82a81d6d8')
  })
  it('should work with \'basic\'', function () {
    assert.equal(ICAP.toAddress('XE657SS84LEE90PIULMR3DYBGOVBNJN5N14'), '0x42c5496aee77c1ba1f0854206a26dda82a81d6d8')
  })
  it('shouldn\'t work with an asset', function () {
    assert.throws(function () {
      ICAP.toAddress('XE81ETHXREGGAVOFYORK')
    })
  })
})

describe('.toAsset()', function () {
  it('should work for proper input', function () {
    assert.deepEqual(ICAP.toAsset('XE81ETHXREGGAVOFYORK'), {
      asset: 'ETH',
      institution: 'XREG',
      client: 'GAVOFYORK'
    })
  })
  it('shouldn\'t work with an address', function () {
    assert.throws(function () {
      ICAP.toAsset('XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS')
    })
  })
})
