function processData(sensors) {
    // Create a hierarchical structure
    const hierarchy = {};

    // Process each sensor entry
    sensors.forEach(sensor => {
        // Create group if it doesn't exist
        if (!hierarchy[sensor.group]) {
            hierarchy[sensor.group] = {
                name: sensor.group,
                devices: {}
            };
        }

        // Create device if it doesn't exist in the group
        if (!hierarchy[sensor.group].devices[sensor.device]) {
            hierarchy[sensor.group].devices[sensor.device] = {
                name: sensor.device,
                sensors: {}
            };
        }

        // Create sensor if it doesn't exist in the device
        if (!hierarchy[sensor.group].devices[sensor.device].sensors[sensor.sensor]) {
            hierarchy[sensor.group].devices[sensor.device].sensors[sensor.sensor] = {
                name: sensor.sensor,
                channels: []
            };
        }

        // Add channel information
        hierarchy[sensor.group].devices[sensor.device].sensors[sensor.sensor].channels.push({
            id: sensor.channel,
            raw: sensor.channel_raw,
            lastValue: sensor.lastvalue,
            status: sensor.status
        });
    });

    return hierarchy;
}

// Example usage:
const fs = require('fs');
const sensorsData = JSON.parse(fs.readFileSync('./sensors.json'));
const organizedData = processData(sensorsData.sensors);

// Print example of the structured data
console.log('Groups:', Object.keys(organizedData));

// Example: Print devices for first group
const firstGroup = Object.keys(organizedData)[0];
console.log(`\nDevices in ${firstGroup}:`, 
    Object.keys(organizedData[firstGroup].devices));

// Example: Print sensors for first device in first group
const firstDevice = Object.keys(organizedData[firstGroup].devices)[0];
console.log(`\nSensors in ${firstDevice}:`,
    Object.keys(organizedData[firstGroup].devices[firstDevice].sensors));

// Save organized data to a new file
fs.writeFileSync(
    'organized-sensors.json', 
    JSON.stringify(organizedData, null, 2)
);
