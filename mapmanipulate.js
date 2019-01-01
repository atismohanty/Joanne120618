var data = [];
var markerContent = [];
var fileAdd ;
var fmData;
var mapadd;
var activeInfoWin;
var oppType =["opportunity","tagstore","estimate","alarm"];
//alert("Script Loaded");
if(navigator.onLine==false)
{
	document.getElementById("mapviewer").text = "System is offline. Not able to load the map.";
	//alert;
	//return;
}


function initMap(info,paramlat,paramlng,paramzoom)
{
//alert("Script Loaded");
	var text = info;
	if(text=="undefined" || text=="NULL")
		{
			document.getElementById("mapviewer").innerHTML = "There is no place to show in the map";
			//alert
			//return;
		}
	var arr = text.split('=');
	fileAdd = arr[0];
	for (var i=0 ; i< arr.length-1 ; i++)
		{
			var arr2 = arr[i+1].split('~');
			data[i] =   {
							"custid": arr2[0],
							"custname": arr2[1],
							"lng": arr2[3],
							"lat": arr2[2],
							"custtype":arr2[4],
							"custAdd":arr2[5],
							"custCity":arr2[6],
							"custState":arr2[7],
							"storeContact":arr2[8],
							"flag":arr2[9],
						} 
		}

	for(var i=0 ; i< data.length;i++)
	{
		markerContent[i] = data[i].custname;
	}
	//alert("Script Loaded");
	var mapObj = document.getElementById("mapviewer");
	var latlng = new google.maps.LatLng(paramlat||data[0].lat, paramlng||data[0].lng);
	
	var mapOpt = {
		center:latlng,
		 zoom:parseInt(paramzoom)||18,
		 mapTypeControl: false,
		 draggable: true,
		 scaleControl: false,
		 scrollwheel: false,
		 navigationControl: false,
		 streetViewControl: false,
		 zoomControl: (navigator.platform.toLowerCase().indexOf('iphone') < 0 && navigator.platform.toLowerCase().indexOf('ipad')< 0 ) ? true : false,
		 }; //zoomControl: false
	//alert(JSON.stringify(mapOpt));
	//alert(mapObj);
	mapadd = new google.maps.Map( mapObj, mapOpt);
	//alert(mapadd.toString());
	//alert("Map Initiated");
	mapadd.setCenter(latlng);
	var filePath = fileAdd;
	var iconImg=[];

	
	
	var marker=[];
	var infowindow=[];
	for(var i = 0 ; i < data.length; i++)
	{

	if (data[i].custtype=="Unassigned")
	{
		iconImg[i] = filePath + "Unassigned.png";
	
	}
	else if(data[i].custtype=="Opportunity")
	{
		iconImg[i] = filePath + "Opportunity.png";
	}
	else if(data[i].custtype=="Tag Store")
	{
		iconImg[i] = filePath + "TagStore.png";
	}
	else if(data[i].custtype=="Estimate")
	{
		iconImg[i] = filePath + "Estimate.png";
	}
	else if(data[i].custtype=="Work Order")
	{
		iconImg[i] = filePath + "WorkOrder.png";
	}
	else if(data[i].custtype=="Installation")
	{
		iconImg[i] = filePath + "Installation.png";
	}
	else if(data[i].custtype=="Successful Delivery")
	{
		iconImg[i] = filePath + "Delivery.png";
	}
	else if(data[i].custtype=="No Activity")
	{
		iconImg[i] = filePath + "smile.png";
	}
	
	

	else if(data[i].custtype=="Current User")
	{
		iconImg[i] = filePath + "gps-fixed-indicator.png";
	}
		
		
	// Create a marker for the specified locations
	marker[i] = new google.maps.Marker(
		{
		position:new google.maps.LatLng(data[i].lat, data[i].lng),
		map:mapadd,
		icon:iconImg[i],
		animation: google.maps.Animation.DROP
		});

	marker[i].addListener('click', function(event)
		{
			if(activeInfoWin)
			{
				activeInfoWin.close();
			}
			var latMarker = event.latLng.lat().toFixed(6);
			var lngMarker = event.latLng.lng().toFixed(6);

			for(var i = 0 ; i< data.length ; i++)
			{
				if (latMarker==parseFloat(data[i].lat).toFixed(6)&& lngMarker==parseFloat(data[i].lng).toFixed(6)) 
				{       
				    if( data[i].custid!=='')
				     {
					if(infowindow[i])
					{
						infowindow[i].close();
					}

					var unassstyle = 'background:white;';
					var oppstyle = 'background:white;';
					var tagstyle = 'background:white;';
					var eststyle = 'background:white;';
					var wostyle = 'background:white;';
					var instlstyle = 'background:white;';
					var succstyle = 'background:white;';
					var noactstyle = 'background:white;';

					var unasssrc = filePath + "UnassignedTransparent.png";
					var oppsrc = filePath + "OpportunityTransparent.png";
					var tagsrc = filePath + "TagStoreTransparent.png";
					var estsrc = filePath + "EstimateTransparent.png";
					var wosrc = filePath + "WorkOrderTransparent.png";
					var instlsrc = filePath + "InstallationTransparent.png";
					var succsrc = filePath + "DeliveryTransparent.png";
					var noactsrc = filePath + "smileTransparent.png";

					switch (data[i].custtype)
					{
						case 'Unassigned':
						var unassstyle  = 'background:#666666; border:none;' ;
						var unasssrc = filePath + "Unassigned.png";
						break;

						case 'Opportunity' :
						var oppstyle = 'background:#009833; border:none;';
						var oppsrc = filePath + "Opportunity.png";
						break;

						case 'Tag Store':
						var tagstyle = 'background:#FF9833; border:none;';
						var tagsrc = filePath + "TagStore.png";
						break;

						
						case 'Estimate':
						var eststyle = 'background:#722CFD;border:none; ';
						var estsrc = filePath + "Estimate.png";
						break;

						case 'Work Order':
						var wostyle = 'background:#FF0000;border:none; ';
						var wosrc = filePath + "WorkOrder.png";
						break;

						case 'Installation':
						var instlstyle  = 'background:#00BAFB; border:none;';
						var instlsrc = filePath + "Installation.png";
						break;

						case 'Successful Delivery':
						var succstyle  = 'background:#0000FF; ';
						var succsrc = filePath + "Delivery.png";
						break;

						case 'No Activity':
						var noactstyle  = 'background:#FFFF33;border:none; ';
						var noactsrc = filePath + "smile.png";
						break;
					}


					infowindow[i] = new google.maps.InfoWindow
						({
						content:"<div id='custdetails' style='width:180px;height:auto; border:none #3F691E; border:.5px solid grey; padding: 5px 0px ; border-radius:5px'> <button style='position:relative; width:170px;margin:0px 5px; height:30px; text-align:center;font-size:14px; background-color: #4E4E4E; color:white; font-weight: 300;border-radius: 10px; padding: 2px 4px ;font-family: Verdana, Geneva, Tahoma, sans-serif; border:none;' onclick='NavCust(" + data[i].custid + ")'>GO TO CUSTOMER </button> <p style='font-size:14px; border:1px solid #3F691E ; margin: 4px;padding: 4px;border-radius: 4px; font-family: Verdana, Geneva, Tahoma, sans-serif'> <b>" + markerContent[i] + "</b></br>" + data[i].custAdd + "</br>"+ data[i].custCity +"</br>"+ data[i].custState + "</br>" + data[i].storeContact + "</br></p><div style='padding: 0px 0px;width: 172px;height: auto;display: block;margin: auto;position: relative; background-color:transparent; border:none grey'> <p style='font-size: 14px; color:black;position: relative; width: 140px; text-align: center;margin:auto;padding-bottom: 2px; height:14px; font-family: Verdana, Geneva, Tahoma, sans-serif'> <b>STATUS</b> </p><div style='position:relative;margin:auto;background: transparent;padding:0% 2%'><div id='"+ data[i].custid +"unassigned' style='border: 0px solid #666666;width: 35px;height: 35px;margin: 2px 1px;border-radius: 50px;padding: 2px; ;display: inline-block;"+ unassstyle +"' onclick='changeStatus(1," + data[i].custid + "," + data[i].lat + "," + data[i].lng +")'> <img src='"+ unasssrc + "' style='height: 100%;width: 100%;'></div><div id='"+ data[i].custid +"opportunity' style='border: none ;width: 35px;height: 35px;margin: 2px 1px;border-radius: 50px;padding: 2px; ;display: inline-block; "+oppstyle+"' onclick='changeStatus(2," + data[i].custid + "," + data[i].lat + "," + data[i].lng +")'> <img src='"+ oppsrc + "' style='height: 100%;width: 100%;'></div><div id='"+ data[i].custid +"tagstore' style='border: none ;width: 35px;height: 35px;margin: 2px 1px;border-radius: 50px;padding: 2px; ;display: inline-block;"+tagstyle+"' onclick='changeStatus(3," + data[i].custid +"," + data[i].lat + "," + data[i].lng +")'> <img src='"+ tagsrc + "' style='height: 100%;width: 100%;'></div><div id='"+ data[i].custid +"estimate' style='border: none ;width: 35px;height: 35px;margin: 2px 1px;border-radius: 50px;padding: 2px; ;display: inline-block;"+eststyle+"' onclick='changeStatus(4," + data[i].custid + "," + data[i].lat + "," + data[i].lng +")'> <img src='"+ estsrc + "' style='height: 100%;width: 100%;'></div><div id='"+ data[i].custid +"workorder' style='border: none ;width: 35px;height: 35px;margin: 2px 1px;border-radius: 50px;padding: 2px; ;display: inline-block; "+wostyle+"' onclick='changeStatus(5," + data[i].custid + "," + data[i].lat + "," + data[i].lng +")'> <img src='"+ wosrc + "' style='height: 100%;width: 100%;'></div><div id='"+ data[i].custid +"installation' style='border: none ;width: 35px;height: 35px;margin: 2px 1px;border-radius: 50px;padding: 2px; ;display: inline-block; "+instlstyle+"' onclick='changeStatus(6," + data[i].custid + "," + data[i].lat + "," + data[i].lng +")'> <img src='"+ instlsrc + "' style='height: 100%;width: 100%;'></div><div id='"+ data[i].custid +"delivery' style='border: none ;width: 35px;height: 35px;margin: 2px 1px;border-radius: 50px;padding: 2px; ;display: inline-block; "+succstyle+"' onclick='changeStatus(7," + data[i].custid + "," + data[i].lat + "," + data[i].lng +")'> <img src='"+ succsrc + "' style='height: 100%;width: 100%;'></div><div id='"+ data[i].custid +"noactivity' style='border: none ;width: 35px;height: 35px;margin: 2px 1px;border-radius: 50px;padding: 2px; position:relative ;display: inline-block; "+noactstyle+"' onclick='changeStatus(8," + data[i].custid + "," + data[i].lat + "," + data[i].lng +")'> <img src='"+ noactsrc + "' style='height: 100%;width: 100%;'></div></div></div></div>"});
					infowindow[i].open(mapadd, marker[i]);
					activeInfoWin = infowindow[i];
				     }
				}
			}
		});
	}
	google.maps.event.addListener(mapadd,"zoom_changed", function (event) {
		let zoomlevel = mapadd.getZoom();
		let latCurr = mapadd.getCenter().lat().toFixed(6);
		let lngCurr = mapadd.getCenter().lng().toFixed(6);
		let param = zoomlevel +"~"+ latCurr +"~"+ lngCurr;
		var scriptFM = "fmp://$/GasketApp.fmp12?script=setZoomLevel_TriggerJS&param="+param;
		window.location.href=scriptFM;

	});
	google.maps.event.addListener(mapadd,"click", function (event) 
	{
	    var lat = event.latLng.lat().toFixed(6);
	    var lng = event.latLng.lng().toFixed(6);
	    var latlng = new google.maps.LatLng(lat, lng);
	    var geocoder  = new google.maps.Geocoder;
	    var placeId = event.placeId;
		geocoder.geocode({'placeId':placeId}, function(result, status)
	    {
		if(status=='OK')
	    	{
	    		if(result[0])
	    		{
	    			var addressFull = result[0].formatted_address;
	    			var address="";
	    			for(var i=result[0].address_components.length-1 ; i >=0 ; i--)
	    			{
	    				if (result[0].address_components[i].types[0]=='postal_code') 
	    				{
	    					var postcode = result[0].address_components[i].long_name;
	    				}
	    				else if(result[0].address_components[i].types[0]=='country')
	    				{
	    					var country =  result[0].address_components[i].long_name;
	    				}
	    				else if(result[0].address_components[i].types[0]=='administrative_area_level_1')
	    				{
	    					var state = result[0].address_components[i].long_name;
	    				}
	    				else if(result[0].address_components[i].types[0]=='locality')
	    				{
	    					var city = result[0].address_components[i].long_name;
	    				}
	    				else if(result[0].address_components[i].types[0]=='intersection')
	    				{
	    					var address = result[0].address_components[i].long_name + ',' + address ;
	    				}
	    				else if(result[0].address_components[i].types[0]=='route')
	    				{
	    					var address = result[0].address_components[i].long_name + ',' + address ;
	    				}
	    				else if(result[0].address_components[i].types[0]=='street_address')
	    				{
	    					var address = result[0].address_components[i].long_name + ',' + address ;
	    				}
	    				else if(result[0].address_components[i].types[0]=='street_number')
	    				{
	    					var address = result[0].address_components[i].long_name + ',' + address ;
	    				}
	    				else if(result[0].address_components[i].types[0]=='"postal_code_suffix"')
	    				{
	    					// No need to get the address level of this
	    				}
	    			}
				fmData = address + '~' + state + '~' + city + '~' + country + '~' + postcode + '~' + placeId + '~' + lat+ '~' + lng + '~' + mapadd.getZoom();
	    			createNewCustomer();
			}
		}
		
	    });
	 });
	 getCurrLocation();
	 searchLocationAlt();
	}

	
	

function searchLocation()
{

	var srchVal = document.getElementById("inpSearch").value;
	if(srchVal.length> 3)
	{
		var service =  new google.maps.places.PlacesService(mapadd);
		var request = {
			query: srchVal,
			fields: [ 'formatted_address', 'geometry', 'icon', 'id', 'name', 'permanently_closed', 'photos', 'place_id', 'plus_code', 'scope', 'types'],
		  };
		service.findPlaceFromQuery(
			request , function(results, status)
		{
			if (status === google.maps.places.PlacesServiceStatus.OK) {
				for (var i = 0; i < results.length; i++) {
					createMarker(results[i]);
					
				}
			  }
		});
	}
}


function searchLocationAlt()
{
	var markersSearch = [];
	srchInput = document.getElementById("inpSearch");
	var searchBox = new google.maps.places.SearchBox(srchInput);
	mapadd.addListener('bounds_changed', function() {
		searchBox.setBounds(mapadd.getBounds());
	  });
	  searchBox.addListener('places_changed', function() {
		var places = searchBox.getPlaces();
		markersSearch.forEach(function(marker) {
			marker.setMap(null);
		});
		markersSearch = [];
		var bounds = new google.maps.LatLngBounds();
		if(places)
		{
			places.forEach(function(place) 
			{
				markersSearch.push(new google.maps.Marker({
					map: mapadd,
					position: place.geometry.location
				}));
			});
			}
		});

}

function getCurrLocation()
{
	
	// alert("gEOCODING");
	// if (navigator.geolocation) {
	// 	alert(navigator);
	// 	navigator.geolocation.getCurrentPosition(function(position) {
	// 		alert("gEOCODING");
	// 	  var pos = {
	// 		lat: position.coords.latitude,
	// 		lng: position.coords.longitude
	// 	  };
	// 	  console.log(pos);
	// 	  alert(pos);
	// 	});
	// }
	// else
	// {
	// 	alert("Geocoding not supported");
	// }
}

function createMarker(place) {
	var placeLoc = place.geometry.location;
	var marker = new google.maps.Marker({
		map: mapadd,
		position: place.geometry.location
	});
}

// Functions for calling the Filemaker scripts
function navigateCustomer(custid)
{
	var scriptFM = "fmp://$/GasketApp.fmp12?script=NavigateCustomer_TriggerJS&param="+custid;

	window.location.href= scriptFM;
}

function createNewCustomer()
{

	setTimeout(function()
	{
		var prmptbox = prompt('To create a new customer enter the name and click ok, else cancel.');
		if(prmptbox!==null && prmptbox!=='')
		{
			fmData =  fmData + '~' + prmptbox;
			var scriptFM = "fmp://$/GasketApp.fmp12?script=CreateNewCustomerWeb_TriggerJS&param="+fmData;
			window.location.href= scriptFM;
		}
		else
		{
			//alert('Customer name not entered or process aborted. Please try again.');
		}
	}, 500 );
	
}

function NavCust(id)
{
	setTimeout(navigateCustomer(id), 2000);
}
function changeStatus(opps, custid, lat, lng)
{
	
	if (opps==1) opps="unassigned";
	else if (opps==2) opps="opportunity";
	else if (opps==3) opps="tagstore";
	else if (opps==4) opps="estimate";
	else if (opps==5) opps="workorder";
	else if (opps==6) opps="installation";
	else if (opps==7) opps="successfuldelivery";
	else if (opps==8) opps="noactivity";

	var paramfm = opps +"~"+ custid +"~"+ lat +"~"+ lng;
	////alert(paramfm);
	var scriptFM = "fmp://$/GasketApp.fmp12?script=UpdateCustomer_TriggerJS&param="+paramfm;
	window.location.href=scriptFM;
}
