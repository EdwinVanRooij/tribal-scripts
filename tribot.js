var wood = "wood";
var stone = "stone";
var iron = "iron";

function getStock(type) {
    return document.getElementById("premium_exchange_stock_" + type).innerHTML;
}

function getInputField(type) {
     return document.getElementById("premium_exchange_buy_" + type).getElementsByClassName("premium-exchange-input")[0];
}
function getRate(type) {
    return document.getElementById("premium_exchange_rate_" + type).getElementsByClassName("premium-exchange-sep")[0].textContent.replace(/\s/g, '');
}

function setValue(stock, rate, inputField) {
    if (stock >= rate) {
        var remaining = stock % rate;
        inputField.value = stock - remaining;
        return true;
    } else {
        inputField.value = "";
        return false;
    }
}

function run() {
    var woodStock = getStock(wood);
    var woodInput = getInputField(wood);
    var woodRate = getRate(wood);
    var woodResult = setValue(woodStock, woodRate, woodInput);

    var stoneStock = getStock(stone);
    var stoneRate = getRate(stone);
    var stoneInput = getInputField(stone);
    var stoneResult = setValue(stoneStock, stoneRate, stoneInput);

    var ironStock = getStock(iron);
    var ironRate = getRate(iron);
    var ironInput = getInputField(iron);
    var ironResult = setValue(ironStock, ironRate, ironInput);

    if (woodResult || stoneResult || ironResult) {
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
