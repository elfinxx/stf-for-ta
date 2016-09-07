require('./userActions.css')

module.exports = angular.module('stf.userActions', [
  require('stf/angular-packery').name,
  require('stf/common-ui/modals/lightbox-image').name
])
  .run(['$templateCache', function($templateCache) {
    $templateCache.put('control-panes/userActions/userActions.pug',
      require('./userActions.pug')
    )
  }])
  .controller('UserActionsCtrl', require('./userActions-controller'))
