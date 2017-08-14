// ==UserScript==
// @name         Timer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  time shit
// @author       You
// @match        https://nl*.tribalwars.nl/game.php?village=*&screen=place&try=confirm
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    var confirmAttackButton = document.getElementsByClassName('troop_confirm_go btn btn-attack')[0];

    var runInterval = 10; // in ms

    var hours;
    var minutes;
    var seconds;
    var milliseconds;

    function onButtonClick() {
        console.log('button clicked');

        var textbox = document.getElementById('time-box');
        var value = textbox.value;
        var list = value.split(":");
        hours = Number(list[0]);
        minutes = Number(list[1]);
        seconds = Number(list[2]);
        milliseconds = Number(list[3]);
    }

    function clickAttack() {
        confirmAttackButton.click();
        console.log('Clicking attack');
    }

    function addElements() {
        var body = document.getElementById('inner-border');

        var label, textbox, button;

        label = document.createElement('label');
        label.appendChild(document.createTextNode('Time (format: hh:mm:SS:sss)  '));
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
        button.appendChild(document.createTextNode("Start Backtimer"));
        button.onclick = onButtonClick;

        body.appendChild(button);
    }

    function msWithinIntervalRange(currentMs, msToRunAt, interval) {
        if (currentMs > msToRunAt) {
            // We're now just past the ms to run at
            var difference = currentMs - msToRunAt;
            // Make sure we don't press the button again, in the next interval
            if (difference < interval) {
                return true;
            }
        }
        return false;
    }

    function logTime(extra, hours, minutes, seconds, milliseconds) {
        console.log(extra + 'Hours: ' + hours + ', mins: ' + minutes + ', seconds: ' + seconds + ', ms: ' + milliseconds);
    }

    function getCurrentTimeOfArrival() {
        var timeElement = document.getElementById('date_arrival');
        var arrivalList = timeElement.innerText.split(" ");
        return arrivalList[arrivalList.length - 1];
    }

    function run() {
        var time = getCurrentTimeOfArrival();
        var timeList = time.split(":");

        var date = new Date();

        var aHours = Number(timeList[0]);
        var aMinutes = Number(timeList[1]);
        var aSeconds = Number(timeList[2]);
        var aMilliseconds = date.getMilliseconds();

        if (aHours === hours && aMinutes === minutes && aSeconds === seconds) { // Check if we're at the right second
            if (msWithinIntervalRange(aMilliseconds, milliseconds, runInterval)) { // if current ms is within the interval range
                clickAttack();
                console.log('Clicking #0');
            } else {
                console.log('Not clicking #1');
            }
        } else {
            logTime('Current time of arrival: ', aHours, aMinutes, aSeconds, aMilliseconds);
            logTime('Waiting for time of arrival: ', hours, minutes, seconds, milliseconds);
        }
    }

    addElements();
    setInterval(function () {
        run();
    }, runInterval);
})();
