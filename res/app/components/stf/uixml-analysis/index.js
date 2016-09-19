module.exports = angular.module('stf.uixml-analysis', [
  require('stf/filter-string').name,
  require('stf/socket').name
])
  .factory('UiXmlAnalysisService', require('./uixml-analysis-service'))
