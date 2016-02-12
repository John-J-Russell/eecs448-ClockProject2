
	var i,counter;
	
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

			m = document.getElementById("mClock").innerHTML; 
			s = document.getElementById("sClock").innerHTML; 
			h = document.getElementById("hClock").innerHTML;

			h=parseInt(h);
			m=parseInt(m);
			s=parseInt(s);
		
				
		var valid = document.getElementById("valid").innerHTML;
		
		if (valid == "Input not valid")
		{
		return;
		}
		
		//This function will run every 1 second. All it does is increment second variable and check if it affects mins and hours
		if(s==59)
		{	//If 59 sec
			s=0;
			if(m==59)
			{	//If 59 sec and 59 mins
				m=0;
				if(h==MaxHour)
				{	//If 59 sec, 59mins, and 12 hrs
					h=MinHour;
				}
				else
				{
					h=h+1;
				}
			}
			else
			{
				m=m+1;
			}
		}
		else
		{
			s=s+1;
		}
		m = checkTime(m);
		s = checkTime(s);

		//Set the new time on clock
		document.getElementById("hClock").innerHTML = h;
		document.getElementById("mClock").innerHTML = m;
		document.getElementById("sClock").innerHTML = s;

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
			var h,m,s,text; 
		
		counter = 0;

		// Get the value of the input fields 
		m = document.getElementById("InputMinutes").value; 
		s = document.getElementById("InputSeconds").value; 
		h = document.getElementById("InputHours").value;

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
		
		
		// If x is Not a Number or less than one or greater than 10 
		if (isNaN(h) || h < MinHour || h > MaxHour||isNaN(m) || m < 0 || m > 59||isNaN(s) || s < 0 || s > 59)  
		{ 
			text= "Input not valid"; 
			
			document.getElementById("hClock").innerHTML = "12";//display invalid when bad input is given
			
			document.getElementById("mClock").innerHTML = "00";
			
			document.getElementById("sClock").innerHTML = "00";
			
			init_blink(MaxHour, MinHour);
		}  
		else
		{ 
			text = "Your digital clock"; 
			
			counter = "stop";
			
			document.getElementById("hClock").innerHTML = h;//Set User's time on Clock
			
			document.getElementById("mClock").innerHTML = m;
			
			document.getElementById("sClock").innerHTML = s;
					
			startClock(MaxHour, MinHour);//Start the clock (Only Once when user Presses button everytime)
		
		} 
		 
			document.getElementById("valid").innerHTML = text;
	}
	
	function chngDisp()
	{

		dropDown = document.getElementById("Hour clock");
		
		MaxHour = dropDown.options[dropDown.selectedIndex].value;
		
		if (MaxHour == 12)
		{
			document.getElementById("whatNums").innerHTML = "Please input a number between 1 and 12:";
		}
		else if (MaxHour == 23)
		{		
			document.getElementById("whatNums").innerHTML = "Please input a number between 0 and 23:";
		}

	}
 
