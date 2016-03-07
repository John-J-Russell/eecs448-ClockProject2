/*
** EECS 448 Project #2: Clock
** Most methods from this file are connected with frontEnd.html to handle button clicks 
** Authors: Alec Knutsen, Cesar Avalos, John Russell, Yarden Tamir 
** Last update: March 5, 2016.
*/

/**
* Flag variable for the stop watch
*/
var stopWatchFlag = false;
/**
* Flag variable for the clock
*/
var clockFlag	  = true;
/**
* Flag variable for the timer 
*/
var timerFlag     = false;
/**
* Flag variable for the stop watch
*/
var stopWatchEnable = false;
/**
* Flag variable for the stop watch
*/
var stopWatchBtnToggle = false;
/**
* Flag variable for the timer
*/

var timerEnabledFlag = false; 
/**
* Flag variable for military/civilian time 
*/

var Military = false;
/**
* Flag variable for page visibility 
*/
var isThisGinJointVisible = true;

//To make things smarter we will define variables to redefine things, yet still retain functionality
//The idea is since everything is inside a single tick, a higher tick rate should make 
//things react faster
/**
* tickRate - 100ms 
*/
var tickRate = 100; // rate at which the tick action will be executed (in ms)
/**
* clockCounterLimit is 10 --> 10 * 100ms = 1 second 
*/
var clockCounterLimit = (1000 / tickRate) - 1; // We will take in ten clock ticks 10 * 100 ms =1000 ms until we preform an action 
/**
* clockCounter will go from 1 to 10 then reset to run every one second 
*/
var clockCounter 	 = 0;
/**
* stopWatchCounter will go from 1 to 10 then reset to run every one second 
*/
var stopWatchCounter = 0;
/**
* timerCounter will go from 1 to 10 then reset to run every one second 
*/
var timerCounter = 0;


/**
* Wrapper element for clockDisplay 
*/
var clockDIV	 = document.getElementById("clock"); 
/**
* HTML Element where the clock is actually displayed 
*/
var hourDIV	 	 = document.getElementById("clock-hour"); 
/**
* HTML Element for where the stopwatch time is displayed 
*/
var stopWatchDIV = document.getElementById("stopWatch"); 
/**
* HTML Element for where the timer is displayed
*/
var timerDIV	 = document.getElementById("timer"); 
/**
* HTML Element where the date is displayed 
*/
var calendarDIV   	 = document.getElementById("calendar"); 



/**
* Dropdown select item for am_pm 
*/
var clockModeMenu 	 = document.getElementById("amORpm"); 
/**
* Button to start pause stopwatch  
*/
var stopWatchRunButton  = document.getElementById("stopWatchBtn"); 
/**
* Button to swtich from civilian to military time and vice versa 
*/
var clockMilitaryButton = document.getElementById("clockMilBtn"); 
/**
* Button to pause/restart Timer 
*/
var stopTimerButton   	= document.getElementById("pauseTimerBtn"); 

/**
	 * Uses the current date to set the clock using toCivilianTime and setTime functions from clock.js 
	 * Called in the window.onload() function below 
	 * @author  Cesar Avalos 
	 * @see - clock.js, window.onload()
*/
function intializeClockValues()
{
	var now = new Date(); // Get the current date 
	
	var tempHour = Clock.toCivilianTime(now.getHours()); // Convert the time to civilian time using the method from Clock.js 
	
	Clock.setTime(tempHour, now.getMinutes(), now.getSeconds()); // Call the setTime method from Clock.js to set the time 
}

/**
	 * Initialize everything once the page loads, to avoid referencing unloaded things. Calls methods from aLl other javascript files 
	 * @author  Cesar Avalos 
	 * @see - cache.js, calendar.js, clock.js, timer.js 
*/
window.onload = function()
{
	loadConfig(); // Function from cache.js 
	
	intializeClockValues(); // Function from this file to initialize clock 
	
	setDate(); // Function from calendar.js o initialize the date 
	
	setInterval(tick, tickRate); // Generic javascript function. Calls the tick method at frequency of tickRate 
	
	displayClock(clockDIV, hourDIV); // Call displayClock method from clock.js to initially display the clock 
	
	displayDate(calendarDIV); // Call the displayDate method from calendar.js to display the date 
	
	displayTimer(timerDIV); // Call the displayTimer method from timer.js to display the timer time 
}


/**
	 * Handling functions are defined as those which perform a form of check particular to a module, in order to elicit different behaviors.
	 * Uses the clock.tick method from the clock.js file.
	 * Called in the tick method from this file 
	 * @author Cesar Avalos 
	 * @see - clock.js, tick()
*/
function clockHandling()
{
	//If our counter has gone over the limit, reset the counter and call the tick method from the clock.js file 
	if(clockCounter >= clockCounterLimit)
	{
		clockCounter = 0;
		Clock.tick();
	}
	//If our counter is not over the limite, reiterate the counter 
	else
	{
		clockCounter++;
	}
}

/**
	 * Handling functions are defined as those which perform a form of check particular to a module, in order to elicit different behaviors.
	 * Uses the stopWatchRun() method from the stopWatch.js file.
	 * Called in the tick method from this file 
	 * @author Cesar Avalos 
	 * @see - stopwatch.js, tick()
*/
function stopWatchHandling()
{
	//If the stopwatch is running 
	if(stopWatchBtnToggle)
	{
		//If the counter has reached the limit, reset the counter and call the stopWatchRun method from the stopWatch.js file 
		if(stopWatchCounter >= clockCounterLimit)
		{
			stopWatchCounter = 0;
			stopWatchRun();
		}
		//If the counter has not reached the limit, iterate the counter 
		else
		{
			stopWatchCounter++;
		}
	}
}

/**
	 * Handling functions are defined as those which perform a form of check particular to a module, in order to elicit different behaviors.
	 * Uses the countdown(), resetTimer() methods from the timer.js file.
	 * Called in the tick method from this file 
	 * @author  Cesar Avalos 
	 * @see - timer.js, tick()
*/
function timerHandling()
{
	//If the timer is running 
	if(timerEnabledFlag)
	{
		//If the timer has reached 0 
		if(isTimerZero())
		{
			console.log("timer is 0"); // Log message 
			
			var audio = new Audio('STOP.mp3'); // Create sound 
			
			audio.play(); // Play sound 
			
			timer.tickTockOrNot = false; // Call tickTockOrNot variable and set it to false to stop the clock from running 
			
			timerCounter = 0; // Reset the counter variable from this file 
			
			resetTimer(); // Call the resetTimer() method from the timer.js file 
			
			timerEnabledFlag = false; // Set the timerEnabledFlag to false so that this file knows the clock is not running 
		}
		//If the timer is running and has not reached 0, but the counter has reached the limit. Reset the counter, and call the countdown function from the timer.js file. 
		else if(timerCounter >= clockCounterLimit)
		{
			timerCounter = 0;
			countdown(timerDIV);
		}
		//If the timer is running, has not reached 0, and the counter has not reached the limit, iterate the counter 
		else
		{
			timerCounter++;
		}


	}
}


/**
	 * The tick function is called by setInterval to be executed every tickRate rate.
	 * Calls all handling functions and functions from other files to display clock, date, timer, and stopWatch 
	 * @author  Cesar Avalos 
	 * @see - clockHandling(),stopWatchHandling(), timerHandling(), clock.js, stopWatch.js, Timer.js, calendar.js 
*/
function tick()
{
	//Execute Handlers
	clockHandling();
	stopWatchHandling();
	timerHandling();

	//Display Clock, Date, Timer, and StopWatch
	displayClock(clockDIV, hourDIV);
	stopWatchDisplay(stopWatchDIV);
	displayTimer(timerDIV);
	displayDate(calendarDIV);
}


/**
	 * Called in the HTML file onClick. Used for the play/pause button of the stopWatch 
	 * @author  Cesar Avalos 
	 * @see - frontEnd.html, stopWatch.js
*/
function stopWatchPlayPauseButton()
{
	//If the stopwatch is not running 
	if(!stopWatchBtnToggle)
	{
		//Set the flag to start running 
		stopWatchEnable = true;
		//Call the stopWatchRun() method from the stopWatch.js file 
		stopWatchRun();
		//Set the flag 
		stopWatchBtnToggle = true
		//Swtich the button text 
		stopWatchRunButton.innerHTML = "Pause"
	}
	//If the stopWatch is running 
	else
	{
		//Reset the counter 
		stopWatchCounter = 0;
		//Set the flag 
		stopWatchBtnToggle = false;
		//Swtich the button text 
		stopWatchRunButton.innerHTML = "Start"

	}
}

/**
	 * Called in the HTML file onClick. Used for the reset button of the stopWatch 
	 * @author  Cesar Avalos 
	 * @see - frontEnd.html, stopWatch.js
*/
function stopWatchResetButton()
{
		stopWatchReset(); // Call the stopWatchReset() button from the stopWatch.js file 
		stopWatchCounter = 0; // Reset the counter as well
}

/**
	 * Called in the HTML file onClick. Used for the start button of the Timer 
	 * @author Cesar Avalos 
	 * @see - frontEnd.html, timer.js, checkValidTimerInput()
*/
function timerStartButton()
{
	//Get the input values from the HTML Textboxes from the HTML file 
	var _tempHour = parseInt(hourField.value);
	var _tempMin  = parseInt(minField.value);
	var _tempSec  = parseInt(secField.value);

	//If the timer is not enabled and the input is valid 
	if(!timerEnabledFlag && checkValidTimerInput(_tempHour,_tempMin,_tempSec))
	{
		//Set the background colors of the textfields 
		secField.style.backgroundColor = "white";
		minField.style.backgroundColor = "white";
		hourField.style.backgroundColor = "white";
		
		//Call the startTimer, displayTimer functions from the timer.js file to start and display the timer 
		startTimer(_tempHour,_tempMin, _tempSec);
		displayTimer(timerDIV);	
		//Set the flag 
		timerEnabledFlag = true;
	}
	
	//If the timer input is not valiid 
	else if(!checkValidTimerInput(_tempHour,_tempMin,_tempSec)){
	
		//Set the background color of the input boxes to red to alert the user 
		secField.style.backgroundColor = "red";
		minField.style.backgroundColor = "red";
		hourField.style.backgroundColor = "red";
		
	}
}

/**
	 * Called in the HTML file onClick. Used for the reset button of the Timer 
	 * @author  Cesar Avalos 
	 * @see - frontEnd.html, timer.js
*/
function timerResetButton()
{
	//If the timer is running 
	if(timerEnabledFlag)
	{
		resetTimer(); // Call the resetTimer() function from Timer.js
		//Reset the flag and counter 
		timerEnabledFlag = false;
		timerCounter = 0;
	}
}

/**
	 * Called in the HTML file onClick. Used for the pause button of the Timer 
	 * @author  Cesar Avalos, Alec Knutsen 
	 * @see - frontEnd.html, timer.js
*/
function timerPauseButton()
{
	//If the timer is on 
	if(timer.tickTockOrNot)
	{
		//set the button text 
		stopTimerButton.innerHTML = " Resume ";
	}
	//If the timer is off 
	else
	{
		//set the buttont text 
		stopTimerButton.innerHTML = " Pause ";
	}
	switchTickTockOrNot(); //Call the switchTickTockOrNot method to set the timer flag in the timer.js file 
}

/**
	 * Called in the HTML file onClick. Used for the set calendar button of the Calendar
	 * @author  Cesar Avalos, Alec Knutsen 
	 * @see - frontEnd.html, calendar.js
*/
function calendarSetButton()
{
	//Convert the day input from the HTML Element to an integer
	tempDay = parseInt(document.getElementById("InputDay").value)
	//Convert the month input from the HTML input to an integer 
	tempMonth = parseInt(document.getElementById("InputMonth").value);
	
	//Call the checkValidDay() function from the calendar. js file to validate input 
	if(checkValidDay(tempDay, tempMonth))
	{
		//Set the day and month variables from the calendar.js file 
		day = tempDay;
		month = tempMonth;
		//Use the setDate() function from the calendar.js to set the date. Use the displayDate() function from the calendar.js file to display the date 
		setDate();
		displayDate(calendarDIV);
		
		//Clear the text inputs and set the color to white 
		document.getElementById("InputDay").style.backgroundColor = "white";
		document.getElementById("InputMonth").style.backgroundColor = "white";
		document.getElementById("InputDay").value = "";
		document.getElementById("InputMonth").value = "";
	}
	
	//If the date is invalid 
	else {

		//Clear the text inputs and set the color to red
		document.getElementById("InputDay").style.backgroundColor = "red";
		document.getElementById("InputMonth").style.backgroundColor = "red";
		document.getElementById("InputDay").value = "";
		document.getElementById("InputMonth").value = "";
	}
}

/**
	 * Called in the HTML file onClick. Used for the set clock button of the Clock
	 * @author  Cesar Avalos, Alec Knutsen 
	 * @see - frontEnd.html, clock.js
*/
function setClockButton()
{
	//Get the inputs from the HTML input elemnts and convert 
	var tempHour = parseInt(document.getElementById("InputHours").value);
	var tempMin  = parseInt(document.getElementById("InputMinutes").value);
	var tempSec  = parseInt(document.getElementById("InputSeconds").value);
	//Get the am_pm value from the dropdown 
	var tempampm = document.getElementById("amORpm").value;
	
	//Validate the time using checkValidTimeInput() function from the clock.js file 
	if(checkValidTimeInput(tempHour, tempMin, tempSec))
	{
		//Set the object variables of the Clock object in clock.js 
		Clock.setHours(tempHour);
		Clock.setMinutes(tempMin); 
		Clock.setSeconds(tempSec); 
		
		//If we are not in military time 
		if(!Military)
		{
			//Set the am_pm object variable of the Clock object 
			Clock.setAM_PM(tempampm);			
		}
		//Initialize the clockCounter variable 
		clockCounter = 0;
		
		//Reset input texts and set background color to white 
		document.getElementById("InputHours").style.backgroundColor = "white";
		document.getElementById("InputMinutes").style.backgroundColor = "white";
		document.getElementById("InputSeconds").style.backgroundColor = "white";
		document.getElementById("InputHours").value = "";
		document.getElementById("InputMinutes").value = "";
		document.getElementById("InputSeconds").value = "";
	}
	
	//If the clock time is not valid 
	else {
			//Reset input texts and set background color to red 
			document.getElementById("InputHours").style.backgroundColor = "red";
			document.getElementById("InputMinutes").style.backgroundColor = "red";
			document.getElementById("InputSeconds").style.backgroundColor = "red";
			document.getElementById("InputHours").value = "";
			document.getElementById("InputMinutes").value = "";
			document.getElementById("InputSeconds").value = "";
	}
}


/**
	 * Called in the HTML file onClick. Used for the converting between civilian/military time 
	 * @author  Cesar Avalos
	 * @see - frontEnd.html, clock.js
*/
function setClockMilitaryButton()
{
	//If we are not in military time 
	if(!Military)
	{
		//Set the flag so that we are in military time 
		Military = true;
		//Get rid of the am_pm dropdown menu from the HTML element 
		clockModeMenu.style.display = 'none';
		//Set the text of the military/civilian button
		clockMilitaryButton.innerHTML = "Civilian Time";
		//Call the setMilitary function of the clock.js file to set the flag in the clock.js file 
		Clock.setMilitary(true);
	}
	
	//If we are in military time
	else
	{
		//Set the flag so that we are in military time 
		Military = false;
		//Set the text of the military/civilian button
		clockMilitaryButton.innerHTML = "Military Time";
		//Readd the am_pm dropdown menu from the HTML element 
		clockModeMenu.style.display = 'inline-block';
		//Call the setMilitary function of the clock.js file to set the flag in the clock.js file 
		Clock.setMilitary(false);
	}
	//Call the transformToCorrectMode method from the clock.js file to convert the time 
	Clock.transformToCorrectMode();
}

/**
	 * Hides all elements except the shutDownThisJointButton. Everything will run in the background 
	 * Called in frontEnd.html
	 * @author  Cesar Avalos, Alec Knutsen 
	 * @see - frontEnd.html
*/
function shutDownThisJointButton()
{
	//If the page is visible 
	//alert("g");
	if(isThisGinJointVisible)
	{
		//Hide all main elements and zoom in, zoom out buttons 
		document.getElementById("main-content").style.display = "none";
		document.getElementById("display-content").style.display = "none";
		//Set the flag 
		isThisGinJointVisible = false;
		//Set the text 
		document.getElementById("shutDown").innerHTML = "Make Visible";
	}
	//If the elements are not visible 
	else
	{
		//Reshow all main elemnts and zoom in, zoom out button 
		document.getElementById("main-content").style.display = "inline";
		document.getElementById("display-content").style.display = "inline";
		//Set the flag 
		isThisGinJointVisible = true;
		//Set the text 
		document.getElementById("shutDown").innerHTML = "Hide";
	}
}


/**
	 * Checks if the time passed in to the clock is valid 
	 * Called in setClockButton() function from this file. 
	 * @author - Cesar Avalos 
	 * @param {number} _hour - Hour value passed into the clock 
	 * @param {number} _min - Minute value passed into the clock 
	 * @param {number} _sec - Second value passed into the clock 
	 * @return {number} boolean - Returns true if the time is valid, false otherwise 
	 * @see - setClockButton()
*/
function checkValidTimeInput(_hour, _min,_sec)
{
	//If we are in military time 
	if(Clock.getMilitaryTime() == true)
	{
		//If the hour is between 0 and 23 
		if(_hour >= 0 && _hour < 24)
		{
			//If the minute is between 0 and 59 
			if(_min >= 0 && _min < 60)
			{
				//If the second is between 0 and 59 
				if(_sec >= 0 && _sec < 60)
				{
					//Return true 
					return true;
				}
			}
		}
	}
	//If we are not in military time 
	else
	{
		//If the hour is between 0 and 12 
		if(_hour > 0 && _hour < 13)
		{
			//If the minute is between 0 and 59 
			if(_min >= 0 && _min < 60)
			{
				//If the second is between 0 and 59 
				if(_sec >= 0 && _sec < 60)
				{
					//Return true 
					return true;
				}
			}
		}
	}
	//IF all else fails, return false 
	return false;
}


/**
	 * Checks valid input to the timer. 
	 * Called in timerStartButton() function from this file 
	 * @author - Cesar Avalos, Alec Knutsen 
	 * @param {number} _hour - Hour value passed into the timer 
	 * @param {number} _min - Minute value passed into the timer
	 * @param {number} _sec - Second value passed into the timer
	 * @return {number} boolean - Returns true if the time is valid, false otherwise 
	 * @see - timerStartButton();
*/
function checkValidTimerInput(_hour, _min,_sec)
{
	//If the hours is greater than 0, the minutes are between 0 and 59, and the seconds are between 1 and 59 
	if(_hour >= 0 && _min >= 0 && _min <=59 && _sec<=59 && _sec >= 1)
	{
		//If no inputs are invalid, return true 
		if(!isNaN(_hour) &&!isNaN(_min) && !isNaN(_sec) )
		{
			return true;
		}
		//If inputs are invalid return false 
		else
		{
			return false
		}
	}
	//If the timer time is not in the specified range, return false 
	else {
		return false;
	}
}



