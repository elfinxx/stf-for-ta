require('./xmldump.css')

module.exports = angular.module('stf.xmldump', [
  require('stf/image-onload').name,
  require('stf/settings').name
])
  .run(['$templateCache', function($templateCache) {
    $templateCache.put('control-panes/xmldump/xmldump.pug',
      require('./xmldump.pug')
    )
  }])
  .controller('XMLDumpCtrl', require('./xmldump-controller'))
