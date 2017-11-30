/*
	JavaScript to generate a map using the Google Maps API and the data provided
	Author: H Nguyen
 */
//====================================================================================

var centerPos = {lat: 51.308340, lng: 1.102324}
var mapOptions = {
	zoom: 16,
	center: centerPos,
	mapTypeControl: false,
	mapTypeId: 'satellite',
};


/*
	Create an object containing the JS Google Map at the specified div.
*/
function IoTMap(mapDiv, dataDiv) {
	this.prevInfoWindow = false;
	this.sites = {};
	this.markers = [];
	//Initialize map object
	this.map = new google.maps.Map(document.getElementById(mapDiv), mapOptions);
	// Add our sites markers
	addSiteMarkers(this, dataDiv);
}

/*
	Add in each site as a marker, and 
*/
function addSiteMarkers(mapObject, dataDiv) {
	$.each(window.sites, function(siteIndex, site) {
		var marker = new google.maps.Marker({
			position: site.loc,
			map: mapObject.map,
		});
		marker.setIcon(site.icon);
		marker.addListener('click', function() {
			var str =  "<ul>";
			$.each(site.devices, function(deviceIndex, device) {
				str += "<li>" + device.name + ": " + device.data[device.data.length - 1][1] + "</li>";
			});
			str += "</ul>";
			$(dataDiv).html(str);
		});
	});
	// console.log(window.sites);
}