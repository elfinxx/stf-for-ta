module.exports = function XMLDumpCtrl($scope) {
  $scope.screenshots = []
  $scope.screenShotSize = 400

  //$scope.clear = function() {
  //  $scope.screenshots = []
  //}
  $scope.shotSizeParameter = function(maxSize, multiplier) {
    var finalSize = $scope.screenShotSize * multiplier
    var finalMaxSize = maxSize * multiplier

    return (finalSize === finalMaxSize) ? '' :
    '?crop=' + finalSize + 'x'
  }

  $scope.takeScreenShot = function() {
    console.log("say screen")
    $scope.control.screenshot().then(function(result) {
      $scope.$apply(function() {
        $scope.screenshots.unshift(result)
      })
    })
  }

  $scope.zoom = function(param) {
    var newValue = parseInt($scope.screenShotSize, 10) + param.step
    if (param.min && newValue < param.min) {
      newValue = param.min
    } else if (param.max && newValue > param.max) {
      newValue = param.max
    }
    $scope.screenShotSize = newValue
  }

  $scope.result = null

  $scope.dumpWindowsHierarchy = function() {
    var command = 'uiautomator dump'
    if (command === 'clear') {
      $scope.clear()
      return
    }

    $scope.command = ''

    return $scope.control.shell(command)
      .progressed(function(result) {
        $scope.result = result
        $scope.data = result.data.join('')
        $scope.$digest()
      })
      .then(function(result) {
        console.log(result)
        // result에 /sdcard/window_dump.xml 파일로 내보냈다는 메시지가 있다면

        return $scope.control.shell('cat /sdcard/window_dump.xml')
          .progressed(function(result) {
            console.log("looking for xml dump.")
          })
          .then(function(result) {
            $scope.result = result
            $scope.data = indentXml(result.data.join(''))
            $scope.$digest()
          })
      })
  }

  $scope.clear = function() {
    $scope.command = ''
    $scope.data = ''
    $scope.result = null
  }

  function indentXml(text) {
    var tabCount = 0
    var breakText = text.replace(/></g, ">\n<")
    var splitText = breakText.split("\n")
    var aText = ""

    splitText.forEach(function(line) {
      if (line.match(/^<node.*\/>/)) {
        console.log("self closed tag")
      } else if (line.match(/^<node.*>/)) {
        tabCount++
      } else if (line.match(/^<\/node>/)) {
        tabCount--
      } else {
        console.log("something else")
      }

      var dummyTab = ""
      for (var i=0; i<tabCount; i++) {
        dummyTab = dummyTab.concat("  ")
      }

      aText = aText.concat(dummyTab + line + '\n')
    })

    return aText
  }

}
