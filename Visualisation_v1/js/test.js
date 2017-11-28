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
	Returns 35 devices sorted by sensor type
 */
var devices = [];
function getDevicesID() {
	url = "http://shed.kent.ac.uk/devices";
	$.get(url, function(data) {
		var table = "<table><thead><tr><th>Type</th><th>ID</th></tr></thead>"
				  + "<tbody>";
		$.each(data, function(index, item) {
			var key = index;
			var rows = item.length + 1;
			table += "<tr><td rowspan='" + rows + "'>" + key + "</td>"
			$.each(item, function(itemindex, id) {
				table += "<tr><td>" + id + "</td></tr>";
				devices.push(id);
			});
			table += "</tr>"
		});
		table += "</tbody></table>";
		$('#devices_id').html(table);
		getDevicesInfo();
	});
}

/* 
	GET device
	Populate table with results for each device
 */
function getDevicesInfo() {
	url = "http://shed.kent.ac.uk/device/";
	var table = "<table><thead><tr><th>ID</th><th>Name</th><th>Site</th><th>Zone</th><th>Last Connection</th><th>Software Version</th></tr></thead>"
			  + "<tbody>";
	$.each(devices, function(index, item) {
		var query = url + item;
		$.get(query, function(data) {
			table += "<tr>"
			      +  "<td>" + data.id + "</td>"
			      +  "<td>" + data.name + "</td>"
			      +  "<td>" + data.site_id + "</td>"
			      +  "<td>" + data.zone_id + "</td>"
			      +  "<td>" + data.last_connection + "</td>"
			      +  "<td>" + data.software_version + "</td>"
			      +  "</tr>";
			console.log(table);
			console.log("");
			if (index == devices.length - 1) {
				table += "</tbody></table>";
				$('#devices').html(table);
			}
		});
	});
}