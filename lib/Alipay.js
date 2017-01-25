const crypto = require('crypto');

module.exports = function buildRedirectHtml(config, method, params) {
  const keyValueString = buildKeyValueString(params);
  const signKey = createHash(config.key, keyValueString);
  const payload = Object.assign({ sign: signKey }, params);
  const inputs = Object.keys(payload)
    .map(v => `<input type="hidden" name="${v}" value="${payload[v]}"/>`)
    .join('');

  return `
    <form id="alipaysubmit" name="alipaysubmit" action="${config.gateway}" method="${method}">
      ${inputs}
    </form>
    <script>document.forms['alipaysubmit'].submit();</script>
  `;
}

function buildKeyValueString(keyValue) {
  return Object.keys(keyValue)
    .map(v => `${v}=${keyValue[v]}`)
    .join('&');
}

function createHash(key, linkString) {
  return crypto.createHash('md5').update(linkString + key, 'utf8').digest('hex');
}
