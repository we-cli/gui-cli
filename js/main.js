var fs = require('fs')
var exec = require('child_process').exec
//var spawn = require('child_process').spawn
var toUtf8 = require('./to-utf8')
var toHtml = require('./to-html')

var $ = window.$
var $iptDir = $('#ipt-dir')
var $okDir = $('#ok-dir')
var $iptCmd = $('#ipt-cmd')
var $okCmd = $('#ok-cmd')
var $infoOut = $('#info-stdout')
var $infoErr = $('#info-stderr')

$okDir.on('click', function(){
  enterDir($iptDir.val())
})
$okCmd.on('click', function(){
  execCmd($iptCmd.val())
})

function enterDir(path) {
  if (!isDir(path)) return console.log('not a directory')
  process.chdir(path)
  $infoOut.text('switched to: ' + process.cwd())
}

function execCmd(cmd) {
  exec(cmd, { encoding: null }, showOutput)
}

function showOutput(err, stdout, stderr) {
  $infoErr.empty()
  $infoOut.empty()
  if (err) {
    return $infoErr.html(toHtml(err.stack))
  }
  if (stderr) {
    stderr = toUtf8(stderr)
    $infoErr.html(toHtml(stderr))
  }
  if (stdout) {
    stdout = toUtf8(stdout)
    $infoOut.html(toHtml(stdout))
  }
}

function isDir(path) {
  return fs.statSync(path).isDirectory()
}
