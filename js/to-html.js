function toHtml(str) {
  // fixme: drop cli colors
  str = str.replace(/\[\d+m/g, '')

  return str.replace(/\t/g, '        ')
  .replace(/ /g, '&nbsp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/\r?\n/g, '<br>')
}

module.exports = toHtml