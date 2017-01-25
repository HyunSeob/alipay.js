const crypto = require('crypto');

module.exports = class Alipay {
  constructor(config) {
    this.config = config;
  }

  buildRedirect(method, params) {
    const keyValueString = buildKeyValueString(this.config, params);
    const signKey = createHash(this.config.key, keyValueString);
    const payload = Object.assign({
      partner: this.config.partner,
      service: this.config.service,
      sign: signKey,
      sign_type: this.config.sign_type
    }, params);

    const inputs = Object.keys(payload)
      .map(v => `<input type="hidden" name="${v}" value="${payload[v]}"/>`)
      .join('');

      return `
        <form id="alipaysubmit" name="alipaysubmit" action="${this.config.gateway}" method="${method}">
          ${inputs}
        </form>
        <script>document.forms['alipaysubmit'].submit();</script>
      `;
  }

  verifyResponse(hashValue, params) {
    const keyValueString = buildKeyValueString(this.config, params);
    const hashResult = createHash(this.config.key, keyValueString);

    return hashValue === hashResult;
  }
}

function buildKeyValueString(config, params) {
  const merged = Object.assign({
    partner: config.partner,
    service: config.service
  }, params);

  return Object.keys(merged)
    .filter(v => v !== 'sign_type')
    .sort()
    .map(v => `${v}=${merged[v]}`)
    .join('&');
}

function createHash(key, linkString) {
  return crypto.createHash('md5').update(linkString + key, 'utf8').digest('hex');
}
