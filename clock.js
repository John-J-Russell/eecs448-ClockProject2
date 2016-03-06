/*
** EECS 448 Project #1,2: Clock
** One object and many helper methods mostly used in frontEnd.js 
** Authors: Luke Dercher, Sri Gayatri, Luke Weber.
** More Authors: Alec Knutsen, Cesar Avalos, John Russell, Yarden Tamir 
** Last update: March 5, 2016.
*/



//Global Variables: i, counter, and invalid 
var i;
var counter;

//Variable for the clock if it has invalid values before running
var invalid=false;
"use strict"



/**
	 * Clock Object. Contains a number of methods used in this file and used in frontEnd.js 
	 * @author Luke Weber, Alec Knutsen, John Russell, Yarden Tamir, Cesar Avalos 
*/
var Clock =
{	

	//Local Variables for object Clock
	Minutes : 0,
	Seconds : 0,
	Hours : 0,
	
	//Local boolean for time mode
	MilitaryTime : false,
	
	//Local String for time mode 
	AM_PM : "am",

	/**
		 * Get method for class variable hours. Called in clockDisplay() method from this file. 
		 * @author Luke Weber 
		 * @return {number} - Return integer variable of class hours 
		 * @see - clockDisplay()
	*/
	getHours: function ()
	{
		return(parseInt(this.Hours));
	},
	
	
	/**
		 * Set method for class variable hours. 
		 * Not used in our program
		 * @author Luke Weber 
		 * @param {number} aHours - Parameter used to set class variable hours 
		 * @return - Returns true if the parameter passed in is a valid hour, else calls the InvalidEntry function 
		 * @see invalidEntry() 
	*/
	setHours: function (aHours)
	{
		
		//Set min/max hour for non military time
		var MaxHour = 12
		var MinHour = 1
		
		//If in military time, change max, min hour 
		if(this.getMilitaryTime())
		{
			var MaxHour = 23
			var MinHour = 0
		}
		
		//If we we have a valid hour passed into the method 
		if (!isNaN(aHours) && (aHours <= MaxHour && aHours >= MinHour))
		{
				//Set class variable to parameter passed in 
				//Return true 
				this.Hours = aHours
				return(true)
		}
		
		//If the hours is invalid call the InvalidEntry function
		else
		{
			return(InvalidEntry())
		}
		
	},
	
	/**
		 * Set method for object variables Hours, Minutes, and Seconds.
		 * Called in initializeClockValues() function of the frontEnd.js file.
		 * Called in the loadConfig() function of the cache.js file 
		 * @author Luke Weber 
		 * @param {number} _hours - Parameter used to set object variable Hours 
		 * @param {number} _minutes - Parameter used to set object variable Minutes
		 * @param {number} _seconds - Parameter used to set object variable Seconds
		 * @return 
		 * @see - clock.js, cache.js 
	*/
	setTime: function(_hours, _minutes, _seconds)
	{
		//Set all class variables 
		this.Hours = _hours;
		this.Minutes = _minutes;
		this.Seconds = _seconds;
	},

	/**
		 * Get method for object variable minutes. Called in the clockDisplay() method from this file.
		 * Called in the initializeClockValues() method from the frontEnd.js file. 
		 * @author Luke Weber 
		 * @param 
		 * @return {number} - Returns integer value of Mintues Variable 
		 * @see - clockDisplay(), frontEnd.js
	*/
	getMinutes: function ()
	{
		return(parseInt(this.Minutes));
	},
	
	/**
		 * Set method for object variable minutes. Called in the setClockButton() method of the frontEnd.js file  
		 * @author Luke Weber 
		 * @param {number} aMinutes - Parameter representing variable that the class variable Minutes wil be set to 
		 * @return {boolean} - Returns true if the parameter is a valid minute, returns the function invalidEntry() otherwise 
		 * @see invalidEntry(), frontEnd.js 
	*/
	setMinutes: function (aMinutes)
	{
		//If we have a valid minutes passed in as parameter 
		if (!isNaN(aMinutes) && aMinutes <= 60 && aMinutes >= 0)
		{
			
			//Set class variable minutes to the parameter and return true 
			this.Minutes = aMinutes
			return(true)
		}
		
		//If the parameter is invalid, call the InvalidEntry function
		else
		{
			return(InvalidEntry())
		}
	},

	/**
		 * Get method for class variable seconds. 
		 * Called in the clockDisplay() function from this file.
		 * Called in the initializeClockValues() function from the frontEnd.js file 
		 * @author - Luke Weber 
		 * @return - Returns integer value of object variable Seconds 
		 * @see - clockDisplay(), frontEnd.js 
	*/
	getSeconds: function ()
	{
		return(parseInt(this.Seconds));
	},
	
	/**
		 * Set method for object variable seconds.
		 * Called in the setClockButton() method of the frontEnd.js file 
		 * @author - Luke Weber 
		 * @param aSeconds - Value that object variable seconds will be set to 
		 * @return - Returns true if the parameter is valid, returns the function invalidEntry if the parameter is invalid 
		 * @see invalidEntry(), frontEnd.js
	*/
	setSeconds: function (aSeconds)
	{
		//If the seconds passed in as a parameter is valid
		if (!isNaN(aSeconds) && aSeconds <= 60 && aSeconds >= 0)
		{
			
			//Set the class variable seconds to the parameter and return true
			this.Seconds = aSeconds
			return(true)
		}
		
		//Else call the invalidEntry function if the entry is invalid
		else
		{
			return(InvalidEntry())
		}
	},
	
	/**
		 * Get method for class variable  military_time.
		 * Called in setHours() and clockDisplay() functions from this file 
		 * Called in the checkValidTimeInput() function located in frontEnd.js 
		 * @author - Cesar Avalos 
		 * @param 
		 * @return {boolean} - Returns object variable MilitaryTime 
		 * @see - setHours(), clockDisplay(), frontEnd.js 
	*/
	getMilitaryTime: function()
	{
	
		return this.MilitaryTime;
	},

	/**
		 * Set method for object variable MilitaryTime
		 * Called in the setClockMilitaryButton() function of the frontEnd.js file 
		 * @author - Cesar Avalos 
		 * @param {boolean} _mil - Parameter that will set value of MilitaryTime 
		 * @return 
		 * @see - frontEnd.js 
	*/
	setMilitary: function(_mil)
	{
		this.MilitaryTime = _mil;
	},
	
	/**
		 * Function that adds time to object variables hours, minutes, and seconds 
		 * Called in the offsetTime() function from this file. 
		 * @author - Cesar Avalos 
		 * @param {number} _hours - Parameter that will be added to object variable hours 
		 * @param {number} _minutes - Parameter that will be added to object variable minutes
		 * @param {number} _seconds - Parameter that will be added to object variable seconds
		 * @return 
		 * @see - offsetTime() 
	*/
	addTime: function(_hours, _minutes, _seconds)
	{
		//Add parameters to corresponding class variables 
		this.Hours += _hours;
		this.Minutes += _minutes;
		this.Seconds += _seconds;
	},

	/**
		 * Get method for object variable AM_PM.
		 * Called in the changeAM_PM() and clockDisplay() functions from this file. 
		 * @author Luke Weber 
		 * @param 
		 * @return {number} - Return object variable AM_PM
		 * @see - changeAM_PM(), clockDisplay() 
	*/
	getAM_PM : function()
	{
		
		return(this.AM_PM)
		
	},
	
	
	/**
		 * Set method for class variable AM_PM.
		 * @author - Luke Weber 
		 * @param {number} AM_PM - Parameter object variable AM_PM will be set to 
		 * @return 
		 * @see
	*/
	setAM_PM : function(AM_PM)
	{
		//Set object variable 
		this.AM_PM = AM_PM;
	},
	
	/**
		 * Helper function to change from am to pm or change from pm to am
		 * Called in the changeAM_PM() function from this file.
		 * Called in the setClockButton() function in frontEnd.js 
		 * @author - Luke Weber 
		 * @param 
		 * @return 
		 * @see - changeAM_PM(), frontEnd.js 
	*/
	changeAM_PM : function ()
	{
		//If the previous string is am, change to pm 
		if (this.getAM_PM() == "am")
		{
			this.setAM_PM("pm")
		}
		
		//If the previous string is pm, change to am 
		else if (this.getAM_PM() == "pm")
		{
			this.setAM_PM("am")
		}
		
	},	
	
	/**
		 * Function to handle the hour changes depending on the mode.
		 * Called in the tick function from this file.
		 * @author Luke Weber, Cesar Avalos 
		 * @param 
		 * @return 
		 * @see calendar.js, tick()
	*/
	hourIncrement: function()
	{
		//If we are in military time
		if(this.MilitaryTime)
		{
			//If we are at the last hour, reset the hours and call the next day function from the calendar.js file to iterate the day 
			if(this.Hours == 23)
			{

				this.Hours = 0;
				nextDay();
			}
			//If we are not at the last hour, iterate the hours 
			else
			{
				this.Hours++;
			}
		}
		//If we are not in military time 
		else
		{
			//If we are at 11 am, set the the hours to 12 and change to pm 
			if(this.Hours == 11 && this.AM_PM == "am")
			{
				this.Hours = 12;
				this.AM_PM = "pm";
			}
			//If we are at 11 pm, set the the hours to 12, change to am, and call the next day function to iterate the day 
			else if(this.Hours == 11 && this.AM_PM == "pm")
			{
				this.Hours = 12
				this.AM_PM = "am";
				nextDay();
			}
			//If we are at 12 am, reset hours to 1 
			else if(this.Hours == 12 && this.AM_PM == "am")
			{
				this.Hours = 1;
			}
			//If we are at 12 pm, reset hours to 1 
			else if(this.Hours == 12 && this.AM_PM == "pm")
			{
				this.Hours = 1;
			}
			//If we are not at 11 am,pm or 12 am,pm, just iterate the hours 
			else
			{
				this.Hours++;
			}
		}
	},

	/**
		 * Function that handles conversion from civilian time  to military time.
		 * Used in the TransformtoCorrectMode() function from this file 
		 * @author - Cesar Avalos, Alec Knutsen 
		 * @param {number} _hours - Current hour value of clock 
		 * @return {number} - Returns converted hour 
		 * @see - TransformtoCorrectMode()
	*/
	toMilitaryTime: function(_hours)
	{
		var offset = 0; // Offest used to set the time 
		
		//If we are in a pm hour 
		if(this.AM_PM == "pm")
		{
			//If we are at 12 pm, offset is 0 because 12 is the appropriate hour in military time 
			if(this.Hours == 12)
			{
				offset = 0;
			}
			//If we are at any pm hour other than 12, the appropriate hour is hour +12 (set offset to 12)
			else
			{
				offset = 12;
			}
		}
		
		//If we are in am mode, do not make any changes to hour except at 12 am 
		else if(this.AM_PM == "am")
		{
			//If we are at 12 am, set hours to 0 
			if(this.Hours == 12) {
				return(0);
			}
		}


		return parseInt(_hours) + offset; // Return the hours plus the offset 
	},

	/**
		 * Handles conversion from military time to civilian time.
		 * Used in the transformToCorrectMode() mode function from this file. 
		 * @author - Cesar Avalos 
		 * @param {number} _hours - Represents current hours in military time 
		 * @return {number} - Returns converted hours in civilian time 
		 * @see - transformToCorrectMode()
	*/
	toCivilianTime:	function(_hours)
	{
		//If we are at an hour greater than or equal 12, set AM_PM object variable to pm 
		if(_hours >= 12)
		{
			this.AM_PM = "pm";	
		}	
		//If we are at an hour less than 12, set AM_PM object variable to am
		else
		{
			this.AM_PM = "am";
		}
	//Return the appropriate hour conversion 
	return (_hours + 24) % 12 || 12;
	},

	/**
		 * Uses toMilitaryTime, toCivilianTime functions above to convert to the correct time based on the mode MilitaryTime.
		 * Used in setClockMilitaryButton() function in frontEnd.js 
		 * @author - Cesar Avalos 
		 * @param 
		 * @return 
		 * @see toCivilianTime, toMilitaryTime, frontEnd.js 
	*/
	transformToCorrectMode: function()
	{
		//If we want to convert to military time 
		if(this.MilitaryTime)
		{
			//Set hours object variable using toMilitaryTime function
			this.Hours = this.toMilitaryTime(this.Hours);
		}
		//If we want to convert to civilian time 
		else
		{
			//Set hours object variable using toCivilianTime function
			this.Hours = this.toCivilianTime(this.Hours);
		}
	},

	/** 
		 * Generic funtion to make the clock tick.
		 * Called in the clockHandling() method of the frontEnd.js file
		 * @author - Cesar Avalos 
		 * @param 
		 * @return 
		 * @see  hourIncrement, frontEnd.js 
	*/
	tick: function()
	{
		//If we reached the max seconds 
		if(this.Seconds == 59)
		{
			//If we reached the max minutes 
			if(this.Minutes == 59)
			{
				//Increment the hour
				this.hourIncrement();
				//Reset the minutes 
				this.Minutes = 0;
			}
			//If we have not reached the max minutes, iterate the minutes 
			else
			{
				this.Minutes++;
			}
			
			//Reset the seconds 
			this.Seconds = 0;
		}
		//If we have not reached the max seconds, iterate the seconds 
		else
		{
			this.Seconds++;
		}
	}
} // End Class Object 

	

/**
	 * Generic function to display clock in HTML. Based on the function below by Gayarati and Weber.
	 * Called in the window.onload() function and tick function in frontEnd.js 
	 * @author - Cesar Avalos, Yarden Tamir 
	 * @param {HTML Element} clockDiv 
	 * @param {HTML Element} hourDiv - HTML Elemnt that will display the clock 
	 * @return 
	 * @see formatTimeString, getHours, frontEnd.js 
*/
function displayClock(clockDiv, hourDiv)
{
	var modeText = ""; // String that either has am_pm attached or not 
	//Get the current hours of the clock 
	var tempHour = Clock.getHours();
	//If we are not in military time, attach the am,pm to modeText 
	if(Clock.getMilitaryTime() == false)
	{
		modeText = " " + Clock.getAM_PM();
	}
	//Set the timer display hourDiv using the formatTimeString method from this file 
	hourDiv.innerHTML =  formatTimeString(tempHour) + ":" + formatTimeString(Clock.getMinutes()) + ":" + formatTimeString(Clock.getSeconds()) + modeText;
}

	

//
/**
	 * Function called in the clock object. Used to validate input 
	 * Called in the setHours(), setMinutes(), setSeconds(), setTime() functions from this file 
	 * Not super important in our clock 
	 * @author - Luke Weber 
	 * @param 
	 * @return - Returns false 
	 * @see - setHours(), setMinutes(), setSeconds(), setTime()
*/
function InvalidEntry()
{ 
			
	//Set html inputs to 12, 0,0 
	document.getElementById("hClock").innerHTML = "12";//display invalid when bad input is given

	document.getElementById("mClock").innerHTML = "00";
	
	document.getElementById("sClock").innerHTML = "00";
	
	//Set counter equal to 0 
	counter = 0
	
	
	//Return boolean false 
	return(false)
}


	
	
/**
	 * Helper method adds 0 in front of numbers.
	 * Called in the displayClock() method from this file 
	 * @author - Sri 
	 * @param {number} i - Value to add 0 in front of 
	 * @return {number} - Returns value with zero in front 
	 * @see - displayClock()
*/
function formatTimeString(i) 
{
	if (i < 10) {
		i = "0" + i
	};  // add zero in front of numbers < 10
	
	return i; // Return edited value 
}

	
	

/**
	 * Function to offset time, whenever the delta time is calculated offset the clock by that amount of time. Called in cache.js 
	 * NOT REALLY VITAL TO OUR CLOCK 
	 * @author - Cesar Avalos  
	 * @param {number} _offset - Value to offset by 
	 * @return 
	 * @see cache.js
*/
function offsetTime(_offset)
{
	//Variables to hold propery offseet 
	var offsetSeconds = Math.floor((_offset)/1000 % 60);
	var offsetMinutes = Math.floor((_offset)/(60 * 1000) % 60);
	var offsetHours   = Math.floor((_offset)/(60 * 60 * 1000) % 24);
	
	if((offsetHours / 24) > 1)
	{
		//Offset days 
		for(i = 0; i < (offsetHours / 24); i++)
		{
			nextDay();
		}
	}
	//Call addTime function of clock Object 
	Clock.addTime(offsetHours, offsetMinutes, offsetSeconds); 
}
