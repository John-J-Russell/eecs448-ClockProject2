
	var i,counter;
	"use strict"
	// Author: Luke Dercher and Luke Weber
	function init_blink(MaxHour, MinHour)
	{
		
		window.setInterval(blink, 500, MaxHour, MinHour)
	}
	function blink(MaxHour, MinHour)
	{
		
		if (counter%2 == 0 )
		{
			  document.getElementById("hClock").style.color = 'white';
			  
			  document.getElementById("mClock").style.color = 'white';
			  
			  document.getElementById("sClock").style.color = 'white';
		}	  
		else if(counter%2 == 1)
		{
			  document.getElementById("hClock").style.color = 'black';
			  
			  document.getElementById("mClock").style.color = 'black';
			  
			  document.getElementById("sClock").style.color = 'black';
		}
		else if (counter == "stop")
		{
			document.getElementById("hClock").style.color = 'black';
			  
			document.getElementById("mClock").style.color = 'black';
			  
			document.getElementById("sClock").style.color = 'black';
			
			startClock(MaxHour, MinHour);
		}
		counter = counter + 1;
	}
	
	
	// Author: Sri Gayatri & Luke Weber
	function startClock(MaxHour, MinHour)
	{
				
		//Get Current time in the clock that is being Displayed to user 

			m = Clock.getMinutes; 
			s = Clock.getSeconds; 
			h = Clock.getHours;

			h=parseInt(h);
			m=parseInt(m);
			s=parseInt(s);
		
				
		var valid = document.getElementById("valid").innerHTML;
		
		if (valid == "Input not valid")
		{
		return;
		}
		
		//This function will run every 1 second. All it does is increment second variable and check if it affects mins and hours
		if(Clock.getSeconds() == 59)
		{	//If 59 sec
			Clock.setSeconds(0);
			if(Clock.getMinutes() == 59)
			{	//If 59 sec and 59 mins
				Clock.setMinutes(0);
				if((Clock.getHours() == MaxHour-1) && !Clock.getMilitaryTime())
				{
					Clock.changeAM_PM();
				}
				if(Clock.getHours() == MaxHour)
				{	//If 59 sec, 59mins, and 12 hrs
					Clock.setHours(MinHour);
					
				}
				else
				{
					Clock.setHours(Clock.getHours()+1);
				}
			}
			else
			{
				Clock.setHours(Clock.getHours()+1);
			}
		}
		else
		{
			Clock.setSeconds(Clock.getSeconds()+1);
		}
		

		//Set the new time on clock
		document.getElementById("hClock").innerHTML = Clock.getHours();
		document.getElementById("mClock").innerHTML = checkTime(Clock.getMinutes());
		document.getElementById("sClock").innerHTML = checkTime(Clock.getSeconds());
		document.getElementById("am_pm").innerHTML = Clock.getAM_PM()

		//Clears the previous setTimeout and Calls the start Clock function every 1 second.
		clearTimeout(i);
			i = setTimeout(function() { startClock(MaxHour, MinHour); }, 1000);
	}
	//Author: Sri 
	function checkTime(i) 
	{
		if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
		return i;
	}
	
	//Author: Luke Dercher, Sri, and Luke Weber 
	function clockBuild()
	{
		
		Clock.setHours(document.getElementById("InputHours").value)
		
			var h,m,s,text; 
		
		counter = 0;

		// Get the value of the input fields 
		var Works = Clock.setMinutes(document.getElementById("InputMinutes").value); 
		Works = Works && Clock.setSeconds(document.getElementById("InputSeconds").value); 
		Works = Works && Clock.setHours(document.getElementById("InputHours").value);

		//Convert the strings to int
		h=parseInt(h);
		m=parseInt(m);
		s=parseInt(s);
		
		dropDown = document.getElementById("Hour clock")
		
		MaxHour = dropDown.options[dropDown.selectedIndex].value
		
		
		MinHour = 0
		if(MaxHour==12)
		{
			MinHour = 1
		}
		
		
		
		if(Works)
		{
			text = "Your digital clock"; 
			
			counter = "stop";
			
			document.getElementById("hClock").innerHTML = Clock.getHours();//Set User's time on Clock
			
			document.getElementById("mClock").innerHTML = Clock.getMinutes();
			
			document.getElementById("sClock").innerHTML = Clock.getSeconds();
			
			
			Clock.setAM_PM(document.getElementById("amORpm").options[document.getElementById("amORpm").selectedIndex].value)
					
			startClock(MaxHour, MinHour);//Start the clock (Only Once when user Presses button everytime)
		}
			
		
		 
		 
			document.getElementById("valid").innerHTML = text;
	}
	//Author: Luke Dercher
	function chngDisp()
	{

		dropDown = document.getElementById("Hour clock");
		
		MaxHour = dropDown.options[dropDown.selectedIndex].value;
		MinHour = 0;
		if(MaxHour == 12)
		{
			MinHour = 1;
		}
		
		var Hour = parseInt(document.getElementById("hClock").innerHTML);
		
		if (MaxHour == 12)
		{
			document.getElementById("whatNums").innerHTML = "Please input a number between 1 and 12:";
			if (Hour > 12) 
			{
				Clock.setHours(Hours - 12);
				Clock.setAM_PM("pm");
			}
			else
			{
				Clock.setAM_PM("am");
			}
			
			document.getElementById('amORpm').style.display = '';//show am or pm scrolldown when 12hrtime selected
			
		}
		else if (MaxHour == 23)
		{		
			document.getElementById("whatNums").innerHTML = "Please input a number between 0 and 23:";
			if(Clock.getAM_PM() == "pm")
			{
				Clock.setHours(Hour+ 12);
			}
			Clock.setAM_PM(" ");
			
			document.getElementById('amORpm').style.display = 'none';//hides the am_pm scrolldown bar when military time selected
		}
		
	}

		//Author: Luke Weber
		var Clock =
		{	
	
		Minutes : document.getElementById("InputMinutes").value,
		Seconds : document.getElementById("InputSeconds").value,
		Hours : document.getElementById("InputHours").value,
		MilitaryTime : false,
		AM_PM : "AM",
		
			getHours: function ()
			{
				return(parseInt(this.Hours));
			},
			setHours: function (aHours)
			{
				
				var MaxHour = 12
				var MinHour = 1
				if(this.getMilitaryTime())
				{
					var MaxHour = 23
					var MinHour = 0
				}
				if (aHours <= MaxHour && aHours >= MinHour)
				{
						
						this.Hours = aHours
						return(true)
				}
				else
				{
					var text= "Input not valid"; 
					
					document.getElementById("hClock").innerHTML = "12";//display invalid when bad input is given
			
					document.getElementById("mClock").innerHTML = "00";
					
					document.getElementById("sClock").innerHTML = "00";
					
					init_blink(12,1);
					return(false)
				}
				
			},
			getMinutes: function ()
			{
				return(parseInt(this.Minutes));
			},
			setMinutes: function (aMinutes)
			{
				if (aMinutes < 60 && aMinutes >= 0)
				{
					
					this.Minutes = aMinutes
					return(true)
				}
				else
				{
					var text= "Input not valid"; 
					
					document.getElementById("hClock").innerHTML = "12";//display invalid when bad input is given
			
					document.getElementById("mClock").innerHTML = "00";
					
					document.getElementById("sClock").innerHTML = "00";
					
					init_blink(12, 1);
					return(false)
				}
			},
			getSeconds: function ()
			{
				return(parseInt(this.Seconds));
			},
			setSeconds: function (aSeconds)
			{
				if (aSeconds < 60 && aSeconds >= 0)
				{
					
					this.Seconds = aSeconds
					return(true)
				}
				else
				{
					var text= "Input not valid"; 
					
					document.getElementById("hClock").innerHTML = "12";//display invalid when bad input is given
			
					document.getElementById("mClock").innerHTML = "00";
					
					document.getElementById("sClock").innerHTML = "00";
					
					init_blink(12, 1);
					return(false)
				}
			},
			getMilitaryTime: function()
			{
				var MaxHour = document.getElementById("Hour clock").options[document.getElementById("Hour clock").selectedIndex].value
					if(MaxHour == 12)
					{
						return(false)
					}
					else
					{
						return(true)
					}
			
			},
			getAM_PM : function()
			{
				
				return(this.AM_PM)
				
			},
			setAM_PM : function(AM_PM)
			{
				if(AM_PM == "am" || AM_PM == "pm")
				{
					if(!this.getMilitaryTime())
					{
					this.AM_PM = AM_PM
					}
					else
					{
						this.AM_PM = " "
					}
				}
				else
				{
					this.AM_PM = AM_PM
				}
			},
			changeAM_PM : function ()
			{
				if (this.getAM_PM() == "am")
				{
					this.setAM_PM("pm")
				}
				else if (this.getAM_PM() == "pm")
				{
					this.setAM_PM("am")
				}
			}
			
			
			
		}
	

 