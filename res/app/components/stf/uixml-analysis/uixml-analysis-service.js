// var parser = require('xml2json')
var upperCastingBounds = "BOUNDS"
var xml2js = require('xml2js');
var parser = new xml2js.Parser();


var xml = "<foo attr=\"value\">bar</foo>";

module.exports = function UiXmlAnalysisServiceFactory($rootScope) {

  var UiXmlAnalysisService = {}
  var stack = [];
  var nodeArray = [];
  var hashMap = {};

  function getAttribute(parsedXml) {

    var curNode = parsedXml.hierarchy.node
    stack.push(curNode);

    while(stack.length !== 0){
      var node = stack.pop();
      if (node.length > 0) {
        for (var i = node.length - 1; i >= 0; i--) {
          // console.log(node[i].$.bounds)
          visitNode(node[i], hashMap, nodeArray);
          if(node[i].node != null){
            stack.push(node[i].node)
          }else{

          }
        }
      }
    }
  }


  function visitNode(node, hashMap, nodeArray) {
    nodeArray.push(node)
  }


  UiXmlAnalysisService.getElement = function(xmlData, x, y) {

    console.log("UiXmlAnalysisService.getElement")
    // console.log(indentXml(xmlData))

    // console.log(JSON.stringify(xmlData))
    // var parser = getParser();
    var error;
    var result;

    var cleanedString = xmlData.toString().replace("\ufeff", "");
    parser.parseString(cleanedString, function (err, parsedXml) {
      error = err;
      result = parsedXml;
    });

    if (result) {
      console.log(result)
      getAttribute(result)
      return calculatePosition(nodeArray, x, y)

      // delete result.xmlns;
      // return that.parseStructure(result, that.rules);
    } else if (error) {
      console.log("Error" + error);
    } else { // empty xml document
      console.log("empty" + empty);
      return {};
    }



    // var json = parser.toJson(xml);
    // console.log("json:" + json)
    //
    // var json2 = parser.toJson(xmlData);
    // console.log("json2:" + json2)

    // request.body.store_config.forEach(function(item, index) {
    //   console.log(index);
    //   console.log(request.body.store_config[index]);
    //
    // });

    // var indentedXml =  indentXml(xmlData)
    // console.log("indentedXml" + indentedXml)

    // parser.parseString('<tagname attribute="value">content</tagname>',
    //   function(err, jsonResult){
    //     console.log(jsonResult.);
    //   });
    //
    // parser.parseString(xmlData.toString(),
    //   function(err, result) {
    //   console.log(result);
    //   // console.log(result['$'].bounds);
    //   // // console.log("class:" + result['node'].class);
    //   // console.log(result['foo'].attr);
    //   // // console.dir(JSON.stringify(result));
    // });
    //
    // parser.parseString(xml.toString(), function(err, result) {
    //   var json = JSON.stringify(result);
    //   console.log(json);
    //
    //   for(key in json) {
    //     console.log('key:' + key + ' / ' + 'value:' + json[key]);
    //   }


      // console.dir(JSON.stringify(result));
    // });
  }


  function calculatePosition(nodeArray, x , y){
    var min = 1440 * 2560
    var curIndex;
    for(var i = 0 ; i < nodeArray.length ; i++ ){
      var curBound = nodeArray[i].$.bounds.replace("][", "],[").replace(/]/g, "").replace(/\[/g, "");

      var splitCord = curBound.split(",")




      if(( splitCord[0] < x ) &&  ( x < splitCord[2] ) && ( splitCord[1] < y ) && ( y < splitCord[3] )){

        // console.log("----------------------")
        // console.log("splitCord[0]:" + splitCord[0])
        // console.log("x:" + x)
        // console.log("splitCord[2]:" + splitCord[2])
        // console.log("splitCord[1]:" + splitCord[1])
        // console.log("y:" + y)
        // console.log("splitCord[3]:" + splitCord[3])
        // console.log("----------------------")
        // console.log("class:" + nodeArray[i].$.class)

        var area = (splitCord[2] - splitCord[0]) * (splitCord[3] - splitCord[1]);
        if(min >= area){
          // console.log("min: " + curBound + ":" + area)
          min = area;
          curIndex = i;
        }
      }

    }

    var uiElement = {
      text : ''
      , resourceId : ''
      , elementClass : ''
      , bounds : ''
    }

    uiElement.text = nodeArray[curIndex].$.text
    uiElement.resourceId = nodeArray[curIndex].$["resource-id"]
    uiElement.elementClass = nodeArray[curIndex].$.class
    uiElement.bounds = nodeArray[curIndex].$.bounds

    // console.log("bounds:" + nodeArray[curIndex].$.bounds)
    // console.log("text:" + nodeArray[curIndex].$.text)
    // console.log("class:" + nodeArray[curIndex].$.class)


    console.log("text:" + uiElement.text)
    console.log("bounds:" + uiElement.bounds)
    console.log("resourceId:" + uiElement.resourceId)
    console.log("class:" + uiElement.elementClass)

    return uiElement;

      // splitCord.forEach(function(coordinate) {
      //
      // }

    //[36,940][1404,1716]

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


  return UiXmlAnalysisService
}
