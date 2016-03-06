/*
** EECS 448 Project #1,2: Clock
** @author: Cesar Avalos 
** @description: Two functions that help zoom the HTML page in and out 
** Last update: March 3, 2016.
*/



/**
     * At the start of the app, before everything else loads check if there is any program cache. Return true if localstorage is writable.
	 * Helper function called in the loadConfig() function from this file. 
	 * @author Cesar Avalos 
     * @param {Array Index} type - 
     * @return boolean - Returns true if storage is writable, false otherwise 
	 * @see loadConfig()
*/
function isThereAnyStorage(type)
{
		//Try to see if storage is avaialble 
		try
		{
			var storage = window[type];
			x = '_is_this_thing_on?';
			storage.setItem(x,x);
			storage.removeItem(x);
			return true;
		}catch(e)
		{
			return false;
		}
}

/**
     * Gets the old time from the local storage. Gets the current date. Calculates the ealpsed time. Sets the clock to the values in storage. 
	 *Calls the offset time method from the clock.js file and the setTime method of the Clock object from the clock.js file 
	 * Called in the windows.onLoad function in the frontEnd.js file 
	 * @author Cesar Avalos 
     * @param 
     * @return 
	 * @see clock.js, frontEnd.js isThereAnyStorage()
*/
function loadConfig()
{
	//Check if storage is avaiable 
	if(isThereAnyStorage('localStorage'))
	{
		//Assume if exit_time exists, so does everything else.
		if(localStorage.getItem('exit_time'))
		{
			//Get the old date 
			var oldDate	    = localStorage.getItem('exit_time');
			//Get the current date 
			var currentDate = new Date();
			//Calculate the elapsed time 
			var elapsed = parseInt(Date.now()) - parseInt(oldDate);
			console.log(elapsed + " ms has happend, old value " + oldDate );
			//Set the time of the Clock object in clock.js 
			Clock.setTime(localStorage.getItem("exit_hours"), localStorage.getItem("exit_minutes"), localStorage.getItem("exit_seconds"));
			//Call the offset time method from the Clock.js file 
			offsetTime(elapsed);
		}		
		//If no exit time is in storage, call the intializeClockValues() method from the frontEnd.js file 
		else
		{
			intializeClockValues();
		}
	}
	//If no storage is avaiable, call the intializeClockValues() method from the frontEnd.js file 
	else
	{
		console.log("need a new browser m8");
		intializeClockValues();
	}	
}

/**
     * Stores all time variables and date variables in storage from the current time 
	 * @author Cesar Avalos 
     * @param 
     * @return 
	 * @see
*/
function saveConfig()
{
	//Get current time 
	var exit_time = parseInt(Date.now());

	//Store everything 
	localStorage.setItem('exit_seconds', exit_seconds);
	localStorage.setItem('exit_minutes', exit_minutes);
	localStorage.setItem('exit_hours', exit_hours);
	localStorage.setItem('exit_time', exit_time);
	localStorage.setItem('exit_day' , day);
	localStorage.setItem('exit_date', date);
	localStorage.setItem('exit_month', month);
}

/**
     * Calls the saveConfig() function above 
	 * @author
     * @param {String} unload 
     * @return {function} - Function passed in 
	 * @see saveConfig();
*/
window.addEventListener('unload', function(event) {
		saveConfig();
});