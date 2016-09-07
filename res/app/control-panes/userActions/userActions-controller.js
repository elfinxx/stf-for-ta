module.exports = function UserActionsCtrl($scope) {

  // $scope.injectUserAction = {};
  // $scope.injectUserAction.invoke();

  $scope.touchPoints = [];

  // $scope.$watch('injectUserAction', function (position) {
  //   /*Checking if the given value is not undefined*/
  //   console.log("value: " + position)
  //   if(position){
  //     xy = position;
  //     console.log("scope.scaledXY : " + xy )
  //     /*Injecting the Method*/
  //     $scope.scaledXY.invoke = function(){
  //       console.log("invoke ok = " + position)
  //       // scope.scaledXY = position
  //     }
  //   }
  // });




  // console.log("touchXY: " + $scope.touchPoints.join());

  // for(var i = 0; i < touchPoints.length; i++){
  //   console.log(i + " = " + "touchX: " + touchPoints[i].touchX);
  //   console.log(i + " = " + "touchY: " + touchPoints[i].touchY);
  // }

  $scope.addRow = function() {

    var touchPoint = { touchX: '', touchY: ''};

    console.log($scope.device.display.width)
    console.log($scope.device.display.height)

    var scaledXY =  $scope.control.getLocation_withTouch();
    var res = scaledXY.split("/")
    console.log(res[0])
    console.log(res[1])


    var calX = Math.round($scope.device.display.width * res[0])
    var calY = Math.round($scope.device.display.height * res[1])

    console.log(calX)
    console.log(calY)
    touchPoint.touchX = calX
    touchPoint.touchY = calY

    console.log("==addRow==")

    // push a new object with some defaults
    $scope.touchPoints.push(touchPoint)

    for(var i = 0; i < $scope.touchPoints.length; i++){
      console.log(i + " = " + "touchX: " + $scope.touchPoints[i].touchX)
      console.log(i + " = " + "touchY: " + $scope.touchPoints[i].touchY)
    }
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
