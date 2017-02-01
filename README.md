# alipay.js
Minimal SDK for Alipay (Not official)

## Installation

```
$ npm install --save-dev alipay.js
```

## Usage

### Initialize

``` javascript
const Alipay = require('alipay.js');

// Following config parameters are for Sandbox.
const alipay = new Alipay({
  service: 'create_forex_trade',
  partner: '2088101122136241',
  key: '760bdzec6y9goq7ctyx96ezkz78287de',
  gateway: 'https://openapi.alipaydev.com/gateway.do?_input_charset=utf-8',
  sign_type: 'MD5'
});
```

### Redirect to Alipay

``` javascript
const redirectForm = alipay.buildRedirect('get', {
  out_trade_no,
  total_fee,
  subject,
  currency: 'USD',
  return_url
});

res.send(redirectForm); // Usage in Express.js
```

### Verify response from Alipay

``` javascript
// Redirected from Alipay
const isValidResponse = this.alipay.verifyResponse(req.query['sign'], req.query); // Usage in Express.js
```
