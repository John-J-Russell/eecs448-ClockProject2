//Once the webapp is closed, store the time this happens.
//Whenever the page is once again loaded, calculate the
//time difference between the previous closing time and
//this new access, offset the clock by this, doing so will
//effectively allow the clock to run in the background

//At the start of the app, before everything else loads
//check if there is any program cache.
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
		if(localStorage.getItem('exit_time'))
		{
			var oldDate	    = localStorage.getItem('exit_time');
			var currentDate = new Date();
			var elapsed = Date.now() - localStorage.getItem('exit_time');
			Clock.setTime(localStorage.getItem("exit_hours"), localStorage.getItem("exit_minutes"), localStorage.getItem("exit_seconds"));
			offsetTime(elapsed);
		}		
		else
		{
			console.log("no storage of this m8");
			// run this thing normally
		}
	}
	else
	{
		console.log("need a new browser m8");
	}	
}

function saveConfig()
{
	var exit_time = Date.now();

	localStorage.setItem('exit_seconds', exit_seconds);
	localStorage.setItem('exit_minutes', exit_minutes);
	localStorage.setItem('exit_hours', exit_hours);
	//Yes I could do this with JSON, what are you a cop? Get out of here, shoo.
	localStorage.setItem('exit_time', exit_time);
	localStorage.setItem('exit_day' , day);
	localStorage.setItem('exit_date', date);
	localStorage.setItem('exit_month', month);
}

window.addEventListener('unload', function(event) {
	saveConfig();
});