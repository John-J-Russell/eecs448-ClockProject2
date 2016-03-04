var clock = document.getElementById("clock");

// Here be the flags m8
var stopWatchFlag = false;
var clockFlag	  = true;
var timerFlag     = false;
var stopWatchEnable = false;
var stopWatchBtnToggle = false;

//To make things smarter we will define variables to redefine things, yet still retain functionality
//The idea is since everything is inside a single tick, a higher tick rate should make 
//things react faster
var tickRate = 250; //rate at which the tick action will be executed (in ms)
var clockCounterLimit = (1000 / tickRate) - 1;
var clockCounter 	 = 0;
var stopWatchCounter = 0;
// Declare the window elements
var clockDIV	 = document.getElementById("clock");
var stopWatchDIV = document.getElementById("stopWatch");
var timerDIV	 = document.getElementById("timer");

var hourDIV	 	 = document.getElementById("clock-hour");
//var minuteDIV	 = document.getElementById("clock-minute");
//var secondDIV	 = document.getElementById("clock-second");

var oneInstanceStopWatch = 0;

function intializeClockValues()
{
	var now = new Date();
}


//Initialize everything once the page loads, to avoid referencing unloaded things
window.onload = function()
{
	loadConfig();
	setDate();
	setInterval(tick, tickRate);
}

function frontEndStopWatchCheck()
{
	if(stopWatchEnable)
	{

	}
}

// tick function is called 
function tick()
{
	//Check counters

	if(clockCounter >= clockCounterLimit)
	{
		clockCounter = 0;
		Clock.tick();
		displayClock(clockDIV, hourDIV);
	}
	else
	{
		clockCounter++;
	}
	if(stopWatchCounter >= clockCounterLimit && stopWatchEnable && stopWatchBtnToggle)
	{
		stopWatchRun();
		stopWatchDisplay(stopWatchDIV);
	}
	else if(stopWatchEnable && stopWatchBtnToggle)
	{
		stopWatchCounter++;
	}
	else
	{
		//nothing
	}
	//Display Clock
}

function stopWatchPlayPauseButton()
{
	if(stopWatchBtnToggle)
	{
		stopWatchEnable = true;
		stopWatchRun();
		stopWatchBtnToggle = false;
		oneInstanceStopWatch = true;
	}
	else
	{
		stopWatchBtnToggle = true;

	}
}