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
var tickRate = 100; //rate at which the tick action will be executed (in ms)
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

var timerHourDIV	 = document.getElementById("timer-hour");
var timerMinuteDIV	 = document.getElementById("timer-minute");
var timerSecondDIV	 = document.getElementById("timer-second");


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
	displayClock(clockDIV, hourDIV);
}

function frontEndStopWatchCheck()
{
	if(stopWatchEnable)
	{

	}
}

function clockHandling()
{
	if(clockCounter >= clockCounterLimit)
	{
		clockCounter = 0;
		Clock.tick();
	}
	else
	{
		clockCounter++;
	}
}

function stopWatchHandling()
{
	if(stopWatchBtnToggle)
	{
		if(stopWatchCounter >= clockCounterLimit)
		{
			stopWatchCounter = 0;
			stopWatchRun();
		}
		else
		{
			stopWatchCounter++;
		}
	}
	else
	{
		stopWatchCounter = 0;
	}
}

function timerHandling()
{
	if(timerBtnToggle)
	{
		if(timerCounter >= clockCounterLimit)
		{
			timerCounter = 0;
			countdown();
		}
		else
		{
			timerCounter++;
		}
	}
}

// tick function is called 
function tick()
{
	//Execute Handlers
	clockHandling();
	stopWatchHandling();
	
	//Display Clock, Timer and StopWatch
	displayClock(clockDIV, hourDIV);
	stopWatchDisplay(stopWatchDIV);
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
		stopWatchCounter = 0;
		stopWatchBtnToggle = true;
	}
}