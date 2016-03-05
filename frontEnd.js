var clock = document.getElementById("clock");

// Here be the flags m8
var stopWatchFlag = false;
var clockFlag	  = true;
var timerFlag     = false;
var stopWatchEnable = false;
var stopWatchBtnToggle = false;
var timerEnabledFlag = false; 

var Military = false;
var isThisGinJointVisible = true;

//To make things smarter we will define variables to redefine things, yet still retain functionality
//The idea is since everything is inside a single tick, a higher tick rate should make 
//things react faster
var tickRate = 100; //rate at which the tick action will be executed (in ms)
var clockCounterLimit = (1000 / tickRate) - 1;
var clockCounter 	 = 0;
var stopWatchCounter = 0;
var timerCounter = 0;

var currentZoomLevel = 2;

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

var calendarDIV   	 = document.getElementById("calendar");

var clockModeMenu 	 = document.getElementById("amORpm");

//Dynamic Button Text Changing Variablesß
var stopWatchRunButton  = document.getElementById("stopWatchBtn");
var clockMilitaryButton = document.getElementById("clockMilBtn");
var stopTimerButton   	= document.getElementById("pauseTimerBtn");

// Initialize Clock to the system time
function intializeClockValues()
{
	var now = new Date();
	var tempHour = Clock.toCivilianTime(now.getHours());
	Clock.setTime(tempHour, now.getMinutes(), now.getSeconds());
}

//Initialize everything once the page loads, to avoid referencing unloaded things
window.onload = function()
{
	loadConfig();
	intializeClockValues();
	setDate();
	setInterval(tick, tickRate);
	//Display initial
	displayClock(clockDIV, hourDIV);
	displayDate(calendarDIV);
	displayTimer(timerDIV);
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
	displayDate(calendarDIV);
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
		stopWatchBtnToggle = false	;
		stopWatchRunButton.innerHTML = "Start"

	}
}

function stopWatchResetButton()
{
		stopWatchReset();
		stopWatchCounter = 0; // Reset the counter as well
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

function timerPauseButton()
{
	//Handle the dynamic button text
	if(timer.tickTockOrNot)
	{
		stopTimerButton.innerHTML = " Resume ";
	}
	else
	{
		stopTimerButton.innerHTML = " Pause ";
	}
	switchTickTockOrNot();
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
	var tempHour = document.getElementById("InputHours").value;
	var tempMin  = document.getElementById("InputMinutes").value;
	var tempSec  = document.getElementById("InputSeconds").value;
	var tempampm = document.getElementById("amORpm").value;
	if(checkValidTimeInput(tempHour, tempMin, tempSec,tempampm))
	{
		Clock.setHours(tempHour);
		Clock.setMinutes(tempMin); 
		Clock.setSeconds(tempSec); 
		Clock.setAM_PM(tempampm);
	}
	clockCounter = 0;
	
}

function setClockMilitaryButton()
{
	if(!Military)
	{
		Military = true;
		clockModeMenu.style.display = 'none';
		clockMilitaryButton.innerHTML = "Civilian Time";
		Clock.setMilitary(true);
	}
	else
	{
		Military = false;
		clockMilitaryButton.innerHTML = "Military Time";
		clockModeMenu.style.display = 'inline-block';
		Clock.setMilitary(false);
	}
	Clock.transformToCorrectMode();
}

function shutDownThisJointButton()
{
	if(isThisGinJointVisible)
	{
		document.getElementById("main-content").style.visible = 'none';
		isThisGinJointVisible = false;
	}
	else
	{
		document.getElementById("main-content").style.visible = 'inline-block';
		isThisGinJointVisible = true;
	}
}

//Input sanitizing functions - Temp location
//May be a bit too specific to be defined here
function checkValidTimeInput(_hour, _min,_sec)
{
	if(Clock.getMilitary == true)
	{
		if(_hour >= 0 && _hour < 24)
		{
			if(_min >= 0 && _min < 60)
			{
				if(_sec >= 0 && _sec < 60)
				{
					return true;
				}
			}
		}
	}
	else
	{
		if(_hour > 0 && _hour < 13)
		{
			if(_min >= 0 && _min < 60)
			{
				if(_sec >= 0 && _sec < 60)
				{
					return true;
				}
			}
		}
	}
	return false;
}


function zoomIn()
{
	currentZoomLevel++;
	resizeTextElements();
}

function zoomOut()
{
	if(currentZoomLevel > 0)
	{
		currentZoomLevel--;
		resizeTextElements();
	}
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

function resizeTextElements()
{
	document.querySelector('.controls h1').style.fontSize = (20 * currentZoomLevel)+"px";
	document.querySelector('.object').style.fontSize = (30 * currentZoomLevel)+"px";

}