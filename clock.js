
	var i,counter;
	//Author: Luke Dercher
	function clockBuild24() 
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
		
		// If x is Not a Number or less than one or greater than 10 
		if (isNaN(h) || h < 0 || h > 23||isNaN(m) || m < 0 || m > 59||isNaN(s) || s < 0 || s > 59)  
		{ 
			text= "Input not valid"; 
			
			document.getElementById("hClock").innerHTML = "12";//display invalid when bad input is given
			
			document.getElementById("mClock").innerHTML = "00";
			
			document.getElementById("sClock").innerHTML = "00";
			
			init_blink();
		}  
		else
		{ 
			text = "Input valid"; 
			
			counter = "stop";
			
			document.getElementById("hClock").innerHTML = h;//Set User's time on Clock
			
			document.getElementById("mClock").innerHTML = m;
			
			document.getElementById("sClock").innerHTML = s;
					
			startClock(24);//Start the clock (Only Once when user Presses button everytime)
		
		} 
		 
			document.getElementById("valid").innerHTML = text; 
	} 
	//Author: Luke Dercher. Sri made changes to it.
	function clockBuild12() 
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
		
		// If x is Not a Number or less than one or greater than 10 
		if (isNaN(h) || h < 1 || h > 12||isNaN(m) || m < 0 || m > 59||isNaN(s) || s < 0 || s > 59)  
		{ 
			text= "Input not valid"; 
			
			document.getElementById("hClock").innerHTML = "12";//display invalid when bad input is given
			
			document.getElementById("mClock").innerHTML = "00";
			
			document.getElementById("sClock").innerHTML = "00";
			
			init_blink12();
		}  
		else
		{ 
			text = "Input valid"; 
			
			counter = "stop";
			
			document.getElementById("hClock").innerHTML = h;//Set User's time on Clock
			
			document.getElementById("mClock").innerHTML = m;
			
			document.getElementById("sClock").innerHTML = s;
					
			startClock(13);//Start the clock (Only Once when user Presses button everytime)
		
		} 
		 
			document.getElementById("valid").innerHTML = text; 
	} 

	// Author: Luke Dercher
	function init_blink24() 
	{
		
		window.setInterval(blink24,500);
		
	}

	function init_blink12() 
	{
		
		window.setInterval(blink12,500);
		
	}

	function blink24() 
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
			
			startClock24();
		}
		counter = counter + 1;
	}

	function blink12() 
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
			
			startClock12();
		}
		counter = counter + 1;
	}
	 
	 

	// Author: Sri Gayatri
	function startClock24()
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
				if(h==23)
				{	//If 59 sec, 59mins, and 23 hrs
					h=0;
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
			i = setTimeout(function() { startClock24(); }, 1000);
	}

	// Author: Sri Gayatri
	function startClock12()
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
				if(h==13)
				{	//If 59 sec, 59mins, and 12 hrs
					h=1;
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
			i = setTimeout(function() { startClock12(); }, 1000);
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
	
	//Author: Luke Weber
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
			
			init_blink12();
		}  
		else
		{ 
			text = "Input valid"; 
			
			counter = "stop";
			
			document.getElementById("hClock").innerHTML = h;//Set User's time on Clock
			
			document.getElementById("mClock").innerHTML = m;
			
			document.getElementById("sClock").innerHTML = s;
					
			startClock(MaxHour, MinHour);//Start the clock (Only Once when user Presses button everytime)
		
		} 
		 
			document.getElementById("valid").innerHTML = text;
	}
 