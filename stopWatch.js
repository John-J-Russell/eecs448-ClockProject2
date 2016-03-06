/*
** EECS 448 Project #1,2: Clock
** @author: Yarden Tamir 
** @description: Functions that help implement the stopWatch. Many of the methods are called in frontEnd.js
** Last update: March 5, 2016.
*/

// Variables to house the hours, minutes, secounds
var secs =0;
var min= 0;
var hours =0;

// Variable to interact with the setTimeout method// Variable to interact with the setTimeout method
var setimeoutvar =false;

//flag for whether the clock should be running or not
var flag = true;



/**
     * Function to iterate the stop watch. Called in the stopWatchHandler method and stopWatchPlayPauseButton method in the frontEnd.js file
	 * @author Yarden Tamir, Cesar Avalos 
     * @param 
     * @return 
	 * @see frontEnd.js 
*/
function stopWatchRun()
// function to iterate the stopWatch
{
	//increment the seconds by 1 second
	secs += 1;
	
	//checks to see if the seconds need to change back to 0
	if (secs == 60)
	{
		
		min +=1; // Update the minutes by one 
		secs =0; // Reset the seconds 
	}
	
	//checks to see if the minutes need to be changed to 0
	if (min == 60)
	
	{
		hours +=1; // Update the hours 
		min =0; // Reset the minutes 
		
	}



}


/**
     * Method that allows the stopwatch to be paused. Only resets the global flag variable from this class. 
	 * @author Yarden Tamir 
     * @param 
     * @return
	 * @see stopWatchBuild()
*/
function stopWatchPause()

{
  //Switch flag values 
  if (flag)
  {
  	flag = false;
  }
  
  //Switch flag values 
  else
  {
  	flag = true;
  	stopWatchBuild(); //Call the stopWatchBuild function from this file to restart the timer 

  }
}

/**
     * If the flag is true, calls the stopWatchRun method to run the clock 
	 * @author Yarden Tamir 
     * @param 
     * @return 
	 * @see stopWatchRun()
*/
function stopWatchBuild()

{
	//If the flag is true, clock is running 
	if (flag ==true)
	{
		//Call the stopWatchRun function from this file 
		stopWatchRun();
	}

}

/**
     * Resets the stopWatch. Called in the stopWatchReset() method in the frontEnd.js file 
	 * @author Yarden Tamir 
     * @param 
     * @return 
	 * @see frontEnd.js
*/
function stopWatchReset()
{
	
	//Reset all variables hours, minutes, and seconds to 0 
	hours =0;
	min=0;
	secs=0;

}

/**
     * Sets the timer display for the HTML element passed in as a parameter. Called in tick method of the frontEnd.js file  
	 * @author Yarden Tamir 
     * @param {HTML Element} stopWatchDiv - The HTML element where the timer will be displayed 
     * @return 
	 * @see frontEnd.js, checkTime(a);
*/
function stopWatchDisplay(stopWatchDiv)
{
	stopWatchDiv.innerHTML = checkTime(hours) + ":" + checkTime(min) + ":" + checkTime(secs); // Set the HTML Element text to display the stopWatch time appropriately 
}

/**
     * Function that adds zeros before numbers if they are less than 10. Called in the stopWatchDisplay method from this file. 
	 * @author
     * @param {number or String} a - Number to add zeros in front of 
     * @return {number} y - The y value.
	 * @see
*/
function checkTime(a) 
	{
		//If the parameter is less than 10, add a 0 in front 
		if (a < 10) 
		{a = "0" + a};  
	
		//Return the display 
		return a;
	}