var app;!function(n){"use strict";var t=angular.module("app",["http-auth-interceptor","ui.router","ngStorage","ngFileUpload","ui.bootstrap","ui.bootstrap.tpls"]);t.config(["$stateProvider","$urlRouterProvider",function(n,t){t.otherwise("/"),n.state("main",{url:"/",templateUrl:"partials/main.html",controller:"MainController"})}]),t.config(["$localStorageProvider",function(n){n.setKeyPrefix("mare-")}])}(app||(app={}));var app;!function(n){"use strict";var t=function(){function n(n){this.name=n,this.data=[],this.active=!1}return n}(),e=function(){function n(){this.headings=[new a],this.mappings={}}return n}(),a=function(){function n(){this.type="Distinct values"}return n}(),i=function(){function n(n,i,o){this.$scope=n,o.mappings||(o.mappings={}),n.mappings=o.mappings;var s=n.updateOutput=function(){n.output.data=[];var t={},e={};for(var a in n.output.mappings){var i=parseInt(a,10),o={};t[i]=o,n.originalData.forEach(function(n,t){o[n[i]]||(o[n[i]]=[]),o[n[i]].push(t),e[n[i]]=!0});for(var s in e)n.output.data.push([s])}for(var r=1;r<n.output.headings.length;r++)n.output.data.forEach(function(e){var a=e[0],i={};for(var o in n.output.mappings)n.output.mappings[o][r]&&t[o][a]&&n.output.mappings[o][r].forEach(function(e){return t[o][a].forEach(function(t){n.originalData[t][e]&&(i[n.originalData[t][e]]=!0)})});var s=void 0,p=n.output.headings[r];switch(p.type){case"Distinct values":s="";for(var l in i)s+=l+"; ";s=s.substring(0,s.length-2),0===s.length&&(s=null);break;case"Distinct count":var u=0;for(var l in i)u++;s=""+u;break;case"Min number":var d=Number.MAX_VALUE;for(var l in i){var g=parseInt(l,10);d>g&&(d=g)}d!==Number.MAX_VALUE&&(s=""+d);break;case"Max number":var c=Number.MIN_VALUE;for(var l in i){var g=parseInt(l,10);g>c&&(c=g)}c!==Number.MIN_VALUE&&(s=""+c);break;case"Number range":var m=Number.MAX_VALUE,b=Number.MIN_VALUE;for(var l in i){var g=parseInt(l,10);g>b&&(b=g),m>g&&(m=g)}b===Number.MIN_VALUE&&m===Number.MAX_VALUE||(s=""+(m!==Number.MAX_VALUE?m:"")+"-"+(b!==Number.MIN_VALUE?b:""));break;case"Min date":var h=new Date(864e13);for(var l in i){var g=new Date(l);h>g&&(h=g)}864e13!==h.getTime()&&(s=""+h.toISOString().substring(0,10));break;case"Max date":var f=new Date(-864e13);for(var l in i){var g=new Date(l);g>f&&(f=g)}-864e13!==f.getTime()&&(s=""+f.toISOString().substring(0,10));break;case"Date range":var v=new Date(864e13),w=new Date(-864e13);for(var l in i){var g=new Date(l);g>w&&(w=g),v>g&&(v=g)}-864e13===w.getTime()&&864e13===v.getTime()||(s=""+(864e13!==v.getTime()?v.toISOString().substring(0,10):"")+"-"+(-864e13!==w.getTime()?w.toISOString().substring(0,10):""));break;default:console.log("unknown type: "+p.type)}e.push(s)})};n.deleteOutputColumn=function(t){delete n.output.mappings[t],s()},n.deleteOutputMapping=function(t){n.output.headings.splice(t,1);for(var e in n.output.mappings)n.output.mappings[e][t]=void 0;s()},n.addMapping=function(t,e,a){a&&(n.output.mappings[t][e]||(n.output.mappings[t][e]=[]),n.output.mappings[t][e].push(parseInt(a,10)),s())},n.deleteMapping=function(t,e,a){n.output.mappings[t][e].splice(a,1),s()},n.addMappingKey=function(t){n.output.mappings[t]=[],s()},n.addHeading=function(){n.output.headings.push(new a),s()},n.selectMappingToLoad=function(){i.open({templateUrl:"selectMapping",scope:n})},n.loadMapping=function(t){n.output.headings=t.headings,n.output.mappings=t.mappings,s()},n.showSaveMappingDialog=function(){i.open({templateUrl:"saveMapping",scope:n})},n.saveMapping=function(t){o.mappings[t]={mappings:n.output.mappings,headings:n.output.headings}},n.deleteSavedMapping=function(n){delete o.mappings[n]},n.importMapping=function(t){if(t){var e=new FileReader;e.onload=function(){var t=JSON.parse(e.result);n.output.mappings=t.mappings,n.output.headings=t.headings,s(),n.$digest()},e.readAsText(t)}},n.exportMapping=function(){var t=new e;t.mappings=n.output.mappings,t.headings=n.output.headings,saveAs(new Blob([JSON.stringify(t)],{type:"application/json"}),"mappings.json")},n.output=new e;var r=function(t){return n.error=t},p=function(t){n.originalHeadings=t[0].map(function(t,e){return n.firstRowIsHeader?t:"Column "+(e+1)}),n.originalData=t,n.originalData.splice(0,(n.skipRows?n.skipRows:0)+(n.firstRowIsHeader?1:0))};n.firstRowIsHeader=!0,n.loadFile=function(e){if(e)if(n.fileName=e.name,"text/csv"===e.type)Papa.parse(e,{complete:function(e){0!==e.errors.length?r({data:e.errors.map(function(n){return n.message}).join("\n")}):(n.sheets=[new t("Table")],n.firstRowIsHeader=!0,n.sheets[0].data=e.data,n.sheets[0].active=!0,i.open({templateUrl:"selectSheet",scope:n,size:"lg"}))},error:function(n){return r({data:n.message})}});else{var a=new FileReader;a.onload=function(){try{var e=XLSX.read(a.result,{type:"binary"});n.sheets=[],e.SheetNames.forEach(function(a){var i=new t(a),o=XLSX.utils.sheet_to_json(e.Sheets[a]);i.data=[[]];for(var s in o[0])0!==s.indexOf("__")&&i.data[0].push(s);XLSX.utils.sheet_to_json(e.Sheets[a]).forEach(function(n){var t=[];i.data[0].forEach(function(e){return t.push(n[e])}),i.data.push(t)}),n.sheets.push(i)}),n.firstRowIsHeader=!0,n.sheets[0].active=!0,i.open({templateUrl:"selectSheet",scope:n,size:"lg"})}catch(o){r({data:o.message})}},a.readAsBinaryString(e)}},n.loadSheet=function(){n.sheets.filter(function(n){return n.active}).forEach(function(n){p(n.data)})},n.saveCSVFile=function(){var t=[n.output.headings.map(function(n){return n.label})].concat(n.output.data);saveAs(new Blob([Papa.unparse(t)],{type:"text/csv"}),"mare-"+n.fileName+(-1!==n.fileName.indexOf(".csv",n.fileName.length-4)?"":".csv"))}}return n.$inject=["$scope","$uibModal","$localStorage"],n.$componentName="MainController",n}();angular.module("app").controller("MainController",i),n.MainController=i}(app||(app={})),function(n){try{n=angular.module("app")}catch(t){n=angular.module("app",[])}n.run(["$templateCache",function(n){n.put("partials/main.html",'\n<script type="text/ng-template" id="selectSheet">\n  <div class="modal-header">\n    <h3 class="modal-title">Preview</h3>\n  </div>\n  <div class="modal-body">\n    <uib-tabset>\n      <uib-tab ng-repeat="sheet in sheets" heading="{{sheet.name}}" active="sheet.active">\n        <div style="overflow:scroll;max-height:500px">\n          <table class="table table-bordered table-striped">\n            <tr> \n              <th ng-if="firstRowIsHeader" ng-repeat="header in sheet.data[0] track by $index">{{header}}</th>\n              <th ng-if="!firstRowIsHeader" ng-repeat="header in sheet.data[0] track by $index">Column {{$index + 1}}</th>\n            </tr>\n            <tr ng-repeat="row in sheet.data | limitTo:10:(skipRows+(firstRowIsHeader ? 1 : 0)) track by $index">\n              <td ng-repeat="column in row track by $index">{{column}}</td>\n            </tr>\n          </table>\n        </div>\n      </uib-tab>\n    </uib-tabset>\n  </div>\n  <div class="modal-footer">\n    <div class="checkbox">\n      <label>\n        <input type="checkbox" ng-model="firstRowIsHeader"/>Use first row as header\n      </label>\n    </div>\n    <input type="number" ng-model="$parent.skipRows" placeholder="skip rows"/>\n    <button ng-click="$close();loadSheet()" class="btn btn-success">Load</button>\n  </div>\n</script>\n<script type="text/ng-template" id="selectMapping">\n  <div class="modal-header">\n    <h3 class="modal-title">Select Mapping</h3>\n  </div>\n  <div class="modal-body">\n    <ul>\n      <li ng-repeat="(name,mapping) in mappings" ng-click="$close();loadMapping(mapping)">{{name}}\n        <button ng-click="$event.stopPropagation();deleteSavedMapping(name)" class="btn btn-sm btn-danger">X</button>\n      </li>\n    </ul>\n  </div>\n  <div class="modal-footer">\n    <button ng-click="$dismiss()" class="btn btn-danger">Cancel</button>\n  </div>\n</script>\n<script type="text/ng-template" id="saveMapping">\n  <div class="modal-header">\n    <h3 class="modal-title">Save mapping as</h3>\n  </div>\n  <div class="modal-body">\n    <input type="text" ng-model="mappingName" class="form-control"/>\n  </div>\n  <div class="modal-footer">\n    <button ng-click="$dismiss()" class="btn btn-danger">Cancel </button>\n    <button ng-click="$close();saveMapping(mappingName)" class="btn btn-success">Ok</button>\n  </div>\n</script>\n<h1>Mare</h1>\n<button ngf-select="ngf-select" ngf-change="loadFile($files[0])" ngf-multiple="false" class="btn btn-success">Load File</button>\n<div ng-show="originalData">\n  <h4>Original data</h4>\n  <div style="overflow:scroll;max-height:300px">\n    <table class="table table-striped table-bordered">\n      <tr>\n        <th ng-repeat="heading in originalHeadings">{{heading}}</th>\n      </tr>\n      <tr ng-repeat="row in originalData|limitTo:10 track by $index">\n        <td ng-repeat="value in row track by $index">{{value}}</td>\n      </tr>\n    </table>\n  </div>\n  <h4>Output</h4>\n  <button ng-click="selectMappingToLoad()" class="btn btn-success">Select mapping</button>\n  <button ngf-select="ngf-select" ngf-change="importMapping($files[0])" ngf-multiple="false" class="btn btn-warning">Import mapping</button>\n  <button ng-click="editing=!editing" class="btn btn-danger">Edit mapping</button>\n  <button ng-show="output.data" ng-click="showSaveMappingDialog()" class="btn btn-warning">Save mapping</button>\n  <button ng-show="editing" ng-click="exportMapping()" class="btn btn-warning">Export mapping</button>\n  <table class="table table-striped table-bordered">\n    <tr ng-if="editing">\n      <th ng-repeat="heading in output.headings track by $index" class="form-inline form-group">\n        <input type="text" ng-model="heading.label" class="form-control"/>\n        <button ng-if="$index!=0" ng-click="deleteOutputMapping($index)" class="btn btn-sm btn-danger">X</button>\n      </th>\n      <th>\n        <button ng-click="addHeading()" class="btn btn-sm btn-success">+</button>\n      </th>\n    </tr>\n    <tr ng-if="!editing">\n      <th ng-repeat="heading in output.headings track by $index">{{heading.label}}</th>\n    </tr>\n    <tr ng-if="editing" ng-repeat="(key,value) in output.mappings">\n      <th>{{originalHeadings[key]}}\n        <button ng-click="deleteOutputColumn(key)" class="btn btn-sm btn-danger">X</button>\n      </th>\n      <th ng-repeat="heading in output.headings|limitTo:output.headings.length:1 track by $index">\n        <div ng-repeat="value in output.mappings[key][$index+1] track by $index">{{originalHeadings[value]}}\n          <button ng-click="deleteMapping(key,$parent.$index+1,$index)" class="btn btn-sm btn-danger">X</button>\n        </div>\n        <select ng-options="idx as heading disable when output.mappings[key][$index+1] &amp;&amp; output.mappings[key][$index+1].indexOf(idx-0)!=-1 for (idx,heading) in originalHeadings" ng-model="selectedHeading" ng-change="addMapping(key,$index+1,selectedHeading);selectedHeading=undefined" class="form-control">\n          <option value="">-- add new --</option>\n        </select>\n      </th>\n    </tr>\n    <tr ng-if="editing">\n      <th>\n        <select ng-options="idx as heading disable when output.mappings[idx] for (idx,heading) in originalHeadings" ng-model="selectedHeading" ng-change="addMappingKey(selectedHeading);selectedHeading=undefined" class="form-control">\n          <option value="">-- add new --</option>\n        </select>\n      </th>\n      <th ng-repeat="heading in output.headings|limitTo:output.headings.length:1 track by $index">\n        <select ng-model="output.headings[$index+1].type" ng-change="updateOutput()" class="form-control">\n          <option>Distinct values</option>\n          <option>Distinct count</option>\n          <option>Max number</option>\n          <option>Min number</option>\n          <option>Number range</option>\n          <option>Max date</option>\n          <option>Min date</option>\n          <option>Date range</option>\n        </select>\n      </th>\n    </tr>\n    <tr ng-repeat="row in output.data|limitTo:10 track by $index">\n      <td ng-repeat="value in row track by $index">{{value}}</td>\n    </tr>\n  </table>\n  <button ng-click="saveCSVFile()" ng-show="output.data" class="btn btn-success">Save as CSV</button>\n</div>')}])}();