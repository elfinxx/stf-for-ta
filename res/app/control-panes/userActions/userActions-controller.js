module.exports = function UserActionsCtrl($scope) {
  $scope.screenShotSize = 10

  // $scope.injectUserAction = {};
  // $scope.injectUserAction.invoke();

  $scope.touchPoints = [];
  $scope.touchPoints=  $scope.control.getLocation_withTouch();

  // $scope.$watch('userAction', function ($scope.userAction) {
  //   /*Checking if the given value is not undefined*/
  //   console.log("value: " + position)
  //   if(position){
  //     xy = position;
  //     console.log("scope.scaledXY : " + xy )
  //     /*Injecting the Method*/
  //
  //   }
  // });


  // console.log("touchXY: " + $scope.touchPoints.join());

  // for(var i = 0; i < touchPoints.length; i++){
  //   console.log(i + " = " + "touchX: " + touchPoints[i].touchX);
  //   console.log(i + " = " + "touchY: " + touchPoints[i].touchY);
  // }

  $scope.addRow = function() {

    $scope.touchPoints =  $scope.control.getLocation_withTouch();
    // for(var i = 0; i < $scope.touchPoints.length; i++){
    //   console.log(i + " = " + "text: " + $scope.touchPoints[i].uiElement.text)
    // }
  }

  $scope.shotSizeParameter = function(maxSize, multiplier) {
    var finalSize = $scope.screenShotSize * multiplier
    var finalMaxSize = maxSize * multiplier

    return (finalSize === finalMaxSize) ? '' :
    '?crop=' + finalSize + 'x'
  }



  var getSdStatus = function() {
    if ($scope.control) {
      $scope.control.getSdStatus().then(function(result) {
        $scope.$apply(function() {
          $scope.sdCardMounted = (result.lastData === 'sd_mounted')
        })
      })
    }
  }

  getSdStatus()
}
