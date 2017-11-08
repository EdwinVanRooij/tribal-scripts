// ==UserScript==
// @name         Timer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://nl57.tribalwars.nl/game.php?village=*&screen=place&try=confirm
// @grant        none
// ==/UserScript==
(function () {
    'use strict';

    var runInterval = 10; // in ms

    var runAt_hours;
    var runAt_minutes;
    var runAt_seconds;
    var runAt_milliseconds;

    var scheduled = false;

    addElements();

    /**
     * Schedules the attack.
     */
    function onScheduleButtonClicked() {
        scheduled = true;

        var textbox = document.getElementById('time-box');
        var value = textbox.value;
        var list = value.split(":");

        // Get current time in numbers
        runAt_hours = Number(list[0]);
        runAt_minutes = Number(list[1]);
        runAt_seconds = Number(list[2]);
        runAt_milliseconds = Number(list[3]);

        notifyScheduled();
    }

    /**
     * User feedback, notifies of schedule.
     */
    function notifyScheduled() {
        var body = document.getElementById('inner-border');
        var label;

        label = document.createElement('label');
        label.appendChild(document.createTextNode(' Scheduled attack at ' + runAt_hours + ':' + runAt_minutes + ':' + runAt_seconds + '.' + runAt_milliseconds + '.'));
        body.appendChild(label);
    }

    /**
     * Adds HTML elements
     */
    function addElements() {
        var body = document.getElementById('inner-border');
        var label, textbox, button;

        label = document.createElement('label');
        label.appendChild(document.createTextNode('Arrive at (format hh:mm:SS:sss):'));
        textbox = document.createElement('input');
        textbox.type = 'text';
        textbox.id = 'time-box';
        label.appendChild(textbox);
        body.appendChild(label);

        // Create button with text
        button = document.createElement("button");
        button.classList.add('troop_confirm_go');
        button.classList.add('btn');
        button.classList.add('btn-attack');
        button.appendChild(document.createTextNode("Schedule"));
        button.onclick = onScheduleButtonClicked;

        body.appendChild(button);
    }

    /**
     * Get the time when troops arrive at destination, according to Tribalwars calculations.
     */
    function getTimeOfArrivalString() {
        // Get time of arrival
        var timeElement = document.getElementById('date_arrival');
        var arrivalList = timeElement.innerText.split(" ");
        return arrivalList[arrivalList.length - 1];
    }


    /**
     * Fires the original attack button.
     */
    function clickAttack() {
        var original_btn_attack = document.getElementsByClassName('troop_confirm_go btn btn-attack')[0];
        original_btn_attack.click();
        console.log('Clicking attack');
    }

    /**
     * Checks whether or not the current ms is within the interval range.
     */
    function msWithinIntervalRange(currentMs, msToRunAt, interval) {
        if (currentMs > msToRunAt) {
            // We're now just past the ms to run at
            var difference = currentMs - msToRunAt;
            // Make sure we don't press the button again, in the next interval
            if (difference < interval * 4) { // *4, safety measure. In case we missed clicking it before, click it anyway. Better late than never.
                return true;
            }
        }
        return false;
    }

    function run() {
        if (!scheduled) return;

        var time = getTimeOfArrivalString();
        var timeList = time.split(":");

        var date = new Date();

        var currentHours = Number(timeList[0]);
        var currentMinutes = Number(timeList[1]);
        var currentSeconds = Number(timeList[2]);
        var currentMilliseconds = date.getMilliseconds();

        if (currentHours === runAt_hours && currentMinutes === runAt_minutes && currentSeconds === runAt_seconds) { // Check if we're at the right second
            if (msWithinIntervalRange(currentMilliseconds,runAt_milliseconds, runInterval)) { // if current ms is within the interval range
                clickAttack();
                console.log('Clicking');
            } else {
                // console.log('Not clicking #1');
            }
        }
    }

    setInterval(function () {
        run();
    }, runInterval);
})();
