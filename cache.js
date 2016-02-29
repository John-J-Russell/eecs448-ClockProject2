//Once the webapp is closed, store the time this happens.
//Whenever the page is once again loaded, calculate the
//time difference between the previous closing time and
//this new access, offset the clock by this, doing so will
//effectively allow the clock to run in the background

var oldtime = document.getElementById("oldtime");
var newtime = document.getElementById("newtime");
var elapsedtime = document.getElementById("elapsedtime");

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
			oldtime.innerHTML = oldDate;
			newtime.innerHTML = Date.now();
			elapsedtime.innerHTML = elapsed;
			console.log(oldDate);
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
	localStorage.setItem('exit_time', exit_time);
}

window.onload = function()
{
	loadConfig();
}

window.addEventListener('unload', function(event) {
	saveConfig();
});