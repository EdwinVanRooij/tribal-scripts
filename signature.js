// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://nl57.tribalwars.nl/game.php?*screen=mail*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function setSignature(textBox) {
        textBox.value = "\r\n\r\n" +
            "\r\n" +
            "[color=#4b0000]_______________________[/color]\r\n" +
            "[color=#742e2e]Met vriendelijke groet,[/color]\r\n" +
            "\r\n" +
            "[color=#c65555]~[/color] [color=#a50000]team Der Eddymeister[/color]";
    }

    var pmTextBox = document.getElementsByClassName('easy-submit')[0];
    if (pmTextBox) {
        setSignature(pmTextBox);
    }
    var forumTextBox = document.getElementById('message');
    if (forumTextBox) {
        setSignature(forumTextBox);
    }
})();
