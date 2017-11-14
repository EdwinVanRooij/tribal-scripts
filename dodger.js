var hours = 13;
var minutes = 23;
var seconds = 22;
var ms = 166;

var loadMargin = 200;

var now = new Date();
var msTillGoal = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, seconds, ms) - now + loadMargin;

var selectAll = document.getElementById("selectAllUnits");
var targetAttack = document.getElementById("target_attack");

setTimeout(function(){

selectAll.click();
targetAttack.click();

}, msTillGoal);
