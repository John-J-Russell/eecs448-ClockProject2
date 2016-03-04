
// By Yarden


//var shouldRun = false;

var secs =0;
var min= 0;
var hours =0;
// Variables to house the hours, minutes, secounds
var setimeoutvar =false;
// Variable to interact with the setTimeout method
var flag = true;
//flag for wether the clock should be running or not


function stopWatchRun()
// function to iterate the stopWatch
{
	

	
	
	/*document.getElementById("hClock").innerHTML = checkTime(hours);
	document.getElementById("mClock").innerHTML =  checkTime(min);
	document.getElementById("sClock").innerHTML = checkTime(secs);
	document.getElementById("colon").innerHTML = ":";
	document.getElementById("colon2").innerHTML = ":";
	*/
	//Display to the webpage the current time
	secs += 1;
	//increment the seconds by 1 second

	if (secs == 60)
	//checks to see if the seconds need to change back to 0
	{
		min +=1;
		secs =0;
	}
	if (min == 60)
	//checks to see if the minutes need to be changed to 0
	{
		hours +=1;
		min =0;
	}



}

function stopWatchPause()
//method to allow the stopwatch to be paused
{
  if (flag)
  {
  	flag = false;
  }
  else
  {
  	flag = true;
  	stopWatchBuild();
  	//waits until the pause changes to resume the ticking by calling stopwatchbuild()
  }
}

function stopWatchBuild()
//method that initialy creates the stopwatch
{
	if (flag ==true)
	{
		//recurces through the function at 1 seconds intervals and call the stopwatchrun()
		clearTimeout(setimeoutvar);
		stopWatchRun();
		setimeoutvar = setTimeout(function() { stopWatchBuild(); }, 1000);
	}

}

function stopWatchReset()
{
	
	hours =0;
	min=0;
	secs=0;
	//resets the times to 0
	/*document.getElementById("hClock").innerHTML = checkTime(hours);
	document.getElementById("mClock").innerHTML =  checkTime(min);
	document.getElementById("sClock").innerHTML = checkTime(secs);
	document.getElementById("colon").innerHTML = ":";
	document.getElementById("colon2").innerHTML = ":";
	//Displays that it has reset*/

}

function stopWatchDisplay(stopWatchDiv)
{
	stopWatchDiv.innerHTML = checkTime(hours) + ":" + checkTime(min) + ":" + checkTime(secs);
}

function checkTime(a) 
	{
		if (a < 10) {a = "0" + a};  // add zero in front of numbers < 10
		return a;
	}