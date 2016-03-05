//Once the webapp is closed, store the time this happens.
//Whenever the page is once again loaded, calculate the
//time difference between the previous closing time and
//this new access, offset the clock by this, doing so will
//effectively allow the clock to run in the background

//Should work in theory, hopefully

//At the start of the app, before everything else loads
//check if there is any program cache.
//Return true if localstorage is writable
function isThereAnyStorage(type)
{
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

function loadConfig()
{
	if(isThereAnyStorage('localStorage'))
	{
		//Assume if exit_time exists, so does everything else.
		if(localStorage.getItem('exit_time'))
		{
			var oldDate	    = localStorage.getItem('exit_time');
			var currentDate = new Date();
			var elapsed = parseInt(Date.now()) - parseInt(oldDate);
			console.log(elapsed + " ms has happend, old value " + oldDate );
			Clock.setTime(localStorage.getItem("exit_hours"), localStorage.getItem("exit_minutes"), localStorage.getItem("exit_seconds"));
			offsetTime(elapsed);
		}		
		else
		{
			intializeClockValues();
		}
	}
	else
	{
		console.log("need a new browser m8");
		intializeClockValues();
	}	
}

function saveConfig()
{
	var exit_time = parseInt(Date.now());

	localStorage.setItem('exit_seconds', exit_seconds);
	localStorage.setItem('exit_minutes', exit_minutes);
	localStorage.setItem('exit_hours', exit_hours);
	//Yes I could do this with JSON, what are you, Johnny Law? Get out of here, shoo.
	localStorage.setItem('exit_time', exit_time);
	localStorage.setItem('exit_day' , day);
	localStorage.setItem('exit_date', date);
	localStorage.setItem('exit_month', month);
}

window.addEventListener('unload', function(event) {
		saveConfig();
});