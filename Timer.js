/*
** EECS 448 Project #1,2: Clock
** @author: John Russell 
** @description: Functions that help implement the Timer . Many of the methods are called in frontEnd.js
** Last update: March 5, 2016.
*/



/**
     * //Global timer object used for this file 
	 * @author John Russell 
*/
var timer=
{
	//Object variables for hour minutes and seconds 
	hour:0,
	min:0,
	sec:0,
	
	//Boolean for whether the clock is running or not 
	tickTockOrNot:false,
	
	//Function for ressetting all object variables to the default values 
	reset:function()
	{
		this.hour=0;
		this.min=0;
		this.sec=0;
		this.tickTockOrNot=false;
	}
}

/**
     * Called in the timerStartButton function of the frontEnd.js file 
	 * @author John Russell 
     * @param {number} hoursDiv - HTML value that contains the hours of the timer 
	 * @param {number} minutesDiv - HTML value that contains the minutes of the timer 
	 * @param {number} secondsDiv - HTML value that contains the seconds of the timer 
     * @return {number} y - The y value.
	 * @see frontEnd.js, timer.reset()
*/
function startTimer(hoursDiv, minutesDiv, secondsDiv)
{
	timer.reset(); // Call to the timer Object reset method from this file 
	
	//Store the current hours, minutes, and seconds from the HTML Elemnts 
	var h=hoursDiv;
	var m=minutesDiv;
	var s=secondsDiv;
	
	//If the hours, minutes, or seconds values are empty, store 0 in the h,m, and s variables
	if(h=='')
	{
		h=0;
	}
	if(m=='')
	{
		m=0;
	}
	if(s=='')
	{
		s=0;
	}
	
	//Set the object variables from the timer Object to the values from the HTML file 
	timer.hour=h;
	timer.min=m;
	timer.sec=s;
	//Set the boolean to true to start running the clock 
	timer.tickTockOrNot=true;
		
}

/**
     * Function for manually running a timer. Called in the timerHandling method in the frontEnd.js file 
	 * @author John Russell 
     * @param {number} x - The x value.
     * @return {number} y - The y value.
	 * @see frontEnd.js
*/
function countdown(timerDiv)
{
	//If the timer is running 
	if(timer.tickTockOrNot==true)
	{
		
		//If the seconds are 0 
		if(timer.sec==0)
		{
			//Reset the seconds 
			timer.sec=59;
			
			//If the minutes are 0 
			if(timer.min==0)
			{
				//Reset the minutes 
				timer.min=59;
				
				//If the hours are 0 
				if(timer.hour==0)
				{
				}
				//Decrement the hours by 1 
				else
				{
					timer.hour=timer.hour-1;
				}
			}
			
			//If the minues are not 0, decerement the minutes by one
			else
			{
				timer.min=timer.min-1;
			}
		}
		
		//If the seconds are not 0, decrement the seconds by one 
		else
		{
			timer.sec=timer.sec-1;
		}
		

	}
	
	
}

/**
     * Checks if the timer is at 0. Called in the timerHandling method of the frontEnd.js File 
	 * @author John Russell 
     * @param 
     * @return {boolean} - Returns true if the timer is at 0, false otherwise 
	 * @see frontEnd.js
*/
function isTimerZero()
{
	//If the timer is at 0, return true 
	if(timer.hour === 0 && timer.min === 0 && timer.sec === 0)
	{
		return true;
	}
	
	
	//If the timer is not at 0, return false 
	return false;
}

//For consistency sake, displays the current timer values in a div.
/**
     * Calls the makeTimeString method from this file, to set the HTML element passed in as a parameter to the valid time. Called onLoad function, tick function, and timerStart function in the frontEnd.js file 
	 * @author
     * @param {HTML Element} timerDiv - HTML element to set 
     * @return 
	 * @see frontEnd.js
*/
function displayTimer(timerDiv)
{
	makeTimeString(timerDiv); // Call the makeTImeString method to set the HTML element passed in as a parameter 
}

//
/**
     * Turns the time into a string for easy displayment. Called in the timerDisplay method from this file. 
	 * @author John Russell 
     * @param {HTML Element} - HTML Elemnt to hold the timing display 
     * @return 
	 * @see timerDisplay() 
*/
function makeTimeString(timerDiv)
{
	//Get the time from the object variables of timer 
	var tempHour=timer.hour;
	var tempMin=timer.min;
	var tempSec=timer.sec;
	
	//Add zeros in front of the hours, minutes, seconds variables if any of them are less than 10 
	if(timer.hour<10)
	{
		tempHour="0"+timer.hour;
	}
	//Add zeros in front of the hours, minutes, seconds variables if any of them are less than 10 
	if(timer.min<10)
	{
		tempMin="0"+timer.min;
	}
	//Add zeros in front of the hours, minutes, seconds variables if any of them are less than 10 
	if(timer.sec<10)
	{
		tempSec="0"+timer.sec;
	}
	//String that holds the final time 
	var prettyTimeString=tempHour+":"+tempMin+":"+tempSec;
	
	//Set the HTML Element passed in as a parameter 
	timerDiv.innerHTML = prettyTimeString;

}

/**
     * Switches if timer should keep decrementing or not. Called in the timerPauseButton() method of the frontEnd.js file 
	 * @author John Russell 
     * @param 
     * @return 
	 * @see frontEnd.js
*/
function switchTickTockOrNot()
{
	//If the boolean is true set to false
	if(timer.tickTockOrNot==true)
	{
		timer.tickTockOrNot=false;
	}
	
	//If the boolean is false set to true
	else
	{
		timer.tickTockOrNot=true;
	}
}

/**
     * Resets the timer to zero. Create a point. Called in the timerResetButton() and timerHandling() methods of the frontEnd.js files. 
	 * @author John Russell 
     * @param 
     * @return 
	 * @see frontEnd.js, timer.reset();
*/
function resetTimer()
{
	timer.reset(); // Call the reset method of the timer object from this file 
	
}


	