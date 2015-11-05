function addCommas(e){e+="";for(var t=e.split("."),a=t[0],i=t.length>1?"."+t[1]:"",o=/(\d+)(\d{3})/;o.test(a);)a=a.replace(o,"$1,$2");return a+i}function camelize(e){return e.replace(/(?:^\w|[A-Z]|\b\w)/g,function(e,t){return 0==t?e.toLowerCase():e.toUpperCase()}).replace(/\s+/g,"")}!function(e){e.fn.confirmModal=function(t){function a(e,t){}var i=e("body"),o={confirmTitle:"Please confirm",confirmMessage:"Are you sure you want to perform this action ?",confirmOk:"Yes",confirmCancel:"Cancel",confirmDirection:"rtl",confirmStyle:"primary",confirmCallback:a,confirmDismiss:!0,confirmAutoOpen:!1},r=e.extend(o,t),n='<div class="modal fade" id="#modalId#" tabindex="-1" role="dialog" aria-labelledby="#AriaLabel#" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h3>#Heading#</h3></div><div class="modal-body"><p>#Body#</p></div><div class="modal-footer">#buttonTemplate#</div></div></div></div>';return this.each(function(t){var a=e(this),o=a.data(),s=(e.extend(r,o),"confirmModal"+Math.floor(1e9*Math.random())),l=n,c='<button class="btn btn-default" data-dismiss="modal">#Cancel#</button><button class="btn btn-#Style#" data-dismiss="ok">#Ok#</button>';"ltr"==r.confirmDirection&&(c='<button class="btn btn-#Style#" data-dismiss="ok">#Ok#</button><button class="btn btn-default" data-dismiss="modal">#Cancel#</button>');var d=r.confirmTitle;"function"==typeof r.confirmTitle&&(d=r.confirmTitle.call(this));var m=r.confirmMessage;"function"==typeof r.confirmMessage&&(m=r.confirmMessage.call(this)),l=l.replace("#buttonTemplate#",c).replace("#modalId#",s).replace("#AriaLabel#",d).replace("#Heading#",d).replace("#Body#",m).replace("#Ok#",r.confirmOk).replace("#Cancel#",r.confirmCancel).replace("#Style#",r.confirmStyle),i.append(l);var p=e("#"+s);a.on("click",function(e){e.preventDefault(),p.modal("show")}),e('button[data-dismiss="ok"]',p).on("click",function(e){r.confirmDismiss&&p.modal("hide"),r.confirmCallback(a,p)}),r.confirmAutoOpen&&p.modal("show")})}}(jQuery);var allLayers;require(["esri/geometry/Extent","esri/layers/WMSLayerInfo","esri/layers/FeatureLayer","dojo/domReady!"],function(e,t,a){allLayers=[]});var wlera=wlera||{bookmarks:[{id:"ottawa-nwr",name:"Ottawa NWR",userCreated:!1,spatialReference:{wkid:102100},xmax:-9253627.864758775,xmin:-9268896.161158718,ymax:5109457.058192252,ymin:5099759.110228584},{id:"erie-marsh",name:"Erie Marsh",userCreated:!1,spatialReference:{wkid:102100},xmax:-9281192.968084078,xmin:-9296461.264484022,ymax:5130611.005770145,ymin:5120913.057806477}],globals:{}},map,maxLegendHeight,maxLegendDivHeight,printCount=0,storageName="esrijsapi_mapmarks",bmToDelete="",mapLayers=[],mapLayerIds=[];require(["esri/map","esri/dijit/OverviewMap","esri/SnappingManager","esri/dijit/HomeButton","esri/dijit/LocateButton","esri/dijit/Measurement","esri/dijit/Bookmarks","esri/layers/ArcGISTiledMapServiceLayer","esri/dijit/Geocoder","esri/dijit/Popup","esri/dijit/PopupTemplate","esri/graphic","esri/geometry/Multipoint","esri/symbols/PictureMarkerSymbol","esri/geometry/webMercatorUtils","esri/tasks/GeometryService","esri/tasks/PrintTask","esri/tasks/PrintParameters","esri/tasks/PrintTemplate","esri/tasks/LegendLayer","esri/SpatialReference","esri/geometry/Extent","esri/config","esri/urlUtils","dojo/_base/array","dojo/_base/lang","dojo/keys","dojo/cookie","dojo/has","dojo/dom","dojo/dom-class","dojo/dom-construct","dojo/on","dojo/domReady!"],function(e,t,a,i,o,r,n,s,l,c,d,m,p,u,h,g,y,f,b,v,k,L,w,x,S,M,C,T,E,D,I,O,A){function F(){if(K){var e=[];S.forEach(wlera.bookmarks,function(t){0==t.userCreated&&e.push(t.id)});for(var t=wlera.bookmarks.slice(),a=0;a<t.length;a++){var i=t[a];-1!==e.indexOf(i.id)&&(t.splice(a,1),a--)}console.log(t);var o=JSON.stringify(t);window.localStorage.setItem(storageName,o)}else{var r=7;T(storageName,dojo.toJson(wlera.bookmarks),{expires:r})}}function R(){K?window.localStorage.removeItem(storageName):dojo.cookie(storageName,null,{expires:-1});var e=[];S.forEach(wlera.bookmarks,function(t){1==t.userCreated&&e.push(t.id)});for(var t=0;t<wlera.bookmarks.length;t++){var a=wlera.bookmarks[t];-1!==e.indexOf(a.id)&&(wlera.bookmarks.splice(t,1),t--)}S.forEach(e,function(e){$("#"+e).remove()})}function B(){try{return"localStorage"in window&&null!==window.localStorage}catch(e){return!1}}function j(){$("#shareModal").modal("show");var e=(map.extent,"?xmax="+map.extent.xmax.toString()+"&xmin="+map.extent.xmin.toString()+"&ymax="+map.extent.ymax.toString()+"&ymin="+map.extent.ymin.toString()),t="%3Fxmax="+map.extent.xmax.toString()+"%26xmin="+map.extent.xmin.toString()+"%26ymax="+map.extent.ymax.toString()+"%26ymin="+map.extent.ymin.toString(),a="http://54.164.126.49/WLERA/",i=a+e,o=a+t;console.log("Share URL is:"+i),$("#showFullLinkButton").click(function(){$("#fullShareURL").html('<span id="fullLinkLabel" class="label label-default"><span class="glyphicon glyphicon-link"></span> Full link</span><br><textarea style="margin-bottom: 10px; cursor: text" class="form-control"  rows="3" readonly>'+i+"</textarea>")}),$("#showShortLinkButton").click(function(){$.ajax({dataType:"json",type:"GET",url:"https://api-ssl.bitly.com/v3/shorten?access_token=e1a16076cc8470c65419920156e0ae2c4f77850f&longUrl="+o,headers:{Accept:"*/*"},success:function(e){var t=e.data.url;$("#bitlyURL").html('<span class="label label-default"><span class="glyphicon glyphicon-link"></span> Bitly link</span><code>'+t+"</code>")},error:function(e){$("#bitlyURL").html('<i class="fa fa-exclamation-triangle"></i> An error occurred retrieving shortened Bitly URL')}})})}function z(){$("#printModal").modal("show")}function G(){$("#bookmarkModal").modal("show")}function N(){1===D.byId("chkExtent").checked?le.activeGeocoder.searchExtent=map.extent:le.activeGeocoder.searchExtent=null}function P(){N();var e=le.find();e.then(function(e){V(e)}),$("#geosearchModal").modal("hide")}function U(e){_();var t=e.graphic?e.graphic:e.result.feature;t.setSymbol(ce),W(e.result,t.symbol)}function V(e){if(e=e.results,e.length>0){_();for(var t=ce,a=0;a<e.length;a++)W(e[a],t);q(e)}}function H(e){var t=e.indexOf(",");return t>0&&(e=e.substring(0,t)),e}function W(e,t){var a,i,o,r,n={};o=e.feature.geometry,n.address=e.name,n.score=e.feature.attributes.Score,a={address:H(n.address),score:n.score,lat:o.getLatitude().toFixed(2),lon:o.getLongitude().toFixed(2)},i=new d({title:"{address}",description:"Latitude: {lat}<br/>Longitude: {lon}"}),r=new m(o,t,a,i),map.graphics.add(r)}function q(e){for(var t=new p(map.spatialReference),a=0;a<e.length;a++)t.addPoint(e[a].feature.geometry);map.setExtent(t.getExtent().expand(2))}function _(){map.infoWindow.hide(),map.graphics.clear()}function Y(e,t,a,i,o){return new u({angle:0,xoffset:t,yoffset:a,type:"esriPMS",url:e,contentType:"image/png",width:i,height:o})}function X(){function e(e){printCount++;var t=$("<p><label>"+printCount+': </label>&nbsp;&nbsp;<a href="'+e.url+'" target="_blank">'+n+" </a></p>");$("#printJobsDiv").find("p.toRemove").remove(),$("#printModalBody").append(t),$("#printTitle").val(""),$("#printExecuteButton").button("reset")}function t(e){alert("Sorry, an unclear print error occurred. Please try refreshing the application to fix the problem"),$("#printExecuteButton").button("reset")}var a=new f;a.map=map;var i=new b;i.exportOptions={width:500,height:400,dpi:300},i.format="PDF",i.layout="Letter ANSI A Landscape",i.preserveScale=!1;var o=new v;o.layerId="normalized";var r=$("#printTitle").val();""==r?i.layoutOptions={titleText:"Western Lake Erie Restoration Assessment",authorText:"Western Lake Erie Restoration Assessment (WLERA)",copyrightText:"This page was produced by the WLERA web application at [insert app URL]",legendlayers:[o]}:i.layoutOptions={titleText:r,authorText:"Western Lake Erie Restoration Assessment (WLERA)",copyrightText:"This page was produced by the WLERA web application at [insert app URL]",legendlayers:[o]};var n=i.layoutOptions.titleText;a.template=i;var s=new y("http://wlera.wimcloud.usgs.gov:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task");s.execute(a,e,t)}function J(){var e=map.extent.toJson(),t=$("#bookmarkTitle").val();if(t.length>0){var a=t.toLowerCase().replace(/ /g,"-");e.name=t,e.id=a,e.userCreated=!0,wlera.bookmarks.push(e);var i=a+"_delete",o=$('<tr id="'+a+'"><td  class="bookmarkTitle td-bm">'+t+'</td><td class="text-right text-nowrap"> <button id="'+i+'" class="btn btn-xs btn-warning bookmarkDelete" data-toggle="tooltip" data-placement="top" > <span class="glyphicon glyphicon-remove"></span> </button> </td> </tr>');$("#bookmarkList").append(o),$("#"+i).confirmation({placement:"left",title:"Delete this bookmark?",btnOkLabel:"Yes",btnCancelLabel:"Cancel",popout:!0,onConfirm:function(){$("#"+a).remove();for(var e=0;e<wlera.bookmarks.length;e++){var t=wlera.bookmarks[e];-1!==a.indexOf(t.id)&&wlera.bookmarks.splice(e,1)}F()}}),$("#bookmarkTitle").val(""),F(),$("#bmAlert").hide(),$("#bookmarkModal").modal("hide")}else $("#bmAlert").show()}function Z(){var e=esri.urlToObject(document.location.href);if(e.query){var t=new L(parseFloat(e.query.xmin),parseFloat(e.query.ymin),parseFloat(e.query.xmax),parseFloat(e.query.ymax),new k({wkid:102100}));map.setExtent(t);var a=document.location.href,i=a.substring(0,a.indexOf("?"));history.pushState(null,"",i)}}var K=B(),Q=new c({},O.create("div"));I.add(Q.domNode,"dark"),map=e("mapDiv",{basemap:"gray",center:[-82.745,41.699],spatialReference:26917,zoom:10,logo:!1,infoWindow:Q}),w.defaults.geometryService=new g("http://54.152.244.240:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer"),esri.config.defaults.io.corsEnabledServers.push("http://52.0.108.106:6080/");const ee=new i({map:map},"homeButton");ee.startup();const te=new o({map:map},"locateButton");te.startup();const ae=new r({map:map,advancedLocationUnits:!0},D.byId("measurementDiv"));ae.startup();var ie;if(ie=K?window.localStorage.getItem(storageName):dojo.cookie(storageName),ie&&"null"!=ie&&ie.length>4){console.log("cookie: ",ie,ie.length);var oe=dojo.fromJson(ie);S.forEach(oe,function(e){wlera.bookmarks.push(e)})}else console.log("no stored bookmarks...");const re=new t({map:map,attachTo:"bottom-right"});re.startup();var ne=$('<tr class="esriMeasurementTableRow" id="utmCoords"><td><span>UTM17</span></td><td class="esriMeasurementTableCell"> <span id="utmX" dir="ltr">UTM X</span></td> <td class="esriMeasurementTableCell"> <span id="utmY" dir="ltr">UTM Y</span></td></tr>');$(".esriMeasurementResultTable").append(ne),$(window).resize(function(){$("#legendCollapse").hasClass("in")?(maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("height",maxLegendHeight),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=$("#legendElement").height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)):$("#legendElement").css("height","initial")}),$("#shareNavButton").click(function(){j()}),$("#printNavButton").click(function(){z()}),$("#addBookmarkButton").click(function(){G()}),$("#printExecuteButton").click(function(){$(this).button("loading"),X()}),$("#bookmarkSaveButton").click(function(){J()}),$("#bookmarkDismissButton").click(function(){$("#bmAlert").hide()}),A(map,"load",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e);var t=h.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(t.y.toFixed(4)),$("#longitude").html(t.x.toFixed(4)),Z()}),A(map,"zoom-end",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e)}),A(map,"mouse-move",function(e){if($("#mapCenterLabel").css("display","none"),null!=e.mapPoint){var t=h.webMercatorToGeographic(e.mapPoint);$("#latitude").html(t.y.toFixed(4)),$("#longitude").html(t.x.toFixed(4))}}),A(map,"pan-end",function(){$("#mapCenterLabel").css("display","inline");var e=h.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(e.y.toFixed(4)),$("#longitude").html(e.x.toFixed(4))});var se=new s("http://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer",{visible:!1});map.addLayer(se),A(D.byId("btnStreets"),"click",function(){map.setBasemap("streets"),se.setVisibility(!1)}),A(D.byId("btnSatellite"),"click",function(){map.setBasemap("satellite"),se.setVisibility(!1)}),A(D.byId("btnGray"),"click",function(){map.setBasemap("gray"),se.setVisibility(!1)}),A(D.byId("btnOSM"),"click",function(){map.setBasemap("osm"),se.setVisibility(!1)}),A(D.byId("btnTopo"),"click",function(){map.setBasemap("topo"),se.setVisibility(!1)}),A(D.byId("btnNatlMap"),"click",function(){se.setVisibility(!0)});var le=new l({value:"",maxLocations:25,autoComplete:!0,arcgisGeocoder:!0,autoNavigate:!1,map:map},"geosearch");le.startup(),le.on("select",U),le.on("findResults",V),le.on("clear",_),A(le.inputNode,"keydown",function(e){13==e.keyCode&&N()});var ce=Y("images/purple-pin.png",0,12,13,24);map.on("load",function(){map.infoWindow.set("highlight",!1),map.infoWindow.set("titleInBody",!1)}),A(D.byId("btnGeosearch"),"click",P),$(document).ready(function(){function e(){$("#geosearchModal").modal("show")}function t(){$("#aboutModal").modal("show")}$("#geosearchNav").click(function(){e()}),$("#aboutNav").click(function(){t()}),$("#html").niceScroll(),$("#sidebar").niceScroll(),$("#sidebar").scroll(function(){$("#sidebar").getNiceScroll().resize()}),$("#legendDiv").niceScroll(),maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("max-height",maxLegendHeight),$("#legendCollapse").on("shown.bs.collapse",function(){$("#legendLabel").show(),maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=$("#legendElement").height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)}),$("#legendCollapse").on("hide.bs.collapse",function(){$("#legendElement").css("height","initial"),window.innerWidth<=767&&$("#legendLabel").hide()}),$("#measurementCollapse").on("shown.bs.collapse",function(){$("#measureLabel").show()}),$("#measurementCollapse").on("hide.bs.collapse",function(){window.innerWidth<=767&&$("#measureLabel").hide()}),wlera.bookmarks.forEach(function(e){if(0==e.userCreated){var t=$('<tr id="'+e.id+'"><td class="bookmarkTitle td-bm">'+e.name+'</td><td class="text-right text-nowrap"></td> </tr>');$("#bookmarkList").append(t)}else{var a=e.id+"_delete",i=$('<tr id="'+e.id+'"><td  class="bookmarkTitle td-bm">'+e.name+'</td><td class="text-right text-nowrap"> <button id="'+a+'" class="btn btn-xs btn-warning bookmarkDelete" data-toggle="tooltip" data-placement="top" title="Delete bookmark"> <span class="glyphicon glyphicon-remove"></span> </button> </td> </tr>');$("#bookmarkList").append(i),$("#"+a).confirmation({placement:"left",title:"Delete this bookmark?",btnOkLabel:"Yes",btnCancelLabel:"Cancel",popout:!0,onConfirm:function(){$("#"+e.id).remove();for(var t=0;t<wlera.bookmarks.length;t++){var a=wlera.bookmarks[t];-1!==e.id.indexOf(a.id)&&wlera.bookmarks.splice(t,1)}F()}})}}),$("body").on("click",".td-bm",function(){var e=this.parentNode.id;wlera.bookmarks.forEach(function(t){if(t.id==e){var a=new L(t.xmin,t.ymin,t.xmax,t.ymax,new k(t.spatialReference));map.setExtent(a)}})}),$('[data-toggle="tooltip"]').tooltip({delay:{show:500,hide:0}}),$("#removeBookmarksButton").confirmModal({confirmTitle:"Delete user bookmarks from memory",confirmMessage:"This action will remove all user-defined bookmarks from local memory on your computer or device. Would you like to continue?",confirmOk:"Yes, delete bookmarks",confirmCancel:"Cancel",confirmDirection:"rtl",confirmStyle:"primary",confirmCallback:R,confirmDismiss:!0,confirmAutoOpen:!1})}),require(["esri/dijit/Legend","esri/tasks/locator","esri/tasks/query","esri/tasks/GeometryService","esri/tasks/ProjectParameters","esri/tasks/QueryTask","esri/graphicsUtils","esri/geometry/Point","esri/toolbars/draw","esri/SpatialReference","esri/geometry/Extent","esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/FeatureLayer","esri/layers/LabelLayer","esri/symbols/TextSymbol","esri/symbols/SimpleFillSymbol","esri/symbols/SimpleLineSymbol","esri/renderers/SimpleRenderer","esri/Color","esri/dijit/Popup","esri/dijit/PopupTemplate","dojo/query","dojo/dom"],function(e,t,a,i,o,r,n,s,l,c,d,m,p,u,h,g,y,f,b,v,k,L,w){var x,S=[],M=!1,T=!1;const D="http://wlera.wimcloud.usgs.gov:6080/arcgis/rest/services/WLERA/",I=new i("http://wlera.wimcloud.usgs.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer"),O=new m(D+"restorationModel/MapServer",{id:"normalized",visible:!0});O.setVisibleLayers([0]),mapLayers.push(O),mapLayerIds.push(O.id),S.push({layer:O,title:" "}),O.inLegendLayers=!0;const F=new m(D+"hydroCondition/MapServer",{id:"dikedAreas",visible:!1});F.setVisibleLayers([4]),mapLayers.push(F),mapLayerIds.push(F.id),F.inLegendLayers=!1;const R=new m(D+"hydroCondition/MapServer",{id:"dikes",visible:!1,minScale:1e5});R.setVisibleLayers([3]),mapLayers.push(R),mapLayerIds.push(R.id),R.inLegendLayers=!1;const B=new m(D+"hydroCondition/MapServer",{id:"degFlowlines",visible:!1,minScale:1e5});B.setVisibleLayers([2]),mapLayers.push(B),mapLayerIds.push(B.id),B.inLegendLayers=!1;const j=new m(D+"hydroCondition/MapServer",{id:"culverts",visible:!1,minScale:1e5});j.setVisibleLayers([1]),mapLayers.push(j),mapLayerIds.push(j.id),j.inLegendLayers=!1;const z=new m(D+"hydroCondition/MapServer",{id:"dikeBreaks",visible:!1,minScale:1e5});z.setVisibleLayers([0]),mapLayers.push(z),mapLayerIds.push(z.id),z.inLegendLayers=!1;const G=new m(D+"reference/MapServer",{id:"parcelsDyn",visible:!1,minScale:1e5});G.setVisibleLayers([1]),mapLayers.push(G),mapLayerIds.push(G.id),G.inLegendLayers=!1;const N=new p(D+"reference/MapServer/1",{id:"parcelsFeat",visible:!0,minScale:15e4,mode:p.MODE_SELECTION,outFields:["*"]});mapLayers.push(N),mapLayerIds.push(N.id),N.inLegendLayers=!1;var P=new a;P.outSpatialReference=map.spatialReference;var U=new g(g.STYLE_SOLID,new y(y.STYLE_SOLID,new b([255,0,0]),2),new b([255,255,0,.5]));N.setSelectionSymbol(U),map.disableClickRecenter(),map.on("click",function(e){P.geometry=e.mapPoint,P.outFields=["*"],P.returnGeometry=!0,M&&N.selectFeatures(P,p.SELECTION_ADD,function(e){}),e.shiftKey&&N.selectFeatures(P,p.SELECTION_SUBTRACT)}),x=new l(map),$("#polySelection").click(function(){map.setMapCursor("auto"),M=!1,x.activate(l.POLYGON)}),$("#clickSelection").click(function(){map.setMapCursor("crosshair"),T=!1,M=!0}),$("#clearSelection").click(function(){M=!1,$("#polySelection, #clickSelection").removeClass("active"),$("#stopSelection").removeClass("active"),map.setMapCursor("auto"),N.clearSelection()}),$("#stopSelection").click(function(){$("#polySelection, #clickSelection").removeClass("active"),x.deactivate(),map.setMapCursor("auto"),M=!1}),A(x,"DrawEnd",function(e){x.deactivate(),P.geometry=e,N.selectFeatures(P,p.SELECTION_ADD)}),$("#calculateStats").click(function(){$("#zonalStatsTable").html("<tr><th>Parcel ID</th><th>Hectares</th><th>Mean </th><th>Standard Deviation</th><th>Max</th></tr>"),map.getLayer("parcelsFeat").getSelectedFeatures().length>0&&$.each(map.getLayer("parcelsFeat").getSelectedFeatures(),function(){$("#zonalStatsTable").append("<tr><td>"+this.attributes.P_ID+"</td><td>"+this.attributes.Hec.toFixed(3)+"</td><td>"+this.attributes.MEAN.toFixed(4)+"</td><td>"+this.attributes.STD.toFixed(3)+"</td><td>"+this.attributes.stat_MAX+"</td></tr>")}),$("#zonalStatsModal").modal("show")});const V=new m(D+"reference/MapServer",{id:"studyArea",visible:!0});V.setVisibleLayers([0]),mapLayers.push(V),mapLayerIds.push(V.id),S.push({layer:V,title:" "}),V.inLegendLayers=!0;var H=new k({title:"U.S. ACOE Aerial Photo",mediaInfos:[{title:"",caption:"Date & Time taken: {date_}",type:"image",value:{sourceURL:"{imageUrl}",linkURL:"{imageUrl}"}}]}),W=new p(D+"reference/MapServer/2",{id:"aerials",visible:!1,minScale:1e5,mode:p.MODE_ONDEMAND,outFields:["*"],infoTemplate:H});mapLayers.push(W),mapLayerIds.push(W.id),S.push({layer:W,title:"US Army Corps of Engineers Aerial Photos "}),W.inLegendLayers=!0;const q=new m(D+"restorationModel/MapServer",{id:"landuse",visible:!1});q.setVisibleLayers([8]),mapLayers.push(q),mapLayerIds.push(q.id),q.inLegendLayers=!1;const _=new m(D+"restorationModel/MapServer",{id:"imperviousSurfaces",visible:!1});_.setVisibleLayers([7]),mapLayers.push(_),mapLayerIds.push(_.id),_.inLegendLayers=!1;const Y=new m(D+"restorationModel/MapServer",{id:"conservedLands",visible:!1});Y.setVisibleLayers([6]),mapLayers.push(Y),mapLayerIds.push(Y.id),Y.inLegendLayers=!1;const X=new m(D+"restorationModel/MapServer",{id:"flowline",visible:!1});X.setVisibleLayers([5]),mapLayers.push(X),mapLayerIds.push(X.id),X.inLegendLayers=!1;const J=new m(D+"restorationModel/MapServer",{id:"wetsoils",visible:!1});J.setVisibleLayers([4]),mapLayers.push(J),mapLayerIds.push(J.id),J.inLegendLayers=!1;const Z=new m(D+"restorationModel/MapServer",{id:"hydroperiod",visible:!1});Z.setVisibleLayers([3]),mapLayers.push(Z),mapLayerIds.push(Z.id),Z.inLegendLayers=!1;const K=new m(D+"restorationModel/MapServer",{id:"waterMask",visible:!1});K.setVisibleLayers([2]),mapLayers.push(K),mapLayerIds.push(K.id),K.inLegendLayers=!1,map.addLayers(mapLayers);var Q=map.enableSnapping({snapKey:E("mac")?C.META:C.CTRL}),ee=[{layer:N}];Q.setLayerInfos(ee);var te=new c(26917);ae.on("measure-end",function(e){var t,a=e.geometry,i=-1*e.geometry.x;84>i&&i>78?I.project([a],te,function(e){t=e[0],console.log(t);var a=t.x.toFixed(0),i=t.y.toFixed(0);$("#utmX").html(a),$("#utmY").html(i)}):($("#utmX").html('<span class="label label-danger">outside zone</span>'),$("#utmY").html('<span class="label label-danger">outside zone</span>'))});for(var ie=0;ie<map.layerIds.length;ie++){var oe=map.getLayer(map.layerIds[ie]);oe.visible&&($("#"+oe.id).button("toggle"),$("#"+oe.id).find("i.checkBoxIcon").toggleClass("fa-check-square-o fa-square-o"))}$("button.lyrTog").click(function(e){$(this).find("i.checkBoxIcon").toggleClass("fa-check-square-o fa-square-o"),$(this).button("toggle"),e.preventDefault(),e.stopPropagation();var t=map.getLayer($(this).attr("id"));t.visible?t.setVisibility(!1):(t.setVisibility(!0),0==t.inLegendLayers&&(S.push({layer:t,title:" "}),t.inLegendLayers=!0,re.refresh()))}),$("#hydroConditionGroup, #parametersGroup, #4scaleGroup").on("hide.bs.collapse",function(){var e=$(this)[0].id.replace("Group","");$("#"+e).find("i.checkBoxIcon").toggleClass("fa-check-square-o fa-square-o"),$("#"+e).find("i.chevron").toggleClass("fa-chevron-right fa-chevron-down");var t=$(this).attr("id")+"Buttons";$("#"+t).button("toggle")}),$("#hydroConditionGroup, #parametersGroup, #4scaleGroup").on("show.bs.collapse",function(){var e=$(this)[0].id.replace("Group","");$("#"+e).find("i.checkBoxIcon").toggleClass("fa-check-square-o fa-square-o"),$("#"+e).find("i.chevron").toggleClass("fa-chevron-right fa-chevron-down")}),$(".zoomto").hover(function(e){$(".zoomDialog").remove();var t=this.parentNode.id,a=$('<div class="zoomDialog"><label class="zoomClose pull-right">X</label><br><div class="list-group"><a href="#" id="zoomscale" class="list-group-item lgi-zoom zoomscale">Zoom to scale</a> <a id="zoomcenter" href="#" class="list-group-item lgi-zoom zoomcenter">Zoom to center</a><a id="zoomextent" href="#" class="list-group-item lgi-zoom zoomextent">Zoom to extent</a></div></div>');$("body").append(a),$(".zoomDialog").css("left",event.clientX-80),$(".zoomDialog").css("top",event.clientY-5),$(".zoomDialog").mouseleave(function(){$(".zoomDialog").remove()}),$(".zoomClose").click(function(){$(".zoomDialog").remove()}),$("#zoomscale").click(function(e){var a=map.getLayer(t).minScale;map.setScale(a)}),$("#zoomcenter").click(function(e){var t=new s(-83.208084,41.628103,new c({wkid:4326}));map.centerAt(t)}),$("#zoomextent").click(function(e){var a=map.getLayer(t).fullExtent;map.setExtent(a)})}),$(".opacity").hover(function(){$(".opacitySlider").remove();var e=this.parentNode.id,t=map.getLayer(e).opacity,a=$('<div class="opacitySlider"><label id="opacityValue">Opacity: '+t+'</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');$("body").append(a),$("#slider")[0].value=100*t,$(".opacitySlider").css("left",event.clientX-180),$(".opacitySlider").css("top",event.clientY-5),$(".opacitySlider").mouseleave(function(){$(".opacitySlider").remove()}),$(".opacityClose").click(function(){$(".opacitySlider").remove()}),$("#slider").change(function(t){var a=$("#slider")[0].value/100;console.log("o: "+a),$("#opacityValue").html("Opacity: "+a),map.getLayer(e).setOpacity(a)})});var re=new e({map:map,layerInfos:S},"legendDiv");re.startup()})});