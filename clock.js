/*
** EECS 448 Project #1: Clock
** Authors: Luke Dercher, Sri Gayatri, Luke Weber.
** More Authors: Alec Knutsen 
** Last update: Feb 29, 2016.
*/

	//Global Variables: i, counter, and invalid 
	var i;
	var counter;
	
	//Variable for the clock if it has invalid values before running
	var invalid=false;
	"use strict"
	
	
	//Author: Luke Weber
	//Clock Object 
	var Clock =
	{	

		//Local Variables for object Clock
		//Initialized to values passed in from HTML elements input boxes 
		Minutes : document.getElementById("InputMinutes").value,
		Seconds : document.getElementById("InputSeconds").value,
		Hours : document.getElementById("InputHours").value,
		
		//Local boolean for time mode
		MilitaryTime : false,
		
		//Local String for time mode 
		AM_PM : "AM",
	
		//Get method for class variable hours 
		getHours: function ()
		{
			return(parseInt(this.Hours));
		},
		
		//Set method for class variable hours 
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
		
		//Get method for class variable minutes 
		getMinutes: function ()
		{
			return(parseInt(this.Minutes));
		},
		
		//Set method for class variable minutes 
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
		
		//Get method for class variable seconds 
		getSeconds: function ()
		{
			return(parseInt(this.Seconds));
		},
		
		//Set method for class variable seconds 
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
		
		//Get method for class variable  military_time
		getMilitaryTime: function()
		{
			//Get the element value for 12/24 for hour mode from the HTML element
			var MaxHour = document.getElementById("Hour clock").options[document.getElementById("Hour clock").selectedIndex].value
			
				//If the value is 12, return false for military time
				if(MaxHour == 12)
				{
					return(false)
				}
				
				//If the value is not 12, return true for military time 
				else
				{
					return(true)
				}
		
		},
		
		//Get method for class variable AM_PM
		getAM_PM : function()
		{
			
			return(this.AM_PM)
			
		},
		
		//Set method for class variable AM_PM 
		setAM_PM : function(AM_PM)
		{
			//If we previously had a value stored in AM_PM 
			if(AM_PM == "am" || AM_PM == "pm")
			{
				//If we are not in military time, keep the previous value of AM_PM
				if(!this.getMilitaryTime())
				{
					
				this.AM_PM = AM_PM
				
				}
				
				//If we are in military time, set the AM_PM string to  the empty string 
				else
				{
					this.AM_PM = " "
				}
			}
			
			//If no previous value is stored in AM or PM, store the previous value 
			else
			{
				this.AM_PM = AM_PM
			}
			
		},
		
		//Helper function to change from am to pm or change from pm to am
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
			
		}
		
		
	} // End Class Object 
	
	
	// Author: Sri Gayatri & Luke Weber
	//Method called in blink method and called recursively 
	//If the time is invalid, returns false
	//If the time is valid, it runs a manual program of a clock 
	function startClock(MaxHour, MinHour)
	{
				
		
			//Get the current time from the methods of the class object 
			m = Clock.getMinutes; 
			s = Clock.getSeconds; 
			h = Clock.getHours;

			//Convert variables to integer 
			h=parseInt(h);
			m=parseInt(m);
			s=parseInt(s);
		
				
			
		//? Unused Variable 
		var valid = document.getElementById("valid").innerHTML;
		
		//If the time is invalid, return false 
		if (invalid)
		{
		return;
		}
		
		
		//Calls setSeconds method of the Clock object to update the seconds time 
		Clock.setSeconds(Clock.getSeconds()+1);
		
		//If the clock seconds need to be reset 
		if(Clock.getSeconds() == 60)
		{	
	
			//Call setSeconds method of the clock object to reset the second 
			Clock.setSeconds(0);
			
			//Update the minutes using the setMinutes method of the clockObject 
			Clock.setMinutes( Clock.getMinutes() + 1 );
			
			
			//If the clock minutes need to be reset 
			if(Clock.getMinutes() == 60)
			{	
		
				//Call the setMinutes method of the clock object to set the time to 0 
				Clock.setMinutes(0);
				
				
				//If the am_pm mode needs to be reset in regular time 	
				if((Clock.getHours() == MaxHour-1) && !Clock.getMilitaryTime())
				{
					
					Clock.changeAM_PM(); // call the changeAM_PM mode of the clock object to change from am to pm or vice versa 
				}
				
				
				//If the hours need to be reset, call the setHours method of the Class object 
				if(Clock.getHours() == MaxHour)
				{	//If 59 sec, 59mins, and 12 hrs
					Clock.setHours(MinHour);
					
				}
				
				//If the hourse do not need to be reset, iterate by 1 using the setMethod by 1 
				else
				{
					Clock.setHours(Clock.getHours()+1);
				}
				
			}
		}
		

		//Set the new time on clock
		document.getElementById("hClock").innerHTML = Clock.getHours();
		document.getElementById("mClock").innerHTML = checkTime(Clock.getMinutes());
		document.getElementById("sClock").innerHTML = checkTime(Clock.getSeconds());
		document.getElementById("am_pm").innerHTML = Clock.getAM_PM()

		//Clears the previous setTimeout and Calls the start Clock function every 1 second.
		
		//Global variable i, call clearTimeout method from library 
		clearTimeout(i);
		//Recall method every 1 second 
		i = setTimeout(function() { startClock(MaxHour, MinHour); }, 1000);
	}
	
	
	//Helper function called in init_blink method 
	//Basically switches the color of the seconds, hours,minutes display between red and black 
	function blink(MaxHour, MinHour)
	{
		
		//If counter is divisble by 2 switch colors to red of the HTML elements sClock, mClock, hClock
		if (counter%2 == 0 )
		{
			  document.getElementById("hClock").style.color = 'red';
			  
			  document.getElementById("mClock").style.color = 'red';
			  
			  document.getElementById("sClock").style.color = 'red';
		}	  
		
		//If counter is divisble by 2 switch colors to black of the HTML elements sClock, mClock, hClock
		else if(counter%2 == 1)
		{
			  document.getElementById("hClock").style.color = 'black';
			  
			  document.getElementById("mClock").style.color = 'black';
			  
			  document.getElementById("sClock").style.color = 'black';
		}
		
		//If the counter gets step to sop, change the  colors to black of the HTML elements sClock, mClock, hClock
		else if (counter == "stop")
		{
			document.getElementById("hClock").style.color = 'black';
			  
			document.getElementById("mClock").style.color = 'black';
			  
			document.getElementById("sClock").style.color = 'black';
			
			
			//Set the invalid clock equal to false 
			invalid = false;
			
			//Call the start clock method 
			startClock(MaxHour, MinHour);
		}
		
		//Iterate the counter each time the method is called 
		counter = counter + 1;
	}
		
	

	// Author: Luke Dercher and Luke Weber
	//Helper method called in Invalid_Entry method 
	function init_blink(MaxHour, MinHour)
	{
		//Set invalid equal to true
		invalid = true
		//Calls the blink function every 500 milliseconds 
		window.setInterval(blink, 500, MaxHour, MinHour)
	}
	
	//Function called in the clock object 
	function InvalidEntry()
	{
		//?Unused variable 
		var text= "Input not valid"; 
				
		//Set html inputs to 12, 0,0 
		document.getElementById("hClock").innerHTML = "12";//display invalid when bad input is given

		document.getElementById("mClock").innerHTML = "00";
		
		document.getElementById("sClock").innerHTML = "00";
		
		//Set counter equal to 0 
		counter = 0
		
		
		//Call_init blink method 
		init_blink(12, 1);
		
		//Return boolean false 
		return(false)
	}

	
	
	
	//Author: Sri 
	//Called in setClock method 
	//Helper method adds 0 in front of numbers 
	function checkTime(i) 
	{
		if (i < 10) {
			i = "0" + i
		};  // add zero in front of numbers < 10
		return i;
	}
	
	//Author: Luke Dercher, Sri, and Luke Weber 
	//Not called in javascript file
	//Method sets html elements 
	//CALLED IN THE HTML FILE 
	function clockBuild()
	{
		
		//Local variables for h,m, s, and text 
		var h,m,s,text; 
		
		//Initialize global counter variables 
		counter = 0;

		// Call helper javascript functions passing in the InputMinutes, InputSeconds, and InputsHours from the HTML file
		//Works is a boolean. Each set method returns true or false depending on if the time is valid.
		//If all times are valid, then works will evaluate to true 
		var Works = Clock.setMinutes(document.getElementById("InputMinutes").value); 
		Works = Works && Clock.setSeconds(document.getElementById("InputSeconds").value); 
		Works = Works && Clock.setHours(document.getElementById("InputHours").value);

		//Convert the strings to int
		h=parseInt(h);
		m=parseInt(m);
		s=parseInt(s);
		
		
		//Local variable dropDown that gets the element for the 12/24 hour mode 
		dropDown = document.getElementById("Hour clock")
		
		
		//MaxHour gets the value from the dropDown element 
		MaxHour = dropDown.options[dropDown.selectedIndex].value
		
		//Set min our maxHour based on 12 or 24 hour mode 
		MinHour = 0
		if(MaxHour==12)
		{
			MinHour = 1
		}
		
		//Set colon element in HTML to colon 
		document.getElementById("colon").innerHTML = ":"
			
		//Set colon2 element in HTML to colon 
		document.getElementById("colon2").innerHTML = ":"
		
		
		//If the clock is valid 
		if(Works)
		{
			//Text for clock 
			text = "Your digital clock"; 
			
			//Set global counter variable to stop
			counter = "stop";
			
			invalid = false;
			
			
			//Set the html elemnts for time using the getSeconds, getMinutes, and getHours methods of the Clock object 
			document.getElementById("hClock").innerHTML = Clock.getHours();
			
			document.getElementById("mClock").innerHTML = Clock.getMinutes();
			
			document.getElementById("sClock").innerHTML = Clock.getSeconds();
			
			
			//Set the AM/PM element using the setAM_PM method of the clock Object to the value from the HTML element 			
			Clock.setAM_PM(document.getElementById("amORpm").options[document.getElementById("amORpm").selectedIndex].value)
					
			//Call the startClock method to run the clock 
			startClock(MaxHour, MinHour);//Start the clock (Only Once when user Presses button everytime)
		}
		
		
		else // If the time is invalid, return nothing 
		{
			return
		}			
		
		//Set the valid document element in the HTML file to the text variable 
		document.getElementById("valid").innerHTML = text;
	}
	
	
	//Author: Luke Dercher
	//CALLED IN THE HTML FILE when the 12/24 hour mode selector gets changed 
	
	function chngDisp()
	{

		//Get the 12/24 dropdown menu elemnt 
		dropDown = document.getElementById("Hour clock");
		
		//Get the value for the max hour from the element 
		MaxHour = dropDown.options[dropDown.selectedIndex].value;
		MinHour = 0;
		
		//Set the minHour based on the 12/24 hour maxHour 
		if(MaxHour == 12)
		{
			MinHour = 1;
		}
		
		//Get the current Hour from the HTML element hClock 
		var Hour = parseInt(document.getElementById("hClock").innerHTML);
		
		//If the MaxHour is 12 
		if (MaxHour == 12)
		{
			//Set the text for whatNums element in HTML
			document.getElementById("whatNums").innerHTML = "Please input a number between 1 and 12:";
			
			//If you are in 12 hour mode and need to convert the time 
			if (Hour > 12) 
			{
				//Subtract 12 from the current hour. Set to hour using setHours method of the object method setAM_PM 
				Clock.setHours(Hour - 12);
				//Set to pm using setAM_PM method of the object method setAM_PM 
				Clock.setAM_PM("pm");
			}
			
			//Else if the time is 12 
			else if(Hour == 12)
			{
				//Call setAM_PM method of object class to set mode to pm 
				Clock.setAM_PM("pm");
								
			}
			
			//Else if the time does not need to be converted 
			else 
			{
				Clock.setAM_PM("am"); // Call setAM_PM method of object method to AM 
			}
			
			document.getElementById('amORpm').style.display = '';//show am or pm scrolldown when 12hrtime selected
			
		}
		
		//If we are in military tie 
		else if (MaxHour == 23)
		{		
			//Set appropriate text for text element whatNums 
			document.getElementById("whatNums").innerHTML = "Please input a number between 0 and 23:";
			
			//If the hour needs to be converted use the setHours method of the clock object to appropriately update the hours 
			if(Clock.getAM_PM() == "pm" && ! Hour==12)
			{
				Clock.setHours(Hour+ 12);
			}
			
			//Call setAM_PM method of clock object to make am_pm the empty string 
			Clock.setAM_PM(" ");
			
			//hides the am_pm scrolldown bar when military time selected
			document.getElementById('amORpm').style.display = 'none';
		}
		
	}
	