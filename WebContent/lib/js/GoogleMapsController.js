//Me
var gmc_me;
//Map
var map;
//Marker
var marker;
//InfoWindow
var infowindow;
//Parameter used for method moveTo
var moveToParam;
var from;
var to;

//class GoogleMapsController
function GoogleMapsController() {
	gmc_me = this;
	//method init
	gmc_me.init = function(centerLatLng, zoomLevel, markerCount){
		marker = new Array(markerCount);
		infowindow = new Array(markerCount);
		var myOptions = {
				zoom: zoomLevel,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				disableDefaultUI: false,
				center: centerLatLng
		};
		map = new google.maps.Map(document.getElementById("dMapCanvas"), myOptions);
	};
	//method show
	gmc_me.show = function(t){
		to = t;
		for(var i=0;i<marker.length;i++){
			if(marker[i] != undefined){
				marker[i].setMap(null);
			}
		}
		marker[to[0]] = new google.maps.Marker({
			map:map,
			draggable:false,
			animation: google.maps.Animation.DROP,
			position: to[1],
		});
		map.panTo(to[1]);
		map.setZoom(to[7]);
		infowindow[to[0]] = new google.maps.InfoWindow({
			disableAutoPan:false,
		});
		google.maps.event.addListener(marker[to[0]], 'click', function() {
			showInfoWindow(
					getInfoWindowContent(
							to[2],
							to[3],
							to[4],
							to[5],
							to[6]
					),
					to[0]
			);
		});
		z = google.maps.event.addListener(marker[to[0]], 'animation_changed', function() {
			google.maps.event.removeListener(z);
			showInfoWindow(
					getInfoWindowContent(
						to[2],
						to[3],
						to[4],
						to[5],
						to[6]
					), 
					to[0]
			);
		});
	};
	
	//method zoomIn
	gmc_me.zoomIn = function(end, callback){
		var z = map.getZoom();
		if(z<end){
			map.setZoom(++z);
			setTimeout("gmc_me.zoomIn("+end+","+callback+")", 80);
		}else{
			setTimeout(callback, 450);			
		};
	}; 
	//method zoomOut
	gmc_me.zoomOut = function(end, callback){
		var z = map.getZoom();
		if(z>end){
			map.setZoom(--z);
			setTimeout("gmc_me.zoomOut("+end+","+callback+")", 80);
		}else{
			setTimeout(callback, 450);
		};
	};
	//method pan
	gmc_me.pan = function(panlatlng, callback){		
		z = google.maps.event.addListener(map, 'idle', function(event){
			google.maps.event.removeListener(z);
			setTimeout(callback, 80);	
		});
		map.panTo(panlatlng);
	};
	//method moveTo
//	gmc_me.moveTo = function(zoomOutEnd, zoomInEnd, panLatLng, callback){
//		moveToParam = new Array(4);
//		moveToParam[0] = zoomOutEnd;
//		moveToParam[1] = zoomInEnd;
//		moveToParam[2] = panLatLng;
//		moveToParam[3] = callback;
//		gmc_me.zoomOut(moveToParam[0],function(){
//			gmc_me.pan(moveToParam[2],function(){
//				gmc_me.zoomIn(moveToParam[1], function(){
//					moveToParam[3];
//				});
//			});		
//		});
//	};
	//method moveTo
	gmc_me.moveTo = function(zoomOutLevel, t){
		to = t;
		for(var i=0;i<marker.length;i++){
			if(marker[i] != undefined){
				marker[i].setMap(null);
			}
		}
		gmc_me.zoomOut(zoomOutLevel,function(){
			gmc_me.pan(to[1],function(){
				marker[to[0]] = new google.maps.Marker({
					map:map,
					draggable:false,
					animation: google.maps.Animation.DROP,
					position: to[1],
				});
				z = google.maps.event.addListener(marker[to[0]], 'animation_changed', function() {
					google.maps.event.removeListener(z);
					gmc_me.zoomIn(to[7], function(){
						infowindow[to[0]] = new google.maps.InfoWindow({
							disableAutoPan:false,
						});
						google.maps.event.addListener(marker[to[0]], 'click', function() {
							showInfoWindow(
									getInfoWindowContent(
											to[2],
											to[3],
											to[4],
											to[5],
											to[6]
									),
									to[0]
							);
						});
						showInfoWindow(
								getInfoWindowContent(
									to[2],
									to[3],
									to[4],
									to[5],
									to[6]
								), 
								to[0]
						);
					});
				});
			});		
		});
	};
}

//method getGoogleMapsController
function getGoogleMapsController(){
	if(gmc_me == undefined){
		return new GoogleMapsController();
	} else {
		return gmc_me;
	}	
}

//method showInfoWindow
function showInfoWindow(content, markerIndex){
	infowindow[markerIndex].setContent(content);
	infowindow[markerIndex].open(map,marker[markerIndex]);
}

//method getInfoWindowContent
function getInfoWindowContent(src, title, paragraph, prev_onclick, next_onclick){
	var content = "";
	var button = "";
	content = 
		
	"<div style='width:550px;height:220px;font-size:10.0pt;color:#444'>" +
		"<img style='width:200px;height:200px;margin-right:10px;margin-bottom:10px;' src='"+ src +"' align='left'>" +
		"<div style='font-size:12pt;color:#2D2D2D;font-weight:bold;margin-bottom:5px;'>"+ title +"</div>" +
		paragraph + "<br>";	
	if(next_onclick){
		var next = "Next";
		if(next_onclick=="javascript:clickWorks()"){
			next = "Works";
		}
		var prev = 
			"<div class='grayBtn' style='position:relative;top:10px;float:right;' onclick='"+
				next_onclick
			+"'><span style='postion:relative;line-height:2.0;'>" + next +"</span></div>";
		button += prev;
	}
	if(prev_onclick){
		var prev = 
			"<div class='grayBtn' style='position:relative;top:10px;margin-right:10px;float:right;' onclick='"+
				prev_onclick
			+"'><span style='postion:relative;line-height:2.0;'>Prev</span></div>";
		button += prev;
	}
	content += button;
	content += "</div>";
	return content;	
}