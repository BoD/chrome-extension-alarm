async function main() {
    logd("Service worker");

    const existingAlarm = await chrome.alarms.get("myAlarm");
    if (existingAlarm) {
        logd("Alarm is already scheduled: ignore");
    } else {
        logd("Scheduling alarm");
        await chrome.alarms.create("myAlarm", { periodInMinutes: 1, delayInMinutes: 1 });
    }

    chrome.alarms.onAlarm.addListener(async (alarm) => {
        logd("Alarm triggered");
        await executeHttpCall();
    });
}

async function executeHttpCall() {
    logd("Executing HTTP call");
    const url = "https://server.jraf.org/xxxx";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            logd("HTTP call failed");
        } else {
            const json = await response.json();
            log.d("HTTP call succeeded");
        }
    } catch (error) {
        logd("HTTP call failed: " + error);
    }
}

function logd(message) {
    console.log(`${(new Date()).toLocaleString()} - ${message}`);
}

main();
