var fs = require('fs')
//var exec = require('child_process').exec
var spawn = require('child_process').spawn
//var toUtf8 = require('./to-utf8')
var toHtml = require('./to-html')

var $ = window.$
var $iptDir = $('#ipt-dir')
var $frmDir = $('#frm-dir')
var $iptCmd = $('#ipt-cmd')
var $frmCmd = $('#frm-cmd')
var $allFlds = $('fieldset')
var $infoOut = $('#info-out')

// fixme: access to close prc
var prclist = []
log('we are in: ' + process.cwd(), 'sys')

$frmDir.on('submit', function(e){
  e.preventDefault()
  enterDir($iptDir.val())
})
$frmCmd.on('submit', function(e){
  e.preventDefault()
  execCmd($iptCmd.val())
})

function log(msg, type) {
  $infoOut.get(0).innerHTML +=
    '<div class="msg-' + type + '">' +
    toHtml(msg) +
    '</div>'
}

function enterDir(path) {
  if (!isDir(path)) return console.log('not a directory')
  process.chdir(path)
  log('switched to: ' + process.cwd(), 'sys')
}

function execCmd(cmd) {
  log('executing: ' + cmd, 'sys')
  $allFlds.attr('disabled', true)
  var prc = spawn('cmd', ['/s', '/c', cmd])
  prclist.push(prc)
  prc.stdout.setEncoding('utf8')
  prc.stderr.setEncoding('utf8')
  prc.stdout.on('data', function(chunk){
    log(chunk, 'stdout')
  })
  prc.stderr.on('data', function(chunk){
    log(chunk, 'stderr')
  })
  prc.on('close', function(code){
    if (code !== 0) {
      log('Exit with code: ' + code, 'err')
    }
    $allFlds.attr('disabled', null)
    prclist.splice(prclist.indexOf(prc), 1)
  })
}

/*function execCmd(cmd) {
  exec(cmd, { encoding: null }, showOutput)
}

function showOutput(err, stdout, stderr) {
  $infoErr.empty()
  $infoWarn.empty()
  $infoOut.empty()
  if (err) {
    $infoErr.html(toHtml(err.stack))
  }
  if (stderr) {
    stderr = toUtf8(stderr)
    $infoWarn.html(toHtml(stderr))
  }
  if (stdout) {
    stdout = toUtf8(stdout)
    $infoOut.html(toHtml(stdout))
  }
}*/

function isDir(path) {
  return fs.statSync(path).isDirectory()
}
