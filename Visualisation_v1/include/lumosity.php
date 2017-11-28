<?php

$device_id = "gh3_east_door_temp";
$sample_rate = "hour";
$results = json_decode(file_get_contents("http://shed.kent.ac.uk/device/$device_id/$sample_rate"));

foreach ($results->humidity_value as $result) {
    print_r($result);
    print_r("<br>");
    print_r("<br>");
}