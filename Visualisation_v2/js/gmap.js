/*
	Stores a list of sensor devices and display them using the Gooogle Maps API
	Author: H Nguyen
*====================================================================================*/

var sensors = [];
var sensorNames = [];
var sensorTypes = {};
var sites = {};

/* 
	Make the initial AJAX call with GET/sites to setup array to store information about each site
 */
function initData() {
	url = "http://shed.kent.ac.uk/sites";
	$.get(url, function(data) {
		$.each(data, function(index, item) {
			sites[item.id] = {};
			sites[item.id].name = item.name;
			sites[item.id].loc = {"lat": item.lat, "lng": item.lon};
			sites[item.id].devices = [];
		});
		// Now get all device ID's 
		getDevices();
	});
}

/* 
	GET devices
	Returns 35 device names sorted by sensor type
*/
function getDevices() {
	url = "http://shed.kent.ac.uk/devices";
	$.get(url, function(data) {
		sensorTypes = data;
		// Keep list of devices all in one array for ease of iteration
		$.each(data, function(index, item) {
			$.each(item, function(itemindex, id) {
				sensorNames.push(id);
			});
		});
		// Now associate each device with their respective site
		getDevicesInfo();
	});
}

/* 
	Add devices information to sites array
*/
function getDevicesInfo() {
	url = "http://shed.kent.ac.uk/device/";
	$.each(sensorNames, function(index, item) {
		var query = url + item;
		$.get(query, function(data) {
			var i = new Device(data.id, data.name, data.site_id, data.last_connection);
			//Add object to appropriate arrays
			sites[data.site_id].devices.push(i);
			sensors.push(i);
			//Add sensor type
			$.each(sensorTypes, function(index, item) {
				$.each(item, function(itemindex, id) {
					if (i.id == id) {
						i.type = index;
						console.log("Finished Adding Sensor!");
					}
				});
			});

			if (sensors.length == sensorNames.length) {
				//Get the last known measurement for each device for display
				updateData();
				log();
			}
		});
	});
}

function updateData() {
	url = "http://shed.kent.ac.uk/device/";
	$.each(sensors, function(index, item) {
		var query = url + item.id + "/10minute";
		$.get(query, function(data) {
			if (item.type == "gas") item.data = data.gas_values;
			else if (item.type == "solar") item.data = data.solar_values;
			else if (item.type == "hydrometer") item.data = data.moisture_values;
			else if (item.type == "tempHumid") {
				item.data = data.temperature_values;
				item.humidity = data.humidity_values;
			}
			else if (item.type == "lumosity") item.data = data.light_values;
		});
	});
}

function Device(id, name, site, last_connection) {
	this.id = id;
	this.name = name;
	this.site = site;
	this.last_connection = last_connection;
	this.data = null;
	this.humidity = null; //Optional
	this.type = null;
}

function log() {
	console.log(sites);
	// console.log(sensors);
}