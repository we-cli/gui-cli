function toHtml(str) {
  return str.replace(/\t/g, '        ')
  .replace(/ /g, '&nbsp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/\r?\n/g, '<br>')
}

module.exports = toHtml