/*
	JOHN RUSSELL
	j362r647@ku.edu, jjruss2014@gmail.com, jjruss2014@yahoo.com
	timer.js
	29 Feb 2016
	Handles the Timer back-code
*/


function startTimer(hoursDiv, minutesDiv, secondsDiv)
{
	timer.reset();
	var h=hoursDiv;
	var m=minutesDiv;
	var s=secondsDiv;
	
	//If empty fields, just use zeros there.
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
	
	if((m<0||m>59) || (s<0||s>59) || h<0)
	{
		alert("Invalid entry");
		
	}
	
	else
	{
		//put variables in timer, start ticking down.
		timer.hour=h;
		timer.min=m;
		timer.sec=s;
		timer.tickTockOrNot=true;
		//console.log(timer);
		//displayTime();
		
		//setTimeout(countdown, 1000);
	}
}

//Takes it down a second
function countdown(timerDiv)
{
	if(timer.tickTockOrNot==true)
	{
		
		if(makeTimeString(timerDiv)=="00:00:00")
		{
			//Play a thing if possible
			//timer.tickTockOrNot=false;
			//alert("It's done, now go save your cake");
			//var audio = new Audio('STOP.mp3');
			//audio.play();
		}
		else
		{
			//decrement remaining time by one second
			
			if(timer.sec==0)
			{
				timer.sec=59;
				if(timer.min==0)
				{
					timer.min=59;
					if(timer.hour==0)
					{
						alert("wait what?");
					}
					else
					{
						timer.hour=timer.hour-1;
					}
				}
				else
				{
					timer.min=timer.min-1;
				}
			}
			else
			{
				timer.sec=timer.sec-1;
			}
			
		}
		//displayTime();
		//setTimeout( countdown , 1000 );
	}
	
	
}


//Put that time onto the page
//Subject to change.
function displayTime()
{
	//var out=document.getElementById("timeDisplay");
	//.innerHTML changes content of <p> tag
	//out.innerHTML=makeTimeString();
	//This is a bit stupid, but saves time.
	var throwaway=makeTimeString();
}

function isTimerZero()
{
	if(timer.hour === 0 && timer.min === 0 && timer.sec === 0)
	{
		return true;
	}
	return false;
}

//For consistency sake, displays the current timer values in a div.
function displayTimer(timerDiv)
{
	makeTimeString(timerDiv);
}

//turns the time into a string for easy displayment
function makeTimeString(timerDiv)
{
	//gussy this up later with the extra zeros where applicable
	var tempHour=timer.hour;
	var tempMin=timer.min;
	var tempSec=timer.sec;
	if(timer.hour<10)
	{
		tempHour="0"+timer.hour;
	}
	if(timer.min<10)
	{
		tempMin="0"+timer.min;
	}
	if(timer.sec<10)
	{
		tempSec="0"+timer.sec;
	}
	var prettyTimeString=tempHour+":"+tempMin+":"+tempSec;
	
	//Changes display
	timerDiv.innerHTML = prettyTimeString;

	//This is a legacy for the decrementer, which uses this to check if time has run out.
	return(prettyTimeString);
}


//Switches if timer should keep decrementing or not
function switchTickTockOrNot()
{
	if(timer.tickTockOrNot==true)
	{
		timer.tickTockOrNot=false;
	}
	else
	{
		//timeout delay here makes it take a second before decreasing.
		timer.tickTockOrNot=true;
	//	setTimeout(countdown, 1000);
	}
}

//As name implies, resets the timer to zero.
function resetTimer()
{
	timer.reset();
	//displayTime();
}

//Global timer object
var timer=
{
	hour:0,
	min:0,
	sec:0,
	tickTockOrNot:false,
	reset:function()
	{
		this.hour=0;
		this.min=0;
		this.sec=0;
		this.tickTockOrNot=false;
	}
}
	