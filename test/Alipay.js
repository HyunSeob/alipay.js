const assert = require('assert');
const Alipay = require('../lib/Alipay');

const alipay = new Alipay({
  service: 'create_forex_trade',
  partner: '2088101122136241',
  key: '760bdzec6y9goq7ctyx96ezkz78287de',
  gateway: 'https://openapi.alipaydev.com/gateway.do?_input_charset=utf-8',
  sign_type: 'MD5'
});

const regexForHash = /(.+)name=\"sign\" value=\"([a-z0-9]+)\"(.+)/;

const html = alipay.buildRedirect('get', {
  out_trade_no: '12345',
  total_fee: 1,
  subject: 'Alipay.js',
  currency: 'USD',
  return_url: 'https://github.com/hyunseob'
});

const hashResult = regexForHash.exec(html)[2];

assert.strictEqual(hashResult, '50dd0e25993f11f0d3a231ede014afe1');

const html2 = alipay.buildRedirect('get', {
  currency: 'USD',
  return_url: 'https://github.com/hyunseob',
  out_trade_no: '12345',
  total_fee: 1,
  subject: 'Alipay.js'
});

const hashResult2 = regexForHash.exec(html2)[2];

assert.strictEqual(hashResult, hashResult2 + '1');

const validResponse = alipay.verifyResponse('fb123866e56a5b687e71d43068367e7a', {
  trade_status: 'TRADE_FINISHED',
  out_trade_no: '12345',
  trade_no: '67890'
});

assert(validResponse);

const validResponse2 = alipay.verifyResponse('fb123866e56a5b687e71d43068367e7a', {
  out_trade_no: '12345',
  trade_no: '67890',
  trade_status: 'TRADE_FINISHED'
});

assert(validResponse2);
