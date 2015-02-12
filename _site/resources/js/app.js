/*!
 * angular-packery
 * http://github.com/sungard-labs/angular-packery
 * Version: 1.0.2
 * License: MIT
 */

"use strict";!function(){var a=["packeryTemplates"],b={columnWidth:".packery-sizer",itemSelector:".packery-object",rowHeight:".packery-sizer",draggable:!0,handle:"*",timeout:2e3,acceptedAttributes:["containerStyle","columnWidth","gutter","isHorizontal","isInitLayout","isOriginLeft","isOriginTop","isResizeBound","itemSelector","rowHeight","transitionDuration"]},c=function(a,b,c,d,e){var f,g=[],h=function(a,b){for(var c=0;c<b.length;c++)if(b[c].id===a)return!1;return!0};return{Packery:function(i,j,k){var l=b.defer();if(j=j||void 0,k=k||{},h(i,g)&&void 0!==j)return f=new Packery(j[0],k),g.push({id:i,packery:f}),a.$emit("packeryInstantiated",f),f;var m=c(function(){void 0!==f&&(c.cancel(m),l.resolve(f))},e.timeout/10);return d(function(){c.cancel(m),l.reject(!1)},e.timeout),l.promise}}},d=function(a,b,c){var d=this;d.packeryInstantiated=!1,d.packeryDraggable=!1,d.dragHandle=void 0,d.uniqueId=(new Date).getTime(),d.packery={},this.bindDragEvents=function(a){var b,c,e;b=d.dragHandle,"*"===b?(e=new Draggabilly(a[0]),c=a):(e=new Draggabilly(a[0],{handle:b}),c=a.querySelectorAll(b)),d.packery.bindDraggabillyEvents(e),c.on("mouseenter",function(){a.addClass("hovered")}).on("mouseleave",function(){a.removeClass("hovered")})},this.createAttrObj=function(a){for(var c={},d=b.acceptedAttributes,e=0;e<d.length;e++){var f=a[d[e]];void 0!==f&&(c[d[e]]="null"===f?null:isNaN(f)===!1?+a[d[e]]:a[d[e]])}return c},this.packObject=function(b){var e=c.Packery(d.uniqueId);e.then(function(){var c=d.packery.getItemElements();-1===c.indexOf(b[0])&&d.packery.appended(b[0]),d.packeryDraggable===!0&&d.bindDragEvents(b),b.css("visibility","visible"),a.$emit("packeryObjectPacked",b[0])})},this.setDraggable=function(a){d.packeryDraggable=!0,d.dragHandle=a}},e=function(a,b){return{restrict:"EAC",controller:"PackeryController",transclude:!0,replace:!0,templateUrl:"template/packery/packery.html",scope:{containerStyle:"@?",columnWidth:"@?",gutter:"@?",isHorizontal:"@?",isInitLayout:"@?",isOriginLeft:"@?",isOriginTop:"@?",isResizeBound:"@?",itemSelector:"@?",rowHeight:"@?",transitionDuration:"@?",draggable:"@?",handle:"@?"},link:function(c,d,e,f){var g,h,i;c.columnWidth=c.columnWidth||a.columnWidth,c.itemSelector=c.itemSelector||a.itemSelector,c.rowHeight=c.rowHeight||a.rowHeight,c.draggable=c.draggable||a.draggable,c.handle=c.handle||a.handle,"false"===c.draggable&&(c.draggable=!1),"false"===c.isHorizontal&&(c.isHorizontal=!1),"false"===c.isInitLayout&&(c.isInitLayout=!1),"false"===c.isOriginLeft&&(c.isOriginLeft=!1),"false"===c.isOriginTop&&(c.isOriginTop=!1),"false"===c.isResizeBound&&(c.isResizeBound=!1),c.draggable&&f.setDraggable(c.handle),g=f.createAttrObj(c),h=f.uniqueId,i=b.Packery(h,d,g),i instanceof Packery&&(f.packeryInstantiated=!0,f.packery=i)}}},f=function(){return{restrict:"EA",templateUrl:"template/packery/packery-object.html",transclude:!0,replace:!0}},g=function(){return{require:"^packery",restrict:"C",link:function(a,b,c,d){b.css("visibility","hidden"),d.packObject(b)}}},h=function(a){a.put("template/packery/packery.html",["<div>",'<div class="packery-sizer"></div>','<div class="packery-container" ng-transclude></div>',"</div>"].join("")),a.put("template/packery/packery-object.html",'<div class="packery-object" ng-transclude></div>')};angular.module("angular-packery",a).constant("packeryConfig",b).service("packeryService",["$rootScope","$q","$interval","$timeout","packeryConfig",c]).controller("PackeryController",["$rootScope","packeryConfig","packeryService",d]).directive("packery",["packeryConfig","packeryService",e]).directive("packeryObject",[f]).directive("packeryObject",[g]),angular.module("packeryTemplates",[]).run(["$templateCache",h])}();

/*!
 * angular-packery-demos
 * http://github.com/sungard-labs/angular-packery
 * Version: 1.0.0
 * License: MIT
 */

'use strict';

(function (){

  var moduleDependencies = [
    'angular-packery'
  ];

  var randomObjectsDirective = function () {
    return {
      restrict: 'E',
      template: function (tElem, tAttrs) {

        var numObjects = tAttrs.numObjects || 30,
            sizes = [ 'single', 'double', 'triple' ],
            colors = [ 'a', 'b', 'c', 'd' ],
            html = "";

        var randomize = function (array) {
          return array[ Math.floor( Math.random() * array.length ) ];
        } 

        for (var i = 0; i < numObjects; i++) {
          html += "<packery-object class='";
          tAttrs.extraClasses === undefined ? html += "" : html += tAttrs.extraClasses; // added classes
          tAttrs.noHeight === undefined ? html += " h-" + randomize(sizes) : angular.noop(); // width
          tAttrs.noWidth === undefined ? html += " w-" + randomize(sizes) : angular.noop(); // width
          html += " color-" + randomize(colors); // width
          html += "'></packery-object>";
        }

        return html;
      }
    };
  };

  angular
    .module('demos', moduleDependencies)
    .directive('randomObjects', [ randomObjectsDirective ]);

})();