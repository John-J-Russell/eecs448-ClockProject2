/*
	JOHN RUSSELL
	j362r647@ku.edu, jjruss2014@gmail.com, jjruss2014@yahoo.com
	timer.js
	29 Feb 2016
	Handles the Timer back-code
*/


//TODO:
//Set time DONE
//Start timer
//Pause time
//Resume timer
//Reset timer
//Display remaining time: DONE

//Personal notes:
//undefined var == ""
//

function startTimer()
{
	var h=document.getElementById("hourField").value;
	var m=document.getElementById("minField").value;
	var s=document.getElementById("secField").value;
	
	
	if((m<0||m>59) || (s<0||s>59) || h<0)
	{
		alert("Invalid entry");
		
	}
	else
	{
		timer.hour=h;
		timer.min=m;
		timer.sec=s;
		timer.tickTockOrNot=true;
		console.log(timer);
		//start fucking about with a timer countdown
		displayTime();
		
		countdown();
	}
	//console.log(h+":"+m+":"+s);
	if(s=="")
	{
		console.log("nothing");
	}
	console.log(timer);
	//timer.reset();
	//console.log(timer);
	//test
	//var i, q, invalid = false;
	//console.log(i+" "+q+" "+invalid);
}

//Takes it down a second
function countdown()
{
	if(timer.tickTockOrNot==true)
	{
		
		if(makeTimeString()=="00:00:00")
		{
			//Play a thing if possible
			timer.tickTockOrNot==false;
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
		displayTime();
		//ticker++;
		//console.log(ticker);
		setTimeout( countdown , 1000 );
	}
	
	
}


//Put that time onto the page
function displayTime()
{
	var out=document.getElementById("timeDisplay");
	//.innerHTML changes content of <p> tag
	out.innerHTML=makeTimeString();
}

//turns the time into a string for easy displayment
function makeTimeString()
{
	//gussy this up later with the extra zeros where applicable
	var tempHour=timer.hour;
	var tempMin=timer.min;
	var tempSec=timer.sec;
	if(timer.hour<10)
	{
		tempHour="0"+timer.hour;
		//console.log(tempHour);
	}
	if(timer.min<10)
	{
		tempMin="0"+timer.min;
		//console.log(tempMin);
	}
	if(timer.sec<10)
	{
		tempSec="0"+timer.sec;
		//console.log(tempSec);
	}
	var prettyTimeString=tempHour+":"+tempMin+":"+tempSec;
	//console.log(prettyTimeString);
	return(prettyTimeString);
}




//I'm doing the massive object thing too, fuck it
var timer=
{
	hour:0,
	min:0,
	sec:0,
	//determines whether to decrement or not, subject to change
	tickTockOrNot:false,
	reset:function()
	{
		this.hour=0;
		this.min=0;
		this.sec=0;
		this.tickTockOrNot=false;
	}
}
	