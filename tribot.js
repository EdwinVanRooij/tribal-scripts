function run() {
    var wood = document.getElementById("premium_exchange_stock_wood").innerHTML;
    var stone = document.getElementById("premium_exchange_stock_stone").innerHTML;
    var iron = document.getElementById("premium_exchange_stock_iron").innerHTML;

    var woodInput = document.getElementById("premium_exchange_buy_wood").getElementsByClassName("premium-exchange-input")[0];
    var stoneInput = document.getElementById("premium_exchange_buy_stone").getElementsByClassName("premium-exchange-input")[0];
    var ironInput = document.getElementById("premium_exchange_buy_iron").getElementsByClassName("premium-exchange-input")[0];

    var atleastOne = false;

    var price = 64;
    var price = document.getElementById("premium_exchange_rate_wood").getElementsByClassName("premium-exchange-input")[0];
    if (wood >= price) {
        var remaining = wood % price;
        var numberToInput = wood - remaining;
        woodInput.value = numberToInput;
        atleastOne = true;
    } else {
        woodInput.value = 0;
    }

    if (stone >= price) {
        var remaining = stone % price;
        var numberToInput = stone - remaining;
        stoneInput.value = numberToInput;
        atleastOne = true;
    } else {
        stoneInput.value = 0;
    }

    if (iron >= price) {
        var remaining = iron % price;
        var numberToInput = iron - remaining;
        ironInput.value = numberToInput;
        atleastOne = true;
    } else {
        ironInput.value = 0;
    }

    if (atleastOne) {
        setTimeout(function () {
            clickButtons();
        }, 500);
    }

    console.log('Code ran');
}

function clickButtons() {
    setTimeout(calculate(), 250);
    setTimeout(confirm(), 250);
}

function confirm() {
    var confirmButton = document.getElementsByClassName("btn evt-confirm-btn btn-confirm-yes")[0];
    confirmButton.click();
}

function calculate() {
    var calculateButton = document.getElementsByClassName("btn float_right btn-premium-exchange-buy")[0];
    calculateButton.click();
}

setInterval(function () {
    run();
}, 210);
