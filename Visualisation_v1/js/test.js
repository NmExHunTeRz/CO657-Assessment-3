/*
	Initial tests to get JSON data from shed.kent.ac.uk
	Author: H Nguyen
 */
//====================================================================================

/* 
	GET Sites
	Returns 5 results with attributes: country_code, name, lat, lon, altitude, name, time_zone, zones: {name, id}
 */
function getSites() {
	url = "http://shed.kent.ac.uk/sites";
	$.get(url, function(data) {
		var table = "<table><thead><tr><th>ID</th><th>Name</th><th>Country</th><th>Location</th><th colspan='2'>Zones</th></tr></thead>"
				  + "<tbody>";
		$.each(data, function(index, item) {
			var rows = item.zones.length + 1;
			table += "<tr>"
			      +  "<td rowspan='" + rows + "'>" + item.id + "</td>"
			      +  "<td rowspan='" + rows + "'>" + item.name + "</td>"
			      +  "<td rowspan='" + rows + "'>" + item.country_code + "</td>"
			      +  "<td rowspan='" + rows + "'>lat: " + item.lat + ", lng:" + item.lon + ", alt: " + item.al + "</td>";
			$.each(item.zones, function(zoneindex, zone) {
				table += "<tr><td>" + zone.id + "</td><td>" + zone.name + "</td></tr>";
			});
		});
		table += "</tr></tbody></table>";
		$('#sites').html(table);
	})
		.fail(function(data) {
			console.log(data);
		});
}

/* 
	GET devices
 */
function getDevices() {
	url = "http://shed.kent.ac.uk/devices";
	$.get(url, function(data) {

	});
}

/* 
	GET device
 */
function getDevice() {
	url = "http://shed.kent.ac.uk/devices";
	$.get(url, function(data) {

	});
}