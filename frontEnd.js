var clock = document.getElementById("clock");

// Here be the flags m8
var stopWatchFlag = false;
var clockFlag	  = true;
var timerFlag     = false;
var stopWatchEnable = false;
var stopWatchBtnToggle = false;
var timerEnabledFlag = false; 

//To make things smarter we will define variables to redefine things, yet still retain functionality
//The idea is since everything is inside a single tick, a higher tick rate should make 
//things react faster
var tickRate = 100; //rate at which the tick action will be executed (in ms)
var clockCounterLimit = (1000 / tickRate) - 1;
var clockCounter 	 = 0;
var stopWatchCounter = 0;
var timerCounter = 0;

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

var calendarDIV 	= document.getElementById("calendar");

var stopWatchRunButton = document.getElementById("stopWatchBtn");

function intializeClockValues()
{
	var now = new Date();
	Clock.setTime(now.getHours(), now.getMinutes(), now.getSeconds());
}

//Initialize everything once the page loads, to avoid referencing unloaded things
window.onload = function()
{
	loadConfig();
	setDate();
	setInterval(tick, tickRate);

	//Display initial
	displayClock(clockDIV, hourDIV);
	displayDate(calendarDIV);
	displayTimer(timerDIV);
}

function frontEndStopWatchCheck()
{
	if(stopWatchEnable)
	{

	}
}

// Handling functions are defined as those which perform
// a form of check particular to a module, in order to elicit
// different behaviors.

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

	}
}

function timerHandling()
{
	if(timerEnabledFlag)
	{
		if(timerCounter >= clockCounterLimit)
		{
			timerCounter = 0;
			countdown(timerDIV);
		}
		else
		{
			timerCounter++;
		}
	}
}

// the tick function is called by setInterval to be executed every
// tickRate rate. 
function tick()
{
	//Execute Handlers
	clockHandling();
	stopWatchHandling();
	timerHandling();

	//Display Clock, Timer and StopWatch
	displayClock(clockDIV, hourDIV);
	stopWatchDisplay(stopWatchDIV);
	displayTimer(timerDIV);	


}

// Button functions

function stopWatchPlayPauseButton()
{
	if(!stopWatchBtnToggle)
	{
		stopWatchEnable = true;
		stopWatchRun();
		stopWatchBtnToggle = true;
		stopWatchRunButton.innerHTML = "Pause"
		oneInstanceStopWatch = true;
	}
	else
	{
		stopWatchCounter = 0;
		stopWatchBtnToggle = false;
		stopWatchRunButton.innerHTML = "Start"

	}
}

function timerStartButton()
{
	if(!timerEnabledFlag)
	{
		startTimer(hourField, minField, secField);
		displayTimer(timerDIV);	
		timerEnabledFlag = true;
	}
}

function timerResetButton()
{
	if(timerEnabledFlag)
	{
		resetTimer();
		timerEnabledFlag = false;
	}
}

function calendarSetButton()
{
	tempDay = parseInt(document.getElementById("InputDay").value)
	tempMonth = parseInt(document.getElementById("InputMonth").value);
	if(checkValidDay(tempDay, tempMonth))
	{
		day = tempDay;
		month = tempMonth;
		setDate();
		displayDate(calendarDIV);
	}
}

function setClockButton()
{
	Clock.setMinutes(document.getElementById("InputMinutes").value); 
	Clock.setSeconds(document.getElementById("InputSeconds").value); 
	Clock.setHours(document.getElementById("InputHours").value);
}


function stopWatchResetButton()
{
		stopWatchReset();
}

//Generic function that checks if a value is within certain range (including)
//If its within the limit, return true,
function checkLimit(value, min, max)
{
	if(value < max && value > min)
	{
		return true;
	}
	else
	{
		return false;
	}
}